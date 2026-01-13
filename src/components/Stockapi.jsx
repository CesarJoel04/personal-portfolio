import { useState } from "react";
import styles from "../styles/Stockapi.module.css";

function Stockapi() {
const [symbol, setSymbol] = useState('');
  const [stockData, setStockData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [showApiInput, setShowApiInput] = useState(true);

  const searchStock = async () => {
    if (!symbol.trim()) {
      setError('Please enter a stock symbol');
      return;
    }

    if (!apiKey.trim()) {
      setError('Please enter your Finnhub API key');
      return;
    }

    setLoading(true);
    setError('');
    setStockData(null);

    try {
      const response = await fetch(
        `https://finnhub.io/api/v1/quote?symbol=${symbol.toUpperCase()}&token=${apiKey}`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch stock data');
      }

      const data = await response.json();

      if (data.c === 0 && data.h === 0 && data.l === 0) {
        setError('Stock symbol not found. Please check the symbol and try again.');
        return;
      }

      const companyResponse = await fetch(
        `https://finnhub.io/api/v1/stock/profile2?symbol=${symbol.toUpperCase()}&token=${apiKey}`
      );
      
      let companyData = {};
      if (companyResponse.ok) {
        companyData = await companyResponse.json();
      }

      setStockData({
        ...data,
        symbol: symbol.toUpperCase(),
        name: companyData.name || symbol.toUpperCase(),
        exchange: companyData.exchange || 'N/A'
      });
    } catch (err) {
      setError('Error fetching stock data. Please check your API key and try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      searchStock();
    }
  };

  const priceChange = stockData ? stockData.c - stockData.pc : 0;
  const percentChange = stockData ? ((priceChange / stockData.pc) * 100) : 0;
  const isPositive = priceChange >= 0;

  return (
    <div className="stock-search-container">
      <div className="stock-search-wrapper">
        <div className="header">
          <h1>Stock Market Search</h1>
          <p>Live stock data powered by Finnhub</p>
        </div>

        {showApiInput && (
          <div className="api-key-section">
            <label>Finnhub API Key</label>
            <div className="api-key-input-group">
              <input
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="Enter your API key"
                className="api-key-input"
              />
              <button
                onClick={() => setShowApiInput(false)}
                className="api-key-save-btn"
              >
                Save
              </button>
            </div>
            <p className="api-key-help">
              Get your free API key at{' '}
              <a href="https://finnhub.io" target="_blank" rel="noopener noreferrer">
                finnhub.io
              </a>
            </p>
          </div>
        )}

        {!showApiInput && (
          <button
            onClick={() => setShowApiInput(true)}
            className="change-api-key-btn"
          >
            Change API Key
          </button>
        )}

        <div className="search-section">
          <div className="search-input-group">
            <input
              type="text"
              value={symbol}
              onChange={(e) => setSymbol(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Enter stock symbol (e.g., AAPL, TSLA, MSFT)"
              className="symbol-input"
            />
            <button
              onClick={searchStock}
              disabled={loading}
              className="search-btn"
            >
              🔍 {loading ? 'Searching...' : 'Search'}
            </button>
          </div>

          {error && (
            <div className="error-message">
              {error}
            </div>
          )}

          {stockData && (
            <div className="stock-data">
              <div className="stock-header">
                <h2>{stockData.name}</h2>
                <p>{stockData.symbol} • {stockData.exchange}</p>
              </div>

              <div className="stock-grid">
                <div className="stock-card current-price">
                  <div className="card-label">
                    💵
                    <span>Current Price</span>
                  </div>
                  <p className="card-value">${stockData.c.toFixed(2)}</p>
                </div>

                <div className={`stock-card ${isPositive ? 'positive' : 'negative'}`}>
                  <div className="card-label">
                    {isPositive ? '📈' : '📉'}
                    <span>Change</span>
                  </div>
                  <p className="card-value">
                    {isPositive ? '+' : ''}{priceChange.toFixed(2)} ({percentChange.toFixed(2)}%)
                  </p>
                </div>

                <div className="stock-card">
                  <p className="card-label">High</p>
                  <p className="card-value">${stockData.h.toFixed(2)}</p>
                </div>

                <div className="stock-card">
                  <p className="card-label">Low</p>
                  <p className="card-value">${stockData.l.toFixed(2)}</p>
                </div>

                <div className="stock-card">
                  <p className="card-label">Open</p>
                  <p className="card-value">${stockData.o.toFixed(2)}</p>
                </div>

                <div className="stock-card">
                  <p className="card-label">Previous Close</p>
                  <p className="card-value">${stockData.pc.toFixed(2)}</p>
                </div>
              </div>

              <div className="timestamp">
                🕐
                <span>Last updated: {new Date(stockData.t * 1000).toLocaleString()}</span>
              </div>
            </div>
          )}
        </div>

        <div className="footer">
          <p>Popular symbols: AAPL, TSLA, MSFT, GOOGL, AMZN, META, NVDA</p>
        </div>
      </div>
    </div>
  );
}

export default Stockapi;

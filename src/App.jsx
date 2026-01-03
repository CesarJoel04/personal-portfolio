import styles from "./App.module.css";
import { Navbar } from "./components/Navbar";
import Hero from "./components/Hero";

function App() {
  return <div className={styles.App}>
  <Navbar />
  <Hero />
  </div>;
}

export default App;

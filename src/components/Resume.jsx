import { useEffect, useRef, useState } from "react";
import styles from "../styles/Resume.module.css";
import * as pdfjsLib from 'pdfjs-dist'
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.min.mjs?url'
import resumePdf from '../assets/resume.pdf'

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;
function Resume() {
const canvasRef = useRef(null);
  const [pdfDoc, setPdfDoc] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [numPages, setNumPages] = useState(0);
  const [zoom, setZoom] = useState(1.5);

  useEffect(() => {
    const loadPdf = async () => {
      try {
        const loadingTask = pdfjsLib.getDocument(resumePdf);
        const pdf = await loadingTask.promise;
        setPdfDoc(pdf);
        setNumPages(pdf.numPages);
      } catch (error) {
        console.error('Error loading PDF:', error);
      }
    };

    loadPdf();
  }, []);

  useEffect(() => {
    const renderPage = async () => {
      if (!pdfDoc || !canvasRef.current) return;

      const page = await pdfDoc.getPage(currentPage);
      
      const viewport = page.getViewport({ scale: zoom });
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');

      canvas.height = viewport.height;
      canvas.width = viewport.width;

      const renderContext = {
        canvasContext: context,
        viewport: viewport,
      };
      await page.render(renderContext).promise;
    };

    renderPage();
  }, [pdfDoc, currentPage, zoom]);

  const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const nextPage = () => setCurrentPage((prev) => Math.min(prev + 1, numPages));
  const zoomIn = () => setZoom((prev) => Math.min(prev + 0.25, 3));
  const zoomOut = () => setZoom((prev) => Math.max(prev - 0.25, 0.5));

  return (
    <div className={styles.resume}>
      <section>
        <h1>Resume</h1>
        <hr></hr>
      </section>
      
      <section className={styles.resumeSection}>
        <div style={{ marginBottom: '10px' }}>
          <button onClick={prevPage} disabled={currentPage <= 1}>
            Previous
          </button>
          <span style={{ margin: '0 10px' }}>
            Page {currentPage} of {numPages}
          </span>
          <button onClick={nextPage} disabled={currentPage >= numPages}>
            Next
          </button>
          <button onClick={zoomOut} style={{ marginLeft: '20px' }}>
            Zoom Out
          </button>
          <span style={{ margin: '0 10px' }}>
            {Math.round(zoom * 100)}%
          </span>
          <button onClick={zoomIn}>
            Zoom In
          </button>
        </div>

        <canvas 
          ref={canvasRef} 
          id="canvas" 
          className={styles.canvas}
        />
      </section>
    </div>
  );
}

export default Resume;

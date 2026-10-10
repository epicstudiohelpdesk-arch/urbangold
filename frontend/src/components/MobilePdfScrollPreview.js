import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/legacy/build/pdf.worker.min.mjs`;

const MobilePdfScrollPreview = ({ fileUrl }) => {
  const INITIAL_RENDER_PAGES = 2;
  const PAGE_BATCH = 2;
  const LOAD_MORE_THRESHOLD_PX = 440;
  const containerRef = useRef(null);
  const [numPages, setNumPages] = useState(0);
  const [pagesToRender, setPagesToRender] = useState(0);
  const [pageWidth, setPageWidth] = useState(280);
  const [pagePixelRatio, setPagePixelRatio] = useState(1.15);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setNumPages(0);
    setPagesToRender(0);
    setHasError(false);
  }, [fileUrl]);

  useEffect(() => {
    const ratio = typeof window !== 'undefined' ? (window.devicePixelRatio || 1) : 1;
    setPagePixelRatio(Math.min(1.25, Math.max(1, ratio)));
  }, []);

  useEffect(() => {
    const element = containerRef.current;
    if (!element) return undefined;

    const updateWidth = () => {
      setPageWidth(Math.max(240, Math.floor(element.clientWidth - 8)));
    };

    updateWidth();

    if (typeof ResizeObserver !== 'undefined') {
      const observer = new ResizeObserver(updateWidth);
      observer.observe(element);
      return () => observer.disconnect();
    }

    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  const loadMorePages = useCallback(() => {
    if (!numPages) return;
    setPagesToRender((current) => Math.min(numPages, current + PAGE_BATCH));
  }, [numPages]);

  const handleScroll = useCallback((event) => {
    if (!numPages || pagesToRender >= numPages) return;
    const target = event.currentTarget;
    const remainingScroll = target.scrollHeight - target.scrollTop - target.clientHeight;
    if (remainingScroll <= LOAD_MORE_THRESHOLD_PX) {
      loadMorePages();
    }
  }, [loadMorePages, numPages, pagesToRender]);

  if (hasError) {
    return (
      <div className="h-full overflow-y-auto bg-gradient-to-b from-gray-100 to-gray-50 dark:from-gray-950 dark:to-gray-900 p-3">
        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white/90 dark:bg-gray-900/85 p-4">
          <p className="text-sm font-semibold text-gray-900 dark:text-white">Preview unavailable on this device.</p>
          <p className="mt-1.5 text-xs text-gray-600 dark:text-gray-400">
            Open the document in a new tab to view the full PDF.
          </p>
          <a
            href={fileUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-3 inline-flex items-center justify-center h-9 px-3.5 rounded-lg bg-gradient-to-r from-emerald-700 to-teal-700 text-white text-xs font-semibold uppercase tracking-[0.08em]"
          >
            Open PDF
          </a>
        </div>
      </div>
    );
  }

  return (
    <div
      className="h-full overflow-y-auto bg-gradient-to-b from-gray-100 to-gray-50 dark:from-gray-950 dark:to-gray-900"
      onScroll={handleScroll}
    >
      <div ref={containerRef} className="min-h-full px-1.5 py-2.5 sm:px-2.5 sm:py-3">
        <Document
          key={fileUrl}
          file={fileUrl}
          onLoadSuccess={({ numPages: loadedPages }) => {
            setNumPages(loadedPages);
            setPagesToRender(Math.min(INITIAL_RENDER_PAGES, loadedPages));
            setHasError(false);
          }}
          onLoadError={() => setHasError(true)}
          loading={
            <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white/85 dark:bg-gray-900/80 px-4 py-5 text-sm text-gray-600 dark:text-gray-300">
              Loading PDF preview...
            </div>
          }
          error=""
        >
          {Array.from({ length: pagesToRender }, (_, index) => (
            <div
              key={`${fileUrl}-page-${index + 1}`}
              className="mb-2 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-[0_8px_22px_rgba(15,23,42,0.12)] dark:shadow-[0_8px_22px_rgba(0,0,0,0.35)]"
            >
              <Page
                pageNumber={index + 1}
                width={pageWidth}
                devicePixelRatio={pagePixelRatio}
                renderTextLayer={false}
                renderAnnotationLayer={false}
              />
            </div>
          ))}
        </Document>

        {numPages > 0 && pagesToRender < numPages && (
          <div className="mt-2 mb-1 rounded-xl border border-gray-200 dark:border-gray-800 bg-white/85 dark:bg-gray-900/80 px-3 py-2.5">
            <div className="flex items-center justify-between gap-2">
              <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-gray-600 dark:text-gray-300">
                Showing {pagesToRender} / {numPages} pages
              </p>
              <button
                type="button"
                onClick={loadMorePages}
                className="inline-flex items-center justify-center h-8 px-3 rounded-lg bg-gradient-to-r from-emerald-700 to-teal-700 text-white text-[10px] font-semibold uppercase tracking-[0.08em]"
              >
                Load More
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MobilePdfScrollPreview;


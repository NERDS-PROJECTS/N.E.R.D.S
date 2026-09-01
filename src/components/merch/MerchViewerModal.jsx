import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { resetViewerCamera } from './Merch3DViewer';

const useReducedMotion = () => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

export default function MerchViewerModal({
  isOpen,
  onClose,
  productName,
  children,
}) {
  const modalRef = useRef(null);
  const reduceMotion = useReducedMotion();

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleReset = () => {
    resetViewerCamera();
  };

  // ---------------------------------------------------------
  // Disable background scrolling while modal is open
  // ---------------------------------------------------------
  useEffect(() => {
    if (!isOpen) return;

    const body = document.body;
    const html = document.documentElement;

    // Save current page state
    const scrollY = window.scrollY;

    const originalBodyOverflow = body.style.overflow;
    const originalBodyPosition = body.style.position;
    const originalBodyTop = body.style.top;
    const originalBodyWidth = body.style.width;
    const originalHtmlOverflow = html.style.overflow;

    // Prevent the page behind the modal from scrolling
    html.style.overflow = 'hidden';

    body.style.overflow = 'hidden';
    body.style.position = 'fixed';
    body.style.top = `-${scrollY}px`;
    body.style.width = '100%';

    // Prevent wheel scrolling from reaching the background
    const preventWheel = (e) => {
      if (!modalRef.current?.contains(e.target)) {
        e.preventDefault();
      }
    };

    // Prevent touch scrolling from reaching the background
    const preventTouchMove = (e) => {
      if (!modalRef.current?.contains(e.target)) {
        e.preventDefault();
      }
    };

    document.addEventListener('wheel', preventWheel, {
      passive: false,
    });

    document.addEventListener('touchmove', preventTouchMove, {
      passive: false,
    });

    // Escape key
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    // Focus modal
    const focusTimer = setTimeout(() => {
      if (modalRef.current) {
        modalRef.current.focus();
      }
    }, 50);

    // -------------------------------------------------------
    // Cleanup
    // -------------------------------------------------------
    return () => {
      clearTimeout(focusTimer);

      document.removeEventListener('keydown', handleKeyDown);

      document.removeEventListener('wheel', preventWheel);

      document.removeEventListener('touchmove', preventTouchMove);

      // Restore original styles
      html.style.overflow = originalHtmlOverflow;

      body.style.overflow = originalBodyOverflow;
      body.style.position = originalBodyPosition;
      body.style.top = originalBodyTop;
      body.style.width = originalBodyWidth;

      // Restore exact scroll position
      window.scrollTo(0, scrollY);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen && modalRef.current) {
      modalRef.current.focus();
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-[9999] overflow-hidden flex items-center justify-center"
          style={{
            touchAction: 'none',
          }}
        >
          {/* Background overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: reduceMotion ? 0 : 0.2,
            }}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={handleOverlayClick}
            aria-hidden="true"
            style={{
              touchAction: 'none',
            }}
          />

          {/* Modal */}
          <motion.div
            ref={modalRef}
            tabIndex={-1}
            initial={
              reduceMotion
                ? undefined
                : {
                    opacity: 0,
                    scale: 0.95,
                    y: 20,
                  }
            }
            animate={
              reduceMotion
                ? undefined
                : {
                    opacity: 1,
                    scale: 1,
                    y: 0,
                  }
            }
            exit={
              reduceMotion
                ? undefined
                : {
                    opacity: 0,
                    scale: 0.95,
                    y: 20,
                  }
            }
            transition={{
              duration: reduceMotion ? 0 : 0.25,
              ease: 'easeOut',
            }}
            className="relative z-[10000] w-[90vw] max-w-4xl h-[80vh] max-h-[700px] rounded-2xl border border-white/10 bg-gray-950 overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-950"
            role="dialog"
            aria-modal="true"
            aria-label={`3D Viewer - ${productName}`}
            style={{
              touchAction: 'none',
            }}
          >
            {/* Header */}
            <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between p-4 bg-gradient-to-b from-gray-950 via-gray-950/80 to-transparent">
              <h2 className="text-white font-orbitron text-sm tracking-wider">
                {productName}
              </h2>

              <div className="flex items-center gap-2">
                {/* Reset button */}
                <button
                  onClick={handleReset}
                  className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 transition-all duration-200 hover:bg-white/10 hover:text-white hover:border-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-950"
                  aria-label="Reset camera view"
                  title="Reset view"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    />
                  </svg>
                </button>

                {/* Close button */}
                <button
                  onClick={onClose}
                  className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 transition-all duration-200 hover:bg-white/10 hover:text-white hover:border-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-950"
                  aria-label="Close 3D viewer"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {/* 3D Viewer */}
            <div
              className="w-full h-full"
              style={{
                touchAction: 'none',
              }}
            >
              {children}
            </div>

            {/* Bottom instruction */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
              <div className="px-4 py-2 rounded-full bg-black/60 backdrop-blur-sm border border-white/5">
                <span className="text-gray-400 text-xs font-orbitron tracking-wider">
                  DRAG TO ROTATE
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { resetViewerCamera } from './Merch3DViewer';

const useReducedMotion = () => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

export default function MerchViewerModal({ isOpen, onClose, productName, children }) {
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

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

        if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
      // Focus the modal for keyboard accessibility
      setTimeout(() => {
        if (modalRef.current) {
          modalRef.current.focus();
        }
      }, 50);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
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
        <div className="fixed inset-0 z-[100] flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
                        transition={{ duration: reduceMotion ? 0 : 0.2 }}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={handleOverlayClick}
            aria-hidden="true"
          />

          <motion.div
            ref={modalRef}
            tabIndex={-1}
                        initial={reduceMotion ? undefined : { opacity: 0, scale: 0.95, y: 20 }}
            animate={reduceMotion ? undefined : { opacity: 1, scale: 1, y: 0 }}
            exit={reduceMotion ? undefined : { opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: reduceMotion ? 0 : 0.25, ease: 'easeOut' }}
            className="relative z-10 w-[90vw] max-w-4xl h-[80vh] max-h-[700px] rounded-2xl border border-white/10 bg-gray-950 overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-950"
            role="dialog"
            aria-modal="true"
            aria-label={`3D Viewer - ${productName}`}
          >
            <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between p-4 bg-gradient-to-b from-gray-950 via-gray-950/80 to-transparent">
              <h2 className="text-white font-orbitron text-sm tracking-wider">
                {productName}
              </h2>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleReset}
                  className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 transition-all duration-200 hover:bg-white/10 hover:text-white hover:border-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-950"
                  aria-label="Reset camera view"
                  title="Reset view"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                </button>
                <button
                  onClick={onClose}
                  className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 transition-all duration-200 hover:bg-white/10 hover:text-white hover:border-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-950"
                  aria-label="Close 3D viewer"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="w-full h-full">
              {children}
            </div>

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20">
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

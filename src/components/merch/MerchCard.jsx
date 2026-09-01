import { useState, lazy, Suspense } from 'react';
import { motion } from 'framer-motion';
import { ProductPreviewWithModel, ProductPreviewUpcoming, UpcomingBadge, ArchivedBadge } from './MerchCardParts';

const Merch3DViewer = lazy(() => import('./Merch3DViewer'));
const MerchViewerModal = lazy(() => import('./MerchViewerModal'));

export default function MerchCard({ product, index = 0 }) {
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const hasModel = product.model !== null;

  const handleOpenViewer = () => {
    if (hasModel) {
      setIsViewerOpen(true);
    }
  };

  const handleCloseViewer = () => {
    setIsViewerOpen(false);
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1, ease: 'easeOut' }}
        className="group relative flex flex-col rounded-2xl border border-white/5 bg-gray-950/60 backdrop-blur-sm overflow-hidden transition-all duration-300 hover:border-white/10 hover:shadow-lg hover:shadow-cyan-500/5"
      >
        <div className="relative aspect-[4/5] w-full overflow-hidden bg-gradient-to-b from-gray-900 to-gray-950">
          {hasModel ? (
            <ProductPreviewWithModel product={product} />
          ) : (
            <ProductPreviewUpcoming product={product} />
          )}

          {product.status === 'upcoming' && <UpcomingBadge />}
          {product.status === 'archived' && <ArchivedBadge year={product.year} />}
        </div>

        <div className="flex flex-col gap-3 p-5 border-t border-white/5">
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-white font-spaced text-lg leading-tight">
              {product.name}
            </h3>
          </div>

          {product.specs && product.specs.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {product.specs.map((spec) => (
                <span
                  key={spec}
                  className="px-2 py-0.5 rounded bg-white/5 text-gray-400 text-xs font-orbitron"
                >
                  {spec}
                </span>
              ))}
            </div>
          )}

          {product.designer && (
            <p className="text-gray-500 text-sm">
              Designer: <span className="text-gray-400">{product.designer}</span>
            </p>
          )}

          {product.colors && product.colors.length > 0 && (
            <div className="flex items-center gap-2">
              <span className="text-gray-500 text-xs font-orbitron">Colors:</span>
              <div className="flex gap-1.5">
                {product.colors.map((color) => (
                  <span
                    key={color}
                    className="px-2 py-0.5 rounded bg-white/5 text-gray-400 text-xs"
                  >
                    {color}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="mt-2">
            {hasModel ? (
              <button
                onClick={handleOpenViewer}
                className="w-full py-2.5 rounded-xl bg-white/5 border border-white/10 text-cyan-400 font-orbitron text-sm tracking-wider transition-all duration-200 hover:bg-cyan-500/10 hover:border-cyan-500/30 hover:text-cyan-300 active:scale-[0.98]"
                aria-label={`View 3D model of ${product.name}`}
              >
                View 3D
              </button>
            ) : (
              <button
                disabled
                className="w-full py-2.5 rounded-xl bg-white/[0.02] border border-white/5 text-gray-600 font-orbitron text-sm tracking-wider cursor-not-allowed"
                aria-label={`${product.name} - Coming Soon`}
              >
                STAY TUNED!
              </button>
            )}
          </div>
        </div>
      </motion.div>

      {isViewerOpen && hasModel && (
        <Suspense fallback={null}>
          <MerchViewerModal
            isOpen={isViewerOpen}
            onClose={handleCloseViewer}
            productName={product.name}
          >
            <Merch3DViewer model={product.model} />
          </MerchViewerModal>
        </Suspense>
      )}
    </>
  );
}

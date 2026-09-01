/**
 * Premium card-level preview for products with a 3D model.
 *
 * The card only shows the thumbnail.
 * The actual GLB is loaded separately by Merch3DViewer when
 * the user clicks "View 3D".
 */
export function ProductPreviewWithModel({ product }) {
  return (
    <div className="relative w-full h-full overflow-hidden bg-gray-950">

      {/* Thumbnail */}
      {product.thumbnail ? (
        <img
          src={product.thumbnail}
          alt={product.name}
          className="absolute inset-0 w-full h-full object-cover"
          draggable={false}
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-gray-500 font-orbitron text-xs tracking-widest">
            PREVIEW UNAVAILABLE
          </span>
        </div>
      )}

      {/* Top black gradient */}
      <div
        className="absolute top-0 left-0 right-0 h-16 pointer-events-none"
        style={{
          background:
            'linear-gradient(to bottom, rgba(0,0,0,0.55), rgba(0,0,0,0))',
        }}
      />

      {/* Bottom black gradient */}
      <div
        className="absolute bottom-0 left-0 right-0 h-20 pointer-events-none"
        style={{
          background:
            'linear-gradient(to top, rgba(0,0,0,0.65), rgba(0,0,0,0))',
        }}
      />

      {/* Subtle cyan glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-3/4 h-3/4 rounded-full bg-cyan-500/5 blur-[60px]" />
      </div>
    </div>
  );
}


/**
 * Premium card-level preview for upcoming products.
 *
 * IMPORTANT:
 * This component NEVER loads the 3D model.
 * It only displays the thumbnail.
 *
 * Add a thumbnail to the product data and it will automatically
 * appear here.
 */
export function ProductPreviewUpcoming({ product }) {
  return (
    <div className="relative w-full h-full overflow-hidden bg-gray-950">

      {/* Thumbnail */}
      {product?.thumbnail ? (
        <img
          src={product.thumbnail}
          alt={product.name}
          className="absolute inset-0 w-full h-full object-cover"
          draggable={false}
        />
      ) : (
        /* Placeholder when no thumbnail has been added yet */
        <div className="absolute inset-0 flex flex-col items-center justify-center">

          {/* Glow behind icon */}
          <div className="absolute w-32 h-32 rounded-full bg-cyan-500/5 blur-[45px]" />

          {/* Dashed circle */}
          <div className="relative w-24 h-24 rounded-full border-2 border-dashed border-gray-700/50 flex items-center justify-center">

            <svg
              className="w-10 h-10 text-gray-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6v6l4 2m6-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>

          </div>

          <span className="relative mt-5 text-gray-500 font-orbitron text-xs tracking-widest uppercase">
            Coming Soon
          </span>

        </div>
      )}

      {/* Top black gradient */}
      <div
        className="absolute top-0 left-0 right-0 h-16 pointer-events-none"
        style={{
          background:
            'linear-gradient(to bottom, rgba(0,0,0,0.55), rgba(0,0,0,0))',
        }}
      />

      {/* Bottom black gradient */}
      <div
        className="absolute bottom-0 left-0 right-0 h-20 pointer-events-none"
        style={{
          background:
            'linear-gradient(to top, rgba(0,0,0,0.65), rgba(0,0,0,0))',
        }}
      />

      {/* Subtle cyan glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-3/4 h-3/4 rounded-full bg-cyan-500/5 blur-[60px]" />
      </div>

    </div>
  );
}


/**
 * Upcoming badge
 */
export function UpcomingBadge() {
  return (
    <div className="absolute top-4 right-4 z-20">
      <span className="px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-cyan-500/20 text-cyan-400 text-xs font-orbitron tracking-wider shadow-[0_4px_20px_rgba(0,0,0,0.35)]">
        COMING SOON
      </span>
    </div>
  );
}


/**
 * Archived badge
 */
export function ArchivedBadge({ year }) {
  return (
    <div className="absolute top-4 left-4 z-20">
      <span className="inline-flex items-center px-3 py-1.5 rounded-full bg-black/70 backdrop-blur-md border border-white/15 text-white/90 text-xs font-orbitron tracking-wider shadow-[0_4px_20px_rgba(0,0,0,0.35)]">
        {year} COLLECTION
      </span>
    </div>
  );
}
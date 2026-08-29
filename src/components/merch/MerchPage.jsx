import { motion } from 'framer-motion';
import MerchGrid from './MerchGrid';
import {
  getArchivedProducts,
  getUpcomingProducts,
} from '../../data/merchProducts';

export default function MerchPage() {
  const archivedProducts = getArchivedProducts();
  const upcomingProducts = getUpcomingProducts();

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Grid background */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke='white'%3e%3cpath d='M0 .5H31.5V32'/%3e%3c/svg%3e")`,
            backgroundSize: '32px 32px',
          }}
        />

        {/* Subtle gradient */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-cyan-500/[0.03] rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">

        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="text-center mb-16 md:mb-24"
        >
          <h1 className="font-ethenocentric text-4xl md:text-5xl lg:text-6xl text-white mb-4">
            N<span className="text-cyan-400">.</span>
            E<span className="text-cyan-400">.</span>
            R<span className="text-cyan-400">.</span>
            D<span className="text-cyan-400">.</span>
            S<span className="text-cyan-400">.</span>{' '}
            MERCH
          </h1>

          <p className="text-gray-400 font-orbitron text-sm md:text-base tracking-wider max-w-xl mx-auto">
            Premium apparel designed for makers, coders, and dreamers
          </p>
        </motion.div>

        {/* =====================================================
            2026 COLLECTION
            ===================================================== */}
        <MerchGrid
          products={upcomingProducts}
          title="2026 Collection"
          subtitle="Releasing Soon"
        />

        {/* Divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent my-16 md:my-24" />

        {/* =====================================================
            PAST COLLECTION
            ===================================================== */}
        <MerchGrid
          products={archivedProducts}
          title="Past Collection"
          subtitle="2025 Archive"
        />

        {/* Bottom spacing */}
        <div className="h-16" />
      </div>
    </div>
  );
}
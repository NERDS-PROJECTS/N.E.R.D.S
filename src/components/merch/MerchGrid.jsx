import { motion } from 'framer-motion';
import MerchCard from './MerchCard';

export default function MerchGrid({ products, title, subtitle }) {
  if (products.length === 0) return null;

  return (
    <section className="w-full">
      {title && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5 }}
          className="mb-8 md:mb-12"
        >
          <h2 className="text-white font-ethenocentric text-2xl md:text-3xl lg:text-4xl">
            {title}
          </h2>
          {subtitle && (
            <p className="mt-2 text-gray-400 font-orbitron text-sm tracking-wider">
              {subtitle}
            </p>
          )}
        </motion.div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {products.map((product, index) => (
          <MerchCard key={product.id} product={product} index={index} />
        ))}
      </div>
    </section>
  );
}

import { useState } from 'react';
import { Link } from 'react-router';
import { motion } from 'framer-motion';
import { Money } from '@shopify/hydrogen';
import { AddToCartButton } from '~/components/AddToCartButton';

export function ProductCard({ product, index }) {
  const [isHovered, setIsHovered] = useState(false);
  const image = product.featuredImage;
  const price = product.priceRange?.minVariantPrice;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative glass-card rounded-2xl overflow-hidden transition-all duration-500 hover:border-cyber-accent/30">
        {/* Product Image Container */}
        <Link
          to={`/products/${product.handle}`}
          className="block relative aspect-[4/5] overflow-hidden bg-cyber-darker"
        >
          {image && (
            <img
              src={image.url}
              alt={image.altText || product.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              loading="lazy"
            />
          )}

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-cyber-dark via-transparent to-transparent opacity-60" />

          {/* Holographic Border Effect on Hover */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
            <div className="absolute inset-0 holographic-border rounded-2xl" />
          </div>
        </Link>

        {/* Content */}
        <div className="relative p-6">
          <Link to={`/products/${product.handle}`}>
            <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-cyber-accent transition-colors">
              {product.title}
            </h3>
          </Link>

          {price && (
            <div className="flex items-baseline gap-2 mb-4">
              <Money
                data={price}
                className="text-xl font-bold gradient-text"
              />
            </div>
          )}

          {/* Add to Cart Button */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
            transition={{ duration: 0.3 }}
          >
            <AddToCartButton
              lines={[{
                merchandiseId: product.id,
                quantity: 1,
              }]}
              className="w-full py-3 px-6 bg-cyber-accent/10 border border-cyber-accent/30 text-cyber-accent rounded-lg font-medium hover:bg-cyber-accent hover:text-black transition-all duration-300"
            >
              <span className="flex items-center justify-center gap-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <path d="M16 10a4 4 0 0 1-8 0" />
                </svg>
                Add to Cart
              </span>
            </AddToCartButton>
          </motion.div>
        </div>

        {/* Floating Badge */}
        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="glass px-3 py-1.5 rounded-full text-xs font-mono tracking-wider text-cyber-accent">
            NEW
          </div>
        </div>
      </div>
    </motion.div>
  );
}

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useFetcher } from 'react-router';
import { Link } from 'react-router';
import { useAside } from '~/components/Aside';
import { Money } from '@shopify/hydrogen';

export function CyberSearch() {
  const { close } = useAside();
  const fetcher = useFetcher({ key: 'search' });
  const inputRef = useRef(null);
  const [query, setQuery] = useState('');

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    if (query.length > 2) {
      void fetcher.submit(
        { q: query, limit: 8, predictive: true },
        { method: 'GET', action: '/search' }
      );
    }
  }, [query]);

  const articles = fetcher?.data?.result?.items?.articles || [];
  const collections = fetcher?.data?.result?.items?.collections || [];
  const products = fetcher?.data?.result?.items?.products || [];
  const pages = fetcher?.data?.result?.items?.pages || [];

  const hasResults = products.length > 0 || collections.length > 0 || articles.length > 0 || pages.length > 0;

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold gradient-text">Search</h2>
          <button
            onClick={close}
            className="w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-white/10 transition-colors"
            aria-label="Close search"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Search Input */}
        <div className="relative">
          <input
            ref={inputRef}
            type="search"
            placeholder="Search products..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-cyber-accent transition-all"
          />
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
            {fetcher.state === 'loading' ? (
              <div className="w-5 h-5 border-2 border-cyber-accent border-t-transparent rounded-full animate-spin" />
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white/40">
                <circle cx="11" cy="11" r="8" />
                <path d="M21 21l-4.35-4.35" />
              </svg>
            )}
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="flex-1 overflow-y-auto">
        <AnimatePresence mode="wait">
          {query.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-12"
            >
              <div className="w-20 h-20 mx-auto mb-4 rounded-full glass flex items-center justify-center">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-white/40">
                  <circle cx="11" cy="11" r="8" />
                  <path d="M21 21l-4.35-4.35" />
                </svg>
              </div>
              <p className="text-white/60">Start typing to search...</p>
              <p className="text-white/40 text-sm mt-2">Find products, collections, and more</p>
            </motion.div>
          ) : query.length > 0 && query.length <= 2 ? (
            <motion.div
              key="min-chars"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-12"
            >
              <p className="text-white/60">Type at least 3 characters...</p>
            </motion.div>
          ) : !hasResults ? (
            <motion.div
              key="no-results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-12"
            >
              <p className="text-white/60 mb-2">No results found for</p>
              <p className="text-cyber-accent font-semibold">"{query}"</p>
            </motion.div>
          ) : (
            <motion.div
              key="results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0}}
              className="space-y-6"
            >
              {/* Products */}
              {products.length > 0 && (
                <div>
                  <h3 className="text-xs font-semibold text-white/60 uppercase tracking-wider mb-3">
                    Products
                  </h3>
                  <div className="space-y-2">
                    {products.slice(0, 6).map((product) => (
                      <Link
                        key={product.id}
                        to={`/products/${product.handle}`}
                        onClick={close}
                        className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors group"
                      >
                        <div className="w-12 h-12 rounded-lg overflow-hidden bg-cyber-darker flex-shrink-0">
                          {product.selectedOrFirstAvailableVariant?.image && (
                            <img
                              src={product.selectedOrFirstAvailableVariant.image.url}
                              alt={product.title}
                              className="w-full h-full object-cover"
                            />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-white text-sm font-medium truncate group-hover:text-cyber-accent transition-colors">
                            {product.title}
                          </p>
                          {product.selectedOrFirstAvailableVariant?.price && (
                            <p className="text-white/40 text-xs mt-0.5">
                              <Money data={product.selectedOrFirstAvailableVariant.price} />
                            </p>
                          )}
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Collections */}
              {collections.length > 0 && (
                <div>
                  <h3 className="text-xs font-semibold text-white/60 uppercase tracking-wider mb-3">
                    Collections
                  </h3>
                  <div className="space-y-2">
                    {collections.slice(0, 3).map((collection) => (
                      <Link
                        key={collection.id}
                        to={`/collections/${collection.handle}`}
                        onClick={close}
                        className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors"
                      >
                        <div className="w-12 h-12 rounded-lg overflow-hidden bg-cyber-darker flex-shrink-0">
                          {collection.image && (
                            <img
                              src={collection.image.url}
                              alt={collection.title}
                              className="w-full h-full object-cover"
                            />
                          )}
                        </div>
                        <p className="text-white text-sm font-medium">
                          {collection.title}
                        </p>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* View All Results */}
              <Link
                to={`/search?q=${encodeURIComponent(query)}`}
                onClick={close}
                className="block w-full py-3 text-center text-cyber-accent hover:underline text-sm font-medium"
              >
                View all results
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

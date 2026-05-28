import { Await, useLoaderData, Link } from 'react-router';
import { Suspense } from 'react';
import { motion } from 'framer-motion';
import { CyberHero } from '~/components/cyber/CyberHero';
import { ProductCard } from '~/components/cyber/ProductCard';
import { Image } from '@shopify/hydrogen';

export const meta = () => {
  return [{ title: 'CyberFinds | Future of E-Commerce' }];
};

export async function loader(args) {
  const deferredData = loadDeferredData(args);
  const criticalData = await loadCriticalData(args);

  return { ...deferredData, ...criticalData };
}

async function loadCriticalData({ context }) {
  const [{ collections }] = await Promise.all([
    context.storefront.query(FEATURED_COLLECTION_QUERY),
  ]);

  return {
    featuredCollection: collections.nodes[0],
  };
}

function loadDeferredData({ context }) {
  const recommendedProducts = context.storefront
    .query(RECOMMENDED_PRODUCTS_QUERY)
    .catch((error) => {
      console.error(error);
      return null;
    });

  return {
    recommendedProducts,
  };
}

export default function Homepage() {
  const data = useLoaderData();

  return (
    <div className="relative">
      {/* Hero Section */}
      <CyberHero />

      {/* Featured Collection */}
      <section className="relative py-32 px-6">
        <div className="max-w-[1600px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="mb-16"
          >
            <span className="text-cyber-accent text-sm font-mono tracking-wider">FEATURED</span>
            <h2 className="text-4xl md:text-6xl font-bold text-white mt-4">
              {data.featuredCollection?.title || 'Premium Collection'}
            </h2>
            <p className="text-white/60 text-lg mt-4 max-w-2xl">
              Explore our curated selection of premium products designed for the future.
            </p>
          </motion.div>

          {data.featuredCollection && (
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <Link
                to={`/collections/${data.featuredCollection.handle}`}
                className="group relative block h-[600px] rounded-2xl overflow-hidden glass-card"
              >
                {data.featuredCollection.image && (
                  <div className="absolute inset-0">
                    <Image
                      data={data.featuredCollection.image}
                      sizes="(min-width: 45em) 100vw, 100vw"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-cyber-dark via-cyber-dark/50 to-transparent" />
                  </div>
                )}
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <span className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full text-cyber-accent text-sm font-medium mb-4">
                    <span className="w-2 h-2 bg-cyber-accent rounded-full" />
                    Featured
                  </span>
                  <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
                    {data.featuredCollection.title}
                  </h3>
                  <div className="flex items-center gap-3 text-white group-hover:text-cyber-accent transition-colors">
                    <span className="font-medium">Explore Collection</span>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="transform group-hover:translate-x-2 transition-transform">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>
            </motion.div>
          )}
        </div>
      </section>

      {/* Recommended Products */}
      <section className="relative py-32 px-6 bg-cyber-darker">
        <div className="max-w-[1600px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="mb-16 text-center"
          >
            <span className="text-cyber-accent text-sm font-mono tracking-wider">DISCOVER</span>
            <h2 className="text-4xl md:text-6xl font-bold text-white mt-4">
              Recommended for You
            </h2>
          </motion.div>

          <Suspense
            fallback={
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[0, 1, 2, 3].map((i) => (
                  <div key={i} className="aspect-[4/5] rounded-2xl glass-card shimmer" />
                ))}
              </div>
            }
          >
            <Await resolve={data.recommendedProducts}>
              {(response) => (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {response?.products?.nodes?.map((product, index) => (
                    <ProductCard key={product.id} product={product} index={index} />
                  ))}
                </div>
              )}
            </Await>
          </Suspense>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link
              to="/collections/all"
              className="inline-flex items-center gap-2 px-8 py-4 glass border border-white/20 rounded-full text-white hover:border-cyber-accent hover:text-cyber-accent transition-all duration-300"
            >
              <span className="font-medium">View All Products</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative py-32 px-6">
        <div className="max-w-[1600px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-bold text-white">
              Why <span className="gradient-text">CyberFinds</span>?
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: '⚡', title: 'Fast Shipping', desc: 'Worldwide delivery within 3-5 days' },
              { icon: '💎', title: 'Premium Quality', desc: 'Curated products from top brands' },
              { icon: '🔒', title: 'Secure Checkout', desc: '256-bit SSL encryption on all transactions' },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="glass-card p-8 rounded-2xl text-center hover:border-cyber-accent/30 transition-all duration-300"
              >
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-white/60">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-32 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="glass p-12 md:p-20 rounded-3xl holographic-border"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Ready to Experience the Future?
            </h2>
            <p className="text-white/60 text-lg mb-8 max-w-2xl mx-auto">
              Join thousands of customers who have elevated their lifestyle with CyberFinds premium products.
            </p>
            <Link
              to="/collections"
              className="inline-flex items-center px-8 py-4 bg-cyber-accent text-black font-semibold rounded-full hover:bg-white transition-colors"
            >
              <span>Start Shopping</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="ml-2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

const FEATURED_COLLECTION_QUERY = `#graphql
  fragment FeaturedCollection on Collection {
    id
    title
    handle
    image {
      id
      url
      altText
      width
      height
    }
  }
  query FeaturedCollection($country: CountryCode, $language: LanguageCode)
    @inContext(country: $country, language: $language) {
    collections(first: 1, sortKey: UPDATED_AT, reverse: true) {
      nodes {
        ...FeaturedCollection
      }
    }
  }
`;

const RECOMMENDED_PRODUCTS_QUERY = `#graphql
  fragment RecommendedProduct on Product {
    id
    title
    handle
    priceRange {
      minVariantPrice {
        amount
        currencyCode
      }
    }
    featuredImage {
      id
      url
      altText
      width
      height
    }
  }
  query RecommendedProducts($country: CountryCode, $language: LanguageCode)
    @inContext(country: $country, language: $language) {
    products(first: 8, sortKey: UPDATED_AT, reverse: true) {
      nodes {
        ...RecommendedProduct
      }
    }
  }
`;

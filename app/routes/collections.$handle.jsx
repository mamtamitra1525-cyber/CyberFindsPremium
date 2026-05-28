import { redirect, useLoaderData } from 'react-router';
import { getPaginationVariables, Analytics, Image } from '@shopify/hydrogen';
import { motion } from 'framer-motion';
import { redirectIfHandleIsLocalized } from '~/lib/redirect';
import { ProductCard } from '~/components/cyber/ProductCard';

export const meta = ({ data }) => {
  return [{ title: `CyberFinds | ${data?.collection?.title ?? 'Collection'}` }];
};

export async function loader(args) {
  const deferredData = loadDeferredData(args);
  const criticalData = await loadCriticalData(args);

  return { ...deferredData, ...criticalData };
}

async function loadCriticalData({ context, params, request }) {
  const { handle } = params;
  const { storefront } = context;
  const paginationVariables = getPaginationVariables(request, {
    pageBy: 12,
  });

  if (!handle) {
    throw redirect('/collections');
  }

  const [{ collection }] = await Promise.all([
    storefront.query(COLLECTION_QUERY, {
      variables: { handle, ...paginationVariables },
    }),
  ]);

  if (!collection) {
    throw new Response(`Collection ${handle} not found`, {
      status: 404,
    });
  }

  redirectIfHandleIsLocalized(request, { handle, data: collection });

  return { collection };
}

function loadDeferredData({ context }) {
  return {};
}

export default function CollectionRoute() {
  const { collection } = useLoaderData();
  const products = collection.products?.nodes || [];

  return (
    <div className="min-h-screen pt-[72px]">
      {/* Hero Section */}
      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden">
        {collection.image && (
          <div className="absolute inset-0">
            <Image
              data={collection.image}
              sizes="100vw"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-cyber-dark via-cyber-dark/70 to-transparent" />
          </div>
        )}

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-cyber-accent text-sm font-mono tracking-wider">
              COLLECTION
            </span>
            <h1 className="text-4xl md:text-6xl font-bold text-white mt-4">
              {collection.title}
            </h1>
            {collection.description && (
              <p className="text-white/60 text-lg mt-4 max-w-2xl mx-auto">
                {collection.description}
              </p>
            )}
          </motion.div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="relative py-16 px-6">
        <div className="max-w-[1600px] mx-auto">
          {products.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {products.map((product, index) => (
                  <ProductCard key={product.id} product={product} index={index} />
                ))}
              </div>

              <Analytics.CollectionView
                data={{
                  collection: {
                    id: collection.id,
                    handle: collection.handle,
                  },
                }}
              />
            </>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-32"
            >
              <div className="w-24 h-24 mx-auto mb-6 rounded-full glass flex items-center justify-center">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-white/40">
                  <circle cx="9" cy="21" r="1" />
                  <circle cx="20" cy="21" r="1" />
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">No products yet</h2>
              <p className="text-white/60 mb-8">Check back soon for new arrivals</p>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
}

const COLLECTION_QUERY = `#graphql
  fragment CollectionProduct on Product {
    id
    handle
    title
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
  query Collection(
    $handle: String!
    $country: CountryCode
    $language: LanguageCode
    $first: Int
    $last: Int
    $startCursor: String
    $endCursor: String
  ) @inContext(country: $country, language: $language) {
    collection(handle: $handle) {
      id
      handle
      title
      description
      image {
        id
        url
        altText
        width
        height
      }
      products(
        first: $first,
        last: $last,
        before: $startCursor,
        after: $endCursor
      ) {
        nodes {
          ...CollectionProduct
        }
        pageInfo {
          hasPreviousPage
          hasNextPage
          endCursor
          startCursor
        }
      }
    }
  }
`;

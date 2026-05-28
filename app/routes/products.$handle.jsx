import { useLoaderData } from 'react-router';
import {
  getSelectedProductOptions,
  Analytics,
  useOptimisticVariant,
  getProductOptions,
  getAdjacentAndFirstAvailableVariants,
  useSelectedOptionInUrlParam,
  Money,
  Image,
} from '@shopify/hydrogen';
import { motion } from 'framer-motion';
import { redirectIfHandleIsLocalized } from '~/lib/redirect';
import { AddToCartButton } from '~/components/AddToCartButton';

export const meta = ({ data }) => {
  return [
    { title: `CyberFinds | ${data?.product?.title ?? 'Product'}` },
    {
      rel: 'canonical',
      href: `/products/${data?.product?.handle}`,
    },
  ];
};

export async function loader(args) {
  const deferredData = loadDeferredData(args);
  const criticalData = await loadCriticalData(args);

  return { ...deferredData, ...criticalData };
}

async function loadCriticalData({ context, params, request }) {
  const { handle } = params;
  const { storefront } = context;

  if (!handle) {
    throw new Error('Expected product handle to be defined');
  }

  const [{ product }] = await Promise.all([
    storefront.query(PRODUCT_QUERY, {
      variables: { handle, selectedOptions: getSelectedProductOptions(request) },
    }),
  ]);

  if (!product?.id) {
    throw new Response(null, { status: 404 });
  }

  redirectIfHandleIsLocalized(request, { handle, data: product });

  return { product };
}

function loadDeferredData({ context, params }) {
  return {};
}

export default function ProductRoute() {
  const { product } = useLoaderData();

  const selectedVariant = useOptimisticVariant(
    product.selectedOrFirstAvailableVariant,
    getAdjacentAndFirstAvailableVariants(product)
  );

  useSelectedOptionInUrlParam(selectedVariant.selectedOptions);

  const productOptions = getProductOptions({
    ...product,
    selectedOrFirstAvailableVariant: selectedVariant,
  });

  return (
    <div className="min-h-screen pt-[72px]">
      <div className="max-w-[1600px] mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Product Image */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="sticky top-32">
              {selectedVariant?.image ? (
                <div className="relative aspect-square rounded-2xl overflow-hidden glass-card">
                  <Image
                    data={selectedVariant.image}
                    sizes="(min-width: 45em) 50vw, 100vw"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-cyber-dark/30 to-transparent pointer-events-none" />
                </div>
              ) : (
                <div className="aspect-square rounded-2xl glass-card flex items-center justify-center">
                  <p className="text-white/40">No image available</p>
                </div>
              )}
            </div>
          </motion.div>

          {/* Product Details */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col"
          >
            {/* Title & Price */}
            <div className="mb-8">
              <span className="text-cyber-accent text-sm font-mono tracking-wider">
                PREMIUM QUALITY
              </span>
              <h1 className="text-3xl md:text-5xl font-bold text-white mt-2 mb-6">
                {product.title}
              </h1>

              <div className="flex items-baseline gap-3 mb-4">
                {selectedVariant?.price && (
                  <Money
                    data={selectedVariant.price}
                    className="text-3xl font-bold gradient-text"
                  />
                )}
                {selectedVariant?.compareAtPrice && (
                  <Money
                    data={selectedVariant.compareAtPrice}
                    className="text-xl text-white/40 line-through"
                  />
                )}
              </div>

              {product.vendor && (
                <p className="text-white/60 text-sm">By {product.vendor}</p>
              )}
            </div>

            {/* Product Options */}
            {productOptions.length > 0 && (
              <div className="mb-8">
                {productOptions.map((option) => {
                  if (option.optionValues.length === 0) return null;

                  return (
                    <div key={option.name} className="mb-6">
                      <h3 className="text-sm font-semibold text-white mb-3">
                        {option.name}
                      </h3>
                      <div className="flex flex-wrap gap-3">
                        {option.optionValues.map((value) => {
                          const isSelected = value.selected;
                          const isAvailable = value.available;

                          return (
                            <button
                              key={value.name}
                              type="button"
                              disabled={!isAvailable}
                              className={`
                                px-4 py-2 rounded-lg border text-sm font-medium transition-all
                                ${isSelected
                                  ? 'bg-cyber-accent text-black border-cyber-accent'
                                  : isAvailable
                                    ? 'bg-transparent text-white border-white/20 hover:border-cyber-accent hover:text-cyber-accent'
                                    : 'bg-white/5 text-white/30 border-white/10 cursor-not-allowed'}
                              `}
                            >
                              {value.name}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Add to Cart */}
            <div className="mb-8">
              <AddToCartButton
                disabled={!selectedVariant || !selectedVariant.availableForSale}
                lines={[{
                  merchandiseId: selectedVariant?.id,
                  quantity: 1,
                }]}
                className="w-full py-4 bg-gradient-to-r from-cyber-accent to-cyber-purple text-black font-semibold rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="flex items-center justify-center gap-2">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                    <line x1="3" y1="6" x2="21" y2="6" />
                    <path d="M16 10a4 4 0 0 1-8 0" />
                  </svg>
                  {!selectedVariant?.availableForSale ? 'Sold Out' : 'Add to Cart'}
                </span>
              </AddToCartButton>

              {!selectedVariant?.availableForSale && (
                <p className="text-center text-white/60 text-sm mt-3">
                  This variant is currently out of stock
                </p>
              )}
            </div>

            {/* Description */}
            {product.descriptionHtml && (
              <div className="mb-8">
                <h3 className="text-sm font-semibold text-white mb-3">
                  Description
                </h3>
                <div
                  dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
                  className="prose prose-invert prose-sm max-w-none text-white/70"
                />
              </div>
            )}

            {/* Features */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: '🚀', label: 'Fast Shipping', value: '3-5 Days' },
                { icon: '🛡️', label: 'Secure Payment', value: '256-bit SSL' },
                { icon: '↩️', label: 'Easy Returns', value: '30 Days' },
                { icon: '💎', label: 'Premium Quality', value: 'Guaranteed' },
              ].map((feature, index) => (
                <div key={index} className="glass-card p-4 rounded-lg">
                  <div className="text-2xl mb-1">{feature.icon}</div>
                  <p className="text-xs text-white/60">{feature.label}</p>
                  <p className="text-sm font-semibold text-white">{feature.value}</p>
                </div>
              ))}
            </div>

            {/* Analytics */}
            <Analytics.ProductView
              data={{
                products: [
                  {
                    id: product.id,
                    title: product.title,
                    price: selectedVariant?.price?.amount || '0',
                    vendor: product.vendor,
                    variantId: selectedVariant?.id || '',
                    variantTitle: selectedVariant?.title || '',
                    quantity: 1,
                  },
                ],
              }}
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
}

const PRODUCT_QUERY = `#graphql
  fragment ProductVariant on ProductVariant {
    availableForSale
    compareAtPrice {
      amount
      currencyCode
    }
    id
    image {
      id
      url
      altText
      width
      height
    }
    price {
      amount
      currencyCode
    }
    product {
      title
      handle
    }
    selectedOptions {
      name
      value
    }
    title
  }

  fragment Product on Product {
    id
    title
    vendor
    handle
    descriptionHtml
    description
    encodedVariantExistence
    encodedVariantAvailability
    options {
      name
      optionValues {
        name
        firstSelectableVariant {
          ...ProductVariant
        }
        swatch {
          color
          image {
            previewImage {
              url
            }
          }
        }
      }
    }
    selectedOrFirstAvailableVariant(selectedOptions: $selectedOptions, ignoreUnknownOptions: true, caseInsensitiveMatch: true) {
      ...ProductVariant
    }
    adjacentVariants(selectedOptions: $selectedOptions) {
      ...ProductVariant
    }
    seo {
      description
      title
    }
  }

  query Product(
    $country: CountryCode
    $handle: String!
    $language: LanguageCode
    $selectedOptions: [SelectedOptionInput!]!
  ) @inContext(country: $country, language: $language) {
    product(handle: $handle) {
      ...Product
    }
  }
`;

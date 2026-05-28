import { motion, AnimatePresence } from 'framer-motion';
import { useAside } from '~/components/Aside';
import { Money } from '@shopify/hydrogen';
import { CartForm } from '@shopify/hydrogen';

export function CyberCart({ cart }) {
  const { close } = useAside();
  const lines = cart?.lines?.nodes || [];
  const totalQuantity = cart?.totalQuantity || 0;
  const cost = cart?.cost;

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold gradient-text">Your Cart</h2>
          <p className="text-sm text-white/60 mt-1">{totalQuantity} items</p>
        </div>
        <button
          onClick={close}
          className="w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-white/10 transition-colors"
          aria-label="Close cart"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>

      {/* Cart Items */}
      <div className="flex-1 overflow-y-auto space-y-4 mb-6">
        <AnimatePresence>
          {lines.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <div className="w-20 h-20 mx-auto mb-4 rounded-full glass flex items-center justify-center">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-white/40">
                  <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <path d="M16 10a4 4 0 0 1-8 0" />
                </svg>
              </div>
              <p className="text-white/60 mb-4">Your cart is empty</p>
              <button
                onClick={close}
                className="text-cyber-accent hover:underline text-sm font-medium"
              >
                Continue Shopping
              </button>
            </motion.div>
          ) : (
            lines.map((line, index) => (
              <motion.div
                key={line.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="glass-card rounded-xl p-4 flex gap-4"
              >
                {/* Image */}
                <div className="w-20 h-20 rounded-lg overflow-hidden bg-cyber-darker flex-shrink-0">
                  {line.merchandise?.image && (
                    <img
                      src={line.merchandise.image.url}
                      alt={line.merchandise.image.altText || ''}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-white font-medium text-sm truncate">
                    {line.merchandise?.product?.title}
                  </h3>
                  <p className="text-white/40 text-xs mt-1 truncate">
                    {line.merchandise?.title}
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-cyber-accent text-sm font-semibold">
                      <Money data={line.cost?.totalAmount} />
                    </span>
                    <span className="text-white/40 text-xs">x{line.quantity}</span>
                  </div>
                </div>

                {/* Remove Button */}
                <CartForm
                  route="/cart"
                  action={CartForm.ACTIONS.LinesRemove}
                  inputs={{ lineIds: [line.id] }}
                >
                  <button
                    type="submit"
                    className="w-8 h-8 rounded-lg hover:bg-red-500/20 flex items-center justify-center transition-colors"
                    aria-label="Remove item"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white/40 hover:text-red-400">
                      <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" />
                    </svg>
                  </button>
                </CartForm>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>

      {/* Footer */}
      {lines.length > 0 && (
        <div className="border-t border-white/10 pt-6 space-y-4">
          {/* Subtotal */}
          <div className="flex items-center justify-between">
            <span className="text-white/60 text-sm">Subtotal</span>
            <span className="text-white font-semibold text-lg">
              <Money data={cost?.subtotalAmount} />
            </span>
          </div>

          {/* Shipping Note */}
          <p className="text-white/40 text-xs text-center">
            Shipping and taxes calculated at checkout
          </p>

          {/* Checkout Button */}
          <a
            href={cart?.checkoutUrl}
            className="block w-full py-4 bg-gradient-to-r from-cyber-accent to-cyber-purple text-black font-semibold text-center rounded-lg hover:opacity-90 transition-opacity"
          >
            Checkout
          </a>

          {/* Continue Shopping */}
          <button
            onClick={close}
            className="block w-full py-3 text-white/60 text-sm hover:text-white transition-colors"
          >
            Continue Shopping
          </button>
        </div>
      )}
    </div>
  );
}

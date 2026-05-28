import { motion } from 'framer-motion';
import { Link } from 'react-router';

export function CyberFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-cyber-darker border-t border-white/10 mt-20">
      {/* Top Section */}
      <div className="max-w-[1600px] mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-2xl font-bold mb-4">
                <span className="text-white">Cyber</span>
                <span className="gradient-text">Finds</span>
              </h2>
              <p className="text-white/60 text-sm leading-relaxed mb-6">
                The future of e-commerce. Premium products in an immersive digital experience.
              </p>
              <div className="flex space-x-4">
                {['twitter', 'instagram', 'discord'].map((social) => (
                  <a
                    key={social}
                    href={`https://${social}.com`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-lg bg-white/5 hover:bg-cyber-accent/20 border border-white/10 hover:border-cyber-accent/30 flex items-center justify-center transition-all duration-300"
                    aria-label={social}
                  >
                    <SocialIcon name={social} />
                  </a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Shop */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4 tracking-wider">SHOP</h3>
            <ul className="space-y-3">
              {[
                { label: 'All Products', to: '/collections/all' },
                { label: 'Collections', to: '/collections' },
                { label: 'New Arrivals', to: '/collections?sort=new' },
                { label: 'Best Sellers', to: '/collections?sort=popular' },
              ].map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-white/60 hover:text-cyber-accent text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4 tracking-wider">COMPANY</h3>
            <ul className="space-y-3">
              {[
                { label: 'About Us', to: '/pages/about' },
                { label: 'Journal', to: '/blogs' },
                { label: 'Careers', to: '/pages/careers' },
                { label: 'Press', to: '/pages/press' },
              ].map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-white/60 hover:text-cyber-accent text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4 tracking-wider">SUPPORT</h3>
            <ul className="space-y-3">
              {[
                { label: 'Contact', to: '/pages/contact' },
                { label: 'FAQs', to: '/pages/faq' },
                { label: 'Shipping', to: '/policies/shipping-policy' },
                { label: 'Returns', to: '/policies/refund-policy' },
              ].map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-white/60 hover:text-cyber-accent text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Newsletter */}
      <div className="border-t border-white/5">
        <div className="max-w-[1600px] mx-auto px-6 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">Stay in the loop</h3>
              <p className="text-white/60 text-sm">Subscribe for updates on new products and exclusive offers.</p>
            </div>
            <form className="flex gap-3 w-full md:w-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 md:w-80 px-6 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-cyber-accent transition-colors"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-cyber-accent text-black font-semibold rounded-lg hover:bg-white transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-white/5">
        <div className="max-w-[1600px] mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-white/40 text-sm">
              {currentYear} CyberFinds. All rights reserved.
            </p>
            <div className="flex items-center space-x-6">
              <Link to="/policies/privacy-policy" className="text-white/40 hover:text-white text-sm transition-colors">
                Privacy
              </Link>
              <Link to="/policies/terms-of-service" className="text-white/40 hover:text-white text-sm transition-colors">
                Terms
              </Link>
              <Link to="/policies/refund-policy" className="text-white/40 hover:text-white text-sm transition-colors">
                Refunds
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Glow */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-cyber-accent to-transparent opacity-50" />
    </footer>
  );
}

function SocialIcon({ name }) {
  const icons = {
    twitter: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="text-white">
        <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
      </svg>
    ),
    instagram: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    ),
    discord: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="text-white">
        <path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.031.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03z" />
      </svg>
    ),
  };

  return icons[name] || null;
}

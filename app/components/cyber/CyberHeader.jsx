import { useEffect, useRef, useState } from 'react';
import { NavLink } from 'react-router';
import { motion, AnimatePresence } from 'framer-motion';
import { useAside } from '~/components/Aside';

export function CyberHeader({ shop, isLoggedIn, cart }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { open } = useAside();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-[#0a0a0f]/80 backdrop-blur-xl border-b border-cyber-accent/20'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-[1600px] mx-auto px-6 h-[72px] flex items-center justify-between">
        {/* Logo */}
        <NavLink to="/" className="flex items-center space-x-2 group">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <h1 className="text-2xl font-bold tracking-tight">
              <span className="text-white">Cyber</span>
              <span className="gradient-text">Finds</span>
            </h1>
          </motion.div>
        </NavLink>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-8">
          <NavLink
            to="/collections"
            className="text-sm font-medium text-white/80 hover:text-cyber-accent transition-colors relative group"
          >
            Collections
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-cyber-accent group-hover:w-full transition-all duration-300" />
          </NavLink>
          <NavLink
            to="/collections/all"
            className="text-sm font-medium text-white/80 hover:text-cyber-accent transition-colors relative group"
          >
            Products
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-cyber-accent group-hover:w-full transition-all duration-300" />
          </NavLink>
          <NavLink
            to="/blogs"
            className="text-sm font-medium text-white/80 hover:text-cyber-accent transition-colors relative group"
          >
            Journal
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-cyber-accent group-hover:w-full transition-all duration-300" />
          </NavLink>
          <NavLink
            to="/policies"
            className="text-sm font-medium text-white/80 hover:text-cyber-accent transition-colors relative group"
          >
            About
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-cyber-accent group-hover:w-full transition-all duration-300" />
          </NavLink>
        </nav>

        {/* Actions */}
        <div className="flex items-center space-x-4">
          {/* Search */}
          <button
            onClick={() => open('search')}
            className="p-2 rounded-lg hover:bg-white/10 transition-colors relative group"
            aria-label="Search"
          >
            <SearchIcon />
            <span className="absolute inset-0 rounded-lg animate-pulse bg-cyber-accent/20 opacity-0 group-hover:opacity-100" />
          </button>

          {/* Account */}
          <NavLink
            to="/account"
            className="p-2 rounded-lg hover:bg-white/10 transition-colors relative group"
          >
            <UserIcon isLoggedIn={isLoggedIn} />
            <span className="absolute inset-0 rounded-lg animate-pulse bg-cyber-accent/20 opacity-0 group-hover:opacity-100" />
          </NavLink>

          {/* Cart */}
          <button
            onClick={() => open('cart')}
            className="p-2 rounded-lg hover:bg-white/10 transition-colors relative group"
            aria-label="Cart"
          >
            <CartIcon count={cart?.totalQuantity || 0} />
            <span className="absolute inset-0 rounded-lg animate-pulse bg-cyber-accent/20 opacity-0 group-hover:opacity-100" />
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
            aria-label="Menu"
          >
            <MenuIcon isOpen={menuOpen} />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-[#0a0a0f]/95 backdrop-blur-xl border-t border-cyber-accent/20"
          >
            <nav className="flex flex-col px-6 py-6 space-y-4">
              <NavLink to="/collections" className="text-lg font-medium text-white/80 hover:text-cyber-accent transition-colors">
                Collections
              </NavLink>
              <NavLink to="/collections/all" className="text-lg font-medium text-white/80 hover:text-cyber-accent transition-colors">
                Products
              </NavLink>
              <NavLink to="/blogs" className="text-lg font-medium text-white/80 hover:text-cyber-accent transition-colors">
                Journal
              </NavLink>
              <NavLink to="/policies" className="text-lg font-medium text-white/80 hover:text-cyber-accent transition-colors">
                About
              </NavLink>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

function SearchIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white">
      <circle cx="11" cy="11" r="8" />
      <path d="M21 21l-4.35-4.35" />
    </svg>
  );
}

function UserIcon({ isLoggedIn }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
      {isLoggedIn && <circle cx="18" cy="6" r="2" fill="#00f0ff" stroke="none" />}
    </svg>
  );
}

function CartIcon({ count }) {
  return (
    <div className="relative">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white">
        <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
        <line x1="3" y1="6" x2="21" y2="6" />
        <path d="M16 10a4 4 0 0 1-8 0" />
      </svg>
      {count > 0 && (
        <span className="absolute -top-2 -right-2 w-5 h-5 bg-cyber-accent text-black text-xs font-bold rounded-full flex items-center justify-center">
          {count}
        </span>
      )}
    </div>
  );
}

function MenuIcon({ isOpen }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-white">
      {isOpen ? (
        <>
          <line x1="18" y1="6" x2="6" y2="18" stroke="currentColor" strokeWidth="2" />
          <line x1="6" y1="6" x2="18" y2="18" stroke="currentColor" strokeWidth="2" />
        </>
      ) : (
        <>
          <line x1="3" y1="6" x2="21" y2="6" stroke="currentColor" strokeWidth="2" />
          <line x1="3" y1="12" x2="21" y2="12" stroke="currentColor" strokeWidth="2" />
          <line x1="3" y1="18" x2="21" y2="18" stroke="currentColor" strokeWidth="2" />
        </>
      )}
    </svg>
  );
}

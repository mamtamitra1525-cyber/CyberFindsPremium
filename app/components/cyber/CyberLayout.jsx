import { Suspense } from 'react';
import { Await } from 'react-router';
import { Aside } from '~/components/Aside';
import { CyberHeader } from '~/components/cyber/CyberHeader';
import { CyberFooter } from '~/components/cyber/CyberFooter';
import { CyberCart } from '~/components/cyber/CyberCart';
import { CyberSearch } from '~/components/cyber/CyberSearch';
import { ParticleField } from '~/components/cyber/ParticleField';

export function CyberLayout({
  children,
  cart,
  footer,
  header,
  isLoggedIn,
  publicStoreDomain,
}) {
  return (
    <Aside.Provider>
      {/* Background Particles */}
      <ParticleField />

      {/* Header */}
      {header && (
        <CyberHeader
          shop={header.shop}
          isLoggedIn={isLoggedIn}
          cart={cart}
          publicStoreDomain={publicStoreDomain}
        />
      )}

      {/* Main Content */}
      <main className="relative z-10">
        {children}
      </main>

      {/* Footer */}
      <Suspense fallback={<div className="h-96" />}>
        <Await resolve={footer}>
          {(footerData) => <CyberFooter footer={footerData} />}
        </Await>
      </Suspense>

      {/* Cart Drawer */}
      <Aside type="cart" heading="YOUR CART">
        <Suspense fallback={<CartSkeleton />}>
          <Await resolve={cart}>
            {(cartData) => <CyberCart cart={cartData} />}
          </Await>
        </Suspense>
      </Aside>

      {/* Search Drawer */}
      <Aside type="search" heading="SEARCH">
        <CyberSearch />
      </Aside>

      {/* Mobile Menu Drawer */}
      {header?.menu && (
        <Aside type="mobile" heading="MENU">
          <MobileMenu
            menu={header.menu}
            publicStoreDomain={publicStoreDomain}
          />
        </Aside>
      )}
    </Aside.Provider>
  );
}

function CartSkeleton() {
  return (
    <div className="space-y-4 p-6">
      {[0, 1, 2].map((i) => (
        <div key={i} className="animate-pulse flex gap-4">
          <div className="w-20 h-20 bg-white/10 rounded-lg" />
          <div className="flex-1 space-y-2 py-2">
            <div className="h-4 bg-white/10 rounded w-3/4" />
            <div className="h-3 bg-white/10 rounded w-1/2" />
          </div>
        </div>
      ))}
    </div>
  );
}

function MobileMenu({ menu, publicStoreDomain }) {
  const { close } = useAside();

  return (
    <nav className="flex flex-col space-y-4 p-6">
      {menu?.items?.map((item) => {
        if (!item.url) return null;

        const url = item.url.includes('myshopify.com') ||
                    item.url.includes(publicStoreDomain)
          ? new URL(item.url).pathname
          : item.url;

        const isExternal = !url.startsWith('/');

        return isExternal ? (
          <a
            key={item.id}
            href={url}
            rel="noopener noreferrer"
            target="_blank"
            onClick={close}
            className="text-lg font-medium text-white hover:text-cyber-accent transition-colors"
          >
            {item.title}
          </a>
        ) : (
          <Link
            key={item.id}
            to={url}
            onClick={close}
            className="text-lg font-medium text-white hover:text-cyber-accent transition-colors"
          >
            {item.title}
          </Link>
        );
      })}
    </nav>
  );
}

import { Link } from 'react-router';
import { useAside } from '~/components/Aside';

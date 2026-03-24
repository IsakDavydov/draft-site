'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LogoImage } from './LogoImage';
import { useState } from 'react';
import { Menu, X, Search, Zap } from 'lucide-react';
import { AuthButton } from '@/components/auth/AuthButton';
import { cn } from '@/lib/utils';

const navigation = [
  { name: 'Articles', href: '/articles' },
  { name: 'Season', href: '/season' },
  { name: 'Draft', href: '/draft' },
  { name: 'Groups', href: '/groups' },
  { name: 'Picks', href: '/picks' },
  { name: 'Fantasy', href: '/fantasy' },
];

export function SiteHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 bg-gray-950">
      {/* Red accent stripe */}
      <div className="h-[3px] bg-gradient-to-r from-nfl-blue/0 via-nfl-blue to-nfl-blue/0" />

      <nav
        className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3 lg:px-8"
        aria-label="Global"
      >
        {/* Logo */}
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5 group flex items-center gap-2.5">
            <span className="sr-only">SAKFootball</span>
            <LogoImage
              width={36}
              height={36}
              className="h-9 w-9 object-contain"
              lightBg={false}
            />
            <span className="font-display text-lg font-bold text-white tracking-tight group-hover:text-gray-300 transition-colors">
              SAKFootball
            </span>
          </Link>
        </div>

        {/* Mobile menu button */}
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-400 hover:text-white transition-colors"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Menu className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>

        {/* Desktop nav */}
        <div className="hidden lg:flex lg:items-center lg:gap-x-1">
          {/* Predict — primary CTA in nav */}
          <Link
            href="/predict"
            className={cn(
              'flex items-center gap-1.5 rounded-full px-4 py-1.5 text-sm font-bold transition-all mr-2',
              pathname === '/predict'
                ? 'bg-nfl-blue text-white'
                : 'bg-nfl-blue/10 text-nfl-blue ring-1 ring-inset ring-nfl-blue/30 hover:bg-nfl-blue hover:text-white'
            )}
          >
            <Zap className="h-3.5 w-3.5" />
            Predict
          </Link>

          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              prefetch={false}
              className={cn(
                'rounded-md px-3 py-2 text-sm font-semibold transition-colors',
                pathname === item.href
                  ? 'text-white'
                  : 'text-gray-400 hover:text-white'
              )}
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Desktop right side */}
        <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:gap-x-3 lg:items-center">
          <Link
            href="/search"
            className="rounded-md p-2 text-gray-400 hover:text-white transition-colors"
            aria-label="Search"
          >
            <Search className="h-4.5 w-4.5" />
          </Link>
          <div className="h-5 w-px bg-white/10" />
          <AuthButton dark />
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            aria-hidden="true"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-gray-950 px-6 py-4 sm:max-w-sm border-l border-white/10">
            <div className="flex items-center justify-between">
              <Link href="/" className="flex items-center gap-2.5" onClick={() => setMobileMenuOpen(false)}>
                <LogoImage
                  width={32}
                  height={32}
                  className="h-8 w-8 object-contain"
                  lightBg={false}
                />
                <span className="font-display text-lg font-bold text-white">SAKFootball</span>
              </Link>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-gray-400 hover:text-white transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <X className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>

            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-white/10">
                {/* Primary CTA */}
                <div className="py-5">
                  <Link
                    href="/predict"
                    className="flex items-center gap-2 rounded-xl bg-nfl-blue px-4 py-3 text-sm font-bold text-white"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Zap className="h-4 w-4" />
                    Submit Your Mock Draft
                  </Link>
                </div>

                {/* Nav links */}
                <div className="space-y-0.5 py-6">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      prefetch={false}
                      className={cn(
                        '-mx-3 block rounded-lg px-3 py-2.5 text-sm font-semibold leading-7 transition-colors',
                        pathname === item.href
                          ? 'text-white bg-white/5'
                          : 'text-gray-300 hover:bg-white/5 hover:text-white'
                      )}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>

                {/* Auth */}
                <div className="py-6 space-y-2">
                  <Link
                    href="/search"
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-sm font-semibold leading-7 text-gray-300 hover:bg-white/5 hover:text-white transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Search
                  </Link>
                  <div onClick={() => setMobileMenuOpen(false)}>
                    <AuthButton dark />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

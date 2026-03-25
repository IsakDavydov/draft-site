import Link from 'next/link';
import { LogoImage } from './LogoImage';
import { Zap } from 'lucide-react';

export function SiteFooter() {
  return (
    <footer className="bg-gray-950 text-white">
      {/* Red accent stripe */}
      <div className="h-[3px] bg-gradient-to-r from-nfl-blue/0 via-nfl-blue to-nfl-blue/0" />

      <div className="mx-auto max-w-7xl px-6 py-14 sm:px-8 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <LogoImage
                width={36}
                height={36}
                className="h-9 w-9 object-contain"
                lightBg={false}
              />
              <span className="font-display text-lg font-bold tracking-tight text-white">
                SAKFootball
              </span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed max-w-sm mb-5">
              The 2026 NFL Mock Draft Challenge — submit your first-round predictions,
              compete on the leaderboard, and create groups with friends.
            </p>

            {/* CTA in footer */}
            <Link
              href="/predict"
              className="inline-flex items-center gap-2 rounded-lg bg-nfl-blue/10 border border-nfl-blue/30 px-4 py-2 text-sm font-bold text-nfl-blue hover:bg-nfl-blue hover:text-white transition-all"
            >
              <Zap className="h-3.5 w-3.5" />
              Submit Your Mock Draft
            </Link>

            {/* Social links */}
            <div className="flex gap-3 mt-5">
              <a
                href="https://www.instagram.com/sak.football"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Nav links */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-4">
              Sections
            </h3>
            <ul className="space-y-2.5">
              {[
                { name: 'Mock Draft Challenge', href: '/predict' },
                { name: 'Leaderboard', href: '/leaderboard' },
                { name: 'Groups', href: '/groups' },
                { name: 'Draft Prospects', href: '/draft' },
                { name: 'Season', href: '/season' },
                { name: 'Picks', href: '/picks' },
                { name: 'Fantasy', href: '/fantasy' },
              ].map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-4">
              Legal
            </h3>
            <ul className="space-y-2.5">
              {[
                { name: 'About', href: '/about' },
                { name: 'Privacy Policy', href: '/privacy' },
                { name: 'Terms of Service', href: '/terms' },
                { name: 'Contest Rules', href: '/contest-rules' },
                { name: 'Responsible Gaming', href: '/responsible-gaming' },
              ].map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 border-t border-white/5 pt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <p className="text-sm text-gray-500">
            © 2026 SAKFootball. All rights reserved.
          </p>
          <p className="text-xs text-gray-600 text-center sm:text-right">
            21+ only. Gambling problem? Call 1-800-GAMBLER.
            <br className="sm:hidden" />
            {' '}Not investment advice. Please gamble responsibly.
          </p>
        </div>
      </div>
    </footer>
  );
}

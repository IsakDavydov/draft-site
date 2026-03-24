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
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white transition-colors"
                aria-label="Twitter / X"
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white transition-colors"
                aria-label="Facebook"
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
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

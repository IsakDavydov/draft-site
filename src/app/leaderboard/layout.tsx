/**
 * Leaderboard layout - ensures critical styles load for this route.
 * Embedded fallback CSS guarantees readable layout even if Tailwind fails.
 */
export default function LeaderboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        .leaderboard-route { min-height: 100vh; background: linear-gradient(to bottom, #f8fafc, #fff); }
        .leaderboard-route .leaderboard-inner { max-width: 42rem; margin-left: auto; margin-right: auto; padding: 2rem 1rem; }
        @media (min-width: 640px) { .leaderboard-route .leaderboard-inner { padding: 2rem 1.5rem; } }
        @media (min-width: 1024px) { .leaderboard-route .leaderboard-inner { padding: 2rem 2rem; } }
        .leaderboard-route a { color: #0d47a1; text-decoration: none; }
        .leaderboard-route a:hover { text-decoration: underline; }
        .leaderboard-route h1 { font-size: 1.5rem; font-weight: 700; color: #111; }
        @media (min-width: 640px) { .leaderboard-route h1 { font-size: 1.875rem; } }
      `}} />
      <div className="leaderboard-route">
        {children}
      </div>
    </>
  );
}

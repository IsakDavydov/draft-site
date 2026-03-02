'use client';

import { useRef, useState } from 'react';
import { X, Share2, Copy, Download } from 'lucide-react';
import { TEAM_COLORS_BY_NAME, getTeamLogoSlug } from '@/lib/adapters/teams';

// Native <img> tags (not Next.js Image) so html-to-image can capture them without canvas tainting
function ShareTeamLogo({ team, teamColor }: { team: string; teamColor: string }) {
  const [fallback, setFallback] = useState(false);
  const slug = getTeamLogoSlug(team);

  if (fallback || !slug) {
    const initial = team.split(' ').pop()?.slice(0, 1) || '?';
    return (
      <span
        className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-[8px] font-bold text-white"
        style={{ backgroundColor: teamColor }}
      >
        {initial}
      </span>
    );
  }

  return (
    <span className="flex-shrink-0 w-6 h-6 rounded-lg overflow-hidden bg-white/20 inline-block">
      <img
        src={`/api/team-logo/${slug}`}
        alt=""
        width={24}
        height={24}
        fetchPriority="high"
        className="w-full h-full object-contain"
        onError={() => setFallback(true)}
      />
    </span>
  );
}

interface SharePick {
  pick: number;
  team: string;
  prospectName: string;
}

interface ShareDraftModalProps {
  onClose: () => void;
  score: number;
  topPicks: SharePick[];
}

export function ShareDraftModal({ onClose, score, topPicks }: ShareDraftModalProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);

  const shareUrl = typeof window !== 'undefined' ? window.location.origin + '/predict' : '';

  async function handleCopyLink() {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback for older browsers
      const input = document.createElement('input');
      input.value = shareUrl;
      document.body.appendChild(input);
      input.select();
      document.execCommand('copy');
      document.body.removeChild(input);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }

  async function waitForImages(el: HTMLElement) {
    const imgs = el.querySelectorAll('img');
    await Promise.all(
      Array.from(imgs).map(
        (img) =>
          new Promise<void>((resolve) => {
            if (img.complete) return resolve();
            img.onload = () => resolve();
            img.onerror = () => resolve();
            setTimeout(resolve, 3000);
          })
      )
    );
  }

  async function handleDownload() {
    if (!cardRef.current) return;
    try {
      await waitForImages(cardRef.current);
      await new Promise((r) => setTimeout(r, 300));
      const { toPng } = await import('html-to-image');
      const dataUrl = await toPng(cardRef.current, {
        pixelRatio: 2,
        backgroundColor: '#0f172a',
        cacheBust: true,
      });
      const link = document.createElement('a');
      link.download = `sakfootball-draft-${score}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Download failed:', err);
    }
  }

  async function handleShare() {
    if (navigator.share && cardRef.current) {
      try {
        await waitForImages(cardRef.current);
        await new Promise((r) => setTimeout(r, 300));
        const { toBlob } = await import('html-to-image');
        const blob = await toBlob(cardRef.current, {
          pixelRatio: 2,
          backgroundColor: '#0f172a',
          cacheBust: true,
        });
        if (blob) {
          const file = new File([blob], 'my-mock-draft.png', { type: 'image/png' });
          await navigator.share({
            title: 'Check out my 2026 mock draft!',
            text: `I scored ${score} on SAKFootball. Can you beat my picks?`,
            url: shareUrl,
            files: [file],
          });
        }
      } catch (err) {
        if ((err as Error).name !== 'AbortError') {
          handleDownload();
        }
      }
    } else {
      handleDownload();
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden">
        <div className="p-4 flex items-center justify-between border-b border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900">Share your mock draft</h3>
          <button
            type="button"
            onClick={onClose}
            className="p-2 text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-100"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Share card preview */}
        <div className="p-6 bg-gray-100 flex justify-center">
          <div
            ref={cardRef}
            className="w-[320px] rounded-xl overflow-hidden shadow-xl"
            style={{ backgroundColor: '#0f172a' }}
          >
            <div className="p-6 text-white">
              <p className="text-slate-300 text-sm font-medium uppercase tracking-wider mb-1">
                Check out my top 5 picks!
              </p>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-12 h-12 rounded-lg overflow-hidden bg-white/10 flex-shrink-0 flex items-center justify-center p-1">
                  <img
                    src="/TransparentLogo.png"
                    alt="SAKFootball"
                    width={40}
                    height={40}
                    fetchPriority="high"
                    className="object-contain w-full h-full"
                  />
                </div>
                <div>
                  <p className="text-xl font-bold">SAKFootball</p>
                  <p className="text-2xl font-extrabold text-amber-400">{score}</p>
                  <p className="text-xs text-slate-400">Pre-draft score</p>
                </div>
              </div>
              <div className="space-y-2.5">
                {topPicks.map(({ pick, team, prospectName }) => {
                  const teamColor = TEAM_COLORS_BY_NAME[team] || '#64748b';
                  return (
                    <div
                      key={pick}
                      className="flex items-center gap-2 py-1.5 px-2 rounded-lg"
                      style={{ backgroundColor: 'rgba(255,255,255,0.05)' }}
                    >
                      <span
                        className="flex-shrink-0 w-6 h-6 rounded text-[10px] font-bold flex items-center justify-center text-white"
                        style={{ backgroundColor: teamColor }}
                      >
                        {pick}
                      </span>
                      <ShareTeamLogo team={team} teamColor={teamColor} />
                      <span className="text-sm text-slate-200 truncate flex-1">
                        {prospectName}
                      </span>
                      <span className="text-xs text-slate-500 flex-shrink-0 max-w-[80px] truncate">
                        {team.split(' ').pop()}
                      </span>
                    </div>
                  );
                })}
              </div>
              <p className="text-center text-slate-500 text-xs mt-4">sakfootball.com</p>
            </div>
          </div>
        </div>

        <div className="p-4 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={handleShare}
            className="flex-1 min-w-[120px] inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-nfl-red text-white font-medium hover:bg-nfl-red/90"
          >
            <Share2 className="h-4 w-4" />
            Share
          </button>
          <button
            type="button"
            onClick={handleDownload}
            className="flex-1 min-w-[120px] inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-gray-100 text-gray-700 font-medium hover:bg-gray-200"
          >
            <Download className="h-4 w-4" />
            Download
          </button>
          <button
            type="button"
            onClick={handleCopyLink}
            className="flex-1 min-w-[120px] inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-gray-100 text-gray-700 font-medium hover:bg-gray-200"
          >
            <Copy className="h-4 w-4" />
            {copied ? 'Copied!' : 'Copy link'}
          </button>
        </div>
      </div>
    </div>
  );
}

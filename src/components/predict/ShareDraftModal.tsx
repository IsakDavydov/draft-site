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
        backgroundColor: '#080D18',
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
          backgroundColor: '#080D18',
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden border border-gray-200">
        <div className="p-4 flex items-center justify-between border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Share your mock draft</h3>
          <button
            type="button"
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Share card preview */}
        <div className="p-6 bg-gray-50 flex justify-center">
          <div
            ref={cardRef}
            className="w-[400px] rounded-2xl overflow-hidden shadow-2xl"
            style={{ backgroundColor: '#080D18' }}
          >
            {/* Top gradient stripe */}
            <div style={{ height: 4, background: 'linear-gradient(to right, #080D18, #E8372C, #F0A030, #080D18)' }} />

            <div className="p-6">
              {/* Header: branding */}
              <div className="flex items-center gap-3 mb-5">
                <div
                  className="w-11 h-11 rounded-xl overflow-hidden flex-shrink-0 flex items-center justify-center"
                  style={{ backgroundColor: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)' }}
                >
                  <img
                    src="/TransparentLogo.png"
                    alt="SAKFootball"
                    width={36}
                    height={36}
                    fetchPriority="high"
                    className="object-contain w-full h-full"
                  />
                </div>
                <div>
                  <p className="text-lg font-black text-white tracking-tight leading-none">SAKFootball</p>
                  <p className="text-xs text-white/50 mt-0.5 uppercase tracking-wider">2026 NFL Draft</p>
                </div>

                {/* Score block */}
                <div
                  className="ml-auto text-right rounded-xl px-4 py-2"
                  style={{ backgroundColor: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)' }}
                >
                  <p className="text-2xl font-black tabular-nums text-white leading-none">{score}</p>
                  <p className="text-[10px] text-white/45 mt-0.5 uppercase tracking-wider">Pre-draft pts</p>
                </div>
              </div>

              {/* Section label */}
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40 mb-2.5">
                My Top 5 Picks
              </p>

              {/* Pick rows */}
              <div className="space-y-1.5">
                {topPicks.map(({ pick, team, prospectName }) => {
                  const teamColor = TEAM_COLORS_BY_NAME[team] || '#64748b';
                  return (
                    <div
                      key={pick}
                      className="flex items-center gap-2.5 py-2 px-2.5 rounded-xl overflow-hidden"
                      style={{ backgroundColor: 'rgba(255,255,255,0.06)', borderLeft: `3px solid ${teamColor}` }}
                    >
                      <span
                        className="flex-shrink-0 w-6 h-6 rounded-md text-[10px] font-black flex items-center justify-center text-white"
                        style={{ backgroundColor: teamColor }}
                      >
                        {pick}
                      </span>
                      <ShareTeamLogo team={team} teamColor={teamColor} />
                      <span className="text-sm font-semibold text-white truncate flex-1">
                        {prospectName}
                      </span>
                      <span className="text-[11px] text-white/40 flex-shrink-0 max-w-[72px] truncate">
                        {team.split(' ').pop()}
                      </span>
                    </div>
                  );
                })}
              </div>

              <p className="text-center text-white/20 text-[10px] mt-5 tracking-wider uppercase">
                sakfootball.com
              </p>
            </div>
          </div>
        </div>

        <div className="p-4 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={handleShare}
            className="flex-1 min-w-[120px] inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-rose-500 text-white font-medium hover:bg-rose-500/90"
          >
            <Share2 className="h-4 w-4" />
            Share
          </button>
          <button
            type="button"
            onClick={handleDownload}
            className="flex-1 min-w-[120px] inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-white border border-gray-200 text-gray-700 font-medium hover:bg-gray-50 shadow-sm"
          >
            <Download className="h-4 w-4" />
            Download
          </button>
          <button
            type="button"
            onClick={handleCopyLink}
            className="flex-1 min-w-[120px] inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-white border border-gray-200 text-gray-700 font-medium hover:bg-gray-50 shadow-sm"
          >
            <Copy className="h-4 w-4" />
            {copied ? 'Copied!' : 'Copy link'}
          </button>
        </div>
      </div>
    </div>
  );
}

'use client';

import { useRef, useState } from 'react';
import { X, Share2, Copy, Download } from 'lucide-react';
import { TEAM_COLORS_BY_NAME, getTeamLogoSlug } from '@/lib/adapters/teams';

function ShareFullTeamLogo({ team, teamColor }: { team: string; teamColor: string }) {
  const [fallback, setFallback] = useState(false);
  const slug = getTeamLogoSlug(team);

  if (fallback || !slug) {
    const initial = team.split(' ').pop()?.slice(0, 1) || '?';
    return (
      <span
        className="flex-shrink-0 w-5 h-5 rounded flex items-center justify-center text-[7px] font-bold text-white"
        style={{ backgroundColor: teamColor }}
      >
        {initial}
      </span>
    );
  }

  return (
    <span className="flex-shrink-0 w-5 h-5 rounded overflow-hidden bg-white/20 inline-block">
      <img
        src={`/api/team-logo/${slug}`}
        alt=""
        width={20}
        height={20}
        fetchPriority="high"
        className="w-full h-full object-contain"
        onError={() => setFallback(true)}
      />
    </span>
  );
}

export interface ShareFullPick {
  pick: number;
  team: string;
  prospectName: string;
}

interface ShareFullDraftModalProps {
  onClose: () => void;
  allPicks: ShareFullPick[];
}

function getTeamShortName(team: string): string {
  const parts = team.split(' ');
  return parts.length > 1 ? parts.pop() ?? team : team;
}

function ShareFullPickRow({ pick, team, prospectName }: ShareFullPick) {
  const teamColor = TEAM_COLORS_BY_NAME[team] || '#64748b';
  const shortName = getTeamShortName(team);
  return (
    <div
      className="flex items-center gap-2 py-1 px-2 rounded overflow-hidden"
      style={{ backgroundColor: 'rgba(255,255,255,0.05)' }}
    >
      <span
        className="flex-shrink-0 w-5 h-5 rounded text-[9px] font-bold flex items-center justify-center text-white"
        style={{ backgroundColor: teamColor }}
      >
        {pick}
      </span>
      <ShareFullTeamLogo team={team} teamColor={teamColor} />
      <span className="flex-shrink-0 text-[10px] text-slate-500 w-10 truncate">{shortName}</span>
      <span className="text-xs text-slate-200 truncate min-w-0 flex-1">
        {prospectName}
      </span>
    </div>
  );
}

export function ShareFullDraftModal({ onClose, allPicks }: ShareFullDraftModalProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);

  const shareUrl = typeof window !== 'undefined' ? window.location.origin + '/predict' : '';

  async function waitForImages(el: HTMLElement) {
    const imgs = el.querySelectorAll('img');
    await Promise.all(
      Array.from(imgs).map(
        (img) =>
          new Promise<void>((resolve) => {
            if (img.complete) return resolve();
            img.onload = () => resolve();
            img.onerror = () => resolve();
            setTimeout(resolve, 4000);
          })
      )
    );
  }

  async function handleDownload() {
    if (!cardRef.current) return;
    try {
      await waitForImages(cardRef.current);
      await new Promise((r) => setTimeout(r, 400));
      const { toPng } = await import('html-to-image');
      const dataUrl = await toPng(cardRef.current, {
        pixelRatio: 2,
        backgroundColor: '#0f172a',
        cacheBust: true,
      });
      const link = document.createElement('a');
      link.download = 'sakfootball-full-mock-draft.png';
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
        await new Promise((r) => setTimeout(r, 400));
        const { toBlob } = await import('html-to-image');
        const blob = await toBlob(cardRef.current, {
          pixelRatio: 2,
          backgroundColor: '#0f172a',
          cacheBust: true,
        });
        if (blob) {
          const file = new File([blob], 'my-full-mock-draft.png', { type: 'image/png' });
          await navigator.share({
            title: 'My 2026 NFL Mock Draft',
            text: 'Check out my full first-round mock draft on SAKFootball!',
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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        <div className="p-4 flex items-center justify-between border-b border-gray-100 shrink-0">
          <h3 className="text-lg font-semibold text-gray-900">Share full draft</h3>
          <button
            type="button"
            onClick={onClose}
            className="p-2 text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-100"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-4 bg-gray-100 flex justify-center overflow-auto shrink min-h-0">
          <div
            ref={cardRef}
            className="w-[720px] rounded-xl shadow-xl shrink-0 overflow-visible"
            style={{ backgroundColor: '#0f172a' }}
          >
            <div className="p-5 text-white">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl overflow-hidden bg-white/10 flex-shrink-0 flex items-center justify-center p-1.5">
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
                  <p className="text-xl font-bold">My 2026 Mock Draft</p>
                  <p className="text-xs text-slate-400">First Round — All 32 Picks</p>
                </div>
              </div>

              {/* Two columns: picks 1-16 down left, picks 17-32 down right */}
              <div className="flex gap-6">
                <div className="flex-1 flex flex-col gap-1 min-w-0">
                  {allPicks.slice(0, 16).map(({ pick, team, prospectName }) => (
                    <ShareFullPickRow key={pick} pick={pick} team={team} prospectName={prospectName} />
                  ))}
                </div>
                <div className="flex-1 flex flex-col gap-1 min-w-0">
                  {allPicks.slice(16, 32).map(({ pick, team, prospectName }) => (
                    <ShareFullPickRow key={pick} pick={pick} team={team} prospectName={prospectName} />
                  ))}
                </div>
              </div>

              <p className="text-center text-slate-500 text-xs mt-4">sakfootball.com</p>
            </div>
          </div>
        </div>

        <div className="p-4 flex flex-wrap gap-2 shrink-0">
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

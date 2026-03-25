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

function ShareFullPickRow({ pick, team, prospectName }: ShareFullPick) {
  const teamColor = TEAM_COLORS_BY_NAME[team] || '#64748b';
  const isTopPick = pick <= 5;
  return (
    <div
      className="flex items-center gap-1.5 py-1 px-1.5 rounded overflow-hidden"
      style={{
        backgroundColor: isTopPick ? 'rgba(213,10,10,0.08)' : (pick % 2 === 0 ? 'rgba(255,255,255,0.04)' : 'transparent'),
        borderLeft: isTopPick ? '2px solid rgba(213,10,10,0.6)' : `2px solid ${teamColor}55`,
      }}
    >
      <span
        className="flex-shrink-0 w-5 h-5 rounded text-[9px] font-black flex items-center justify-center text-white"
        style={{ backgroundColor: teamColor }}
      >
        {pick}
      </span>
      <ShareFullTeamLogo team={team} teamColor={teamColor} />
      <span className="text-[11px] font-medium text-white/85 truncate min-w-0">
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

  function captureCard(): HTMLDivElement {
    const el = cardRef.current;
    if (!el) throw new Error('No card ref');
    const clone = el.cloneNode(true) as HTMLDivElement;
    clone.style.position = 'fixed';
    clone.style.top = '0';
    clone.style.left = '0';
    clone.style.zIndex = '99999';
    clone.style.visibility = 'hidden';
    clone.style.pointerEvents = 'none';
    document.body.appendChild(clone);
    return clone;
  }

  function removeClone(clone: HTMLDivElement) {
    document.body.removeChild(clone);
  }

  async function handleDownload() {
    if (!cardRef.current) return;
    let clone: HTMLDivElement | null = null;
    try {
      await waitForImages(cardRef.current);
      await new Promise((r) => setTimeout(r, 400));
      clone = captureCard();
      await waitForImages(clone);
      await new Promise((r) => setTimeout(r, 200));
      const { toPng } = await import('html-to-image');
      const dataUrl = await toPng(clone, {
        pixelRatio: 2,
        backgroundColor: '#013369',
        cacheBust: true,
      });
      const link = document.createElement('a');
      link.download = 'sakfootball-full-mock-draft.png';
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Download failed:', err);
    } finally {
      if (clone) removeClone(clone);
    }
  }

  async function handleShare() {
    if (navigator.share && cardRef.current) {
      let clone: HTMLDivElement | null = null;
      try {
        await waitForImages(cardRef.current);
        await new Promise((r) => setTimeout(r, 400));
        clone = captureCard();
        await waitForImages(clone);
        await new Promise((r) => setTimeout(r, 200));
        const { toBlob } = await import('html-to-image');
        const blob = await toBlob(clone, {
          pixelRatio: 2,
          backgroundColor: '#013369',
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
      } finally {
        if (clone) removeClone(clone);
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
            className="w-[520px] rounded-2xl shadow-2xl shrink-0 overflow-visible"
            style={{ backgroundColor: '#013369' }}
          >
            {/* Top gradient stripe */}
            <div style={{ height: 4, borderRadius: '16px 16px 0 0', background: 'linear-gradient(to right, #013369, #D50A0A, #013369)' }} />

            <div className="p-5">
              {/* Header: branding */}
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-10 h-10 rounded-xl overflow-hidden flex-shrink-0 flex items-center justify-center"
                  style={{ backgroundColor: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)' }}
                >
                  <img
                    src="/TransparentLogo.png"
                    alt="SAKFootball"
                    width={32}
                    height={32}
                    fetchPriority="high"
                    className="object-contain w-full h-full"
                  />
                </div>
                <div>
                  <p className="text-base font-black text-white tracking-tight leading-none">SAKFootball</p>
                  <p className="text-[10px] text-white/50 mt-0.5 uppercase tracking-wider">My 2026 First-Round Mock Draft</p>
                </div>
              </div>

              {/* Two columns */}
              <div className="flex gap-3">
                {/* Left: picks 1–16 */}
                <div className="flex-1 min-w-0">
                  <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-white/35 mb-1.5 px-1">
                    Picks 1–16
                  </p>
                  <div className="flex flex-col gap-0.5">
                    {allPicks.slice(0, 16).map(({ pick, team, prospectName }) => (
                      <ShareFullPickRow key={pick} pick={pick} team={team} prospectName={prospectName} />
                    ))}
                  </div>
                </div>

                {/* Divider */}
                <div style={{ width: 1, backgroundColor: 'rgba(255,255,255,0.08)', flexShrink: 0 }} />

                {/* Right: picks 17–32 */}
                <div className="flex-1 min-w-0">
                  <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-white/35 mb-1.5 px-1">
                    Picks 17–32
                  </p>
                  <div className="flex flex-col gap-0.5">
                    {allPicks.slice(16, 32).map(({ pick, team, prospectName }) => (
                      <ShareFullPickRow key={pick} pick={pick} team={team} prospectName={prospectName} />
                    ))}
                  </div>
                </div>
              </div>

              <p className="text-center text-white/20 text-[9px] mt-4 tracking-wider uppercase">
                sakfootball.com
              </p>
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

'use client';

import {
  useState,
  useRef,
  useEffect,
  useMemo,
  useLayoutEffect,
  useCallback,
  forwardRef,
  useImperativeHandle,
} from 'react';
import { Prospect } from '@/types';
import { Search } from 'lucide-react';

const POSITIONS = ['All', 'QB', 'RB', 'WR', 'TE', 'OT', 'IOL', 'DT', 'EDGE', 'LB', 'CB', 'S'];

export type ProspectPickerHandle = {
  /** Opens the dropdown (e.g. after selecting the previous pick). */
  open: () => void;
};

interface ProspectPickerProps {
  prospects: Prospect[];
  value: string;
  onChange: (prospectId: string) => void;
  usedIds: Set<string>;
  disabled?: boolean;
  /** Optional recommended prospects to show when dropdown is open. */
  recommended?: Prospect[];
}

export const ProspectPicker = forwardRef<ProspectPickerHandle, ProspectPickerProps>(function ProspectPicker(
  { prospects, value, onChange, usedIds, disabled, recommended },
  ref
) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [positionFilter, setPositionFilter] = useState<string>('All');
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const firstAvailableRef = useRef<HTMLLIElement | null>(null);

  useImperativeHandle(
    ref,
    () => ({
      open: () => {
        if (!disabled) setOpen(true);
      },
    }),
    [disabled]
  );

  const selectedProspect = prospects.find((p) => p.id === value);

  const filtered = useMemo(() => {
    let result = prospects;
    if (positionFilter !== 'All') {
      result = result.filter((p) => p.position === positionFilter);
    }
    const q = search.trim().toLowerCase();
    if (q) {
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.school.toLowerCase().includes(q) ||
          p.position.toLowerCase().includes(q)
      );
    }
    const rank = (a: Prospect, b: Prospect) => (a.bigBoardRank ?? 99) - (b.bigBoardRank ?? 99);
    const available = result.filter((p) => !usedIds.has(p.id) || p.id === value).sort(rank);
    const usedElsewhere = result.filter((p) => usedIds.has(p.id) && p.id !== value).sort(rank);
    return [...available, ...usedElsewhere];
  }, [prospects, search, positionFilter, usedIds, value]);

  const firstAvailableIndex = useMemo(() => {
    return filtered.findIndex((p) => !usedIds.has(p.id) || p.id === value);
  }, [filtered, usedIds, value]);

  const scrollFirstAvailableIntoView = useCallback(() => {
    queueMicrotask(() => {
      requestAnimationFrame(() => {
        firstAvailableRef.current?.scrollIntoView({ block: 'nearest' });
      });
    });
  }, []);

  useLayoutEffect(() => {
    if (open) {
      setSearch('');
      setPositionFilter('All');
    }
  }, [open]);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 0);
    }
  }, [open]);

  useLayoutEffect(() => {
    if (!open || firstAvailableIndex < 0) return;
    scrollFirstAvailableIntoView();
  }, [open, positionFilter, firstAvailableIndex, scrollFirstAvailableIntoView]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open]);

  function handleSelect(prospectId: string) {
    onChange(prospectId);
    setOpen(false);
  }

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => !disabled && setOpen((o) => !o)}
        disabled={disabled}
        className={`w-full text-left text-sm rounded-lg px-3 py-2.5 transition-all focus:ring-2 focus:ring-nfl-blue focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed ${
          selectedProspect
            ? 'border border-gray-200 bg-white text-gray-900 hover:border-nfl-blue/50'
            : 'border border-dashed border-gray-300 bg-gray-50/50 text-gray-400 hover:border-nfl-blue/50 hover:bg-red-50/20 hover:text-gray-500'
        }`}
      >
        {selectedProspect ? (
          <span className="flex items-center gap-2 min-w-0">
            <span className="font-semibold text-gray-900 truncate">{selectedProspect.name}</span>
            <span className="flex-shrink-0 inline-flex items-center rounded px-1.5 py-0.5 text-[10px] font-bold bg-gray-100 text-gray-500">
              {selectedProspect.position}
            </span>
          </span>
        ) : (
          <span className="flex items-center gap-1.5 text-[13px]">
            <span className="text-base leading-none text-gray-300">＋</span>
            Pick a player
          </span>
        )}
      </button>

      {open && (
        <div
          className="absolute z-50 mt-1.5 rounded-xl border border-gray-200 bg-white shadow-xl"
          style={{ width: 'max(100%, 300px)' }}
        >
          <div className="p-2.5 space-y-2 border-b border-gray-100">
            <div className="flex gap-2">
              <select
                value={positionFilter}
                onChange={(e) => setPositionFilter(e.target.value)}
                className="flex-shrink-0 text-xs font-medium border border-gray-200 rounded-lg px-2 py-1.5 bg-gray-50 text-gray-700 focus:ring-2 focus:ring-nfl-blue focus:border-transparent"
              >
                {POSITIONS.map((pos) => (
                  <option key={pos} value={pos}>
                    {pos === 'All' ? 'All positions' : pos}
                  </option>
                ))}
              </select>
              <div className="relative flex-1 min-w-0">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-400" />
                <input
                  ref={inputRef}
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  onFocus={scrollFirstAvailableIntoView}
                  placeholder="Search players..."
                  className="w-full pl-7 pr-3 py-1.5 text-sm border border-gray-200 rounded-lg bg-white text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-nfl-blue focus:border-transparent"
                />
              </div>
            </div>
            {recommended && recommended.length > 0 && (
              <div className="pt-2 border-t border-gray-100 mt-1">
                <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1.5">By need</p>
                <div className="flex flex-wrap gap-1">
                  {recommended
                    .filter((prospect) => !usedIds.has(prospect.id) || value === prospect.id)
                    .map((prospect) => (
                      <button
                        key={prospect.id}
                        type="button"
                        onClick={() => handleSelect(prospect.id)}
                        className="inline-flex items-center rounded-lg px-2 py-1 text-xs font-semibold bg-nfl-blue/10 text-nfl-blue hover:bg-nfl-blue/15 transition-colors"
                      >
                        {prospect.name}
                        <span className="ml-1 text-nfl-blue/60">({prospect.position})</span>
                      </button>
                    ))}
                </div>
              </div>
            )}
          </div>
          <ul className="max-h-[240px] overflow-y-auto py-1">
            {filtered.length === 0 ? (
              <li className="px-3 py-4 text-sm text-gray-400 text-center">No matches</li>
            ) : (
              filtered.map((prospect, i) => {
                const isUsed = usedIds.has(prospect.id) && value !== prospect.id;
                const isSelected = value === prospect.id;
                return (
                  <li key={prospect.id} ref={i === firstAvailableIndex ? firstAvailableRef : undefined}>
                    <button
                      type="button"
                      onClick={() => !isUsed && handleSelect(prospect.id)}
                      disabled={isUsed}
                      className={`w-full text-left px-3 py-2 text-sm focus:outline-none transition-colors ${
                        isSelected
                          ? 'bg-nfl-blue/10 text-nfl-blue'
                          : isUsed
                          ? 'opacity-40 cursor-not-allowed text-gray-400'
                          : 'text-gray-900 hover:bg-gray-50 focus:bg-gray-50'
                      }`}
                    >
                      <span className="font-semibold">{prospect.name}</span>
                      <span className="text-gray-400 text-xs ml-1.5">
                        {prospect.position} · {prospect.school}
                      </span>
                    </button>
                  </li>
                );
              })
            )}
          </ul>
        </div>
      )}
    </div>
  );
});

ProspectPicker.displayName = 'ProspectPicker';

'use client';

import { useState, useRef, useEffect, useMemo } from 'react';
import { Prospect } from '@/types';
import { Search } from 'lucide-react';

const POSITIONS = ['All', 'QB', 'RB', 'WR', 'TE', 'OL', 'DL', 'LB', 'CB', 'S'];

interface ProspectPickerProps {
  prospects: Prospect[];
  value: string;
  onChange: (prospectId: string) => void;
  usedIds: Set<string>;
  disabled?: boolean;
}

export function ProspectPicker({
  prospects,
  value,
  onChange,
  usedIds,
  disabled,
}: ProspectPickerProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [positionFilter, setPositionFilter] = useState<string>('All');
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

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
    return [...result].sort((a, b) => (a.bigBoardRank ?? 99) - (b.bigBoardRank ?? 99));
  }, [prospects, search, positionFilter]);

  useEffect(() => {
    if (open) {
      setSearch('');
      setPositionFilter('All');
      setTimeout(() => inputRef.current?.focus(), 0);
    }
  }, [open]);

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
        className="w-full text-left text-sm border border-gray-300 rounded-md px-3 py-2 bg-white text-gray-900 hover:border-gray-400 focus:ring-2 focus:ring-nfl-blue focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed truncate"
      >
        {selectedProspect ? (
          <span>
            {selectedProspect.name}
            <span className="text-gray-500"> ({selectedProspect.position}, {selectedProspect.school})</span>
          </span>
        ) : (
          <span className="text-gray-500">Select prospect...</span>
        )}
      </button>

      {open && (
        <div
          className="absolute z-50 mt-1 w-full min-w-[280px] rounded-lg border border-gray-200 bg-white shadow-lg"
          style={{ width: 'max(100%, 280px)' }}
        >
          <div className="p-2 space-y-2 border-b border-gray-100">
            <div className="flex gap-2">
              <select
                value={positionFilter}
                onChange={(e) => setPositionFilter(e.target.value)}
                className="flex-shrink-0 text-sm border border-gray-200 rounded-md px-2 py-1.5 bg-gray-50 text-gray-900 focus:ring-2 focus:ring-nfl-blue focus:border-transparent"
              >
                {POSITIONS.map((pos) => (
                  <option key={pos} value={pos}>
                    {pos === 'All' ? 'All positions' : pos}
                  </option>
                ))}
              </select>
              <div className="relative flex-1 min-w-0">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  ref={inputRef}
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search by name or school..."
                  className="w-full pl-8 pr-3 py-2 text-sm border border-gray-200 rounded-md bg-gray-50 text-gray-900 placeholder:text-gray-500 focus:ring-2 focus:ring-nfl-blue focus:border-transparent focus:bg-white"
                />
              </div>
            </div>
          </div>
          <ul className="max-h-[220px] overflow-y-auto py-1">
            {filtered.length === 0 ? (
              <li className="px-3 py-4 text-sm text-gray-500 text-center">No matches</li>
            ) : (
              filtered.map((prospect) => {
                const isUsed = usedIds.has(prospect.id) && value !== prospect.id;
                return (
                  <li key={prospect.id}>
                    <button
                      type="button"
                      onClick={() => !isUsed && handleSelect(prospect.id)}
                      disabled={isUsed}
                      className={`w-full text-left px-3 py-2 text-sm hover:bg-gray-100 focus:bg-gray-100 focus:outline-none ${
                        isUsed ? 'opacity-50 cursor-not-allowed text-gray-400' : 'text-gray-900'
                      }`}
                    >
                      <span className="font-medium">{prospect.name}</span>
                      <span className="text-gray-500 ml-1">
                        ({prospect.position}, {prospect.school})
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
}

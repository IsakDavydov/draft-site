'use client';

import { useState } from 'react';
import { Copy, Share2 } from 'lucide-react';

interface GroupInviteCardProps {
  inviteCode: string;
  groupName: string;
}

export function GroupInviteCard({ inviteCode, groupName: _groupName }: GroupInviteCardProps) {
  const [copied, setCopied] = useState(false);

  async function copyLink() {
    const url = typeof window !== 'undefined'
      ? `${window.location.origin}/groups/join/${inviteCode}`
      : '';
    try {
      await navigator.clipboard.writeText(url || inviteCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  async function copyCode() {
    try {
      await navigator.clipboard.writeText(inviteCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="bg-white rounded-xl shadow-sm ring-1 ring-gray-200 p-4">
      <p className="text-sm font-medium text-gray-700 mb-2">Invite friends</p>
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={copyCode}
          className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 hover:bg-gray-50 rounded-lg text-sm font-mono font-medium text-gray-700 shadow-sm"
        >
          <span>{inviteCode}</span>
          <Copy className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={copyLink}
          className="inline-flex items-center gap-2 px-4 py-2 bg-rose-500 text-white hover:bg-rose-600 rounded-lg text-sm font-medium shadow-sm"
        >
          <Share2 className="h-4 w-4" />
          {copied ? 'Copied!' : 'Copy link'}
        </button>
      </div>
    </div>
  );
}

'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';

export function JoinGroupForm() {
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const router = useRouter();
  const supabase = createClient();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = code.trim().toUpperCase();
    if (!trimmed) return;
    setLoading(true);
    setMessage(null);

    const { data: groupId, error } = await supabase.rpc('join_group_by_code', {
      p_invite_code: trimmed,
    });

    if (error) {
      setMessage({ type: 'error', text: error.message });
      setLoading(false);
      return;
    }

    if (!groupId) {
      setMessage({ type: 'error', text: 'Invalid or expired invite code.' });
      setLoading(false);
      return;
    }

    setMessage({ type: 'success', text: 'Joined! Redirecting...' });
    router.push(`/groups/${groupId}`);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="inviteCode" className="block text-xs font-medium uppercase tracking-wider text-gray-500 mb-2">
          Invite code
        </label>
        <input
          id="inviteCode"
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value.toUpperCase())}
          required
          maxLength={12}
          disabled={loading}
          className="w-full rounded-xl border border-sak-border bg-sak-hover px-4 py-3 font-mono uppercase tracking-wider text-gray-200 placeholder:text-gray-500 transition-colors focus:border-brand-red focus:ring-2 focus:ring-brand-red/20 focus:outline-none disabled:opacity-50"
          placeholder="e.g. SAKF8X2K"
        />
      </div>
      {message && (
        <p className={`rounded-xl px-4 py-2.5 text-sm ${message.type === 'error' ? 'bg-red-950/30 text-red-300 ring-1 ring-red-900/40' : 'bg-green-950/30 text-green-300 ring-1 ring-green-900/40'}`}>
          {message.text}
        </p>
      )}
      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-xl bg-brand-red py-3 px-4 font-bold text-white shadow-sm transition-all duration-200 hover:bg-brand-red/90 hover:shadow-md hover:scale-[1.01] disabled:opacity-50 disabled:hover:shadow-sm disabled:hover:scale-100"
      >
        {loading ? 'Joining...' : 'Join Group'}
      </button>
    </form>
  );
}

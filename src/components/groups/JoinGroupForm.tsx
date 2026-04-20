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
          className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 font-mono uppercase tracking-wider text-gray-900 placeholder:text-gray-400 transition-colors focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20 focus:outline-none disabled:opacity-50"
          placeholder="e.g. SAKF8X2K"
        />
      </div>
      {message && (
        <p className={`rounded-xl px-4 py-2.5 text-sm ${message.type === 'error' ? 'bg-red-50 text-red-700 ring-1 ring-red-200' : 'bg-green-50 text-green-700 ring-1 ring-green-200'}`}>
          {message.text}
        </p>
      )}
      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-xl bg-rose-500 py-3 px-4 font-bold text-white shadow-sm transition-all duration-200 hover:bg-rose-600 hover:shadow-md hover:scale-[1.01] disabled:opacity-50 disabled:hover:shadow-sm disabled:hover:scale-100"
      >
        {loading ? 'Joining...' : 'Join Group'}
      </button>
    </form>
  );
}

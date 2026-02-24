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
        <label htmlFor="inviteCode" className="block text-sm font-medium text-gray-700 mb-1">
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
          className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 placeholder:text-gray-500 focus:ring-2 focus:ring-nfl-blue focus:border-transparent disabled:opacity-50 font-mono uppercase"
          placeholder="e.g. SAKF8X2K"
        />
      </div>
      {message && (
        <p className={`text-sm ${message.type === 'error' ? 'text-red-600' : 'text-green-600'}`}>
          {message.text}
        </p>
      )}
      <button
        type="submit"
        disabled={loading}
        className="w-full py-2 px-4 bg-nfl-blue text-white font-semibold rounded-lg hover:bg-nfl-blue/90 disabled:opacity-50"
      >
        {loading ? 'Joining...' : 'Join Group'}
      </button>
    </form>
  );
}

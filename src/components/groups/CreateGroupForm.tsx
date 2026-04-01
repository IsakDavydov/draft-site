'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';

function generateInviteCode(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = '';
  for (let i = 0; i < 8; i++) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }
  return code;
}

export function CreateGroupForm() {
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const router = useRouter();
  const supabase = createClient();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) return;
    setLoading(true);
    setMessage(null);

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      setMessage({ type: 'error', text: 'Please sign in to create a group.' });
      setLoading(false);
      return;
    }

    let attempts = 0;
    const maxAttempts = 5;

    while (attempts < maxAttempts) {
      const inviteCode = generateInviteCode();
      const { data: groupId, error } = await supabase.rpc('create_group', {
        p_name: name.trim(),
        p_invite_code: inviteCode,
      });

      if (error) {
        if (error.code === '23505') {
          attempts++;
          continue;
        }
        setMessage({ type: 'error', text: error.message });
        setLoading(false);
        return;
      }

      if (!groupId) {
        setMessage({ type: 'error', text: 'Please sign in to create a group.' });
        setLoading(false);
        return;
      }

      setMessage({ type: 'success', text: 'Group created! Redirecting...' });
      router.push(`/groups/${groupId}`);
      return;
    }

    setMessage({ type: 'error', text: 'Could not generate unique code. Please try again.' });
    setLoading(false);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="groupName" className="block text-xs font-medium uppercase tracking-wider text-gray-500 mb-2">
          Group name
        </label>
        <input
          id="groupName"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          maxLength={50}
          disabled={loading}
          className="w-full rounded-xl border border-sak-border bg-sak-hover px-4 py-3 text-gray-200 placeholder:text-gray-500 transition-colors focus:border-brand-red focus:ring-2 focus:ring-brand-red/20 focus:outline-none disabled:opacity-50"
          placeholder="e.g. Fantasy Crew"
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
        {loading ? 'Creating...' : 'Create Group'}
      </button>
    </form>
  );
}

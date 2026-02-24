import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function JoinGroupPage({ params }: { params: Promise<{ code: string }> }) {
  const { code } = await params;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/auth/signin?next=/groups/join/' + encodeURIComponent(code));
  }

  const { data: groupId, error } = await supabase.rpc('join_group_by_code', {
    p_invite_code: code,
  });

  if (error || !groupId) {
    return (
      <div className="bg-gray-50 min-h-screen flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Invalid invite</h1>
          <p className="text-gray-600 mb-6">
            This invite code is invalid or may have expired. Ask your friend for a new link.
          </p>
          <Link
            href="/groups"
            className="inline-flex items-center gap-2 text-nfl-red font-medium hover:underline"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Groups
          </Link>
        </div>
      </div>
    );
  }

  redirect('/groups/' + groupId);
}

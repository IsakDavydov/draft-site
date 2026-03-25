import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { getProspects, getDraftOrder2026 } from '@/lib/adapters';
import { AdminDraftEntryClient } from './AdminDraftEntryClient';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Admin — Draft Entry',
};

export default async function AdminDraftEntryPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/auth/signin?next=/admin/draft-entry');
  }

  // Check admin email
  const adminEmail = process.env.ADMIN_EMAIL;
  if (!adminEmail || user.email !== adminEmail) {
    redirect('/');
  }

  const [prospects, draftOrder, { data: existingResults }] = await Promise.all([
    getProspects(),
    Promise.resolve(getDraftOrder2026()),
    supabase
      .from('draft_results')
      .select('pick_number, prospect_id, prospect_name, team')
      .eq('draft_year', 2026)
      .order('pick_number'),
  ]);

  return (
    <AdminDraftEntryClient
      prospects={prospects}
      draftOrder={draftOrder}
      existingResults={existingResults ?? []}
    />
  );
}

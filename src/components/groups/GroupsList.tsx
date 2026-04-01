'use client';

import Link from 'next/link';
import { Users, ChevronRight } from 'lucide-react';

interface Group {
  id: string;
  name: string;
  inviteCode: string;
  role: string;
}

interface GroupsListProps {
  groups: Group[];
}

export function GroupsList({ groups }: GroupsListProps) {
  if (groups.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-sak-border bg-sak-hover px-5 py-8 text-center">
        <Users className="mx-auto h-10 w-10 text-gray-500" />
        <p className="mt-3 text-sm text-gray-400">
          You haven&apos;t joined any groups yet.
        </p>
        <p className="mt-1 text-xs text-gray-500">
          Create one or enter an invite code above to get started.
        </p>
      </div>
    );
  }

  return (
    <ul className="space-y-2">
      {groups.map((group) => (
        <li key={group.id}>
          <Link
            href={`/groups/${group.id}`}
            className="group flex items-center justify-between rounded-xl border border-sak-border bg-sak-card py-3.5 px-4 transition-all duration-200 hover:border-brand-red/40 hover:shadow-sm hover:bg-sak-hover"
          >
            <div className="flex min-w-0 items-center gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-red/10 ring-1 ring-brand-red/20">
                <Users className="h-5 w-5 text-brand-red" />
              </div>
              <div className="min-w-0">
                <p className="font-medium text-white truncate group-hover:text-brand-red transition-colors">{group.name}</p>
                <p className="text-xs font-mono text-gray-500 truncate">{group.inviteCode}</p>
              </div>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              {group.role === 'owner' && (
                <span className="rounded-lg bg-brand-gold/20 px-2.5 py-1 text-[11px] font-medium text-brand-gold ring-1 ring-brand-gold/40">
                  Owner
                </span>
              )}
              <ChevronRight className="h-5 w-5 text-gray-500 transition-colors group-hover:text-brand-red" />
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}

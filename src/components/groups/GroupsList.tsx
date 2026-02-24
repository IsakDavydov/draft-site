'use client';

import Link from 'next/link';
import { Users } from 'lucide-react';

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
      <p className="text-gray-500 text-sm">
        You haven&apos;t joined any groups yet. Create one or enter an invite code above.
      </p>
    );
  }

  return (
    <ul className="divide-y divide-gray-200">
      {groups.map((group) => (
        <li key={group.id}>
          <Link
            href={`/groups/${group.id}`}
            className="flex items-center justify-between py-4 px-2 -mx-2 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-nfl-blue/10 flex items-center justify-center">
                <Users className="h-5 w-5 text-nfl-blue" />
              </div>
              <div>
                <p className="font-medium text-gray-900">{group.name}</p>
                <p className="text-xs text-gray-700 font-mono">{group.inviteCode}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {group.role === 'owner' && (
                <span className="text-xs bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full">
                  Owner
                </span>
              )}
              <span className="text-gray-400">→</span>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}

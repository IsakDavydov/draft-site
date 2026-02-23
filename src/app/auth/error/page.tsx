import Link from 'next/link';

export default function AuthErrorPage({
  searchParams,
}: {
  searchParams: { message?: string };
}) {
  return (
    <div className="bg-gray-50 min-h-screen flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-xl font-bold text-gray-900 mb-2">Authentication error</h1>
        <p className="text-gray-600 mb-6">
          {searchParams.message || 'Something went wrong. Please try again.'}
        </p>
        <Link
          href="/auth/signin"
          className="text-nfl-red font-medium hover:underline"
        >
          Back to sign in
        </Link>
      </div>
    </div>
  );
}

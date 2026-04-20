import Link from 'next/link';

export default function AuthErrorPage({
  searchParams,
}: {
  searchParams: { message?: string };
}) {
  return (
    <div className="min-h-screen bg-cream flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-xl font-bold text-gray-900 font-display mb-2">Authentication error</h1>
        <p className="text-gray-600 mb-6">
          {searchParams.message || 'Something went wrong. Please try again.'}
        </p>
        <Link
          href="/auth/signin"
          className="text-rose-500 font-medium hover:text-rose-600"
        >
          Back to sign in
        </Link>
      </div>
    </div>
  );
}

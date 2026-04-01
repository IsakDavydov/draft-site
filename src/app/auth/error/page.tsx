import Link from 'next/link';

export default function AuthErrorPage({
  searchParams,
}: {
  searchParams: { message?: string };
}) {
  return (
    <div className="min-h-screen bg-sak-darker flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-xl font-bold text-white font-display mb-2">Authentication error</h1>
        <p className="text-gray-200 mb-6">
          {searchParams.message || 'Something went wrong. Please try again.'}
        </p>
        <Link
          href="/auth/signin"
          className="text-brand-red font-medium hover:text-brand-red/80"
        >
          Back to sign in
        </Link>
      </div>
    </div>
  );
}

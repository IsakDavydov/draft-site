interface SectionHeaderProps {
  title: string;
  description?: string;
  children?: React.ReactNode;
}

export function SectionHeader({ title, description, children }: SectionHeaderProps) {
  return (
    <div className="mb-8">
      <div className="md:flex md:items-center md:justify-between">
        <div className="min-w-0 flex-1">
          <h1 className="text-3xl font-bold leading-7 text-gray-900 sm:truncate sm:text-4xl sm:tracking-tight">
            {title}
          </h1>
          {description && (
            <p className="mt-2 text-lg text-gray-600">
              {description}
            </p>
          )}
        </div>
        {children && (
          <div className="mt-4 flex md:ml-4 md:mt-0">
            {children}
          </div>
        )}
      </div>
    </div>
  );
}

interface PlayStyleTagsProps {
  tags: string[];
}

export function PlayStyleTags({ tags }: PlayStyleTagsProps) {
  if (!tags?.length) return null;

  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <span
          key={tag}
          className="inline-flex items-center rounded-lg bg-nfl-blue/10 px-2.5 py-1 text-xs font-medium text-nfl-blue ring-1 ring-inset ring-nfl-blue/20"
        >
          {tag}
        </span>
      ))}
    </div>
  );
}

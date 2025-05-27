
import React from 'react';
import { ChevronRight } from 'lucide-react';
import { CommandItem } from "@/components/ui/command";
import { cn } from "@/lib/utils";
import { highlightMatch } from '@/utils/textHighlighter';
import type { SearchItem } from '@/hooks/useSearch';

interface SearchResultItemProps {
  item: SearchItem;
  query: string;
  isSelected: boolean;
  onSelect: () => void;
}

const SearchResultItem: React.FC<SearchResultItemProps> = ({ 
  item, 
  query, 
  isSelected,
  onSelect 
}) => {
  // Safety check to prevent rendering invalid items
  if (!item || !item.id || !item.name) {
    return null;
  }

  // Use safe accessor pattern to prevent undefined errors
  const name = item.name || 'Unnamed Item';
  const description = item.description || 'No description available';
  const tags = Array.isArray(item.tags) ? item.tags : [];
  const categoryIcon = item.categoryIcon || null;

  return (
    <CommandItem
      key={item.id}
      onSelect={onSelect}
      className={cn(
        "flex items-start gap-2 p-2",
        isSelected && "bg-accent"
      )}
    >
      <div className="flex-shrink-0 mt-0.5">{categoryIcon}</div>
      <div className="flex flex-col">
        <div className="font-medium">{highlightMatch(name, query)}</div>
        <div className="text-xs text-muted-foreground line-clamp-1">
          {highlightMatch(description, query)}
        </div>
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-1">
            {tags.slice(0, 2).map((tag, index) => (
              tag ? (
                <span
                  key={`${item.id}-tag-${index}`}
                  className="inline-flex items-center px-1.5 py-0.5 rounded-sm text-xs bg-secondary text-secondary-foreground"
                >
                  {tag}
                </span>
              ) : null
            ))}
          </div>
        )}
      </div>
      <ChevronRight className="ml-auto h-4 w-4 text-muted-foreground" />
    </CommandItem>
  );
};

export default SearchResultItem;

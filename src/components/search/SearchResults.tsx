
import React from 'react';
import { CommandEmpty, CommandGroup, CommandItem, CommandList } from "@/components/ui/command";
import SearchResultItem from './SearchResultItem';
import type { SearchItem } from '@/hooks/useSearch';
import { Loader2 } from 'lucide-react';

interface SearchResultsProps {
  groupedResults: Record<string, SearchItem[]>;
  selectedIndex: number;
  query: string;
  filteredResults: SearchItem[];
  handleSelect: (item: SearchItem) => void;
  loading?: boolean;
}

const SearchResults: React.FC<SearchResultsProps> = ({
  groupedResults,
  selectedIndex,
  query,
  filteredResults,
  handleSelect,
  loading = false
}) => {
  let currentIndex = 0;
  
  // If there's no query, show a prompt
  if (!query?.trim()) {
    return (
      <CommandList>
        <div className="p-4 text-center text-sm text-muted-foreground">
          Start typing to search for tools, APIs, perks, and more...
        </div>
      </CommandList>
    );
  }
  
  // If loading, show a loading state
  if (loading) {
    return (
      <CommandList>
        <div className="p-6 flex items-center justify-center text-muted-foreground">
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          <span>Searching...</span>
        </div>
      </CommandList>
    );
  }

  // Safety check to ensure filteredResults is an array
  const hasResults = Array.isArray(filteredResults) && filteredResults.length > 0;

  // If there are no results but there is a query
  if (!hasResults && query?.trim()) {
    return (
      <CommandList>
        <CommandEmpty className="py-6 text-center">
          <p className="text-muted-foreground">No results found for "{query}"</p>
          <p className="text-xs mt-2 text-muted-foreground">Try searching with different keywords or check spelling</p>
        </CommandEmpty>
      </CommandList>
    );
  }

  // Check if groupedResults is empty or not an object
  const hasGroupedResults = groupedResults && 
                           typeof groupedResults === 'object' && 
                           Object.keys(groupedResults).length > 0;

  if (!hasGroupedResults) {
    return (
      <CommandList>
        <div className="p-4 text-center text-sm text-muted-foreground">
          No results available
        </div>
      </CommandList>
    );
  }

  return (
    <CommandList className="max-h-[300px] overflow-y-auto py-2">
      {Object.entries(groupedResults).map(([category, items]) => {
        // Skip empty categories or invalid items
        if (!Array.isArray(items) || items.length === 0) return null;
        
        return (
          <CommandGroup key={category} heading={category} className="px-2">
            {items.map((item) => {
              // Skip invalid items (missing id)
              if (!item || !item.id) return null;
              
              const isSelected = currentIndex === selectedIndex;
              currentIndex++;
              
              return (
                <SearchResultItem 
                  key={item.id}
                  item={item}
                  query={query}
                  isSelected={isSelected}
                  onSelect={() => handleSelect(item)}
                />
              );
            })}
          </CommandGroup>
        );
      })}
    </CommandList>
  );
};

export default SearchResults;

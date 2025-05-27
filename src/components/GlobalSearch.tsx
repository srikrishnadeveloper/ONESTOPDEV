import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Search, X, Loader2 } from "lucide-react";
import { Command, CommandDialog, CommandInput } from "@/components/ui/command";
import { useSearch, type SearchItem } from "@/hooks/useSearch";
import { getCategoryIcons } from "@/utils/categoryIcons";
import SearchResults from "./search/SearchResults";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";

interface GlobalSearchProps {
  placeholder?: string;
  className?: string;
  variant?: "inline" | "dialog";
  maxResults?: number;
  autoFocus?: boolean;
}

export const GlobalSearch = ({
  placeholder = "Search tools, AI, perks, APIs...",
  className,
  variant = "inline",
  maxResults = 5,
  autoFocus = false,
}: GlobalSearchProps) => {
  const [open, setOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const navigate = useNavigate();
  const commandRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const categoryIcons = getCategoryIcons();

  const {
    query,
    setQuery,
    filteredResults,
    groupedResults,
    loading
  } = useSearch(categoryIcons, maxResults);

  // Handler for clicking outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (commandRef.current && !commandRef.current.contains(event.target as Node) && variant === "inline") {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [variant]);

  // Handle click on search result
  const handleSelect = (item: SearchItem) => {
    try {
      if (item && item.path) {
        navigate(item.path);
        setOpen(false);
        setQuery("");
      } else {
        console.warn("Invalid navigation path for item:", item);
      }
    } catch (error) {
      console.error("Navigation error:", error);
      // Keep the search open if navigation fails
    }
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((open) => !open);
        if (!open && inputRef.current) {
          setTimeout(() => {
            inputRef.current?.focus();
          }, 10);
        }
      }
      
      if (open && Array.isArray(filteredResults) && filteredResults.length > 0) {
        if (e.key === "ArrowDown") {
          e.preventDefault();
          setSelectedIndex((prev) => (prev < filteredResults.length - 1 ? prev + 1 : prev));
        } else if (e.key === "ArrowUp") {
          e.preventDefault();
          setSelectedIndex((prev) => (prev > 0 ? prev - 1 : 0));
        } else if (e.key === "Enter") {
          e.preventDefault();
          const selected = filteredResults[selectedIndex];
          if (selected) {
            handleSelect(selected);
          }
        } else if (e.key === "Escape") {
          setOpen(false);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, filteredResults, selectedIndex]);

  // Reset selected index when results change
  useEffect(() => {
    setSelectedIndex(0);
  }, [filteredResults]);

  // Auto-open dropdown when typing
  useEffect(() => {
    if (query?.trim().length > 0 && !open) {
      setOpen(true);
    }
  }, [query]);

  // Dialog variant (command+k popup)
  if (variant === "dialog") {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              onClick={() => setOpen(true)}
              className={cn(
                "flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                className
              )}
            >
              <div className="flex items-center gap-2 text-muted-foreground">
                <Search className="h-4 w-4" />
                <span>{placeholder}</span>
              </div>
              <kbd className="pointer-events-none hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-xs font-medium opacity-100 sm:flex">
                <span className="text-xs">⌘</span>K
              </kbd>
            </button>
          </TooltipTrigger>
          <TooltipContent side="bottom" align="end">
            <p>Press <kbd className="px-1 bg-muted rounded">⌘ K</kbd> or <kbd className="px-1 bg-muted rounded">Ctrl K</kbd> to open search</p>
          </TooltipContent>
        </Tooltip>

        {/* Dialog with proper accessibility attributes */}
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="p-0 gap-0 max-w-3xl">
            <DialogHeader>
              <DialogTitle className="sr-only">Search</DialogTitle>
              <DialogDescription id="search-description" className="sr-only">
                Search for tools, AI solutions, developer resources, and more
              </DialogDescription>
            </DialogHeader>
            <Command className="rounded-lg border-0" aria-describedby="search-description">
              <div className="flex items-center border-b px-3">
                <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
                <CommandInput
                  placeholder={placeholder}
                  value={query || ""}
                  onValueChange={setQuery}
                  ref={inputRef}
                  className="flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none"
                  aria-label="Search"
                />
                {query && (
                  <button
                    onClick={() => {
                      setQuery("");
                    }}
                    className="ml-2 h-4 w-4 text-muted-foreground hover:text-foreground"
                    aria-label="Clear search"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
                {loading && (
                  <Loader2 className="ml-2 h-4 w-4 animate-spin text-muted-foreground" />
                )}
              </div>
              <div className="relative">
                {/* Render search results */}
                <SearchResults 
                  groupedResults={groupedResults || {}}
                  selectedIndex={selectedIndex}
                  query={query || ""}
                  filteredResults={filteredResults || []}
                  handleSelect={handleSelect}
                  loading={loading}
                />
                
                {open && Array.isArray(filteredResults) && filteredResults.length > 0 && (
                  <div className="p-2 border-t text-xs text-muted-foreground flex justify-between">
                    <span>Navigate: <kbd className="px-1 bg-muted rounded">↑</kbd> <kbd className="px-1 bg-muted rounded">↓</kbd></span>
                    <span>Select: <kbd className="px-1 bg-muted rounded">Enter</kbd></span>
                  </div>
                )}
              </div>
            </Command>
          </DialogContent>
        </Dialog>
      </TooltipProvider>
    );
  }

  // Inline variant (default dropdown)
  return (
    <div className={cn("relative w-full", className)} ref={commandRef}>
      <TooltipProvider>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Tooltip>
            <TooltipTrigger asChild>
              <input
                className="flex h-10 w-full rounded-md border border-input bg-background pl-10 pr-10 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                placeholder={placeholder}
                value={query || ""}
                onChange={(e) => setQuery(e.target.value)}
                onFocus={() => setOpen(true)}
                ref={inputRef}
                aria-label="Search"
                aria-describedby="search-description"
                aria-expanded={open}
                aria-controls="search-results"
                role="combobox"
                autoFocus={autoFocus}
              />
            </TooltipTrigger>
            <TooltipContent side="bottom">
              <div className="space-y-1">
                <p>Search across tools, APIs, and perks</p>
                <div className="flex justify-between text-xs">
                  <span>Navigate: <kbd className="px-1 bg-muted rounded">↑</kbd> <kbd className="px-1 bg-muted rounded">↓</kbd></span>
                  <span>Select: <kbd className="px-1 bg-muted rounded">Enter</kbd></span>
                </div>
              </div>
            </TooltipContent>
          </Tooltip>
          
          {query && (
            <button
              onClick={() => {
                setQuery("");
                setOpen(false);
              }}
              className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              aria-label="Clear search"
            >
              <X className="h-4 w-4" />
            </button>
          )}
          
          {loading && (
            <Loader2 className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 animate-spin text-muted-foreground" />
          )}
          
          <span id="search-description" className="sr-only">
            Search for tools, AI solutions, developer resources, and more
          </span>
        </div>

        {open && (
          <div 
            className="absolute z-50 w-full mt-1 rounded-md border bg-popover shadow-md animate-in fade-in-0 zoom-in-95" 
            id="search-results"
          >
            <Command className="rounded-lg border shadow-md">
              {/* Render search results */}
              <SearchResults 
                groupedResults={groupedResults || {}}
                selectedIndex={selectedIndex}
                query={query || ""}
                filteredResults={filteredResults || []}
                handleSelect={handleSelect}
                loading={loading}
              />
              
              {/* Keyboard navigation hints */}
              {Array.isArray(filteredResults) && filteredResults.length > 0 && (
                <div className="p-2 border-t text-xs text-muted-foreground flex justify-between">
                  <span>Navigate: <kbd className="px-1 bg-muted rounded">↑</kbd> <kbd className="px-1 bg-muted rounded">↓</kbd></span>
                  <span>Select: <kbd className="px-1 bg-muted rounded">Enter</kbd></span>
                </div>
              )}
            </Command>
          </div>
        )}
      </TooltipProvider>
    </div>
  );
};

export default GlobalSearch;

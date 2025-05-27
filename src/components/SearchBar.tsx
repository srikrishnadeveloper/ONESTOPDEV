
import GlobalSearch from "./GlobalSearch";
import { cn } from "@/lib/utils";
import { TooltipProvider } from "@/components/ui/tooltip";

interface SearchBarProps {
  inSidebar?: boolean;
  className?: string;
}

const SearchBar = ({ inSidebar = false, className }: SearchBarProps) => {
  return (
    <div className={cn("relative w-full", inSidebar ? "max-w-full" : "max-w-xl", className)}>
      <TooltipProvider>
        <GlobalSearch 
          variant={inSidebar ? "inline" : "dialog"}
          className={inSidebar ? "w-full" : ""}
          maxResults={inSidebar ? 3 : 5}
          placeholder="Search tools, AI, perks, APIs..."
          autoFocus={false} // Set autoFocus to false to prevent keyboard from opening
        />
      </TooltipProvider>
    </div>
  );
};

export default SearchBar;

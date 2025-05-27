import { useState, useEffect } from "react";
import MainLayout from "@/layouts/MainLayout";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Search, X, ArrowRight } from "lucide-react";
import { webTools, webToolsTags, WebTool } from "@/data/webToolsData";
import WebToolCard from "@/components/WebToolCard";
import * as LucideIcons from "lucide-react";

const WebTools = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [filteredTools, setFilteredTools] = useState<WebTool[]>(webTools);

  // Filter tools based on search and selected tags
  useEffect(() => {
    const filtered = webTools.filter((tool) => {
      const matchesSearch =
        searchQuery === "" ||
        tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.description.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesTags =
        selectedTags.length === 0 ||
        selectedTags.every((tag) => tool.tags.includes(tag));

      return matchesSearch && matchesTags;
    });

    setFilteredTools(filtered);
  }, [searchQuery, selectedTags]);

  // Toggle tag selection
  const handleTagToggle = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag)
        ? prev.filter((t) => t !== tag)
        : [...prev, tag]
    );
  };

  // Clear all filters
  const clearFilters = () => {
    setSearchQuery("");
    setSelectedTags([]);
  };

  return (
    <MainLayout>
      {/* Hero Section with theme-aware background */}
      <div className="bg-background text-foreground py-20 relative overflow-hidden">
        {/* Grid background overlay */}
        <div className="absolute inset-0 grid-bg opacity-20"></div>
        
        {/* Gradient orbs for visual interest */}
        <div className="absolute top-1/4 -left-20 w-80 h-80 rounded-full bg-primary/10 blur-3xl"></div>
        <div className="absolute bottom-1/3 -right-20 w-80 h-80 rounded-full bg-accent/10 blur-3xl"></div>
        
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 primary-gradient bg-clip-text text-transparent tracking-tight">
            Web Tools
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-12 leading-relaxed">
            Explore a curated suite of 50+ developer tools to speed up your workflow and boost productivity.
          </p>
          
          {/* Search Input with Glow Effect */}
          <div className="relative max-w-2xl mx-auto mb-12 group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/60 to-accent/60 rounded-lg blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative bg-card rounded-lg flex items-center border border-border">
              <Search className="absolute left-4 text-muted-foreground h-5 w-5" />
              <Input
                type="search"
                placeholder="Search for tools..."
                className="pl-12 pr-10 py-6 bg-transparent border-none text-foreground placeholder:text-muted-foreground text-lg focus-visible:ring-1 focus-visible:ring-primary"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button 
                  className="absolute right-4 text-muted-foreground hover:text-foreground transition-colors"
                  onClick={() => setSearchQuery("")}
                >
                  <X size={18} />
                </button>
              )}
            </div>
          </div>

          {/* Category Filters - Horizontal Scrollable */}
          <div className="mb-8 max-w-4xl mx-auto">
            <div className="flex flex-wrap justify-center gap-2 p-2">
              {webToolsTags.map((category) => (
                <Badge
                  key={category}
                  variant={selectedTags.includes(category) ? "default" : "outline"}
                  className={`
                    cursor-pointer py-2 px-4 text-sm rounded-full transition-all 
                    ${selectedTags.includes(category) 
                      ? "bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70" 
                      : "border-border text-muted-foreground hover:border-muted-foreground/60 hover:bg-accent/5"
                    }
                  `}
                  onClick={() => handleTagToggle(category)}
                >
                  {category}
                </Badge>
              ))}
            </div>
          </div>

          {/* Show filter stats and clear button */}
          {(searchQuery || selectedTags.length > 0) && (
            <div className="flex items-center justify-center gap-3 mb-8">
              <p className="text-sm text-muted-foreground">
                Showing {filteredTools.length} of {webTools.length} tools
              </p>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={clearFilters}
                className="text-muted-foreground hover:text-foreground hover:bg-accent/10"
              >
                Clear filters
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Tool Grid */}
      <div className="container mx-auto px-4 py-16 -mt-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredTools.length > 0 ? (
            filteredTools.map((tool) => (
              <WebToolCard
                key={tool.id}
                name={tool.name}
                description={tool.description}
                tags={tool.tags}
                slug={tool.slug}
                icon={tool.icon as keyof typeof LucideIcons}
                url={tool.url}
              />
            ))
          ) : (
            <div className="col-span-full bg-card border border-border text-center py-16 rounded-xl">
              <h3 className="text-xl font-medium mb-3 text-foreground">No tools found</h3>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                Try adjusting your search or filter criteria to find the tool you're looking for
              </p>
              <Button onClick={clearFilters} className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70">
                Show all tools
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default WebTools;

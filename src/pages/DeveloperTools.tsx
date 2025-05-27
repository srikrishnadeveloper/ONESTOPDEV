
import { useState, useEffect } from "react";
import MainLayout from "@/layouts/MainLayout";
import { developerTools, allTags } from "@/data/developerToolsData";
import DeveloperToolCard from "@/components/DeveloperToolCard";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Search, X } from "lucide-react";

const DeveloperTools = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [filteredTools, setFilteredTools] = useState(developerTools);

  useEffect(() => {
    // Filter tools based on search query and selected tags
    const filtered = developerTools.filter((tool) => {
      const matchesSearch = tool.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           tool.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesTags = selectedTags.length === 0 || 
                         selectedTags.some(tag => tool.tags.includes(tag));
      
      return matchesSearch && matchesTags;
    });
    
    setFilteredTools(filtered);
    
    // Log for debugging
    console.log(`Filtered to ${filtered.length} tools`);
  }, [searchQuery, selectedTags]);

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag) 
        : [...prev, tag]
    );
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedTags([]);
  };

  const handleToolClick = (toolName: string) => {
    console.log(`User clicked ${toolName}`);
  };

  return (
    <MainLayout>
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Developer Tools</h1>
            <p className="text-muted-foreground text-lg">
              A curated collection of essential tools and services for modern web development
            </p>
          </div>

          {/* Search and filters */}
          <div className="mb-8 space-y-4">
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                type="search"
                placeholder="Search for tools..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus={false} // Ensure we don't auto-focus
              />
              {(searchQuery || selectedTags.length > 0) && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 px-2"
                  onClick={clearFilters}
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>

            <div className="flex flex-wrap gap-2 justify-center max-w-3xl mx-auto">
              {allTags.map((tag) => (
                <Badge
                  key={tag}
                  variant={selectedTags.includes(tag) ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => toggleTag(tag)}
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          {/* Tools grid */}
          {filteredTools.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredTools.map((tool) => (
                <DeveloperToolCard
                  key={tool.id}
                  tool={tool}
                  onClick={() => handleToolClick(tool.name)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-lg text-muted-foreground mb-4">No tools match your filters</p>
              <Button onClick={clearFilters}>Clear Filters</Button>
            </div>
          )}
        </div>
      </section>
    </MainLayout>
  );
};

export default DeveloperTools;

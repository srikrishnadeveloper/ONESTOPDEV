
import { useState, useMemo } from "react";
import { Search, Filter, X, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Toggle } from "@/components/ui/toggle";
import MainLayout from "@/layouts/MainLayout";
import { apiList } from "@/data/apisData";
import { cn } from "@/lib/utils";
import * as LucideIcons from "lucide-react";

const DeveloperApis = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  // All available categories from the API data
  const categories = useMemo(() => {
    const categorySet = new Set<string>();
    apiList.forEach((api) => {
      api.tags.forEach((tag) => categorySet.add(tag));
    });
    return Array.from(categorySet).sort();
  }, []);

  // Filter APIs based on search query and selected categories
  const filteredApis = useMemo(() => {
    return apiList.filter((api) => {
      // Search filter
      const matchesSearch = 
        searchQuery === "" || 
        api.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        api.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        api.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      
      // Category filter
      const matchesCategory = 
        selectedCategories.length === 0 || 
        api.tags.some(tag => selectedCategories.includes(tag));
      
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategories]);

  const handleCategoryToggle = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setSearchQuery("");
  };

  return (
    <MainLayout>
      <div className="container py-8 max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">Developer APIs</h1>
          <p className="mt-2 text-lg text-muted-foreground">
            Explore free and powerful APIs to supercharge your next project.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search APIs by name or category..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
            {searchQuery && (
              <Button
                variant="ghost"
                size="sm"
                className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 p-0"
                onClick={() => setSearchQuery("")}
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
          
          <Popover open={showFilters} onOpenChange={setShowFilters}>
            <PopoverTrigger asChild>
              <Button variant="outline" className="sm:w-auto w-full">
                <Filter className="mr-2 h-4 w-4" />
                Filter
                {selectedCategories.length > 0 && (
                  <Badge variant="secondary" className="ml-2">
                    {selectedCategories.length}
                  </Badge>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">Categories</h4>
                  {selectedCategories.length > 0 && (
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-auto p-0 text-muted-foreground"
                      onClick={clearFilters}
                    >
                      Clear all
                    </Button>
                  )}
                </div>
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <Toggle
                      key={category}
                      pressed={selectedCategories.includes(category)}
                      onPressedChange={() => handleCategoryToggle(category)}
                      size="sm"
                      variant="outline"
                    >
                      {category}
                    </Toggle>
                  ))}
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>

        {/* Selected Filters Display */}
        {selectedCategories.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {selectedCategories.map((category) => (
              <Badge 
                key={category}
                variant="secondary"
                className="flex items-center gap-1 pl-2 pr-1 py-1"
              >
                {category}
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-5 w-5 p-0 rounded-full hover:bg-secondary"
                  onClick={() => handleCategoryToggle(category)}
                >
                  <X className="h-3 w-3" />
                </Button>
              </Badge>
            ))}
            <Button
              variant="ghost"
              size="sm"
              className="text-muted-foreground h-7"
              onClick={clearFilters}
            >
              Clear all
            </Button>
          </div>
        )}

        {/* Results count */}
        <div className="mb-6">
          <p className="text-sm text-muted-foreground">
            {filteredApis.length} {filteredApis.length === 1 ? 'API' : 'APIs'} found
          </p>
        </div>

        {/* API Cards Grid */}
        {filteredApis.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredApis.map((api) => {
              // Get the appropriate icon
              const IconComponent = api.icon ? (LucideIcons[api.icon as keyof typeof LucideIcons] as React.ComponentType<{ className?: string }>) : LucideIcons.Code;
              
              return (
                <Card key={api.name} className="flex flex-col hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <CardContent className="flex-grow p-6">
                    <div className="flex items-start gap-3 mb-4">
                      <div className="p-2 bg-primary/10 text-primary rounded-md flex-shrink-0">
                        <IconComponent className="h-5 w-5" />
                      </div>
                      <div className="w-full overflow-hidden">
                        <h3 className="font-medium text-lg truncate">{api.name}</h3>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {api.tags.map((tag) => (
                            <Badge key={tag} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-3">
                      {api.description}
                    </p>
                  </CardContent>
                  <CardFooter className="p-6 pt-0 flex gap-2 flex-wrap">
                    <Button
                      variant="outline"
                      className="flex-1 min-w-[120px]"
                      onClick={() => window.open(api.url, "_blank", "noopener,noreferrer")}
                    >
                      View Docs
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </Button>
                    {api.tryLink && (
                      <Button
                        variant="secondary"
                        className="flex-1 min-w-[120px]"
                        onClick={() => window.open(api.tryLink, "_blank", "noopener,noreferrer")}
                      >
                        Try Example
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </Button>
                    )}
                  </CardFooter>
                </Card>
              );
            })}
          </div>
        ) : (
          // Empty state
          <div className="flex flex-col items-center justify-center p-12 text-center border rounded-lg">
            <Search className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">No APIs found</h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your search or filter criteria.
            </p>
            <Button onClick={clearFilters}>Clear all filters</Button>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default DeveloperApis;

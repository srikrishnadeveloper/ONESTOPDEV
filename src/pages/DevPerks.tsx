import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import MainLayout from "@/layouts/MainLayout";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Search, Filter, ExternalLink, X, Check, AlertCircle } from "lucide-react";
import * as Icons from "lucide-react";
import { perks, perkTags } from "@/data/perksData";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Define the Perk type
interface Perk {
  id: string;
  name: string;
  description: string;
  tags: string[];
  link: string;
  icon: keyof typeof Icons;
  isVerified?: boolean;
  isNew?: boolean;
  comingSoon?: boolean;
}
const DevPerks = () => {
  const {
    toast
  } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [filteredPerks, setFilteredPerks] = useState<Perk[]>(perks);
  const [showFilters, setShowFilters] = useState(false);

  // Filter perks based on search and selected tags
  useEffect(() => {
    const filtered = perks.filter(perk => {
      const matchesSearch = searchQuery === "" || perk.name.toLowerCase().includes(searchQuery.toLowerCase()) || perk.description.toLowerCase().includes(searchQuery.toLowerCase()) || perk.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesTags = selectedTags.length === 0 || selectedTags.every(tag => perk.tags.includes(tag));
      return matchesSearch && matchesTags;
    });
    setFilteredPerks(filtered);
  }, [searchQuery, selectedTags]);

  // Toggle tag selection
  const handleTagToggle = (tag: string) => {
    setSelectedTags(prev => prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]);
  };

  // Clear all filters
  const clearFilters = () => {
    setSearchQuery("");
    setSelectedTags([]);
  };

  // Handle external link
  const handlePerkClick = (perk: Perk) => {
    if (perk.comingSoon) {
      toast({
        title: "Coming Soon",
        description: `${perk.name} will be available soon. Stay tuned!`,
        variant: "default"
      });
      return;
    }
    window.open(perk.link, "_blank", "noopener,noreferrer");
    toast({
      title: "Opening External Link",
      description: `You're being redirected to ${perk.name}`
    });
  };
  return <MainLayout>
      <div className="container mx-auto px-4 py-12">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-3 primary-gradient bg-clip-text text-transparent">
            Developer Perks
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10">
            Unlock free credits, tools, and resources made for devs and students.
          </p>

          {/* Search and Filter Section */}
          <div className="relative max-w-md mx-auto mb-8">
            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input 
                  type="search" 
                  placeholder="Search perks..." 
                  value={searchQuery} 
                  onChange={e => setSearchQuery(e.target.value)} 
                  className="pl-10 pr-8 w-full h-10" 
                />
                {searchQuery && (
                  <button 
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground" 
                    onClick={() => setSearchQuery("")}
                    aria-label="Clear search"
                  >
                    <X size={16} />
                  </button>
                )}
              </div>
              
              <Popover open={showFilters} onOpenChange={setShowFilters}>
                <PopoverTrigger asChild>
                  <Button variant={selectedTags.length > 0 ? "default" : "outline"} className={selectedTags.length > 0 ? "bg-primary/90 hover:bg-primary" : ""}>
                    <Filter className="h-4 w-4 mr-2" />
                    <span>Filters</span>
                    {selectedTags.length > 0 && <Badge variant="secondary" className="ml-2">{selectedTags.length}</Badge>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-72 p-4" align="end">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium">Filter Perks</h3>
                      {selectedTags.length > 0 && <Button variant="ghost" size="sm" onClick={clearFilters} className="text-sm text-muted-foreground hover:text-foreground">
                          Clear all
                        </Button>}
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      {perkTags.map(tag => <Badge key={tag} variant={selectedTags.includes(tag) ? "default" : "outline"} className="cursor-pointer" onClick={() => handleTagToggle(tag)}>
                          {tag}
                        </Badge>)}
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </div>

          {/* Active Filters Display */}
          {selectedTags.length > 0 && <div className="flex flex-wrap justify-center gap-2 mb-6">
              {selectedTags.map(tag => <Badge key={tag} variant="secondary" className="flex items-center gap-1 pl-2 pr-1 py-[6px]">
                  {tag}
                  <Button variant="ghost" size="sm" className="h-5 w-5 p-0 rounded-full hover:bg-muted" onClick={() => handleTagToggle(tag)}>
                    <X className="h-3 w-3" />
                    <span className="sr-only">Remove {tag} filter</span>
                  </Button>
                </Badge>)}
              {selectedTags.length > 0 && <Button variant="ghost" size="sm" onClick={clearFilters} className="text-xs text-muted-foreground hover:text-foreground">
                  Clear all filters
                </Button>}
            </div>}

          {/* Results count */}
          <div className="text-sm text-muted-foreground mb-8">
            Showing {filteredPerks.length} of {perks.length} perks
          </div>
        </div>

        {/* Perks Grid */}
        {filteredPerks.length > 0 ? <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredPerks.map(perk => <PerkCard key={perk.id} perk={perk} onClick={() => handlePerkClick(perk)} />)}
          </div> : <div className="text-center py-16">
            <AlertCircle className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">No perks found</h3>
            <p className="text-muted-foreground mb-6">
              Try adjusting your search or filter criteria
            </p>
            <Button onClick={clearFilters}>Show all perks</Button>
          </div>}
      </div>
    </MainLayout>;
};

// Perk Card Component
const PerkCard = ({
  perk,
  onClick
}: {
  perk: Perk;
  onClick: () => void;
}) => {
  const IconComponent = Icons[perk.icon] as LucideIcon;
  return <Card className={cn("h-full transition-all duration-300 hover:-translate-y-1 hover:shadow-lg", perk.comingSoon ? "opacity-75" : "cursor-pointer")}>
      <CardContent className="p-6 flex flex-col h-full">
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-primary/10 text-primary rounded-md">
              {IconComponent && <IconComponent size={20} />}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-medium text-sm py-0 mx-0 my-[8px]">{perk.name}</h3>
                {perk.isVerified}
                {perk.isNew && <Badge variant="default" className="text-xs">New</Badge>}
              </div>
              <div className="flex flex-wrap gap-1 mt-1">
                {perk.tags.slice(0, 2).map(tag => <Badge key={tag} variant="secondary" className="text-xs rounded-sm my-[10px]">
                    {tag}
                  </Badge>)}
                {perk.tags.length > 2 && <Badge variant="outline" className="text-xs">
                    +{perk.tags.length - 2}
                  </Badge>}
              </div>
            </div>
          </div>
        </div>
        
        <p className="text-sm text-muted-foreground flex-grow">
          {perk.description}
        </p>
        
        <CardFooter className="p-0 pt-4">
          <Button className="w-full group" variant={perk.comingSoon ? "secondary" : "outline"} onClick={onClick} disabled={perk.comingSoon} aria-label={perk.comingSoon ? `${perk.name} is coming soon` : `Open ${perk.name} website`}>
            {perk.comingSoon ? "Coming Soon" : "Claim Perk"}
            {!perk.comingSoon && <ExternalLink className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />}
          </Button>
        </CardFooter>
      </CardContent>
    </Card>;
};
export default DevPerks;


import { useState, useEffect } from "react";
import MainLayout from "@/layouts/MainLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  Brain, Code, Filter, Heart, Image, MessageSquare, 
  Music, Search, Video, FileCode, ChartBar, Bot, 
  FileText, Mic, ImagePlus, CircleDollarSign, Tag, 
  Circle, X, ChevronLeft 
} from "lucide-react";
import AiToolCard from "@/components/ai/AiToolCard";
import { aiToolsData } from "@/data/aiToolsData";
import { useToast } from "@/hooks/use-toast";

type Category = 
  | "All Categories"
  | "Text Generation"
  | "Image Generation" 
  | "Audio & Music" 
  | "Video Generation" 
  | "Code Assistants"
  | "Data & Analytics"
  | "No-Code AI"
  | "Writing & Content"
  | "Speech & Voice"
  | "Image Editing";

type PricingModel = "All Pricing" | "Free" | "Paid" | "Freemium";
type SortOption = "Most Popular" | "Newest" | "Alphabetical";

const AiHub = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<Category>("All Categories");
  const [selectedPricing, setSelectedPricing] = useState<PricingModel>("All Pricing");
  const [sortBy, setSortBy] = useState<SortOption>("Most Popular");
  const [favorites, setFavorites] = useState<string[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  
  useEffect(() => {
    const userLoggedIn = localStorage.getItem("userLoggedIn") === "true";
    setIsLoggedIn(userLoggedIn);
    
    if (userLoggedIn) {
      const savedFavorites = localStorage.getItem("aiToolFavorites");
      if (savedFavorites) {
        setFavorites(JSON.parse(savedFavorites));
      }
    }
  }, []);

  const filteredTools = aiToolsData.filter(tool => {
    const matchesSearch = 
      searchQuery === "" || 
      tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = 
      selectedCategory === "All Categories" || 
      tool.category === selectedCategory;
    
    const matchesPricing = 
      selectedPricing === "All Pricing" || 
      tool.pricingModel === selectedPricing;
    
    return matchesSearch && matchesCategory && matchesPricing;
  });

  const sortedTools = [...filteredTools].sort((a, b) => {
    if (sortBy === "Most Popular") {
      return b.popularity - a.popularity;
    } else if (sortBy === "Newest") {
      return new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime();
    } else {
      return a.name.localeCompare(b.name);
    }
  });

  const toggleFavorite = (toolId: string) => {
    if (!isLoggedIn) {
      toast({
        title: "Login Required",
        description: "Please log in to save favorites",
        variant: "destructive",
      });
      return;
    }

    setFavorites(prev => {
      const newFavorites = prev.includes(toolId)
        ? prev.filter(id => id !== toolId)
        : [...prev, toolId];
      
      localStorage.setItem("aiToolFavorites", JSON.stringify(newFavorites));
      
      return newFavorites;
    });

    toast({
      title: favorites.includes(toolId) ? "Removed from favorites" : "Added to favorites",
      description: favorites.includes(toolId) 
        ? "This tool has been removed from your favorites" 
        : "This tool has been added to your favorites",
    });
  };

  const getCategoryIcon = (category: Category) => {
    switch(category) {
      case "Text Generation": return <MessageSquare className="h-5 w-5" />;
      case "Image Generation": return <Image className="h-5 w-5" />;
      case "Audio & Music": return <Music className="h-5 w-5" />;
      case "Video Generation": return <Video className="h-5 w-5" />;
      case "Code Assistants": return <Code className="h-5 w-5" />;
      case "Data & Analytics": return <ChartBar className="h-5 w-5" />;
      case "No-Code AI": return <Bot className="h-5 w-5" />;
      case "Writing & Content": return <FileText className="h-5 w-5" />;
      case "Speech & Voice": return <Mic className="h-5 w-5" />;
      case "Image Editing": return <ImagePlus className="h-5 w-5" />;
      default: return <Brain className="h-5 w-5" />;
    }
  };

  const getPricingIcon = (pricing: PricingModel) => {
    switch(pricing) {
      case "Free": return <Circle className="h-5 w-5" />;
      case "Paid": return <CircleDollarSign className="h-5 w-5" />;
      case "Freemium": return <Tag className="h-5 w-5" />;
      default: return null;
    }
  };

  const categoryButtons: { name: Category; icon: React.ReactNode }[] = [
    { name: "All Categories", icon: <Brain className="h-5 w-5" /> },
    { name: "Text Generation", icon: <MessageSquare className="h-5 w-5" /> },
    { name: "Image Generation", icon: <Image className="h-5 w-5" /> },
    { name: "Audio & Music", icon: <Music className="h-5 w-5" /> },
    { name: "Video Generation", icon: <Video className="h-5 w-5" /> },
    { name: "Code Assistants", icon: <Code className="h-5 w-5" /> },
    { name: "Data & Analytics", icon: <ChartBar className="h-5 w-5" /> },
    { name: "No-Code AI", icon: <Bot className="h-5 w-5" /> },
    { name: "Writing & Content", icon: <FileText className="h-5 w-5" /> },
    { name: "Speech & Voice", icon: <Mic className="h-5 w-5" /> },
    { name: "Image Editing", icon: <ImagePlus className="h-5 w-5" /> },
  ];

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto text-center mb-10">
          <h1 className="text-4xl font-bold mb-4">AI Hub</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Discover and explore 50+ cutting-edge AI tools across various categories to enhance your workflow and productivity
          </p>
        </div>

        <div className="bg-background/80 backdrop-blur-sm rounded-xl border p-4 mb-8 shadow-sm">
          {!showFilters ? (
            <div className="flex flex-col md:flex-row gap-4 mb-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search AI tools..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <div className="flex gap-2">
                <Button 
                  variant="default" 
                  className="w-full md:w-auto bg-primary/90 hover:bg-primary"
                  onClick={() => setShowFilters(true)}
                >
                  <Filter className="h-4 w-4 mr-2" />
                  <span>Filters</span>
                </Button>
                
                {isLoggedIn && (
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setSelectedCategory("All Categories")}
                    className={`hidden md:flex ${favorites.length > 0 ? "border-primary text-primary" : ""}`}
                  >
                    <Heart className={`h-4 w-4 mr-2 ${favorites.length > 0 ? "fill-primary" : ""}`} />
                    <span>{favorites.length} Favorites</span>
                  </Button>
                )}
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setShowFilters(false)}
                  className="gap-1"
                >
                  <ChevronLeft className="h-4 w-4" />
                  <span>Back</span>
                </Button>
                <h3 className="font-medium text-center flex-1">Filter Tools</h3>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => {
                    setSelectedCategory("All Categories");
                    setSelectedPricing("All Pricing");
                    setSortBy("Most Popular");
                  }}
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  Reset
                </Button>
              </div>
              
              <div>
                <h4 className="font-medium mb-2">Categories</h4>
                <div className="flex flex-wrap gap-2">
                  {categoryButtons.map((category) => (
                    <Button
                      key={category.name}
                      variant={selectedCategory === category.name ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedCategory(category.name)}
                      className="rounded-full"
                    >
                      {category.icon}
                      <span className="ml-2">{category.name === "All Categories" ? "All" : category.name}</span>
                    </Button>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="font-medium mb-2">Pricing</h4>
                <Select 
                  value={selectedPricing}
                  onValueChange={(value) => setSelectedPricing(value as PricingModel)}
                >
                  <SelectTrigger className="w-full">
                    <CircleDollarSign className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="All Pricing" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All Pricing">All Pricing</SelectItem>
                    <SelectItem value="Free">Free</SelectItem>
                    <SelectItem value="Paid">Paid</SelectItem>
                    <SelectItem value="Freemium">Freemium</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <h4 className="font-medium mb-2">Sort By</h4>
                <Select
                  value={sortBy}
                  onValueChange={(value) => setSortBy(value as SortOption)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Most Popular">Most Popular</SelectItem>
                    <SelectItem value="Newest">Newest</SelectItem>
                    <SelectItem value="Alphabetical">Alphabetical</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="pt-2">
                <Button 
                  className="w-full" 
                  onClick={() => setShowFilters(false)}
                >
                  Apply Filters
                </Button>
              </div>
            </div>
          )}

          {!showFilters && (
            <div className="flex flex-wrap items-center gap-2 mt-2">
              {selectedCategory !== "All Categories" && (
                <div className="inline-flex items-center bg-primary/10 text-primary rounded-full px-3 py-1 text-sm">
                  {getCategoryIcon(selectedCategory)}
                  <span className="ml-2">{selectedCategory}</span>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-5 w-5 p-0 ml-1 hover:bg-primary/20" 
                    onClick={() => setSelectedCategory("All Categories")}
                  >
                    <X className="h-3 w-3" />
                    <span className="sr-only">Remove filter</span>
                  </Button>
                </div>
              )}
              
              {selectedPricing !== "All Pricing" && (
                <div className="inline-flex items-center bg-primary/10 text-primary rounded-full px-3 py-1 text-sm">
                  {getPricingIcon(selectedPricing)}
                  <span className="ml-2">{selectedPricing}</span>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-5 w-5 p-0 ml-1 hover:bg-primary/20" 
                    onClick={() => setSelectedPricing("All Pricing")}
                  >
                    <X className="h-3 w-3" />
                    <span className="sr-only">Remove filter</span>
                  </Button>
                </div>
              )}
              
              {(selectedCategory !== "All Categories" || selectedPricing !== "All Pricing") && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-sm text-muted-foreground hover:text-foreground"
                  onClick={() => {
                    setSelectedCategory("All Categories");
                    setSelectedPricing("All Pricing");
                  }}
                >
                  Clear all
                </Button>
              )}
            </div>
          )}
        </div>

        <div>
          <div className="flex justify-between items-center mb-6">
            <p className="text-muted-foreground">
              Showing <span className="font-medium text-foreground">{sortedTools.length}</span> results
            </p>
            {isLoggedIn && (
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setSelectedCategory("All Categories")}
                className={`md:hidden ${favorites.length > 0 ? "border-primary text-primary" : ""}`}
              >
                <Heart className={`h-4 w-4 mr-2 ${favorites.length > 0 ? "fill-primary" : ""}`} />
                <span>{favorites.length} Favorites</span>
              </Button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedTools.map((tool) => (
              <AiToolCard
                key={tool.id}
                tool={tool}
                isFavorite={favorites.includes(tool.id)}
                onToggleFavorite={() => toggleFavorite(tool.id)}
                getCategoryIcon={getCategoryIcon}
                getPricingIcon={getPricingIcon}
                isLoggedIn={isLoggedIn}
              />
            ))}
          </div>

          {sortedTools.length === 0 && (
            <div className="text-center py-20">
              <Brain className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">No AI tools found</h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your search or filters to find what you're looking for
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("All Categories");
                  setSelectedPricing("All Pricing");
                }}
              >
                Reset Filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default AiHub;

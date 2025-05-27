import React from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ExternalLink, Heart } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { AiTool } from "@/data/aiToolsData";
import { useToast } from "@/hooks/use-toast";
interface AiToolCardProps {
  tool: AiTool;
  isFavorite: boolean;
  onToggleFavorite: () => void;
  getCategoryIcon: (category: string) => React.ReactNode;
  getPricingIcon: (pricing: string) => React.ReactNode;
  isLoggedIn: boolean;
}
const AiToolCard: React.FC<AiToolCardProps> = ({
  tool,
  isFavorite,
  onToggleFavorite,
  getCategoryIcon,
  getPricingIcon,
  isLoggedIn
}) => {
  const {
    toast
  } = useToast();
  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isLoggedIn) {
      toast({
        title: "Login Required",
        description: "Please log in to save favorites",
        variant: "destructive"
      });
      return;
    }
    onToggleFavorite();
  };
  const handleCardClick = () => {
    window.open(tool.link, '_blank');
  };
  return <Card className="group h-full overflow-hidden flex flex-col hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-2 cursor-pointer" onClick={handleCardClick}>
      <div className="p-6 flex flex-col h-full">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 text-primary rounded-md flex-shrink-0">
              {getCategoryIcon(tool.category)}
            </div>
            <h3 className="font-medium text-lg">{tool.name}</h3>
          </div>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button onClick={handleFavoriteClick} className="text-muted-foreground hover:text-primary focus:outline-none transition-colors" aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}>
                  
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{isFavorite ? "Remove from favorites" : "Add to favorites"}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        
        <div className="mb-2 flex items-center gap-2">
          <span className="text-xs bg-secondary px-2 py-1 rounded-full inline-flex items-center gap-1">
            {getCategoryIcon(tool.category)}
            <span>{tool.category}</span>
          </span>
          <span className="text-xs bg-muted px-2 py-1 rounded-full inline-flex items-center gap-1">
            {getPricingIcon(tool.pricingModel)}
            <span>{tool.pricingModel}</span>
          </span>
        </div>
        
        <p className="text-sm text-muted-foreground mb-4 flex-grow">{tool.description}</p>
        
        {/* Feature Highlights */}
        <div className="mb-4">
          <h4 className="font-medium text-sm mb-2">Key Features:</h4>
          <ul className="text-xs text-muted-foreground space-y-1">
            {tool.features.map((feature, idx) => <li key={idx} className="flex items-start gap-2">
                <span className="h-4 w-4 text-primary flex-shrink-0">•</span>
                <span>{feature}</span>
              </li>)}
          </ul>
        </div>
        
        <Button variant="outline" className="w-full mt-auto group-hover:bg-primary group-hover:text-primary-foreground transition-colors" onClick={e => {
        e.stopPropagation();
        window.open(tool.link, '_blank');
      }}>
          <span>Try Now</span>
          <ExternalLink className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Button>
      </div>
    </Card>;
};
export default AiToolCard;
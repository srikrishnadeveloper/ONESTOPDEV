
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink } from "lucide-react";
import { DeveloperTool } from "@/data/developerToolsData";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

interface DeveloperToolCardProps {
  tool: DeveloperTool;
  onClick: () => void;
}

const DeveloperToolCard: React.FC<DeveloperToolCardProps> = ({ tool, onClick }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleVisitClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    window.open(tool.url, "_blank", "noopener,noreferrer");
    console.log(`User visited ${tool.name} website`);
  };

  return (
    <Card 
      className={cn(
        "group overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1",
        "cursor-pointer h-full flex flex-col"
      )}
      onClick={onClick}
    >
      <CardContent className="p-6 flex flex-col h-full">
        <div className="flex items-start gap-3 mb-4">
          <div className="relative h-10 w-10 overflow-hidden rounded-md bg-muted flex-shrink-0">
            {!imageLoaded && !imageError && (
              <Skeleton className="h-full w-full absolute" />
            )}
            
            {!imageError ? (
              <img
                src={tool.logo}
                alt={`${tool.name} logo`}
                className={cn(
                  "h-full w-full object-contain",
                  !imageLoaded && "opacity-0",
                  imageLoaded && "opacity-100 transition-opacity"
                )}
                onLoad={() => setImageLoaded(true)}
                onError={() => setImageError(true)}
              />
            ) : (
              <div className="h-full w-full flex items-center justify-center bg-muted text-muted-foreground">
                {tool.name.charAt(0)}
              </div>
            )}
          </div>
          
          <div>
            <h3 className="font-medium text-lg">{tool.name}</h3>
            <div className="flex flex-wrap gap-1 mt-1">
              {tool.tags.slice(0, 2).map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
              {tool.tags.length > 2 && (
                <Badge variant="outline" className="text-xs">
                  +{tool.tags.length - 2}
                </Badge>
              )}
            </div>
          </div>
        </div>

        <p className="text-sm text-muted-foreground mb-4 flex-grow">
          {tool.description}
        </p>

        <Button
          onClick={handleVisitClick}
          variant="outline"
          className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
        >
          Visit Website
          <ExternalLink className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Button>
      </CardContent>
    </Card>
  );
};

export default DeveloperToolCard;


import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, LucideIcon } from "lucide-react";
import * as LucideIcons from "lucide-react";
import { Link } from "react-router-dom";

interface WebToolCardProps {
  name: string;
  description: string;
  tags: string[];
  slug: string;
  icon: keyof typeof LucideIcons;
  url?: string;
  onClick?: () => void;
}

const WebToolCard: React.FC<WebToolCardProps> = ({
  name,
  description,
  tags,
  slug,
  icon,
  url,
  onClick,
}) => {
  // Fix: explicitly cast to LucideIcon type
  const IconComponent = LucideIcons[icon] as LucideIcon;

  return (
    <Card 
      className="h-full transition-all duration-300 hover:shadow-xl cursor-pointer border-border bg-card backdrop-blur-sm"
    >
      <CardContent className="p-6 flex flex-col h-full">
        <div className="flex items-start gap-4 mb-4">
          <div className="p-3 bg-gradient-to-br from-primary/20 to-accent/20 text-primary rounded-xl">
            {IconComponent && <IconComponent size={22} />}
          </div>
          <div>
            <h3 className="font-semibold text-lg text-foreground">{name}</h3>
            <div className="flex flex-wrap gap-1 mt-2">
              {tags.slice(0, 2).map((tag) => (
                <Badge key={tag} variant="outline" className="text-xs border-border bg-accent/5 text-muted-foreground">
                  {tag}
                </Badge>
              ))}
              {tags.length > 2 && (
                <Badge variant="outline" className="text-xs border-border bg-accent/5 text-muted-foreground">
                  +{tags.length - 2}
                </Badge>
              )}
            </div>
          </div>
        </div>
        
        <p className="text-sm text-muted-foreground flex-grow leading-relaxed">
          {description}
        </p>
        
        <CardFooter className="p-0 pt-5">
          <Button 
            className="w-full group bg-accent/5 border border-border hover:bg-gradient-to-r hover:from-primary hover:to-accent hover:border-transparent text-muted-foreground hover:text-primary-foreground"
            asChild
          >
            {url ? (
              <a href={url} target="_blank" rel="noopener noreferrer">
                Launch Tool
                <ExternalLink className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
            ) : (
              <Link to={`/tools/${slug}`}>
                Launch Tool
                <ExternalLink className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            )}
          </Button>
        </CardFooter>
      </CardContent>
    </Card>
  );
};

export default WebToolCard;

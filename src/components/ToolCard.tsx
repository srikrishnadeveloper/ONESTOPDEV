
import { cn } from "@/lib/utils";
import { ExternalLink } from "lucide-react";

interface ToolCardProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  imageSrc?: string;
  link?: string;
  className?: string;
  tags?: string[];
  isExternal?: boolean;
}

const ToolCard: React.FC<ToolCardProps> = ({
  title,
  description,
  icon,
  imageSrc,
  link,
  className,
  tags,
  isExternal = false,
}) => {
  const content = (
    <div className="p-6 h-full flex flex-col">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          {icon && (
            <div className="p-2 bg-primary/10 text-primary rounded-md">
              {icon}
            </div>
          )}
          {imageSrc && (
            <div className="h-10 w-10 overflow-hidden rounded-md bg-muted">
              <img src={imageSrc} alt={title} className="h-full w-full object-cover" />
            </div>
          )}
          <h3 className="font-medium">{title}</h3>
        </div>
        {link && isExternal && (
          <ExternalLink
            size={16}
            className="text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity"
          />
        )}
      </div>

      <p className="text-sm text-muted-foreground flex-grow">{description}</p>

      {tags && tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-4">
          {tags.map((tag) => (
            <span
              key={tag}
              className="inline-block px-2 py-1 text-xs rounded-full bg-secondary text-secondary-foreground"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );

  // For internal links, we don't wrap in an <a> tag because we use React Router's Link component
  return (
    <div
      className={cn(
        "group block glass-card overflow-hidden rounded-xl transition-all duration-300",
        "hover:shadow-xl hover:-translate-y-1",
        link ? "cursor-pointer" : "cursor-default",
        className
      )}
    >
      {content}
    </div>
  );
};

export default ToolCard;

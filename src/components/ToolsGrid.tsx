
import { Link } from "react-router-dom";
import ToolCard from "./ToolCard";
import { Code, Terminal, FileCode, LayoutGrid, Regex, Database, Palette, Globe } from "lucide-react";

interface ToolsGridProps {
  title: string;
  subtitle?: string;
  category?: string;
}

const ToolsGrid: React.FC<ToolsGridProps> = ({ title, subtitle, category }) => {
  // Sample tools data - in a real application, this would come from an API or database
  const tools = [
    {
      title: "HTML Validator",
      description: "Validate your HTML code against W3C standards and fix common errors.",
      icon: <Code size={20} />,
      tags: ["HTML", "Validation"],
      link: "/tools/html-validator",
    },
    {
      title: "CSS Formatter",
      description: "Format and beautify your CSS code with customizable options.",
      icon: <LayoutGrid size={20} />,
      tags: ["CSS", "Formatting"],
      link: "/tools/css-formatter",
    },
    {
      title: "JavaScript Minifier",
      description: "Minify your JavaScript code to improve loading performance.",
      icon: <FileCode size={20} />,
      tags: ["JavaScript", "Performance"],
      link: "/tools/javascript-minifier",
    },
    {
      title: "Regex Tester",
      description: "Test and debug regular expressions with live feedback and explanations.",
      icon: <Regex size={20} />,
      tags: ["Regex", "Testing"],
      link: "/tools/regex-tester",
    },
    {
      title: "Developer Tools",
      description: "A curated collection of popular development tools, services, and resources.",
      icon: <Globe size={20} />,
      tags: ["Resources", "Tools"],
      link: "/tools/developer-tools",
    },
    {
      title: "Color Palette Generator",
      description: "Generate beautiful color palettes with complementary colors and shades.",
      icon: <Palette size={20} />,
      tags: ["Colors", "Design"],
      link: "/tools/color-palette",
    },
  ];

  // Filter tools by category if provided
  const filteredTools = category
    ? tools.filter(tool => tool.tags?.includes(category))
    : tools;

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">{title}</h2>
          {subtitle && <p className="text-muted-foreground">{subtitle}</p>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredTools.map((tool, index) => (
            <Link to={tool.link} key={index} className="h-full">
              <ToolCard
                title={tool.title}
                description={tool.description}
                icon={tool.icon}
                tags={tool.tags}
                link={tool.link}
                className="h-full"
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ToolsGrid;

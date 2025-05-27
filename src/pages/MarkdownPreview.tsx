import { useState, useRef } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import MainLayout from "@/layouts/MainLayout";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Copy,
  Check,
  FileText,
  Download,
  Code,
  Layout,
  Grid,
  ArrowRight,
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { WebTool } from "@/data/webToolsData";
import WebToolCard from "@/components/WebToolCard";
import * as LucideIcons from "lucide-react";

// Sample recommended tools data
const recommendedTools: WebTool[] = [
  {
    id: "tool-1",
    name: "JSON Formatter",
    description: "Format, validate, and beautify your JSON with syntax highlighting.",
    slug: "json-formatter",
    tags: ["Formatters", "JSON", "Utilities"],
    icon: "Code"
  },
  {
    id: "tool-2",
    name: "HTTP Status Codes",
    description: "Complete reference for HTTP status codes with explanations.",
    slug: "http-status-codes",
    tags: ["Reference", "Web", "HTTP"],
    icon: "Globe"
  },
  {
    id: "tool-3",
    name: "CSS Formatter",
    description: "Format and beautify your CSS code or minify it for production.",
    slug: "css-formatter",
    tags: ["CSS", "Formatters", "Utilities"],
    icon: "Code"
  },
  {
    id: "tool-4",
    name: "Color Palette Generator",
    description: "Create beautiful color palettes for your web projects.",
    slug: "color-palette",
    tags: ["CSS", "Design", "Generators"],
    icon: "Palette"
  }
];

// Default markdown sample to show on initial load
const defaultMarkdown = `# Markdown Preview Tool

## Basic Formatting

**Bold text** and *italic text*

## Lists

### Unordered List
- Item 1
- Item 2
  - Nested item

### Ordered List
1. First item
2. Second item
3. Third item

## Code

Inline \`code\` example

\`\`\`javascript
// Code block
function greet() {
  console.log("Hello, world!");
}
\`\`\`

## Blockquotes

> This is a blockquote
> It can span multiple lines

## Links and Images

[Visit OneStopDev](https://onestopdev.io)

![Image Alt Text](https://via.placeholder.com/150)

## Tables

| Header 1 | Header 2 |
| -------- | -------- |
| Cell 1   | Cell 2   |
| Cell 3   | Cell 4   |

## Horizontal Rule

---

## Task Lists

- [x] Completed task
- [ ] Incomplete task
- [ ] Incomplete task
`;

const MarkdownPreview = () => {
  const [markdown, setMarkdown] = useState<string>(defaultMarkdown);
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const { toast } = useToast();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Handle textarea input change
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMarkdown(e.target.value);
  };

  // Copy markdown to clipboard
  const copyToClipboard = () => {
    navigator.clipboard.writeText(markdown);
    setIsCopied(true);
    
    toast({
      title: "Markdown Copied",
      description: "The markdown content has been copied to your clipboard.",
    });
    
    // Reset copy button after 2 seconds
    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };

  // Download markdown as .md file
  const downloadMarkdown = () => {
    const element = document.createElement("a");
    const file = new Blob([markdown], { type: "text/markdown" });
    element.href = URL.createObjectURL(file);
    element.download = "markdown-content.md";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    
    toast({
      title: "Markdown Downloaded",
      description: "Your markdown file has been downloaded successfully.",
    });
  };

  return (
    <MainLayout>
      {/* Hero Section */}
      <div className="bg-background text-foreground py-14 md:py-20 relative overflow-hidden">
        {/* Grid background overlay */}
        <div className="absolute inset-0 grid-bg opacity-20"></div>
        
        {/* Gradient orbs for visual interest */}
        <div className="absolute top-1/4 -left-20 w-80 h-80 rounded-full bg-primary/10 blur-3xl"></div>
        <div className="absolute bottom-1/3 -right-20 w-80 h-80 rounded-full bg-accent/10 blur-3xl"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 primary-gradient bg-clip-text text-transparent tracking-tight">
              Markdown Preview
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-6">
              Write markdown on the left and see the rendered preview on the right in real-time.
            </p>
          </div>
        </div>
      </div>

      {/* Main Tool Section */}
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Markdown Input */}
          <Card className="flex-1 border border-border bg-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
              <CardTitle className="text-xl font-medium">
                <div className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  Markdown Input
                </div>
              </CardTitle>
              <div className="flex items-center gap-3">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={downloadMarkdown}
                  className="h-8"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={copyToClipboard}
                  className="h-8"
                >
                  {isCopied ? (
                    <>
                      <Check className="h-4 w-4 mr-2" />
                      Copied
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4 mr-2" />
                      Copy
                    </>
                  )}
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Textarea
                ref={textareaRef}
                value={markdown}
                onChange={handleInputChange}
                placeholder="Write your markdown here..."
                className="font-mono text-sm min-h-[500px] resize-none"
              />
            </CardContent>
          </Card>

          {/* Markdown Preview */}
          <Card className="flex-1 border border-border bg-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
              <CardTitle className="text-xl font-medium">
                <div className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  Preview
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="markdown-preview border border-border rounded-md bg-background/50 p-6 min-h-[500px] overflow-auto">
                <ReactMarkdown 
                  remarkPlugins={[remarkGfm]}
                  className="prose prose-sm max-w-none dark:prose-invert prose-headings:font-semibold prose-headings:text-foreground prose-p:text-foreground/90 prose-strong:text-foreground prose-code:text-foreground prose-code:bg-muted prose-code:p-1 prose-code:rounded prose-code:before:content-none prose-code:after:content-none"
                >
                  {markdown}
                </ReactMarkdown>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tool explanation section */}
        <div className="mt-12 max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-4">How to Use This Tool</h2>
          <div className="space-y-4 text-muted-foreground">
            <p>
              The Markdown Preview tool allows you to write Markdown syntax and see it rendered in real-time.
            </p>
            
            <div className="space-y-2">
              <h3 className="text-lg font-medium text-foreground">Features:</h3>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>Real-time preview of Markdown content</li>
                <li>Support for all common Markdown syntax including tables and task lists</li>
                <li>Copy Markdown to clipboard with one click</li>
                <li>Download Markdown content as a .md file</li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-foreground">Common Markdown Syntax:</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-muted/30 p-4 rounded-md">
                  <h4 className="font-medium mb-2">Headers</h4>
                  <pre className="text-sm text-muted-foreground">
                    # Heading 1{"\n"}
                    ## Heading 2{"\n"}
                    ### Heading 3
                  </pre>
                </div>
                
                <div className="bg-muted/30 p-4 rounded-md">
                  <h4 className="font-medium mb-2">Formatting</h4>
                  <pre className="text-sm text-muted-foreground">
                    **Bold Text**{"\n"}
                    *Italic Text*{"\n"}
                    ~~Strikethrough~~
                  </pre>
                </div>
                
                <div className="bg-muted/30 p-4 rounded-md">
                  <h4 className="font-medium mb-2">Lists</h4>
                  <pre className="text-sm text-muted-foreground">
                    - Unordered item{"\n"}
                    1. Ordered item{"\n"}
                    - [ ] Task item
                  </pre>
                </div>
                
                <div className="bg-muted/30 p-4 rounded-md">
                  <h4 className="font-medium mb-2">Code</h4>
                  <pre className="text-sm text-muted-foreground">
                    `Inline code`{"\n"}
                    ```js{"\n"}
                    // Code block{"\n"}
                    ```
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recommended Tools Section */}
        <div className="mt-16 mb-8">
          <h2 className="text-2xl font-bold mb-6">Recommended Tools</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {recommendedTools.map((tool) => (
              <WebToolCard
                key={tool.id}
                name={tool.name}
                description={tool.description}
                tags={tool.tags}
                slug={tool.slug}
                icon={tool.icon as keyof typeof LucideIcons}
                url={tool.url}
              />
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default MarkdownPreview;

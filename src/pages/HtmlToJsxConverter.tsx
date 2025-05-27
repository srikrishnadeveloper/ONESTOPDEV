
import React, { useState, useEffect } from "react";
import MainLayout from "@/layouts/MainLayout";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { webTools } from "@/data/webToolsData";
import WebToolCard from "@/components/WebToolCard";
import { Copy, ArrowRight, Code2, FileCode, AlertTriangle } from "lucide-react";

const HtmlToJsxConverter: React.FC = () => {
  const [htmlInput, setHtmlInput] = useState<string>("");
  const [jsxOutput, setJsxOutput] = useState<string>("");
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Find related tools from webTools
  const relatedTools = webTools.filter(tool => 
    tool.slug !== "html-to-jsx" && 
    (tool.tags.includes("HTML") || tool.tags.includes("JavaScript") || tool.tags.includes("React"))
  ).slice(0, 4);

  // Convert HTML to JSX
  const convertToJsx = () => {
    try {
      if (!htmlInput.trim()) {
        setJsxOutput("");
        setError(null);
        return;
      }

      // Clean up and convert HTML to JSX
      let jsx = htmlInput;

      // Convert class to className
      jsx = jsx.replace(/class=/g, "className=");

      // Convert for to htmlFor
      jsx = jsx.replace(/for=/g, "htmlFor=");

      // Convert inline styles to JSX style objects
      jsx = jsx.replace(/style="([^"]*)"/g, (match, styleString) => {
        if (!styleString) return 'style={{}}';
        
        // Convert CSS properties to camelCase and create style object
        const styleObj = styleString.split(';')
          .filter(style => style.trim() !== '')
          .map(style => {
            const [property, value] = style.split(':').map(s => s.trim());
            if (!property || !value) return null;
            
            // Convert kebab-case to camelCase
            const camelProperty = property.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
            
            // Handle numeric values
            const processedValue = /^\d+$/.test(value) ? value : `'${value}'`;
            
            return `${camelProperty}: ${processedValue}`;
          })
          .filter(Boolean)
          .join(', ');
        
        return `style={{${styleObj}}}`;
      });

      // Convert self-closing tags
      const selfClosingTags = ['img', 'input', 'br', 'hr', 'meta', 'link', 'area', 'base', 'col', 'embed', 'param', 'source', 'track', 'wbr'];
      
      selfClosingTags.forEach(tag => {
        // Replace tags like <img> or <img attr="value"> with self-closing format
        const regex = new RegExp(`<${tag}([^>]*)(?<!/)>`, 'g');
        jsx = jsx.replace(regex, `<${tag}$1 />`);
      });

      // Handle boolean attributes (attributes without values)
      const booleanAttributes = ['disabled', 'checked', 'readOnly', 'required', 'autoFocus', 'multiple'];
      
      booleanAttributes.forEach(attr => {
        // Convert attributes like 'disabled' to 'disabled={true}'
        const regex = new RegExp(`(\\s${attr})(\\s|>)`, 'g');
        jsx = jsx.replace(regex, `$1={true}$2`);
      });

      // Convert invalid nested components
      // React doesn't allow <p> to contain <div>, so we detect likely issues
      // This is simple detection and isn't perfect
      if (/<p[^>]*>.*<div.*<\/p>/s.test(jsx)) {
        setError("Warning: You might have invalid nesting (like <p> containing block elements). This may cause rendering issues in React.");
      } else {
        setError(null);
      }

      setJsxOutput(jsx);
    } catch (err) {
      console.error("Conversion error:", err);
      setError("Error converting HTML to JSX. Please check your HTML syntax.");
      toast.error("Error converting HTML to JSX");
    }
  };

  const copyToClipboard = () => {
    if (!jsxOutput) return;
    
    navigator.clipboard.writeText(jsxOutput)
      .then(() => {
        setIsCopied(true);
        toast.success("JSX copied to clipboard!");
        
        setTimeout(() => {
          setIsCopied(false);
        }, 2000);
      })
      .catch(err => {
        console.error("Failed to copy:", err);
        toast.error("Failed to copy to clipboard");
      });
  };

  // Auto-convert when input changes (with debounce)
  useEffect(() => {
    const timer = setTimeout(() => {
      convertToJsx();
    }, 500);

    return () => clearTimeout(timer);
  }, [htmlInput]);

  const exampleHtml = `<div class="user-card">
  <img src="avatar.png">
  <h2 class="username">John Doe</h2>
  <p style="color: blue; font-size: 14px">Web Developer</p>
  <label for="userEmail">Email:</label>
  <input type="email" id="userEmail" disabled>
</div>`;

  return (
    <MainLayout>
      {/* Hero Section */}
      <div className="bg-background text-foreground py-16 relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-20"></div>
        <div className="absolute top-1/4 -left-20 w-80 h-80 rounded-full bg-primary/10 blur-3xl"></div>
        <div className="absolute bottom-1/3 -right-20 w-80 h-80 rounded-full bg-accent/10 blur-3xl"></div>
        
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 primary-gradient bg-clip-text text-transparent tracking-tight">
            HTML to JSX Converter
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-6 leading-relaxed">
            Convert HTML code to React JSX syntax with automatic fixes for classes and self-closing tags.
          </p>
        </div>
      </div>

      {/* Main Converter Tool */}
      <div className="container mx-auto px-4 py-8 -mt-8">
        <Card className="border-border bg-card backdrop-blur-sm shadow-lg">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Input Column */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold flex items-center gap-2">
                    <FileCode size={20} className="text-primary" />
                    HTML Input
                  </h2>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => {
                      setHtmlInput(exampleHtml);
                    }}
                  >
                    Load Example
                  </Button>
                </div>
                <Textarea
                  className="min-h-[300px] font-mono text-sm leading-relaxed"
                  placeholder="Paste your HTML code here..."
                  value={htmlInput}
                  onChange={(e) => setHtmlInput(e.target.value)}
                />
              </div>

              {/* Output Column */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold flex items-center gap-2">
                    <Code2 size={20} className="text-primary" />
                    JSX Output
                  </h2>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={copyToClipboard}
                    className="gap-2"
                    disabled={!jsxOutput}
                  >
                    <Copy size={16} />
                    {isCopied ? "Copied!" : "Copy JSX"}
                  </Button>
                </div>
                <div className="relative">
                  <Textarea
                    className="min-h-[300px] font-mono text-sm leading-relaxed"
                    placeholder="JSX will appear here..."
                    value={jsxOutput}
                    readOnly
                  />
                  {error && (
                    <div className="mt-2 p-3 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 rounded-md flex items-start gap-2 text-amber-800 dark:text-amber-300 text-sm">
                      <AlertTriangle size={16} className="mt-0.5 flex-shrink-0" />
                      <p>{error}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Convert Button (for mobile) */}
            <div className="mt-6 text-center lg:hidden">
              <Button 
                className="w-full bg-primary"
                onClick={convertToJsx}
              >
                Convert to JSX
                <ArrowRight size={16} className="ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* How to Use Section */}
        <div className="mt-16 mb-12">
          <h2 className="text-2xl font-bold mb-6 text-center">How to Use the HTML to JSX Converter</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border border-border">
              <CardContent className="pt-6">
                <div className="mb-4 flex justify-center">
                  <div className="rounded-full bg-primary/10 p-3">
                    <FileCode size={24} className="text-primary" />
                  </div>
                </div>
                <h3 className="text-lg font-medium mb-2 text-center">1. Paste HTML Code</h3>
                <p className="text-muted-foreground text-sm text-center">
                  Paste your HTML code into the input field on the left side.
                  You can also click "Load Example" to see how it works.
                </p>
              </CardContent>
            </Card>

            <Card className="border border-border">
              <CardContent className="pt-6">
                <div className="mb-4 flex justify-center">
                  <div className="rounded-full bg-primary/10 p-3">
                    <ArrowRight size={24} className="text-primary" />
                  </div>
                </div>
                <h3 className="text-lg font-medium mb-2 text-center">2. Automatic Conversion</h3>
                <p className="text-muted-foreground text-sm text-center">
                  The tool automatically converts your HTML to JSX, fixing classes, self-closing tags,
                  and inline styles to JSX format as you type.
                </p>
              </CardContent>
            </Card>

            <Card className="border border-border">
              <CardContent className="pt-6">
                <div className="mb-4 flex justify-center">
                  <div className="rounded-full bg-primary/10 p-3">
                    <Copy size={24} className="text-primary" />
                  </div>
                </div>
                <h3 className="text-lg font-medium mb-2 text-center">3. Copy the Result</h3>
                <p className="text-muted-foreground text-sm text-center">
                  When your JSX is ready, click the "Copy JSX" button to copy it to your clipboard.
                  You'll see a confirmation message when it's copied.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* What Gets Converted Section */}
        <div className="mt-16 mb-16">
          <h2 className="text-2xl font-bold mb-6">What Gets Converted?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border border-border">
              <CardContent className="p-6">
                <h3 className="text-lg font-medium mb-3">HTML Attributes to JSX Props</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-primary">✓</span>
                    <div>
                      <code className="bg-muted px-1 py-0.5 rounded text-sm">class</code> →
                      <code className="bg-muted px-1 py-0.5 rounded text-sm ml-1">className</code>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">✓</span>
                    <div>
                      <code className="bg-muted px-1 py-0.5 rounded text-sm">for</code> →
                      <code className="bg-muted px-1 py-0.5 rounded text-sm ml-1">htmlFor</code>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">✓</span>
                    <div>
                      Boolean attributes like <code className="bg-muted px-1 py-0.5 rounded text-sm">disabled</code> → 
                      <code className="bg-muted px-1 py-0.5 rounded text-sm ml-1">disabled={"{true}"}</code>
                    </div>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border border-border">
              <CardContent className="p-6">
                <h3 className="text-lg font-medium mb-3">Structure and Styles</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-primary">✓</span>
                    <div>
                      Self-closing tags like <code className="bg-muted px-1 py-0.5 rounded text-sm">&lt;img&gt;</code> →
                      <code className="bg-muted px-1 py-0.5 rounded text-sm ml-1">&lt;img /&gt;</code>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">✓</span>
                    <div>
                      Inline styles like <code className="bg-muted px-1 py-0.5 rounded text-sm">style="color: red;"</code> →
                      <code className="bg-muted px-1 py-0.5 rounded text-sm ml-1">style={"{{"} color: 'red' {"}}"}</code>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">✓</span>
                    <div>
                      Warning for invalid nesting that might cause React rendering issues
                    </div>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Recommended Tools */}
        <div className="mt-16 mb-16">
          <h2 className="text-2xl font-bold mb-8">Recommended Tools</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {relatedTools.map((tool) => (
              <WebToolCard
                key={tool.id}
                name={tool.name}
                description={tool.description}
                tags={tool.tags}
                slug={tool.slug}
                icon={tool.icon}
                url={tool.url}
              />
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default HtmlToJsxConverter;

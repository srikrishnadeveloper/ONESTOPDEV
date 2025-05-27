
import { useState, useEffect } from "react";
import MainLayout from "@/layouts/MainLayout";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Copy, Check, Code, Layout, Palette, Grid, FileText } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { WebTool } from "@/data/webToolsData";
import WebToolCard from "@/components/WebToolCard";
import * as LucideIcons from "lucide-react";

// Sample recommended tools data
const recommendedTools: WebTool[] = [
  {
    id: "tool-2",
    name: "Color Palette Generator",
    description: "Create beautiful color palettes for your web projects.",
    slug: "color-palette",
    tags: ["CSS", "Design", "Generators"],
    icon: "Palette"
  },
  {
    id: "tool-7",
    name: "CSS Grid Generator",
    description: "Build and export CSS grid layouts with a visual editor.",
    slug: "css-grid-generator",
    tags: ["CSS", "Generators", "Design"],
    icon: "Grid"
  },
  {
    id: "tool-1",
    name: "CSS Flexbox Playground",
    description: "Visualize and learn how Flexbox works with interactive examples.",
    slug: "flexbox-playground",
    tags: ["CSS", "Layout", "Design"],
    icon: "Layout"
  },
  {
    id: "tool-9",
    name: "Markdown Preview",
    description: "Write and preview Markdown with real-time rendering.",
    slug: "markdown-preview",
    tags: ["Formatters", "Utilities"],
    icon: "FileText"
  }
];

// Form type
type FormValues = {
  inputCss: string;
};

const CssFormatter = () => {
  // Form initialization
  const form = useForm<FormValues>({
    defaultValues: {
      inputCss: "",
    },
  });

  // State management
  const [outputCss, setOutputCss] = useState<string>("");
  const [isMinifyMode, setIsMinifyMode] = useState<boolean>(false);
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const { toast } = useToast();

  // CSS Formatting function
  const formatCss = (css: string, minify: boolean = false): string => {
    if (!css.trim()) return "";
    
    try {
      setIsProcessing(true);
      
      if (minify) {
        // Minify CSS: remove comments, newlines, and excess whitespace
        return css
          .replace(/\/\*[\s\S]*?\*\//g, '') // Remove comments
          .replace(/([^0-9a-zA-Z\.#])\s+/g, '$1') // Remove space after some characters
          .replace(/\s([^0-9a-zA-Z\.#]+)/g, '$1') // Remove space before some characters
          .replace(/;}/g, '}') // Remove unnecessary semicolons
          .replace(/\n/g, '') // Remove new lines
          .replace(/\s+/g, ' ') // Convert multiple spaces to single space
          .trim();
      } else {
        // Format CSS for readability
        // Step 1: Normalize whitespace and remove comments
        let normalized = css
          .replace(/\/\*[\s\S]*?\*\//g, '') // Remove comments
          .replace(/[\n\r]/g, '') // Remove all newlines
          .replace(/\s+/g, ' ') // Normalize spaces
          .replace(/\s*([{}:;,])\s*/g, '$1') // Remove spaces around special chars
          .replace(/}/g, '}\n') // Add newline after each rule
          .replace(/{/g, ' {\n') // Format opening braces
          .replace(/;/g, ';\n') // Add newline after semicolons
          .replace(/,/g, ',\n') // Add newline after commas
          .trim();
          
        // Step 2: Handle indentation
        let result = '';
        let indentLevel = 0;
        const lines = normalized.split('\n');
        
        for (const line of lines) {
          if (line.includes('}')) {
            indentLevel = Math.max(0, indentLevel - 1);
          }
          
          const indent = '  '.repeat(indentLevel);
          result += indent + line.trim() + '\n';
          
          if (line.includes('{')) {
            indentLevel++;
          }
        }
        
        return result.trim();
      }
    } catch (error) {
      console.error("CSS formatting error:", error);
      toast({
        title: "Error Formatting CSS",
        description: "There was an issue formatting your CSS. Please check your input and try again.",
        variant: "destructive",
      });
      return css; // Return original CSS on error
    } finally {
      setIsProcessing(false);
    }
  };

  // Handle form submission
  const onSubmit = (values: FormValues) => {
    const formattedCss = formatCss(values.inputCss, isMinifyMode);
    setOutputCss(formattedCss);
  };

  // Copy to clipboard functionality
  const copyToClipboard = () => {
    if (outputCss) {
      navigator.clipboard.writeText(outputCss);
      setIsCopied(true);
      
      toast({
        title: "CSS Copied to Clipboard",
        description: "The formatted CSS has been copied to your clipboard.",
      });
      
      // Reset copy button after 2 seconds
      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    }
  };

  // Toggle minify mode
  const toggleMinifyMode = () => {
    setIsMinifyMode(!isMinifyMode);
    
    // Re-apply formatting if output already exists
    if (outputCss) {
      const inputCss = form.getValues("inputCss");
      const formattedCss = formatCss(inputCss, !isMinifyMode);
      setOutputCss(formattedCss);
    }
  };

  // Reset form fields
  const resetForm = () => {
    form.reset();
    setOutputCss("");
  };

  // Effect to auto-update output when minify mode changes
  useEffect(() => {
    const subscription = form.watch((value) => {
      // Auto-format on input change if there's already content in the output
      if (outputCss && value.inputCss) {
        const formattedCss = formatCss(value.inputCss, isMinifyMode);
        setOutputCss(formattedCss);
      }
    });
    
    return () => subscription.unsubscribe();
  }, [form.watch, isMinifyMode, outputCss]);

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
              CSS Formatter
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-6">
              Clean up and format your CSS for improved readability or minify it for production use.
            </p>
          </div>
        </div>
      </div>

      {/* Main Tool Section */}
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="bg-card border border-border rounded-lg shadow-sm p-4 md:p-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Input CSS */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium flex items-center gap-2">
                      <Code size={18} className="text-primary" />
                      Input CSS
                    </h3>
                    <Button 
                      type="button" 
                      variant="ghost" 
                      size="sm" 
                      onClick={resetForm}
                      className="text-xs"
                    >
                      Clear
                    </Button>
                  </div>
                  <FormField
                    control={form.control}
                    name="inputCss"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Textarea
                            placeholder="Paste your unformatted CSS here..."
                            className="min-h-[300px] md:min-h-[400px] font-mono text-sm resize-none"
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>

                {/* Output CSS */}
                <div className="space-y-2">
                  <h3 className="text-lg font-medium flex items-center gap-2">
                    <Code size={18} className="text-primary" />
                    Formatted CSS
                  </h3>
                  <Textarea
                    value={outputCss}
                    readOnly
                    placeholder="Formatted CSS will appear here..."
                    className="min-h-[300px] md:min-h-[400px] font-mono text-sm resize-none"
                  />
                </div>
              </div>

              {/* Controls Section */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 pt-2 pb-4">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="minify-mode"
                    checked={isMinifyMode}
                    onCheckedChange={toggleMinifyMode}
                  />
                  <Label htmlFor="minify-mode" className="cursor-pointer">
                    Minify Mode
                  </Label>
                </div>

                <Button 
                  type="submit" 
                  className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 min-w-[120px]"
                  disabled={isProcessing || !form.getValues("inputCss")}
                >
                  {isProcessing ? "Processing..." : "Format CSS"}
                </Button>

                <Button
                  type="button"
                  variant="outline"
                  onClick={copyToClipboard}
                  disabled={!outputCss}
                  className="min-w-[120px]"
                >
                  {isCopied ? (
                    <>
                      <Check className="mr-2 h-4 w-4" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="mr-2 h-4 w-4" />
                      Copy CSS
                    </>
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </div>

        {/* Tool explanation section */}
        <div className="mt-12 max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-4">How to Use This Tool</h2>
          <div className="space-y-4 text-muted-foreground">
            <p>
              The CSS Formatter helps you organize and beautify your CSS code for better readability, or compress it for production use.
            </p>
            
            <div className="space-y-2">
              <h3 className="text-lg font-medium text-foreground">Features:</h3>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>Format messy CSS with proper indentation and spacing</li>
                <li>Minify CSS to reduce file size for production</li>
                <li>Toggle between readable formatting and minified output</li>
                <li>One-click copy of the formatted code</li>
              </ul>
            </div>
            
            <div className="space-y-2">
              <h3 className="text-lg font-medium text-foreground">Instructions:</h3>
              <ol className="list-decimal list-inside space-y-1 ml-2">
                <li>Paste your unformatted CSS into the input field</li>
                <li>Choose whether you want readable format or minified output</li>
                <li>Click "Format CSS" to process your code</li>
                <li>Use the "Copy CSS" button to copy the result to your clipboard</li>
              </ol>
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

export default CssFormatter;

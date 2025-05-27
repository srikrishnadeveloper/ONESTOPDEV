
import { useState, useEffect } from "react";
import MainLayout from "@/layouts/MainLayout";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Check, Copy, FileCode, Code, Layout, Regex, Palette } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { WebTool } from "@/data/webToolsData";
import WebToolCard from "@/components/WebToolCard";
import * as LucideIcons from "lucide-react";

// Sample recommended tools data
const recommendedTools: WebTool[] = [
  {
    id: "tool-4",
    name: "Regex Tester",
    description: "Test and debug regular expressions with real-time highlighting.",
    slug: "regex-tester",
    tags: ["JavaScript", "Utilities", "DevOps"],
    icon: "Search"
  },
  {
    id: "tool-13",
    name: "CSS Formatter",
    description: "Format and beautify your CSS code or minify it for production.",
    slug: "css-formatter",
    tags: ["CSS", "Formatters", "Utilities"],
    icon: "Code"
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
    id: "tool-2",
    name: "Color Palette Generator",
    description: "Create beautiful color palettes for your web projects.",
    slug: "color-palette",
    tags: ["CSS", "Design", "Generators"],
    icon: "Palette"
  }
];

// Interface for validation errors
interface ValidationError {
  line: number;
  column: number;
  message: string;
  type: 'error' | 'warning';
}

// Form type
type FormValues = {
  inputHtml: string;
};

const HtmlValidator = () => {
  // Form initialization
  const form = useForm<FormValues>({
    defaultValues: {
      inputHtml: "",
    },
  });

  // State management
  const [validationResults, setValidationResults] = useState<ValidationError[]>([]);
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const { toast } = useToast();

  // HTML validation function
  const validateHtml = (html: string): ValidationError[] => {
    if (!html.trim()) return [];
    
    try {
      setIsProcessing(true);
      const errors: ValidationError[] = [];
      
      // Check for basic HTML structure
      if (!html.includes('<!DOCTYPE html>') && !html.includes('<!doctype html>')) {
        errors.push({
          line: 1,
          column: 1,
          message: 'Missing DOCTYPE declaration',
          type: 'warning'
        });
      }
      
      // Check for unopened/unclosed tags
      const openTags: string[] = [];
      const lines = html.split('\n');
      
      const tagRegex = /<\/?([a-z][a-z0-9]*)\b[^>]*>/gi;
      const selfClosingTags = ['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'param', 'source', 'track', 'wbr'];
      
      lines.forEach((line, lineIndex) => {
        let match;
        let lastIndex = 0;
        
        while ((match = tagRegex.exec(line)) !== null) {
          const fullTag = match[0];
          const tagName = match[1].toLowerCase();
          lastIndex = match.index + fullTag.length;
          
          // Skip comments
          if (fullTag.startsWith('<!--') || fullTag.endsWith('-->')) continue;
          
          // Self-closing tag
          if (fullTag.endsWith('/>') || selfClosingTags.includes(tagName)) {
            continue;
          }
          
          // Closing tag
          if (fullTag.startsWith('</')) {
            if (openTags.length === 0) {
              errors.push({
                line: lineIndex + 1,
                column: match.index + 1,
                message: `Unexpected closing tag: ${tagName}`,
                type: 'error'
              });
            } else if (openTags[openTags.length - 1] !== tagName) {
              errors.push({
                line: lineIndex + 1,
                column: match.index + 1,
                message: `Mismatched closing tag: expected ${openTags[openTags.length - 1]}, found ${tagName}`,
                type: 'error'
              });
            } else {
              openTags.pop();
            }
          } 
          // Opening tag
          else {
            openTags.push(tagName);
          }
        }
      });
      
      // Check for unclosed tags at the end
      if (openTags.length > 0) {
        openTags.forEach(tag => {
          errors.push({
            line: lines.length,
            column: lines[lines.length - 1].length,
            message: `Unclosed tag: ${tag}`,
            type: 'error'
          });
        });
      }
      
      // Check for deprecated tags
      const deprecatedTags = ['applet', 'basefont', 'center', 'dir', 'font', 'isindex', 'menu', 'strike', 's', 'u', 'frame', 'frameset', 'noframes', 'acronym', 'big', 'tt'];
      
      lines.forEach((line, lineIndex) => {
        deprecatedTags.forEach(tag => {
          const tagRegex = new RegExp(`<${tag}[\\s>]`, 'i');
          if (tagRegex.test(line)) {
            errors.push({
              line: lineIndex + 1,
              column: line.indexOf(`<${tag}`) + 1,
              message: `Deprecated tag: ${tag}`,
              type: 'warning'
            });
          }
        });
      });
      
      // Check for common HTML errors like missing alt attributes on images
      lines.forEach((line, lineIndex) => {
        const imgRegex = /<img\s[^>]*?(?:src\s*=\s*['"](.*?)['"][^>]*?)?(?:alt\s*=\s*['"](.*?)['"][^>]*?)?[^>]*?>/i;
        const imgMatch = imgRegex.exec(line);
        
        if (imgMatch && !imgMatch[0].includes('alt=')) {
          errors.push({
            line: lineIndex + 1,
            column: line.indexOf('<img') + 1,
            message: 'Missing alt attribute on img tag',
            type: 'warning'
          });
        }
      });
      
      return errors;
    } catch (error) {
      console.error("HTML validation error:", error);
      toast({
        title: "Error Validating HTML",
        description: "There was an issue validating your HTML. Please check your input and try again.",
        variant: "destructive",
      });
      return [{
        line: 0,
        column: 0,
        message: "Internal validator error. Please try again.",
        type: 'error'
      }];
    } finally {
      setIsProcessing(false);
    }
  };

  // Handle form submission
  const onSubmit = (values: FormValues) => {
    const errors = validateHtml(values.inputHtml);
    setValidationResults(errors);
    setIsValid(errors.length === 0);
  };

  // Copy to clipboard functionality
  const copyToClipboard = () => {
    if (form.getValues("inputHtml")) {
      navigator.clipboard.writeText(form.getValues("inputHtml"));
      setIsCopied(true);
      
      toast({
        title: "HTML Copied to Clipboard",
        description: "The HTML code has been copied to your clipboard.",
      });
      
      // Reset copy button after 2 seconds
      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    }
  };

  // Reset form fields
  const resetForm = () => {
    form.reset();
    setValidationResults([]);
    setIsValid(null);
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
              HTML Validator
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-6">
              Validate your HTML code against web standards and identify common errors to improve your markup.
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
                {/* Input HTML */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium flex items-center gap-2">
                      <FileCode size={18} className="text-primary" />
                      HTML Code
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
                    name="inputHtml"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Textarea
                            placeholder="Paste your HTML code here..."
                            className="min-h-[300px] md:min-h-[400px] font-mono text-sm resize-none"
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>

                {/* Validation Results */}
                <div className="space-y-2">
                  <h3 className="text-lg font-medium flex items-center gap-2">
                    <FileCode size={18} className="text-primary" />
                    Validation Results
                  </h3>
                  <div className="border rounded-md border-border min-h-[300px] md:min-h-[400px] overflow-y-auto p-4 bg-background">
                    {isValid === null && (
                      <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
                        <FileCode size={48} className="mb-4 opacity-20" />
                        <p>Validation results will appear here</p>
                        <p className="text-sm mt-2">Click "Validate HTML" to check your code</p>
                      </div>
                    )}

                    {isValid === true && (
                      <Alert className="bg-green-500/10 border-green-500/20 text-green-600 dark:text-green-400">
                        <AlertTitle className="flex items-center gap-2 text-green-600 dark:text-green-400">
                          <Check size={16} /> Valid HTML
                        </AlertTitle>
                        <AlertDescription className="text-green-600/80 dark:text-green-400/80">
                          Your HTML code looks good! No validation errors were found.
                        </AlertDescription>
                      </Alert>
                    )}

                    {isValid === false && (
                      <div className="space-y-4">
                        <Alert className="bg-destructive/10 border-destructive/20 text-destructive">
                          <AlertTitle className="flex items-center gap-2">
                            Found {validationResults.length} issue{validationResults.length > 1 ? 's' : ''}
                          </AlertTitle>
                          <AlertDescription>
                            Please review and fix the following issues in your HTML code.
                          </AlertDescription>
                        </Alert>

                        <div className="space-y-2 mt-4">
                          {validationResults.map((error, index) => (
                            <div 
                              key={index} 
                              className={`p-3 rounded-md text-sm font-mono ${
                                error.type === 'error' 
                                  ? 'bg-destructive/10 border border-destructive/20 text-destructive' 
                                  : 'bg-yellow-500/10 border border-yellow-500/20 text-yellow-600 dark:text-yellow-400'
                              }`}
                            >
                              <div className="flex items-start gap-2">
                                <span className="font-medium">Line {error.line}:{error.column}</span>
                                <span className="flex-grow">{error.message}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Controls Section */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 pt-2 pb-4">
                <Button 
                  type="submit" 
                  className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 min-w-[120px]"
                  disabled={isProcessing || !form.getValues("inputHtml")}
                >
                  {isProcessing ? "Processing..." : "Validate HTML"}
                </Button>

                <Button
                  type="button"
                  variant="outline"
                  onClick={copyToClipboard}
                  disabled={!form.getValues("inputHtml")}
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
                      Copy HTML
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
              The HTML Validator helps you identify common errors and issues in your HTML code to ensure it follows best practices and web standards.
            </p>
            
            <div className="space-y-2">
              <h3 className="text-lg font-medium text-foreground">Features:</h3>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>Validates HTML structure and tag nesting</li>
                <li>Detects unclosed or mismatched tags</li>
                <li>Identifies deprecated HTML elements</li>
                <li>Checks for missing required attributes</li>
                <li>Provides line numbers and descriptions for each issue</li>
              </ul>
            </div>
            
            <div className="space-y-2">
              <h3 className="text-lg font-medium text-foreground">Instructions:</h3>
              <ol className="list-decimal list-inside space-y-1 ml-2">
                <li>Paste your HTML code into the input field</li>
                <li>Click "Validate HTML" to check your code</li>
                <li>Review any errors or warnings in the validation results</li>
                <li>Make necessary corrections to fix the issues</li>
                <li>Use the "Copy HTML" button to copy the code to your clipboard</li>
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

export default HtmlValidator;

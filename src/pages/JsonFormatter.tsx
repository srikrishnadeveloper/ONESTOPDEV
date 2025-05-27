import React, { useState, useEffect, useRef } from "react";
import MainLayout from "@/layouts/MainLayout";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  AlertCircle,
  Check,
  Copy,
  FileCode,
  RefreshCw,
  Trash2,
  ArrowRight,
  Code,
} from "lucide-react";
import WebToolCard from "@/components/WebToolCard";
import * as LucideIcons from "lucide-react";
import { WebTool } from "@/data/webToolsData";

const recommendedTools: WebTool[] = [
  {
    id: "tool-3",
    name: "CSS Flexbox Playground",
    description: "Visualize and learn how Flexbox works with interactive examples.",
    slug: "flexbox-playground",
    tags: ["CSS", "Layout", "Design"],
    icon: "Layout",
  },
  {
    id: "tool-7",
    name: "CSS Grid Generator",
    description: "Build and export CSS grid layouts with a visual editor.",
    slug: "grid-generator",
    tags: ["CSS", "Generators", "Design"],
    icon: "Grid",
  },
  {
    id: "tool-13",
    name: "CSS Formatter",
    description: "Format and beautify your CSS code or minify it for production.",
    slug: "css-formatter",
    tags: ["CSS", "Formatters", "Utilities"],
    icon: "Code",
  },
  {
    id: "tool-15",
    name: "JavaScript Minifier",
    description: "Minify JavaScript code to reduce file size and improve loading speed.",
    slug: "javascript-minifier",
    tags: ["JavaScript", "Performance", "Utilities"],
    icon: "Code",
  },
];

const JsonFormatter = () => {
  const [rawJson, setRawJson] = useState<string>("");
  const [formattedJson, setFormattedJson] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [isJsonValid, setIsJsonValid] = useState<boolean | null>(null);
  const [autoFormat, setAutoFormat] = useState<boolean>(false);
  const [copyButtonText, setCopyButtonText] = useState<string>("Copy JSON");
  const [textareaHeight, setTextareaHeight] = useState<number>(300);
  
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

  const formatJson = (json: string): { formatted: string; error: string | null } => {
    try {
      if (!json.trim()) {
        return { formatted: "", error: null };
      }
      
      const parsedJson = JSON.parse(json);
      const beautified = JSON.stringify(parsedJson, null, 2);
      
      return { formatted: beautified, error: null };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error";
      const lineMatch = errorMessage.match(/at position (\d+)/);
      
      let errorWithLine = "Invalid JSON: " + errorMessage;
      
      if (lineMatch && lineMatch[1]) {
        const position = parseInt(lineMatch[1]);
        const lines = json.substring(0, position).split('\n');
        errorWithLine = `Invalid JSON: ${errorMessage} (around line ${lines.length})`;
      }
      
      return { formatted: "", error: errorWithLine };
    }
  };

  const handleFormatClick = () => {
    const result = formatJson(rawJson);
    setFormattedJson(result.formatted);
    setError(result.error);
    setIsJsonValid(result.error === null);
  };

  const handleValidateClick = () => {
    try {
      if (!rawJson.trim()) {
        setError(null);
        setIsJsonValid(null);
        return;
      }
      
      JSON.parse(rawJson);
      setError(null);
      setIsJsonValid(true);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error";
      const lineMatch = errorMessage.match(/at position (\d+)/);
      
      let errorWithLine = "Invalid JSON: " + errorMessage;
      
      if (lineMatch && lineMatch[1]) {
        const position = parseInt(lineMatch[1]);
        const lines = rawJson.substring(0, position).split('\n');
        errorWithLine = `Invalid JSON: ${errorMessage} (around line ${lines.length})`;
      }
      
      setError(errorWithLine);
      setIsJsonValid(false);
    }
  };

  const handleClearClick = () => {
    setRawJson("");
    setFormattedJson("");
    setError(null);
    setIsJsonValid(null);
    setCopyButtonText("Copy JSON");
    
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  };

  const handleCopyClick = () => {
    if (formattedJson) {
      navigator.clipboard.writeText(formattedJson);
      setCopyButtonText("Copied!");
      
      setTimeout(() => {
        setCopyButtonText("Copy JSON");
      }, 2000);
    }
  };

  const handleAutoFormatToggle = (checked: boolean) => {
    setAutoFormat(checked);
  };

  const handleRawJsonChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setRawJson(value);
    
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      const scrollHeight = textareaRef.current.scrollHeight;
      setTextareaHeight(scrollHeight > 300 ? scrollHeight : 300);
    }
    
    if (autoFormat) {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
      
      debounceTimerRef.current = setTimeout(() => {
        const result = formatJson(value);
        setFormattedJson(result.formatted);
        setError(result.error);
        setIsJsonValid(result.error === null);
      }, 800);
    }
  };
  
  useEffect(() => {
    if (autoFormat && rawJson) {
      const result = formatJson(rawJson);
      setFormattedJson(result.formatted);
      setError(result.error);
      setIsJsonValid(result.error === null);
    }
    
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, [autoFormat]);

  return (
    <MainLayout>
      <section className="relative py-12 md:py-16 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-primary/5 to-transparent"></div>
        
        <div className="container mx-auto px-4 mb-12 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <Badge className="mb-4 bg-primary/10 text-primary hover:bg-primary/20 border-none">
              Web Tool
            </Badge>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              JSON Formatter & Validator
            </h1>
            <p className="text-muted-foreground text-lg mb-6">
              Format, validate, and beautify your JSON with syntax highlighting
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileCode className="text-primary" size={22} />
                  <span>Raw JSON</span>
                </CardTitle>
                <CardDescription>Paste or type your JSON here</CardDescription>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-4">
                  <Textarea
                    ref={textareaRef}
                    placeholder="Paste or type your JSON here..."
                    className="font-mono text-sm min-h-[300px]"
                    style={{ height: `${textareaHeight}px` }}
                    value={rawJson}
                    onChange={handleRawJsonChange}
                  />
                  
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="auto-format"
                      checked={autoFormat}
                      onCheckedChange={handleAutoFormatToggle}
                    />
                    <Label htmlFor="auto-format" className="text-sm text-muted-foreground">
                      Auto-format as I type
                    </Label>
                  </div>
                </div>
              </CardContent>
              
              <CardFooter className="flex flex-wrap gap-3">
                <Button 
                  onClick={handleFormatClick}
                  className="bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  <RefreshCw size={16} className="mr-2" />
                  Format JSON
                </Button>
                
                <Button 
                  onClick={handleValidateClick}
                  variant="outline"
                >
                  <Check size={16} className="mr-2" />
                  Validate
                </Button>
                
                <Button 
                  onClick={handleClearClick}
                  variant="outline"
                  className="text-muted-foreground"
                >
                  <Trash2 size={16} className="mr-2" />
                  Clear
                </Button>
                
                <Button 
                  onClick={handleCopyClick}
                  variant="secondary"
                  disabled={!formattedJson || !!error}
                >
                  <Copy size={16} className="mr-2" />
                  {copyButtonText}
                </Button>
              </CardFooter>
            </Card>
            
            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Code className="text-primary" size={22} />
                  <span>Formatted Output</span>
                </CardTitle>
                
                {isJsonValid !== null && (
                  <div className="mt-2">
                    {isJsonValid ? (
                      <Badge className="bg-green-500/20 text-green-600 hover:bg-green-500/30 border-none">
                        <Check size={14} className="mr-1" />
                        Valid JSON
                      </Badge>
                    ) : (
                      <Badge className="bg-red-500/20 text-red-600 hover:bg-red-500/30 border-none">
                        <AlertCircle size={14} className="mr-1" />
                        Invalid JSON
                      </Badge>
                    )}
                  </div>
                )}
              </CardHeader>
              
              <CardContent>
                {error && (
                  <div className="p-4 mb-4 bg-red-500/10 border border-red-500/50 rounded-md text-red-600">
                    <div className="flex items-start gap-2">
                      <AlertCircle size={18} className="mt-0.5 flex-shrink-0" />
                      <p className="text-sm font-medium">{error}</p>
                    </div>
                  </div>
                )}
                
                <div className="min-h-[300px] border border-border rounded-md">
                  {formattedJson ? (
                    <SyntaxHighlighter
                      language="json"
                      style={vscDarkPlus}
                      className="rounded-md text-sm h-full min-h-[300px] max-h-[600px] overflow-auto"
                    >
                      {formattedJson}
                    </SyntaxHighlighter>
                  ) : (
                    <div className="flex items-center justify-center h-full min-h-[300px] text-muted-foreground">
                      {!error && (
                        <div className="text-center">
                          <FileCode className="mx-auto mb-3 text-muted-foreground/60" size={32} />
                          <p>Formatted JSON will appear here</p>
                          <p className="text-sm mt-2 text-muted-foreground/70">
                            Use the Format button to process your JSON
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="container mx-auto px-4 mt-20">
          <div className="max-w-3xl mx-auto text-center mb-10">
            <h2 className="text-2xl font-bold mb-3">Recommended Tools</h2>
            <p className="text-muted-foreground">
              Check out these related tools to enhance your development workflow
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {recommendedTools.map((tool) => (
              <WebToolCard
                key={tool.id}
                name={tool.name}
                description={tool.description}
                tags={tool.tags}
                slug={tool.slug}
                icon={tool.icon as keyof typeof LucideIcons}
              />
            ))}
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default JsonFormatter;


import React, { useState, useEffect } from "react";
import MainLayout from "@/layouts/MainLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Label } from "@/components/ui/label";
import { 
  Type, 
  Copy, 
  Check, 
  RefreshCw, 
  Info, 
  ArrowRight, 
  AlertTriangle 
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import WebToolCard from "@/components/WebToolCard";
import { webTools } from "@/data/webToolsData";
import ToolNavigation from "@/components/ToolNavigation";

interface ConvertedText {
  name: string;
  value: string;
  description: string;
}

const TextCaseConverter = () => {
  // State management
  const [inputText, setInputText] = useState("");
  const [convertedTexts, setConvertedTexts] = useState<ConvertedText[]>([]);
  const [selectedConversion, setSelectedConversion] = useState<number | null>(null);
  const [isCopied, setIsCopied] = useState(false);
  const { toast } = useToast();

  // Effect to convert text whenever input changes
  useEffect(() => {
    if (inputText) {
      convertText();
    } else {
      setConvertedTexts([]);
      setSelectedConversion(null);
    }
  }, [inputText]);

  // Text conversion functions
  const toUpperCase = (text: string) => text.toUpperCase();
  const toLowerCase = (text: string) => text.toLowerCase();
  
  const toTitleCase = (text: string) => {
    return text
      .toLowerCase()
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };
  
  const toSentenceCase = (text: string) => {
    return text
      .toLowerCase()
      .replace(/(^\s*\w|[.!?]\s*\w)/g, c => c.toUpperCase());
  };
  
  const toAlternatingCase = (text: string) => {
    return text
      .split('')
      .map((char, index) => index % 2 === 0 ? char.toLowerCase() : char.toUpperCase())
      .join('');
  };
  
  const toCamelCase = (text: string) => {
    return text
      .toLowerCase()
      .replace(/[^a-zA-Z0-9]+(.)/g, (_, chr) => chr.toUpperCase())
      .replace(/^[A-Z]/, c => c.toLowerCase());
  };
  
  const toPascalCase = (text: string) => {
    return text
      .toLowerCase()
      .replace(/[^a-zA-Z0-9]+(.)/g, (_, chr) => chr.toUpperCase())
      .replace(/^[a-z]/, c => c.toUpperCase());
  };
  
  const toSnakeCase = (text: string) => {
    return text
      .toLowerCase()
      .replace(/\s+/g, '_')
      .replace(/[^a-zA-Z0-9_]/g, '');
  };
  
  const toKebabCase = (text: string) => {
    return text
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-zA-Z0-9-]/g, '');
  };
  
  const toReverseText = (text: string) => {
    return text.split('').reverse().join('');
  };

  // Main conversion function
  const convertText = () => {
    if (!inputText.trim()) {
      toast({
        title: "No Text Provided",
        description: "Please enter some text to convert",
        variant: "destructive",
      });
      return;
    }

    const conversions: ConvertedText[] = [
      { 
        name: "UPPERCASE", 
        value: toUpperCase(inputText),
        description: "All characters converted to uppercase"
      },
      { 
        name: "lowercase", 
        value: toLowerCase(inputText),
        description: "All characters converted to lowercase"
      },
      { 
        name: "Title Case", 
        value: toTitleCase(inputText),
        description: "First letter of each word capitalized"
      },
      { 
        name: "Sentence case", 
        value: toSentenceCase(inputText),
        description: "First letter of each sentence capitalized"
      },
      { 
        name: "aLtErNaTiNg cAsE", 
        value: toAlternatingCase(inputText),
        description: "Alternating between lowercase and uppercase"
      },
      { 
        name: "camelCase", 
        value: toCamelCase(inputText),
        description: "First word lowercase, subsequent words capitalized"
      },
      { 
        name: "PascalCase", 
        value: toPascalCase(inputText),
        description: "All words start with uppercase"
      },
      { 
        name: "snake_case", 
        value: toSnakeCase(inputText),
        description: "Words joined by underscores, all lowercase"
      },
      { 
        name: "kebab-case", 
        value: toKebabCase(inputText),
        description: "Words joined by hyphens, all lowercase"
      },
      { 
        name: "Reverse Text", 
        value: toReverseText(inputText),
        description: "Text characters in reverse order"
      }
    ];

    setConvertedTexts(conversions);
    setSelectedConversion(0); // Select the first conversion by default
  };

  // Reset function
  const resetAll = () => {
    setInputText("");
    setConvertedTexts([]);
    setSelectedConversion(null);
    setIsCopied(false);
    toast({
      title: "Reset Complete",
      description: "All text has been cleared"
    });
  };

  // Copy to clipboard function
  const copyToClipboard = () => {
    if (selectedConversion === null || convertedTexts.length === 0) {
      toast({
        title: "Nothing to Copy",
        description: "Please convert some text first",
        variant: "destructive",
      });
      return;
    }

    try {
      navigator.clipboard.writeText(convertedTexts[selectedConversion].value);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
      
      toast({
        title: "Copied to Clipboard",
        description: `${convertedTexts[selectedConversion].name} text copied!`
      });
    } catch (error) {
      console.error("Error copying to clipboard:", error);
      toast({
        title: "Copy Failed",
        description: "Failed to copy text to clipboard",
        variant: "destructive",
      });
    }
  };

  // Find related tools for recommendations
  const relatedTools = webTools
    .filter(tool => 
      tool.slug !== "text-case-converter" && 
      (tool.tags.includes("Formatters") || tool.tags.includes("Utilities") || tool.tags.includes("Text"))
    )
    .slice(0, 4);

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-12">
        {/* Add Tool Navigation */}
        <ToolNavigation currentToolSlug="text-case-converter" />
        
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 flex items-center justify-center gap-2">
            <Type className="h-8 w-8 text-primary" />
            Text Case Converter
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Convert your text between different case formats with a single click.
            Transform to camelCase, PascalCase, snake_case, and more.
          </p>
        </div>

        {/* Main Tool Section */}
        <Card className="mb-12 border-2 bg-card/50 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left Section - Input */}
              <div className="space-y-4">
                <div>
                  <Label htmlFor="input-text" className="text-lg font-semibold mb-2 block">
                    Input Text
                  </Label>
                  <Textarea
                    id="input-text"
                    placeholder="Type or paste your text here..."
                    className="min-h-[200px] font-mono text-sm bg-background resize-none"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                  />
                </div>

                <div className="flex flex-wrap gap-3">
                  <Button 
                    onClick={convertText}
                    className="bg-primary text-primary-foreground hover:bg-primary/90"
                  >
                    Convert Text
                  </Button>
                  
                  <Button 
                    onClick={copyToClipboard}
                    variant="outline" 
                    disabled={selectedConversion === null}
                  >
                    {isCopied ? (
                      <>
                        <Check className="mr-2 h-4 w-4" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="mr-2 h-4 w-4" />
                        Copy Converted Text
                      </>
                    )}
                  </Button>

                  <Button 
                    onClick={resetAll}
                    variant="outline" 
                    className="ml-auto"
                  >
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Reset
                  </Button>
                </div>
              </div>

              {/* Right Section - Conversions */}
              <div>
                <Label className="text-lg font-semibold mb-2 block">
                  Converted Text Formats
                </Label>
                
                {convertedTexts.length > 0 ? (
                  <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
                    {convertedTexts.map((item, index) => (
                      <div 
                        key={index}
                        onClick={() => setSelectedConversion(index)}
                        className={`
                          p-3 rounded-md font-mono text-sm cursor-pointer transition-all
                          border ${selectedConversion === index 
                            ? 'border-primary bg-primary/10' 
                            : 'border-border bg-card hover:bg-accent/10'}
                        `}
                      >
                        <div className="flex justify-between items-start mb-1">
                          <span className="font-semibold text-foreground">{item.name}</span>
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              navigator.clipboard.writeText(item.value);
                              toast({
                                title: "Copied",
                                description: `${item.name} text copied to clipboard`,
                              });
                            }}
                            className="p-1 rounded-md hover:bg-accent/20"
                          >
                            <Copy size={14} />
                          </button>
                        </div>
                        <p className="break-all">{item.value}</p>
                        <p className="text-xs text-muted-foreground mt-1">{item.description}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-[200px] text-center border border-dashed rounded-md p-6 bg-card/50">
                    {inputText ? (
                      <>
                        <RefreshCw size={30} className="text-muted-foreground mb-2 animate-spin" />
                        <p className="text-muted-foreground">Converting text...</p>
                      </>
                    ) : (
                      <>
                        <AlertTriangle size={30} className="text-muted-foreground mb-2" />
                        <p className="text-muted-foreground">Enter text and click "Convert Text" to see all case conversions here</p>
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* How to Use Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Info className="h-6 w-6 text-primary" />
            How to Use
          </h2>
          
          <Card className="bg-card/50">
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">What is Text Case Conversion?</h3>
                  <p className="text-muted-foreground">
                    Text case conversion transforms text from one case format to another. This is particularly useful for developers 
                    when naming variables, writing documentation, or preparing content for different platforms that have specific case 
                    conventions.
                  </p>
                </div>
                
                <Separator />
                
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Using this tool:</h3>
                  <ol className="list-decimal pl-5 space-y-2 text-muted-foreground">
                    <li>Type or paste your text in the input field on the left.</li>
                    <li>The tool will automatically generate all case conversions. You can also click the "Convert Text" button.</li>
                    <li>Click on any converted text format to select it.</li>
                    <li>Use the "Copy Converted Text" button to copy the selected format to your clipboard.</li>
                    <li>Alternatively, click the copy icon next to each individual format.</li>
                    <li>Use the "Reset" button to clear all fields and start over.</li>
                  </ol>
                </div>
                
                <Separator />
                
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Available case formats:</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2">
                    <div className="space-y-1">
                      <p className="font-medium">UPPERCASE</p>
                      <p className="text-sm text-muted-foreground">All characters in uppercase</p>
                    </div>
                    <div className="space-y-1">
                      <p className="font-medium">lowercase</p>
                      <p className="text-sm text-muted-foreground">All characters in lowercase</p>
                    </div>
                    <div className="space-y-1">
                      <p className="font-medium">Title Case</p>
                      <p className="text-sm text-muted-foreground">First letter of each word capitalized</p>
                    </div>
                    <div className="space-y-1">
                      <p className="font-medium">Sentence case</p>
                      <p className="text-sm text-muted-foreground">First letter of each sentence capitalized</p>
                    </div>
                    <div className="space-y-1">
                      <p className="font-medium">camelCase</p>
                      <p className="text-sm text-muted-foreground">No spaces, first word lowercase, following words capitalized</p>
                    </div>
                    <div className="space-y-1">
                      <p className="font-medium">PascalCase</p>
                      <p className="text-sm text-muted-foreground">No spaces, all words start with uppercase</p>
                    </div>
                    <div className="space-y-1">
                      <p className="font-medium">snake_case</p>
                      <p className="text-sm text-muted-foreground">Words joined by underscores, all lowercase</p>
                    </div>
                    <div className="space-y-1">
                      <p className="font-medium">kebab-case</p>
                      <p className="text-sm text-muted-foreground">Words joined by hyphens, all lowercase</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recommended Tools Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <ArrowRight className="h-6 w-6 text-primary" />
            Recommended Tools
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {relatedTools.map((tool) => (
              <WebToolCard
                key={tool.id}
                name={tool.name}
                description={tool.description}
                tags={tool.tags}
                slug={tool.slug}
                icon={tool.icon}
              />
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default TextCaseConverter;

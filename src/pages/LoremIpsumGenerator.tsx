import { useState, useEffect } from "react";
import MainLayout from "@/layouts/MainLayout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Copy, FileText, RefreshCw, Check, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/components/ui/use-toast";
import { WebTool } from "@/data/webToolsData";
import WebToolCard from "@/components/WebToolCard";

// Lorem Ipsum data
const loremIpsumWords = [
  "lorem", "ipsum", "dolor", "sit", "amet", "consectetur", "adipiscing", "elit", "sed", "do", 
  "eiusmod", "tempor", "incididunt", "ut", "labore", "et", "dolore", "magna", "aliqua", "ut", 
  "enim", "ad", "minim", "veniam", "quis", "nostrud", "exercitation", "ullamco", "laboris", 
  "nisi", "ut", "aliquip", "ex", "ea", "commodo", "consequat", "duis", "aute", "irure", "dolor", 
  "in", "reprehenderit", "in", "voluptate", "velit", "esse", "cillum", "dolore", "eu", "fugiat", 
  "nulla", "pariatur", "excepteur", "sint", "occaecat", "cupidatat", "non", "proident", "sunt", 
  "in", "culpa", "qui", "officia", "deserunt", "mollit", "anim", "id", "est", "laborum", "cras", 
  "elementum", "ultricies", "integer", "quis", "auctor", "elit", "sed", "vulputate", "mi", "sit", 
  "amet", "mauris", "commodo", "quis", "imperdiet", "massa", "tincidunt", "nunc", "pulvinar"
];

// Related tools for recommendations
const relatedTools: WebTool[] = [
  {
    id: "related-1",
    name: "Text Case Converter",
    description: "Convert text between different case formats including camelCase, PascalCase, and more.",
    slug: "text-case-converter",
    tags: ["Formatters", "Utilities", "Text"],
    icon: "Type"
  },
  {
    id: "related-2",
    name: "Markdown Preview",
    description: "Write and preview Markdown with real-time rendering.",
    slug: "markdown-preview",
    tags: ["Formatters", "Utilities"],
    icon: "FileText"
  },
  {
    id: "related-3",
    name: "HTML Validator",
    description: "Validate your HTML code against W3C standards and identify common errors.",
    slug: "html-validator",
    tags: ["HTML", "Validation", "Utilities"],
    icon: "FileCode"
  }
];

type GenerateType = "words" | "sentences" | "paragraphs";

const LoremIpsumGenerator = () => {
  // State for controlling the generator
  const [generateType, setGenerateType] = useState<GenerateType>("paragraphs");
  const [quantity, setQuantity] = useState<number>(3);
  const [generatedText, setGeneratedText] = useState<string>("");
  const [copied, setCopied] = useState<boolean>(false);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);

  // Generate text on initial load
  useEffect(() => {
    generateLoremIpsum();
  }, []);

  // Function to generate Lorem Ipsum text
  const generateLoremIpsum = () => {
    setIsGenerating(true);
    
    try {
      let result = "";
      
      if (generateType === "words") {
        result = generateWords(quantity);
      } else if (generateType === "sentences") {
        result = generateSentences(quantity);
      } else if (generateType === "paragraphs") {
        result = generateParagraphs(quantity);
      }
      
      setGeneratedText(result);
    } catch (error) {
      toast({
        title: "Generation Error",
        description: "Failed to generate Lorem Ipsum text. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  // Generate random words
  const generateWords = (count: number): string => {
    const words: string[] = [];
    for (let i = 0; i < count; i++) {
      const randomIndex = Math.floor(Math.random() * loremIpsumWords.length);
      words.push(loremIpsumWords[randomIndex]);
    }
    
    // Capitalize first word
    if (words.length > 0) {
      words[0] = capitalizeFirstLetter(words[0]);
    }
    
    return words.join(" ");
  };

  // Generate random sentences
  const generateSentences = (count: number): string => {
    const sentences: string[] = [];
    for (let i = 0; i < count; i++) {
      // Generate between 5 to 15 words per sentence
      const wordsCount = Math.floor(Math.random() * 11) + 5;
      let sentence = generateWords(wordsCount);
      
      // Add period at the end
      if (!sentence.endsWith(".")) {
        sentence += ".";
      }
      
      sentences.push(sentence);
    }
    
    return sentences.join(" ");
  };

  // Generate random paragraphs
  const generateParagraphs = (count: number): string => {
    const paragraphs: string[] = [];
    for (let i = 0; i < count; i++) {
      // Generate between 3 to 7 sentences per paragraph
      const sentencesCount = Math.floor(Math.random() * 5) + 3;
      const paragraph = generateSentences(sentencesCount);
      paragraphs.push(paragraph);
    }
    
    return paragraphs.join("\n\n");
  };

  // Utility function to capitalize the first letter
  const capitalizeFirstLetter = (string: string): string => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  // Copy generated text to clipboard
  const copyToClipboard = () => {
    if (!generatedText) return;
    
    navigator.clipboard.writeText(generatedText)
      .then(() => {
        setCopied(true);
        toast({
          description: "Lorem Ipsum text copied to clipboard!",
        });
        
        // Reset the button text after 2 seconds
        setTimeout(() => setCopied(false), 2000);
      })
      .catch(() => {
        toast({
          title: "Copy failed",
          description: "Failed to copy text to clipboard. Please try again.",
          variant: "destructive",
        });
      });
  };

  // Handle quantity input changes
  const handleQuantityChange = (value: string) => {
    const num = parseInt(value, 10);
    if (isNaN(num) || num < 1) {
      setQuantity(1);
    } else if (num > 100) {
      setQuantity(100);
    } else {
      setQuantity(num);
    }
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-10">
        <div className="flex flex-col space-y-6">
          
          {/* Page title and description */}
          <div className="text-center mb-6">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
              Lorem Ipsum Generator
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Generate placeholder text for your designs, mockups, and layouts in different formats.
            </p>
          </div>
          
          {/* Main tool card */}
          <Card className="shadow-lg border-border">
            <CardHeader className="border-b border-border">
              <CardTitle className="flex items-center gap-2">
                <FileText className="text-primary" />
                Lorem Ipsum Generator
              </CardTitle>
              <CardDescription>
                Generate dummy text for web design and content mockups.
              </CardDescription>
            </CardHeader>
            
            <CardContent className="pt-6 grid md:grid-cols-3 gap-6">
              {/* Left Section: Controls */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="generate-type">Output Type</Label>
                  <Select 
                    value={generateType} 
                    onValueChange={(value) => setGenerateType(value as GenerateType)}
                  >
                    <SelectTrigger id="generate-type">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="words">Words</SelectItem>
                      <SelectItem value="sentences">Sentences</SelectItem>
                      <SelectItem value="paragraphs">Paragraphs</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="quantity" className="flex justify-between">
                    <span>Quantity</span>
                    <span className="text-muted-foreground text-xs">Max: 100</span>
                  </Label>
                  <Input
                    id="quantity"
                    type="number"
                    min={1}
                    max={100}
                    value={quantity}
                    onChange={(e) => handleQuantityChange(e.target.value)}
                  />
                </div>
                
                <div className="pt-2">
                  <Button 
                    className="w-full" 
                    onClick={generateLoremIpsum}
                    disabled={isGenerating}
                  >
                    {isGenerating ? (
                      <>
                        <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <RefreshCw className="mr-2 h-4 w-4" />
                        Generate Text
                      </>
                    )}
                  </Button>
                </div>
              </div>
              
              {/* Middle/Right Section: Generated Text */}
              <div className="md:col-span-2 space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Label htmlFor="generated-text">Generated Text</Label>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={copyToClipboard}
                      disabled={!generatedText}
                      className="h-8"
                    >
                      {copied ? (
                        <>
                          <Check className="mr-2 h-4 w-4" />
                          Copied!
                        </>
                      ) : (
                        <>
                          <Copy className="mr-2 h-4 w-4" />
                          Copy Text
                        </>
                      )}
                    </Button>
                  </div>
                  
                  <Textarea
                    id="generated-text"
                    value={generatedText}
                    readOnly
                    className="min-h-[200px] md:min-h-[300px] font-mono text-sm resize-none"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* How to Use Section */}
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle className="text-xl">How to Use This Tool</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-accent/10 p-4 rounded-lg">
                  <h3 className="font-medium text-lg mb-2 flex items-center">
                    <Badge variant="outline" className="mr-2">1</Badge>
                    Select Output Type
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    Choose whether you want to generate words, sentences, or paragraphs of Lorem Ipsum text.
                  </p>
                </div>
                
                <div className="bg-accent/10 p-4 rounded-lg">
                  <h3 className="font-medium text-lg mb-2 flex items-center">
                    <Badge variant="outline" className="mr-2">2</Badge>
                    Specify Quantity
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    Enter how many words, sentences, or paragraphs you need (between 1 and 100).
                  </p>
                </div>
                
                <div className="bg-accent/10 p-4 rounded-lg">
                  <h3 className="font-medium text-lg mb-2 flex items-center">
                    <Badge variant="outline" className="mr-2">3</Badge>
                    Generate & Copy
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    Click "Generate Text" to create Lorem Ipsum content, then "Copy Text" to copy it to your clipboard.
                  </p>
                </div>
              </div>
              
              <div className="text-sm text-muted-foreground mt-4">
                <p><strong>Tip:</strong> Lorem Ipsum is widely used as placeholder text in design mockups, layouts, and content drafts to show how text will look without being distracted by the actual content.</p>
              </div>
            </CardContent>
          </Card>

          {/* Recommended Tools Section */}
          <div className="mt-10">
            <h2 className="text-2xl font-bold mb-6">Recommended Tools</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
      </div>
    </MainLayout>
  );
};

export default LoremIpsumGenerator;


import React, { useState } from "react";
import MainLayout from "@/layouts/MainLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue 
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Key, Copy, Check, List, Info, ArrowRight } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import WebToolCard from "@/components/WebToolCard";
import { webTools } from "@/data/webToolsData";
import ToolNavigation from "@/components/ToolNavigation";

const UuidGenerator = () => {
  // State management
  const [uuids, setUuids] = useState<string[]>([]);
  const [numToGenerate, setNumToGenerate] = useState<string>("1");
  const [isCopied, setIsCopied] = useState(false);
  const { toast } = useToast();

  // Handle generating UUIDs
  const generateUUIDs = () => {
    try {
      const count = parseInt(numToGenerate);
      const newUuids = Array.from({ length: count }, () => {
        // Using crypto.randomUUID() which is available in modern browsers
        return crypto.randomUUID();
      });
      
      setUuids(newUuids);
      
      toast({
        title: "UUIDs Generated",
        description: `Successfully generated ${count} UUID${count > 1 ? 's' : ''}`,
      });
    } catch (error) {
      console.error("Error generating UUIDs:", error);
      toast({
        title: "Error",
        description: "Failed to generate UUIDs. Please try again.",
        variant: "destructive",
      });
    }
  };

  // Handle copying UUIDs to clipboard
  const copyUUIDs = () => {
    if (uuids.length === 0) {
      toast({
        title: "No UUIDs to copy",
        description: "Generate UUIDs first before copying.",
        variant: "destructive",
      });
      return;
    }

    try {
      const textToCopy = uuids.join('\n');
      navigator.clipboard.writeText(textToCopy);
      
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
      
      toast({
        title: "Copied to Clipboard",
        description: `${uuids.length} UUID${uuids.length > 1 ? 's' : ''} copied to clipboard!`,
      });
    } catch (error) {
      console.error("Error copying to clipboard:", error);
      toast({
        title: "Copy Failed",
        description: "Failed to copy UUIDs to clipboard. Please try again.",
        variant: "destructive",
      });
    }
  };

  // Find related tools for recommendations
  const relatedTools = webTools
    .filter(tool => 
      tool.slug !== "uuid-generator" && 
      (tool.tags.includes("Utilities") || tool.tags.includes("Generators"))
    )
    .slice(0, 4);

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-12">
        {/* Add Tool Navigation */}
        <ToolNavigation currentToolSlug="uuid-generator" />
        
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 flex items-center justify-center gap-2">
            <Key className="h-8 w-8 text-primary" />
            UUID Generator
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Generate random UUID v4 identifiers for your applications, databases, or any system requiring unique IDs.
          </p>
        </div>

        {/* Main Tool Section */}
        <Card className="mb-12 border-2 bg-card/50 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Left Section - Controls */}
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <List className="h-5 w-5 text-primary" />
                    Options
                  </h2>
                  
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label htmlFor="count-select" className="text-sm font-medium">
                        Number of UUIDs to generate
                      </label>
                      <Select 
                        value={numToGenerate} 
                        onValueChange={setNumToGenerate}
                      >
                        <SelectTrigger id="count-select" className="w-full">
                          <SelectValue placeholder="Select count" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">1 UUID</SelectItem>
                          <SelectItem value="5">5 UUIDs</SelectItem>
                          <SelectItem value="10">10 UUIDs</SelectItem>
                          <SelectItem value="20">20 UUIDs</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex flex-col gap-3 mt-6">
                      <Button 
                        onClick={generateUUIDs}
                        className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                      >
                        Generate UUIDs
                      </Button>
                      
                      <Button 
                        onClick={copyUUIDs}
                        variant="outline" 
                        className="w-full"
                        disabled={uuids.length === 0}
                      >
                        {isCopied ? (
                          <>
                            <Check className="mr-2 h-4 w-4" />
                            Copied!
                          </>
                        ) : (
                          <>
                            <Copy className="mr-2 h-4 w-4" />
                            Copy to Clipboard
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Middle/Right Section - Generated UUIDs */}
              <div className="md:col-span-2">
                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <Key className="h-5 w-5 text-primary" />
                  Generated UUIDs
                </h2>
                
                <div className="bg-muted/50 rounded-lg p-4 h-[300px] overflow-y-auto border border-border">
                  {uuids.length > 0 ? (
                    <div className="space-y-2">
                      {uuids.map((uuid, index) => (
                        <div 
                          key={index} 
                          className="font-mono text-sm p-2 rounded bg-card/70 border border-border flex items-center justify-between"
                        >
                          <span>{uuid}</span>
                          <button
                            onClick={() => {
                              navigator.clipboard.writeText(uuid);
                              toast({
                                title: "UUID Copied",
                                description: "Individual UUID copied to clipboard",
                              });
                            }}
                            className="ml-2 p-1 hover:bg-accent rounded"
                            aria-label="Copy individual UUID"
                          >
                            <Copy size={14} />
                          </button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="h-full flex flex-col items-center justify-center text-muted-foreground">
                      <Key size={48} className="opacity-20 mb-4" />
                      <p className="text-center">
                        No UUIDs generated yet. Select the number of UUIDs to generate and click the "Generate UUIDs" button.
                      </p>
                    </div>
                  )}
                </div>
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
                  <h3 className="text-lg font-medium">What is a UUID?</h3>
                  <p className="text-muted-foreground">
                    A UUID (Universally Unique Identifier) is a 128-bit identifier that is globally unique across time and space. 
                    UUID version 4 uses random numbers to ensure uniqueness, making it perfect for distributed systems where coordination is difficult.
                  </p>
                </div>
                
                <Separator />
                
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Using this tool:</h3>
                  <ol className="list-decimal pl-5 space-y-2 text-muted-foreground">
                    <li>Select the number of UUIDs you want to generate from the dropdown (1, 5, 10, or 20).</li>
                    <li>Click the "Generate UUIDs" button to create the specified number of UUIDs.</li>
                    <li>View the generated UUIDs in the output area on the right.</li>
                    <li>Copy individual UUIDs by clicking the copy icon next to each one.</li>
                    <li>Copy all generated UUIDs at once with the "Copy to Clipboard" button.</li>
                  </ol>
                </div>
                
                <Separator />
                
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Common uses for UUIDs:</h3>
                  <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                    <li>Database primary keys</li>
                    <li>Distributed system identifiers</li>
                    <li>Session IDs</li>
                    <li>Transaction IDs</li>
                    <li>API request trackers</li>
                    <li>URL shorteners and unique links</li>
                  </ul>
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

export default UuidGenerator;

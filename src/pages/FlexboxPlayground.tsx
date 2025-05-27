import { useState, useEffect } from "react";
import MainLayout from "@/layouts/MainLayout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Check, Copy, Layout, Palette, Code, Grid, Search, LucideIcon } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import { webTools } from "@/data/webToolsData";
import * as LucideIcons from "lucide-react";

const FlexboxPlayground = () => {
  const navigate = useNavigate();
  
  // Flexbox properties state
  const [flexDirection, setFlexDirection] = useState<string>("row");
  const [justifyContent, setJustifyContent] = useState<string>("flex-start");
  const [alignItems, setAlignItems] = useState<string>("stretch");
  const [flexWrap, setFlexWrap] = useState<string>("nowrap");
  const [gap, setGap] = useState<string>("8px");
  const [copied, setCopied] = useState<boolean>(false);
  
  // Flex container style
  const containerStyle = {
    display: "flex",
    flexDirection: flexDirection as "row" | "row-reverse" | "column" | "column-reverse",
    justifyContent,
    alignItems,
    flexWrap: flexWrap as "nowrap" | "wrap" | "wrap-reverse",
    gap,
    width: "100%",
    height: "100%",
    minHeight: "300px",
    padding: "1rem",
    border: "1px solid var(--border)",
    borderRadius: "0.5rem",
    backgroundColor: "var(--card)"
  };
  
  // Demo child box colors
  const boxColors = [
    "bg-gradient-to-r from-blue-500 to-blue-600",
    "bg-gradient-to-r from-purple-500 to-purple-600",
    "bg-gradient-to-r from-green-500 to-green-600",
    "bg-gradient-to-r from-orange-500 to-orange-600",
    "bg-gradient-to-r from-red-500 to-red-600"
  ];
  
  // Generate CSS code from current settings
  const cssCode = `.flex-container {
  display: flex;
  flex-direction: ${flexDirection};
  justify-content: ${justifyContent};
  align-items: ${alignItems};
  flex-wrap: ${flexWrap};
  gap: ${gap};
}`;
  
  // Copy CSS to clipboard
  const handleCopyCSS = () => {
    navigator.clipboard.writeText(cssCode);
    setCopied(true);
    
    toast({
      title: "Copied to clipboard",
      description: "CSS code has been copied to your clipboard",
    });
    
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };
  
  // Get recommended tools that are related to CSS
  const recommendedTools = webTools
    .filter(tool => 
      tool.tags.includes("CSS") && 
      tool.slug !== "flexbox-playground"
    )
    .slice(0, 3);

  return (
    <MainLayout>
      {/* Hero Section */}
      <div className="bg-background text-foreground py-16 relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-20"></div>
        <div className="absolute top-1/4 -left-20 w-80 h-80 rounded-full bg-primary/10 blur-3xl"></div>
        <div className="absolute bottom-1/3 -right-20 w-80 h-80 rounded-full bg-accent/10 blur-3xl"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col items-center justify-center text-center">
            <div className="flex items-center gap-2 mb-4">
              <div className="p-3 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 text-primary">
                <Layout size={24} />
              </div>
              <span className="text-sm text-muted-foreground">CSS Tool</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-4 primary-gradient bg-clip-text text-transparent tracking-tight">
              CSS Flexbox Playground
            </h1>
            
            <p className="text-lg text-muted-foreground max-w-2xl mb-8">
              Experiment with Flexbox properties in real-time and see how they affect layout. 
              Perfect for learning and prototyping flexible box layouts.
            </p>
          </div>
        </div>
      </div>
      
      {/* Main Tool Area */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Controls Column */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Flexbox Controls</CardTitle>
                <CardDescription>
                  Adjust these settings to see how Flexbox properties work
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Flex Direction */}
                <div className="space-y-2">
                  <Label htmlFor="flex-direction">flex-direction</Label>
                  <Select 
                    value={flexDirection} 
                    onValueChange={setFlexDirection}
                  >
                    <SelectTrigger id="flex-direction">
                      <SelectValue placeholder="Select flex-direction" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="row">row</SelectItem>
                      <SelectItem value="row-reverse">row-reverse</SelectItem>
                      <SelectItem value="column">column</SelectItem>
                      <SelectItem value="column-reverse">column-reverse</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                {/* Justify Content */}
                <div className="space-y-2">
                  <Label htmlFor="justify-content">justify-content</Label>
                  <Select 
                    value={justifyContent} 
                    onValueChange={setJustifyContent}
                  >
                    <SelectTrigger id="justify-content">
                      <SelectValue placeholder="Select justify-content" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="flex-start">flex-start</SelectItem>
                      <SelectItem value="center">center</SelectItem>
                      <SelectItem value="flex-end">flex-end</SelectItem>
                      <SelectItem value="space-between">space-between</SelectItem>
                      <SelectItem value="space-around">space-around</SelectItem>
                      <SelectItem value="space-evenly">space-evenly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                {/* Align Items */}
                <div className="space-y-2">
                  <Label htmlFor="align-items">align-items</Label>
                  <Select 
                    value={alignItems} 
                    onValueChange={setAlignItems}
                  >
                    <SelectTrigger id="align-items">
                      <SelectValue placeholder="Select align-items" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="flex-start">flex-start</SelectItem>
                      <SelectItem value="center">center</SelectItem>
                      <SelectItem value="flex-end">flex-end</SelectItem>
                      <SelectItem value="stretch">stretch</SelectItem>
                      <SelectItem value="baseline">baseline</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                {/* Flex Wrap */}
                <div className="space-y-2">
                  <Label htmlFor="flex-wrap">flex-wrap</Label>
                  <Select 
                    value={flexWrap} 
                    onValueChange={setFlexWrap}
                  >
                    <SelectTrigger id="flex-wrap">
                      <SelectValue placeholder="Select flex-wrap" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="nowrap">nowrap</SelectItem>
                      <SelectItem value="wrap">wrap</SelectItem>
                      <SelectItem value="wrap-reverse">wrap-reverse</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                {/* Gap */}
                <div className="space-y-2">
                  <Label htmlFor="gap">gap</Label>
                  <Select 
                    value={gap} 
                    onValueChange={setGap}
                  >
                    <SelectTrigger id="gap">
                      <SelectValue placeholder="Select gap" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0">0</SelectItem>
                      <SelectItem value="4px">4px</SelectItem>
                      <SelectItem value="8px">8px</SelectItem>
                      <SelectItem value="16px">16px</SelectItem>
                      <SelectItem value="24px">24px</SelectItem>
                      <SelectItem value="32px">32px</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
            
            {/* CSS Code Output */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2">
                  <Code className="h-5 w-5" />
                  Generated CSS
                </CardTitle>
              </CardHeader>
              <CardContent>
                <pre className="p-4 bg-accent/10 rounded-md overflow-x-auto text-sm font-mono">
                  {cssCode}
                </pre>
              </CardContent>
              <CardFooter>
                <Button 
                  variant="outline" 
                  className="w-full flex items-center gap-2" 
                  onClick={handleCopyCSS}
                >
                  {copied ? (
                    <>
                      <Check className="h-4 w-4" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4" />
                      Copy CSS
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
          </div>
          
          {/* Preview Column */}
          <div className="space-y-6">
            <Card className="h-full">
              <CardHeader>
                <CardTitle>Live Preview</CardTitle>
                <CardDescription>
                  See how your flex container behaves with the current settings
                </CardDescription>
              </CardHeader>
              <CardContent className="h-[500px]">
                <div style={containerStyle} className="transition-all">
                  {boxColors.map((color, index) => (
                    <div 
                      key={index}
                      className={`${color} rounded-md p-4 text-white font-semibold flex items-center justify-center shadow-md`}
                      style={{
                        width: "100px",
                        height: index % 2 === 0 ? "100px" : "80px",
                        flexShrink: 0
                      }}
                    >
                      Item {index + 1}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      {/* Recommended Tools Section */}
      <div className="bg-accent/5 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-6">Recommended Tools</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {recommendedTools.map((tool) => {
              const IconComponent = LucideIcons[tool.icon as keyof typeof LucideIcons] as React.ComponentType<React.SVGProps<SVGSVGElement>>;
              
              return (
                <Card 
                  key={tool.id}
                  className="h-full transition-all duration-300 hover:shadow-xl cursor-pointer"
                  onClick={() => navigate(`/tools/${tool.slug}`)}
                >
                  <CardContent className="p-6 flex flex-col h-full">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="p-3 bg-gradient-to-br from-primary/20 to-accent/20 text-primary rounded-xl">
                        {IconComponent && <IconComponent width={22} height={22} />}
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">{tool.name}</h3>
                      </div>
                    </div>
                    
                    <p className="text-sm text-muted-foreground flex-grow">
                      {tool.description}
                    </p>
                    
                    <CardFooter className="p-0 pt-5">
                      <Button 
                        variant="outline"
                        className="w-full"
                      >
                        Visit Tool
                      </Button>
                    </CardFooter>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default FlexboxPlayground;

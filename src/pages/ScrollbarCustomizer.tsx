
import { useState, useEffect } from "react";
import MainLayout from "@/layouts/MainLayout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { toast } from "@/components/ui/use-toast";
import { Check, Copy, Brush, Code, Mouse } from "lucide-react";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import * as LucideIcons from "lucide-react";
import { useNavigate } from "react-router-dom";
import { webTools } from "@/data/webToolsData";
import WebToolCard from "@/components/WebToolCard";

interface ScrollbarStyle {
  width: number;
  trackColor: string;
  thumbColor: string;
  thumbHoverColor: string;
  thumbBorderRadius: number;
  trackBorderRadius: number;
}

const ScrollbarCustomizer = () => {
  const navigate = useNavigate();

  // Initial scrollbar style state
  const [scrollbarStyle, setScrollbarStyle] = useState<ScrollbarStyle>({
    width: 10,
    trackColor: "#f1f1f1",
    thumbColor: "#888888",
    thumbHoverColor: "#555555",
    thumbBorderRadius: 5,
    trackBorderRadius: 0,
  });

  // Copy button state
  const [copied, setCopied] = useState(false);

  // Generate the CSS code for the scrollbar
  const generateCssCode = () => {
    return `/* Webkit Scrollbar Customization */
::-webkit-scrollbar {
  width: ${scrollbarStyle.width}px;
}

::-webkit-scrollbar-track {
  background: ${scrollbarStyle.trackColor};
  border-radius: ${scrollbarStyle.trackBorderRadius}px;
}

::-webkit-scrollbar-thumb {
  background: ${scrollbarStyle.thumbColor};
  border-radius: ${scrollbarStyle.thumbBorderRadius}px;
}

::-webkit-scrollbar-thumb:hover {
  background: ${scrollbarStyle.thumbHoverColor};
}

/* For Firefox (although only width and color are supported) */
html {
  scrollbar-width: ${scrollbarStyle.width <= 8 ? 'thin' : 'auto'};
  scrollbar-color: ${scrollbarStyle.thumbColor} ${scrollbarStyle.trackColor};
}`;
  };

  // Custom scrollbar style for the preview
  const customScrollbarStyle = {
    "--scrollbar-width": `${scrollbarStyle.width}px`,
    "--scrollbar-track-color": scrollbarStyle.trackColor,
    "--scrollbar-thumb-color": scrollbarStyle.thumbColor,
    "--scrollbar-thumb-hover-color": scrollbarStyle.thumbHoverColor,
    "--scrollbar-thumb-radius": `${scrollbarStyle.thumbBorderRadius}px`,
    "--scrollbar-track-radius": `${scrollbarStyle.trackBorderRadius}px`,
  } as React.CSSProperties;

  // Handle changes to scrollbar properties
  const handleStyleChange = (property: keyof ScrollbarStyle, value: number | string) => {
    setScrollbarStyle(prev => ({ ...prev, [property]: value }));
  };

  // Copy CSS code to clipboard
  const handleCopyCode = () => {
    navigator.clipboard.writeText(generateCssCode());
    setCopied(true);
    
    toast({
      title: "Copied to clipboard",
      description: "CSS code has been copied to your clipboard",
    });
    
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  // Get recommended CSS tools
  const recommendedTools = webTools
    .filter(tool => 
      tool.tags.includes("CSS") && 
      tool.slug !== "scrollbar-customizer"
    )
    .slice(0, 3);

  // Dummy content for the preview section
  const dummyContent = Array.from({ length: 20 }, (_, i) => (
    <div key={i} className="mb-4">
      <h3 className="text-lg font-semibold">Section {i + 1}</h3>
      <p className="text-muted-foreground">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. 
        Vivamus hendrerit arcu sed erat molestie vehicula. Sed auctor neque eu tellus 
        rhoncus ut eleifend nibh porttitor.
      </p>
    </div>
  ));

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
                <Brush size={24} />
              </div>
              <span className="text-sm text-muted-foreground">CSS Tool</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-4 primary-gradient bg-clip-text text-transparent tracking-tight">
              CSS Scrollbar Customizer
            </h1>
            
            <p className="text-lg text-muted-foreground max-w-2xl mb-8">
              Customize scrollbars for WebKit-based browsers visually and generate CSS code. 
              Perfect for creating a consistent scrollbar style across your website.
            </p>
          </div>
        </div>
      </div>
      
      {/* Main Tool Area */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Controls Column */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Scrollbar Controls</CardTitle>
                <CardDescription>
                  Adjust these settings to customize your scrollbar
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Scrollbar Width */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <Label htmlFor="scrollbar-width">Scrollbar Width</Label>
                    <Input
                      id="scrollbar-width-input"
                      type="number"
                      value={scrollbarStyle.width}
                      onChange={(e) => handleStyleChange('width', Number(e.target.value))}
                      className="w-20 text-right"
                      min={5}
                      max={30}
                    />
                  </div>
                  <Slider
                    id="scrollbar-width"
                    defaultValue={[scrollbarStyle.width]}
                    min={5}
                    max={30}
                    step={1}
                    onValueChange={(values) => handleStyleChange('width', values[0])}
                  />
                </div>
                
                {/* Track Color */}
                <div className="space-y-2">
                  <Label htmlFor="track-color">Track Color</Label>
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-8 h-8 rounded-md border border-border"
                      style={{ backgroundColor: scrollbarStyle.trackColor }}
                    ></div>
                    <Input
                      id="track-color"
                      type="text"
                      value={scrollbarStyle.trackColor}
                      onChange={(e) => handleStyleChange('trackColor', e.target.value)}
                      className="flex-1"
                    />
                    <Input
                      type="color"
                      value={scrollbarStyle.trackColor}
                      onChange={(e) => handleStyleChange('trackColor', e.target.value)}
                      className="w-12 h-9 p-1 cursor-pointer"
                    />
                  </div>
                </div>
                
                {/* Thumb Color */}
                <div className="space-y-2">
                  <Label htmlFor="thumb-color">Thumb Color</Label>
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-8 h-8 rounded-md border border-border"
                      style={{ backgroundColor: scrollbarStyle.thumbColor }}
                    ></div>
                    <Input
                      id="thumb-color"
                      type="text"
                      value={scrollbarStyle.thumbColor}
                      onChange={(e) => handleStyleChange('thumbColor', e.target.value)}
                      className="flex-1"
                    />
                    <Input
                      type="color"
                      value={scrollbarStyle.thumbColor}
                      onChange={(e) => handleStyleChange('thumbColor', e.target.value)}
                      className="w-12 h-9 p-1 cursor-pointer"
                    />
                  </div>
                </div>
                
                {/* Thumb Hover Color */}
                <div className="space-y-2">
                  <Label htmlFor="thumb-hover-color">Thumb Hover Color</Label>
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-8 h-8 rounded-md border border-border"
                      style={{ backgroundColor: scrollbarStyle.thumbHoverColor }}
                    ></div>
                    <Input
                      id="thumb-hover-color"
                      type="text"
                      value={scrollbarStyle.thumbHoverColor}
                      onChange={(e) => handleStyleChange('thumbHoverColor', e.target.value)}
                      className="flex-1"
                    />
                    <Input
                      type="color"
                      value={scrollbarStyle.thumbHoverColor}
                      onChange={(e) => handleStyleChange('thumbHoverColor', e.target.value)}
                      className="w-12 h-9 p-1 cursor-pointer"
                    />
                  </div>
                </div>
                
                {/* Thumb Border Radius */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <Label htmlFor="thumb-radius">Thumb Border Radius</Label>
                    <Input
                      id="thumb-radius-input"
                      type="number"
                      value={scrollbarStyle.thumbBorderRadius}
                      onChange={(e) => handleStyleChange('thumbBorderRadius', Number(e.target.value))}
                      className="w-20 text-right"
                      min={0}
                      max={20}
                    />
                  </div>
                  <Slider
                    id="thumb-radius"
                    defaultValue={[scrollbarStyle.thumbBorderRadius]}
                    value={[scrollbarStyle.thumbBorderRadius]}
                    min={0}
                    max={20}
                    step={1}
                    onValueChange={(values) => handleStyleChange('thumbBorderRadius', values[0])}
                  />
                </div>
                
                {/* Track Border Radius */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <Label htmlFor="track-radius">Track Border Radius</Label>
                    <Input
                      id="track-radius-input"
                      type="number"
                      value={scrollbarStyle.trackBorderRadius}
                      onChange={(e) => handleStyleChange('trackBorderRadius', Number(e.target.value))}
                      className="w-20 text-right"
                      min={0}
                      max={20}
                    />
                  </div>
                  <Slider
                    id="track-radius"
                    defaultValue={[scrollbarStyle.trackBorderRadius]}
                    value={[scrollbarStyle.trackBorderRadius]}
                    min={0}
                    max={20}
                    step={1}
                    onValueChange={(values) => handleStyleChange('trackBorderRadius', values[0])}
                  />
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
                <div className="relative">
                  <SyntaxHighlighter language="css" style={vscDarkPlus} className="rounded-md !mt-0">
                    {generateCssCode()}
                  </SyntaxHighlighter>
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  variant="outline" 
                  className="w-full flex items-center gap-2" 
                  onClick={handleCopyCode}
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
                <CardTitle className="flex items-center gap-2">
                  <Mouse className="h-5 w-5" />
                  Live Preview
                </CardTitle>
                <CardDescription>
                  Scroll in this area to see your customized scrollbar
                </CardDescription>
              </CardHeader>
              <CardContent>
                <style>
                  {`
                  .custom-scrollbar::-webkit-scrollbar {
                    width: var(--scrollbar-width);
                  }
                  
                  .custom-scrollbar::-webkit-scrollbar-track {
                    background: var(--scrollbar-track-color);
                    border-radius: var(--scrollbar-track-radius);
                  }
                  
                  .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: var(--scrollbar-thumb-color);
                    border-radius: var(--scrollbar-thumb-radius);
                  }
                  
                  .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: var(--scrollbar-thumb-hover-color);
                  }
                `}
                </style>
                <div 
                  className="custom-scrollbar border border-border rounded-md h-[500px] overflow-y-auto p-4 bg-accent/5"
                  style={customScrollbarStyle}
                >
                  <div className="space-y-4">
                    <div className="p-4 bg-card border border-border rounded-md shadow-sm">
                      <h3 className="text-lg font-semibold mb-2">How to Use This CSS</h3>
                      <p className="text-muted-foreground">
                        Copy the generated CSS and add it to your website's stylesheet to customize the scrollbar appearance.
                        Note that these styles will only work in WebKit-based browsers (Chrome, Safari, Opera, Edge).
                      </p>
                    </div>
                    
                    <div className="p-4 bg-card border border-border rounded-md shadow-sm">
                      <h3 className="text-lg font-semibold mb-2">Browser Compatibility</h3>
                      <p className="text-muted-foreground">
                        These scrollbar customizations work in most modern browsers with WebKit/Blink rendering engines.
                        Firefox supports a limited subset of scrollbar customization via the <code>scrollbar-width</code> and <code>scrollbar-color</code> properties.
                      </p>
                    </div>
                    
                    {dummyContent}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      {/* Recommended Tools Section */}
      <div className="bg-accent/5 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-6">Recommended CSS Tools</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
      </div>
    </MainLayout>
  );
};

export default ScrollbarCustomizer;

import { useState, useEffect } from "react";
import { Copy, CheckCheck, RefreshCw, ArrowRight, Palette, Code, Search, Layout } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import MainLayout from "@/layouts/MainLayout";
import WebToolCard from "@/components/WebToolCard";
import * as LucideIcons from "lucide-react";

const ColorPaletteTool = () => {
  // State for color input and generated palette
  const [baseColor, setBaseColor] = useState("#4f46e5");
  const [palette, setPalette] = useState<string[]>([]);
  const [complementary, setComplementary] = useState<string[]>([]);
  const [copiedColor, setCopiedColor] = useState<string | null>(null);
  const { toast } = useToast();

  // Recommended tools for the bottom section
  const recommendedTools = [
    {
      id: "tool-1",
      name: "CSS Flexbox Playground",
      description: "Visualize and experiment with CSS Flexbox layouts interactively.",
      slug: "flexbox-playground",
      tags: ["CSS", "Layout", "Design"],
      icon: "Layout" as keyof typeof LucideIcons
    },
    {
      id: "tool-3",
      name: "JSON Formatter",
      description: "Format, validate, and analyze JSON with syntax highlighting.",
      slug: "json-formatter",
      tags: ["JavaScript", "Formatters", "Utilities"],
      icon: "Code" as keyof typeof LucideIcons
    },
    {
      id: "tool-4",
      name: "Regex Tester",
      description: "Test and debug regular expressions with real-time highlighting.",
      slug: "regex-tester",
      tags: ["JavaScript", "Utilities"],
      icon: "Search" as keyof typeof LucideIcons
    }
  ];

  // Generate palette on mount and when base color changes
  useEffect(() => {
    generatePalette();
  }, [baseColor]);

  // Generate palette from base color
  const generatePalette = () => {
    // Generate color shades
    const shades = generateShades(baseColor, 9);
    setPalette(shades);

    // Generate complementary colors
    const hsl = hexToHSL(baseColor);
    const complementaryHues = [
      (hsl.h + 30) % 360,  // Analogous 1
      (hsl.h + 60) % 360,  // Analogous 2
      (hsl.h + 180) % 360, // Complementary
      (hsl.h + 240) % 360, // Triadic 1
      (hsl.h + 300) % 360  // Triadic 2
    ];

    const complementaryColors = complementaryHues.map(hue => 
      hslToHex({ h: hue, s: hsl.s, l: hsl.l })
    );
    
    setComplementary(complementaryColors);
  };

  // Generate a random color
  const generateRandomColor = () => {
    const randomHex = '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
    setBaseColor(randomHex);
  };

  // Copy color to clipboard with feedback
  const copyToClipboard = (color: string) => {
    navigator.clipboard.writeText(color);
    setCopiedColor(color);
    
    toast({
      title: "Color copied!",
      description: `${color} has been copied to clipboard.`,
    });
    
    setTimeout(() => {
      setCopiedColor(null);
    }, 2000);
  };

  // Color conversion utilities
  const hexToHSL = (hex: string): { h: number; s: number; l: number } => {
    // Remove the # if present
    hex = hex.replace(/^#/, '');
    
    // Parse the hex values
    let r = parseInt(hex.substring(0, 2), 16) / 255;
    let g = parseInt(hex.substring(2, 4), 16) / 255;
    let b = parseInt(hex.substring(4, 6), 16) / 255;
    
    // Find the min and max values to calculate lightness
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0;
    let s = 0;
    let l = (max + min) / 2;
    
    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      
      h /= 6;
    }
    
    return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
  };

  const hslToHex = ({ h, s, l }: { h: number; s: number; l: number }): string => {
    l /= 100;
    const a = s * Math.min(l, 1 - l) / 100;
    
    const f = (n: number) => {
      const k = (n + h / 30) % 12;
      const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
      return Math.round(255 * color).toString(16).padStart(2, '0');
    };
    
    return `#${f(0)}${f(8)}${f(4)}`;
  };
  
  const generateShades = (hex: string, count: number): string[] => {
    const hsl = hexToHSL(hex);
    const step = 100 / (count + 1);
    
    // Generate a range of lightness values
    const shades = Array.from({ length: count }, (_, i) => {
      const lightness = Math.max(Math.min(hsl.l - 50 + step * (i + 1), 95), 5);
      return hslToHex({ h: hsl.h, s: hsl.s, l: lightness });
    });
    
    return shades;
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-10">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold mb-3 bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
              Color Palette Generator
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Generate beautiful color palettes with shades and complementary colors for your web projects
            </p>
          </div>

          {/* Main tool section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Base color selection */}
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Palette className="h-5 w-5 text-primary" />
                    Base Color
                  </CardTitle>
                  <CardDescription>
                    Select a color to generate a palette
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-3 mb-4">
                    <div className="flex-1">
                      <Input
                        type="text"
                        value={baseColor}
                        onChange={(e) => setBaseColor(e.target.value)}
                        placeholder="Enter a hex color (e.g. #4f46e5)"
                        pattern="^#?([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$"
                        className="w-full"
                      />
                    </div>
                    <Input
                      type="color"
                      value={baseColor}
                      onChange={(e) => setBaseColor(e.target.value)}
                      className="w-14 h-10 p-1"
                    />
                    <Button 
                      variant="outline" 
                      size="icon" 
                      onClick={generateRandomColor}
                      title="Generate random color"
                    >
                      <RefreshCw size={18} />
                    </Button>
                  </div>

                  <div 
                    className="aspect-video rounded-lg flex items-center justify-center shadow-md" 
                    style={{ backgroundColor: baseColor }}
                  >
                    <Button 
                      variant="secondary" 
                      onClick={() => copyToClipboard(baseColor)}
                      className="bg-white/20 backdrop-blur-lg hover:bg-white/30 border border-white/10"
                    >
                      {copiedColor === baseColor ? (
                        <><CheckCheck size={16} className="mr-2" /> Copied!</>
                      ) : (
                        <><Copy size={16} className="mr-2" /> Copy {baseColor}</>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Complementary colors */}
            <Card>
              <CardHeader>
                <CardTitle>Complementary Colors</CardTitle>
                <CardDescription>
                  Harmonious colors that work well with your base color
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-5 gap-3">
                  {complementary.map((color, index) => (
                    <div key={index} className="space-y-2">
                      <div 
                        className="aspect-square rounded-md cursor-pointer relative group shadow-sm"
                        style={{ backgroundColor: color }}
                        onClick={() => copyToClipboard(color)}
                      >
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button
                            variant="secondary"
                            size="icon"
                            className="h-8 w-8 bg-white/20 backdrop-blur-sm"
                          >
                            {copiedColor === color ? (
                              <CheckCheck size={14} />
                            ) : (
                              <Copy size={14} />
                            )}
                          </Button>
                        </div>
                      </div>
                      <p className="text-xs text-center font-mono">{color}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Color shades */}
          <Card className="mb-12">
            <CardHeader>
              <CardTitle>Color Shades</CardTitle>
              <CardDescription>
                A range of shades derived from your base color
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-9 gap-3">
                {palette.map((color, index) => (
                  <div key={index} className="space-y-2">
                    <div 
                      className="aspect-square rounded-md cursor-pointer relative group shadow-sm"
                      style={{ backgroundColor: color }}
                      onClick={() => copyToClipboard(color)}
                    >
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button
                          variant="secondary"
                          size="icon"
                          className="h-8 w-8 bg-white/20 backdrop-blur-sm"
                        >
                          {copiedColor === color ? (
                            <CheckCheck size={14} />
                          ) : (
                            <Copy size={14} />
                          )}
                        </Button>
                      </div>

                      <div className="absolute bottom-2 right-2 text-xs bg-black/40 text-white px-2 py-0.5 rounded-full backdrop-blur-sm">
                        {index * 100 + 100}
                      </div>
                    </div>
                    <p className="text-xs text-center font-mono">{color}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* How to use section */}
          <Card className="mb-12">
            <CardHeader>
              <CardTitle>How to Use</CardTitle>
              <CardDescription>
                Quick guide to using the Color Palette Generator
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h3 className="font-medium flex items-center gap-2">
                    <div className="h-6 w-6 rounded-full bg-primary flex items-center justify-center text-white text-xs">1</div>
                    Select a Base Color
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Choose a color using the color picker, enter a hex code, or generate a random color.
                  </p>
                </div>
                
                <div className="space-y-2">
                  <h3 className="font-medium flex items-center gap-2">
                    <div className="h-6 w-6 rounded-full bg-primary flex items-center justify-center text-white text-xs">2</div>
                    Explore Complementary Colors
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Browse harmonious colors that work well with your base color.
                  </p>
                </div>

                <div className="space-y-2">
                  <h3 className="font-medium flex items-center gap-2">
                    <div className="h-6 w-6 rounded-full bg-primary flex items-center justify-center text-white text-xs">3</div>
                    Check Different Shades
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    View lighter and darker variations of your chosen color.
                  </p>
                </div>

                <div className="space-y-2">
                  <h3 className="font-medium flex items-center gap-2">
                    <div className="h-6 w-6 rounded-full bg-primary flex items-center justify-center text-white text-xs">4</div>
                    Copy and Use
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Click on any color to copy its hex code for use in your projects.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recommended tools section */}
          <div className="mt-16">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Recommended Tools</h2>
              <Button variant="outline" asChild>
                <a href="/web-tools">
                  View All Tools
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {recommendedTools.map((tool) => (
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

export default ColorPaletteTool;

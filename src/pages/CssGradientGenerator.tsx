
import React, { useState, useEffect, useRef } from "react";
import MainLayout from "@/layouts/MainLayout";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent } from "@/components/ui/card";
import { Copy, Check, Palette, RefreshCw, Code, ToggleLeft, ToggleRight, X } from "lucide-react";
import { useDebounce } from "@/hooks/useDebounce";
import WebToolCard from "@/components/WebToolCard";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Switch } from "@/components/ui/switch";

// CSS Gradient Generator Tool Component
const CssGradientGenerator = () => {
  // Toast for notifications
  const { toast } = useToast();
  
  // State for gradient parameters
  const [gradientType, setGradientType] = useState<"linear" | "radial">("linear");
  const [direction, setDirection] = useState<string>("to right");
  const [colors, setColors] = useState<Array<{ color: string; stop: number }>>([
    { color: "#8B5CF6", stop: 0 },
    { color: "#D946EF", stop: 100 }
  ]);
  const [cssCode, setCssCode] = useState<string>("");
  const [copied, setCopied] = useState<boolean>(false);
  
  // Debounce parameters to prevent too many re-renders
  const debouncedGradientType = useDebounce(gradientType, 100);
  const debouncedDirection = useDebounce(direction, 100);
  const debouncedColors = useDebounce(colors, 100);
  
  // Generate CSS gradient code based on parameters
  useEffect(() => {
    generateCssCode();
  }, [debouncedGradientType, debouncedDirection, debouncedColors]);
  
  // Generate CSS gradient code
  const generateCssCode = () => {
    let code = "";
    
    if (debouncedGradientType === "linear") {
      code = `background: linear-gradient(${debouncedDirection}, ${debouncedColors
        .map((c) => `${c.color} ${c.stop}%`)
        .join(", ")});`;
    } else {
      code = `background: radial-gradient(circle, ${debouncedColors
        .map((c) => `${c.color} ${c.stop}%`)
        .join(", ")});`;
    }
    
    setCssCode(code);
  };
  
  // Handle color change
  const handleColorChange = (index: number, newColor: string) => {
    const newColors = [...colors];
    newColors[index].color = newColor;
    setColors(newColors);
  };
  
  // Handle stop change
  const handleStopChange = (index: number, newStop: number) => {
    const newColors = [...colors];
    newColors[index].stop = newStop;
    setColors(newColors);
  };
  
  // Add a new color stop
  const handleAddColor = () => {
    if (colors.length < 4) {
      // Calculate a reasonable stop value for the new color
      const lastStop = colors[colors.length - 1].stop;
      const newStop = Math.min(lastStop + 25, 100);
      
      setColors([...colors, { color: "#FFFFFF", stop: newStop }]);
    } else {
      toast({
        title: "Maximum colors reached",
        description: "You can use up to 4 colors in your gradient",
        duration: 3000,
      });
    }
  };
  
  // Remove a color stop
  const handleRemoveColor = (index: number) => {
    if (colors.length > 2) {
      const newColors = [...colors];
      newColors.splice(index, 1);
      setColors(newColors);
    } else {
      toast({
        title: "Minimum colors required",
        description: "You need at least 2 colors to create a gradient",
        duration: 3000,
      });
    }
  };
  
  // Copy CSS code to clipboard
  const handleCopy = () => {
    navigator.clipboard.writeText(cssCode).then(() => {
      setCopied(true);
      toast({
        title: "Copied!",
        description: "CSS code copied to clipboard",
        duration: 2000,
      });
      
      setTimeout(() => {
        setCopied(false);
      }, 3000);
    });
  };
  
  // Generate random gradient
  const handleRandomize = () => {
    // Random gradient type
    const randomType = Math.random() > 0.5 ? "linear" as const : "radial" as const;
    
    // Random direction for linear gradients
    const directions = [
      "to right",
      "to left",
      "to top",
      "to bottom",
      "to right top",
      "to right bottom",
      "to left top",
      "to left bottom"
    ];
    const randomDirection = directions[Math.floor(Math.random() * directions.length)];
    
    // Random number of colors (2-4)
    const colorCount = Math.floor(Math.random() * 3) + 2;
    
    // Generate random colors with distributed stops
    const randomColors = [];
    for (let i = 0; i < colorCount; i++) {
      const randomColor = `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`;
      const stop = i === 0 ? 0 : i === colorCount - 1 ? 100 : Math.floor((i / (colorCount - 1)) * 100);
      randomColors.push({ color: randomColor, stop });
    }
    
    // Update state
    setGradientType(randomType);
    setDirection(randomDirection);
    setColors(randomColors);
    
    toast({
      title: "Randomized!",
      description: "Gradient parameters randomly generated",
      duration: 2000,
    });
  };
  
  // Preset gradients
  const gradientPresets = [
    { name: "Sunset", type: "linear", direction: "to right", colors: [{ color: "#F97316", stop: 0 }, { color: "#D946EF", stop: 100 }] },
    { name: "Ocean", type: "linear", direction: "to bottom", colors: [{ color: "#0EA5E9", stop: 0 }, { color: "#8B5CF6", stop: 100 }] },
    { name: "Forest", type: "linear", direction: "to right", colors: [{ color: "#22C55E", stop: 0 }, { color: "#16A34A", stop: 100 }] },
    { name: "Fire", type: "linear", direction: "to top right", colors: [{ color: "#EF4444", stop: 0 }, { color: "#F97316", stop: 100 }] },
    { name: "Pastel", type: "linear", direction: "to right", colors: [{ color: "#E5DEFF", stop: 0 }, { color: "#FEC6A1", stop: 100 }] },
    { name: "Rainbow", type: "linear", direction: "to right", colors: [
      { color: "#EF4444", stop: 0 },
      { color: "#F97316", stop: 25 },
      { color: "#FACC15", stop: 50 },
      { color: "#22C55E", stop: 75 },
      { color: "#3B82F6", stop: 100 }
    ]}
  ];
  
  // Apply preset
  const applyPreset = (preset: any) => {
    setGradientType(preset.type as "linear" | "radial");
    setDirection(preset.direction);
    setColors(preset.colors.slice(0, 4)); // Max 4 colors
    
    toast({
      title: `${preset.name} preset applied`,
      duration: 2000,
    });
  };
  
  // Related tools for recommendations
  const relatedTools = [
    {
      name: "SVG Wave Generator",
      description: "Create customizable SVG wave patterns for website backgrounds",
      tags: ["SVG", "CSS", "Design"],
      slug: "svg-wave-generator",
      icon: "Waves" as keyof typeof import("lucide-react")
    },
    {
      name: "Color Palette Generator",
      description: "Create beautiful color palettes for your projects",
      tags: ["CSS", "Design", "Color"],
      slug: "color-palette",
      icon: "Palette" as keyof typeof import("lucide-react")
    },
    {
      name: "Button Generator",
      description: "Design custom buttons with live preview",
      tags: ["CSS", "HTML", "Design"],
      slug: "button-generator",
      icon: "Square" as keyof typeof import("lucide-react")
    }
  ];

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">CSS Gradient Generator</h1>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
            Create beautiful CSS gradients for your website backgrounds, buttons, and UI elements.
          </p>
        </div>

        {/* Main Tool Area */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
          {/* Left Column - Controls */}
          <div className="lg:col-span-4 space-y-8">
            <Card>
              <CardContent className="p-6 space-y-6">
                <div className="space-y-2">
                  <Label>Gradient Type</Label>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <ToggleLeft className={`h-5 w-5 ${gradientType === "linear" ? "text-primary" : "text-muted-foreground"}`} />
                      <span>Linear</span>
                    </div>
                    <Switch 
                      checked={gradientType === "radial"}
                      onCheckedChange={(checked) => setGradientType(checked ? "radial" : "linear")}
                    />
                    <div className="flex items-center space-x-2">
                      <span>Radial</span>
                      <ToggleRight className={`h-5 w-5 ${gradientType === "radial" ? "text-primary" : "text-muted-foreground"}`} />
                    </div>
                  </div>
                </div>

                {gradientType === "linear" && (
                  <div className="space-y-2">
                    <Label htmlFor="direction">Direction</Label>
                    <Select
                      value={direction}
                      onValueChange={setDirection}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select direction" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="to right">Left to Right (→)</SelectItem>
                        <SelectItem value="to left">Right to Left (←)</SelectItem>
                        <SelectItem value="to bottom">Top to Bottom (↓)</SelectItem>
                        <SelectItem value="to top">Bottom to Top (↑)</SelectItem>
                        <SelectItem value="to right top">Bottom Left to Top Right (↗)</SelectItem>
                        <SelectItem value="to right bottom">Top Left to Bottom Right (↘)</SelectItem>
                        <SelectItem value="to left top">Bottom Right to Top Left (↖)</SelectItem>
                        <SelectItem value="to left bottom">Top Right to Bottom Left (↙)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label>Color Stops</Label>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleAddColor}
                      disabled={colors.length >= 4}
                    >
                      Add Color
                    </Button>
                  </div>
                  
                  {colors.map((colorStop, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor={`color-${index}`}>Color {index + 1}</Label>
                        {colors.length > 2 && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-6 w-6 p-0"
                            onClick={() => handleRemoveColor(index)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                      <div className="flex space-x-2">
                        <div 
                          className="h-10 w-12 rounded-md border border-input"
                          style={{ backgroundColor: colorStop.color }}
                        />
                        <Input
                          id={`color-${index}`}
                          type="text"
                          value={colorStop.color}
                          onChange={(e) => handleColorChange(index, e.target.value)}
                          className="flex-1"
                        />
                        <Input
                          type="color"
                          value={colorStop.color}
                          onChange={(e) => handleColorChange(index, e.target.value)}
                          className="w-12 p-1 h-10"
                        />
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label htmlFor={`stop-${index}`}>Position ({colorStop.stop}%)</Label>
                        </div>
                        <Slider
                          id={`stop-${index}`}
                          min={0}
                          max={100}
                          step={1}
                          value={[colorStop.stop]}
                          onValueChange={(value) => handleStopChange(index, value[0])}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <Button 
                  onClick={handleRandomize} 
                  variant="outline" 
                  className="w-full"
                >
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Randomize Gradient
                </Button>
              </CardContent>
            </Card>
            
            {/* Presets Card */}
            <Card>
              <CardContent className="p-6 space-y-4">
                <Label>Gradient Presets</Label>
                <div className="grid grid-cols-2 gap-2">
                  {gradientPresets.map((preset, index) => (
                    <Button 
                      key={index}
                      variant="outline"
                      className="h-12 w-full overflow-hidden p-0 relative"
                      onClick={() => applyPreset(preset)}
                    >
                      <div 
                        className="absolute inset-0 w-full h-full"
                        style={{ 
                          background: `${preset.type}-gradient(${preset.direction}, ${preset.colors.map(c => `${c.color} ${c.stop}%`).join(', ')})` 
                        }}
                      />
                      <span className="relative z-10 bg-background/80 px-2 py-1 rounded text-xs font-medium">
                        {preset.name}
                      </span>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Middle Column - Preview */}
          <div className="lg:col-span-4 flex flex-col space-y-6">
            <Card className="flex-1">
              <CardContent className="p-6 flex flex-col items-center justify-center h-full">
                <div className="text-center mb-4">
                  <h3 className="font-semibold text-lg">Preview</h3>
                  <p className="text-sm text-muted-foreground">Live preview of your gradient</p>
                </div>
                
                <div className="w-full aspect-square rounded-lg overflow-hidden shadow-md border border-border">
                  <div 
                    className="w-full h-full"
                    style={{ 
                      background: gradientType === "linear" 
                        ? `linear-gradient(${direction}, ${colors.map(c => `${c.color} ${c.stop}%`).join(', ')})` 
                        : `radial-gradient(circle, ${colors.map(c => `${c.color} ${c.stop}%`).join(', ')})`
                    }}
                  />
                </div>
                
                <div className="w-full mt-6">
                  <Button 
                    onClick={handleCopy}
                    className="w-full"
                    variant="default"
                  >
                    {copied ? (
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
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Code Output */}
          <div className="lg:col-span-4 flex flex-col">
            <Card className="flex-1">
              <CardContent className="p-6">
                <div className="mb-4">
                  <h3 className="font-semibold text-lg">CSS Code</h3>
                  <p className="text-sm text-muted-foreground">Generated CSS for your gradient</p>
                </div>
                
                <div className="w-full bg-muted/50 rounded-lg p-4 mb-4 overflow-auto font-mono text-sm">
                  <pre className="whitespace-pre-wrap break-all">{cssCode}</pre>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-sm mb-2">CSS Usage Example:</h4>
                    <div className="w-full bg-muted/50 rounded-lg p-4 overflow-auto font-mono text-sm">
                      <pre className="whitespace-pre-wrap">{`.element {
  ${cssCode}
  /* Add additional styling as needed */
  width: 300px;
  height: 200px;
  border-radius: 8px;
}`}</pre>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* How to Use Section */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-6 text-center">How to Use the CSS Gradient Generator</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-2">1. Choose Your Gradient Type</h3>
                <p className="text-muted-foreground">
                  Select between linear or radial gradients. For linear gradients, choose a direction 
                  to control how the colors flow from one to another.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-2">2. Customize Colors</h3>
                <p className="text-muted-foreground">
                  Add up to 4 color stops and adjust their positions. You can enter hex codes directly 
                  or use the color pickers. Try our presets for quick inspiration.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-2">3. Use Your Gradient</h3>
                <p className="text-muted-foreground">
                  Preview your gradient in real-time. When you're happy with the result, copy the CSS code 
                  and use it in your website or application.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Recommended Tools */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-6 text-center">Recommended Tools</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedTools.map((tool, index) => (
              <WebToolCard
                key={index}
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

export default CssGradientGenerator;


import React, { useState, useEffect, useRef } from "react";
import MainLayout from "@/layouts/MainLayout";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent } from "@/components/ui/card";
import { Check, Copy, Download, RefreshCw, Waves } from "lucide-react";
import { useDebounce } from "@/hooks/useDebounce";
import WebToolCard from "@/components/WebToolCard";
import { LucideIcon } from "lucide-react";

// SVG Wave Generator Tool Component
const SvgWaveGenerator = () => {
  // Toast for notifications
  const { toast } = useToast();
  
  // State for wave parameters
  const [waveHeight, setWaveHeight] = useState<number>(50);
  const [waveIntensity, setWaveIntensity] = useState<number>(30);
  const [primaryColor, setPrimaryColor] = useState<string>("#4c1d95");
  const [secondaryColor, setSecondaryColor] = useState<string>("#8b5cf6");
  const [waveDirection, setWaveDirection] = useState<string>("top");
  const [segments, setSegments] = useState<number>(5);
  const [copied, setCopied] = useState<boolean>(false);
  const [svgCode, setSvgCode] = useState<string>("");
  
  // Debounce wave parameters to prevent too many re-renders
  const debouncedHeight = useDebounce(waveHeight, 100);
  const debouncedIntensity = useDebounce(waveIntensity, 100);
  const debouncedPrimaryColor = useDebounce(primaryColor, 100);
  const debouncedSecondaryColor = useDebounce(secondaryColor, 100);
  const debouncedDirection = useDebounce(waveDirection, 100);
  const debouncedSegments = useDebounce(segments, 100);
  
  // Reference for the generated SVG element
  const svgRef = useRef<SVGSVGElement>(null);
  
  // Generate path data for waves
  const generateWavePath = (width: number, height: number, intensity: number, segments: number): string => {
    let path = "";
    const segmentWidth = width / segments;
    
    // Start at bottom-left corner
    path = `M0 ${height} `;
    
    // Generate curve points
    for (let i = 0; i < segments; i++) {
      const x1 = i * segmentWidth;
      const x2 = (i + 1) * segmentWidth;
      const xMid = (x1 + x2) / 2;
      
      // Alternate curve heights for wave effect
      const curveHeight = i % 2 === 0 
        ? height - (height * (intensity / 100)) 
        : height;
      
      path += `C ${x1 + segmentWidth / 4} ${curveHeight}, ${xMid - segmentWidth / 4} ${curveHeight}, ${xMid} ${curveHeight} `;
      path += `C ${xMid + segmentWidth / 4} ${curveHeight}, ${x2 - segmentWidth / 4} ${i % 2 === 0 ? height : curveHeight}, ${x2} ${height} `;
    }
    
    // Close the path
    path += `L${width} ${height} L${width} ${height} L0 ${height} Z`;
    
    return path;
  };
  
  // Generate SVG code based on parameters
  const generateSvgCode = () => {
    const width = 800;
    const height = 200;
    const adjustedHeight = height * (debouncedHeight / 100);
    
    let viewBox = "0 0 800 200";
    let transform = "";
    
    // Adjust viewBox and transform based on direction
    switch (debouncedDirection) {
      case "bottom":
        transform = "rotate(180 400 100)";
        break;
      case "left":
        viewBox = "0 0 200 800";
        transform = "rotate(90 100 100) translate(0, -700)";
        break;
      case "right":
        viewBox = "0 0 200 800";
        transform = "rotate(-90 100 100) translate(-800, 0)";
        break;
      default: // top
        break;
    }
    
    // Create gradient ID
    const gradientId = `wave-gradient-${Math.random().toString(36).substring(2, 11)}`;
    
    // Generate wave path
    const wavePath = generateWavePath(width, adjustedHeight, debouncedIntensity, debouncedSegments);
    
    // Create SVG code
    const code = `<svg width="100%" height="100%" viewBox="${viewBox}" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="${gradientId}" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="${debouncedPrimaryColor}" />
      <stop offset="100%" stop-color="${debouncedSecondaryColor}" />
    </linearGradient>
  </defs>
  <g transform="${transform}">
    <path d="${wavePath}" fill="url(#${gradientId})" />
  </g>
</svg>`;
    
    return code;
  };
  
  // Effect to regenerate SVG when parameters change
  useEffect(() => {
    const newSvgCode = generateSvgCode();
    setSvgCode(newSvgCode);
  }, [
    debouncedHeight,
    debouncedIntensity,
    debouncedPrimaryColor,
    debouncedSecondaryColor,
    debouncedDirection,
    debouncedSegments
  ]);
  
  // Handle copy SVG code to clipboard
  const handleCopy = () => {
    navigator.clipboard.writeText(svgCode).then(() => {
      setCopied(true);
      toast({
        title: "Copied!",
        description: "SVG code copied to clipboard",
        duration: 2000,
      });
      
      setTimeout(() => {
        setCopied(false);
      }, 3000);
    });
  };
  
  // Handle download SVG as file
  const handleDownload = () => {
    const blob = new Blob([svgCode], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "wave-divider.svg";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Downloaded!",
      description: "SVG file downloaded successfully",
      duration: 2000,
    });
  };
  
  // Handle random wave generation
  const handleRandomize = () => {
    // Generate random values for wave parameters
    setWaveHeight(Math.floor(Math.random() * 80) + 20);
    setWaveIntensity(Math.floor(Math.random() * 50) + 10);
    setSegments(Math.floor(Math.random() * 8) + 3);
    
    // Random colors
    const randomColor1 = `#${Math.floor(Math.random()*16777215).toString(16).padStart(6, '0')}`;
    const randomColor2 = `#${Math.floor(Math.random()*16777215).toString(16).padStart(6, '0')}`;
    setPrimaryColor(randomColor1);
    setSecondaryColor(randomColor2);
    
    // Random direction
    const directions = ["top", "bottom", "left", "right"];
    setWaveDirection(directions[Math.floor(Math.random() * directions.length)]);
    
    toast({
      title: "Randomized!",
      description: "Wave parameters randomly generated",
      duration: 2000,
    });
  };
  
  // Related tools for recommendations
  const relatedTools = [
    {
      name: "CSS Animation Generator",
      description: "Create custom CSS animations with a visual editor",
      tags: ["CSS", "Animation", "Design"],
      slug: "css-animation-generator",
      icon: "Zap" as keyof typeof import("lucide-react")
    },
    {
      name: "Button Generator",
      description: "Design custom buttons with live preview",
      tags: ["CSS", "HTML", "Design"],
      slug: "button-generator",
      icon: "Square" as keyof typeof import("lucide-react")
    },
    {
      name: "Color Palette Generator",
      description: "Create beautiful color palettes for your projects",
      tags: ["Design", "CSS", "Color"],
      slug: "color-palette",
      icon: "Palette" as keyof typeof import("lucide-react")
    }
  ];

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">SVG Wave Generator</h1>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
            Create beautiful, customizable SVG wave patterns for your website backgrounds, dividers, and section transitions.
          </p>
        </div>

        {/* Main Tool Area */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
          {/* Left Column - Controls */}
          <div className="lg:col-span-4 space-y-8">
            <Card>
              <CardContent className="p-6 space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="wave-height">Wave Height ({waveHeight}%)</Label>
                  <Slider
                    id="wave-height"
                    min={10}
                    max={100}
                    step={1}
                    value={[waveHeight]}
                    onValueChange={(value) => setWaveHeight(value[0])}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="wave-intensity">Wave Intensity ({waveIntensity}%)</Label>
                  <Slider
                    id="wave-intensity"
                    min={0}
                    max={100}
                    step={1}
                    value={[waveIntensity]}
                    onValueChange={(value) => setWaveIntensity(value[0])}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="segments">Wave Segments ({segments})</Label>
                  <Slider
                    id="segments"
                    min={2}
                    max={10}
                    step={1}
                    value={[segments]}
                    onValueChange={(value) => setSegments(value[0])}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="primary-color">Primary Color</Label>
                  <div className="flex space-x-2">
                    <div 
                      className="h-10 w-12 rounded-md border border-input"
                      style={{ backgroundColor: primaryColor }}
                    />
                    <Input
                      id="primary-color"
                      type="text"
                      value={primaryColor}
                      onChange={(e) => setPrimaryColor(e.target.value)}
                      className="flex-1"
                    />
                    <Input
                      type="color"
                      value={primaryColor}
                      onChange={(e) => setPrimaryColor(e.target.value)}
                      className="w-12 p-1 h-10"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="secondary-color">Secondary Color</Label>
                  <div className="flex space-x-2">
                    <div 
                      className="h-10 w-12 rounded-md border border-input"
                      style={{ backgroundColor: secondaryColor }}
                    />
                    <Input
                      id="secondary-color"
                      type="text"
                      value={secondaryColor}
                      onChange={(e) => setSecondaryColor(e.target.value)}
                      className="flex-1"
                    />
                    <Input
                      type="color"
                      value={secondaryColor}
                      onChange={(e) => setSecondaryColor(e.target.value)}
                      className="w-12 p-1 h-10"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="wave-direction">Wave Direction</Label>
                  <Select
                    value={waveDirection}
                    onValueChange={setWaveDirection}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select direction" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="top">Top</SelectItem>
                      <SelectItem value="bottom">Bottom</SelectItem>
                      <SelectItem value="left">Left</SelectItem>
                      <SelectItem value="right">Right</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button 
                  onClick={handleRandomize} 
                  variant="outline" 
                  className="w-full"
                >
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Randomize Wave
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Middle Column - Preview */}
          <div className="lg:col-span-4 flex flex-col space-y-6">
            <Card className="flex-1">
              <CardContent className="p-6 flex flex-col items-center justify-center h-full">
                <div className="text-center mb-4">
                  <h3 className="font-semibold text-lg">Preview</h3>
                  <p className="text-sm text-muted-foreground">Live preview of your wave</p>
                </div>
                
                <div className="w-full h-64 bg-card border border-border rounded-lg overflow-hidden flex items-center justify-center relative">
                  <div 
                    className="w-full h-full"
                    dangerouslySetInnerHTML={{ __html: svgCode }}
                  />
                </div>
                
                <div className="flex flex-col sm:flex-row w-full gap-3 mt-6">
                  <Button 
                    onClick={handleCopy}
                    className="flex-1"
                    variant="outline"
                  >
                    {copied ? (
                      <>
                        <Check className="mr-2 h-4 w-4" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="mr-2 h-4 w-4" />
                        Copy SVG
                      </>
                    )}
                  </Button>
                  
                  <Button 
                    onClick={handleDownload}
                    className="flex-1"
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Download SVG
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
                  <h3 className="font-semibold text-lg">SVG Code</h3>
                  <p className="text-sm text-muted-foreground">Generated SVG markup</p>
                </div>
                
                <div className="w-full h-[400px] bg-muted/50 rounded-lg p-4 overflow-auto">
                  <pre className="text-xs font-mono whitespace-pre-wrap">
                    {svgCode}
                  </pre>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* How to Use Section */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-6 text-center">How to Use the SVG Wave Generator</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-2">1. Customize Your Wave</h3>
                <p className="text-muted-foreground">
                  Adjust the sliders to change wave height, intensity, and segments. Pick colors using the color pickers,
                  and select wave direction from the dropdown menu.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-2">2. Generate & Copy SVG</h3>
                <p className="text-muted-foreground">
                  Once you're happy with your design in the preview panel, click "Copy SVG" to copy the generated code to your clipboard.
                  You can also download the SVG file directly.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-2">3. Use in Your Website</h3>
                <p className="text-muted-foreground">
                  Paste the SVG code directly into your HTML, or use it as a background image in CSS.
                  You can also use the downloaded SVG file as an image.
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

export default SvgWaveGenerator;

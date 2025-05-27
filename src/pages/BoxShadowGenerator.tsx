
import { useState, useEffect } from "react";
import MainLayout from "@/layouts/MainLayout";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { WebTool, webTools } from "@/data/webToolsData";
import WebToolCard from "@/components/WebToolCard";
import { 
  Copy, 
  Check, 
  Square, 
  Sliders, 
  Code, 
  Palette,
  Eye,
  ToggleRight 
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const BoxShadowGenerator = () => {
  // Shadow properties state
  const [horizontalOffset, setHorizontalOffset] = useState(10);
  const [verticalOffset, setVerticalOffset] = useState(10);
  const [blurRadius, setBlurRadius] = useState(15);
  const [spreadRadius, setSpreadRadius] = useState(0);
  const [shadowColor, setShadowColor] = useState("#000000");
  const [shadowOpacity, setShadowOpacity] = useState(0.2);
  const [isInset, setIsInset] = useState(false);
  
  // Output states
  const [cssCode, setCssCode] = useState("");
  const [boxShadowValue, setBoxShadowValue] = useState(""); // Add state for the raw box-shadow value
  const [isCopied, setIsCopied] = useState(false);
  
  const { toast } = useToast();

  // Get similar tools for recommendations
  const recommendedTools = webTools
    .filter(tool => 
      tool.tags.some(tag => ['CSS', 'Design', 'Generators'].includes(tag)) && 
      tool.slug !== 'box-shadow-generator'
    )
    .slice(0, 4);

  // Generate CSS code on any state change
  useEffect(() => {
    generateCssCode();
  }, [horizontalOffset, verticalOffset, blurRadius, spreadRadius, shadowColor, shadowOpacity, isInset]);

  // Generate the CSS code
  const generateCssCode = () => {
    // Convert hex color to rgba
    const hexToRgba = (hex: string, opacity: number) => {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result 
        ? `rgba(${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}, ${opacity})`
        : `rgba(0, 0, 0, ${opacity})`;
    };

    const rgba = hexToRgba(shadowColor, shadowOpacity);
    const insetValue = isInset ? "inset " : "";
    
    const shadowValue = `${insetValue}${horizontalOffset}px ${verticalOffset}px ${blurRadius}px ${spreadRadius}px ${rgba}`;
    const cssCodeValue = `box-shadow: ${shadowValue};`;
    
    setBoxShadowValue(shadowValue); // Store the raw box-shadow value
    setCssCode(cssCodeValue);
  };

  // Copy CSS code to clipboard
  const copyToClipboard = () => {
    navigator.clipboard.writeText(cssCode)
      .then(() => {
        setIsCopied(true);
        toast({
          title: "Copied!",
          description: "CSS code copied to clipboard",
        });
        setTimeout(() => setIsCopied(false), 2000);
      })
      .catch(err => {
        toast({
          title: "Failed to copy",
          description: "There was an error copying the code",
          variant: "destructive",
        });
        console.error("Failed to copy: ", err);
      });
  };

  // Calculate preview color with opacity for the color input
  const previewColor = `${shadowColor}${Math.round(shadowOpacity * 255).toString(16).padStart(2, '0')}`;

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-3 primary-gradient bg-clip-text text-transparent tracking-tight">
            Box Shadow Generator
          </h1>
          <p className="text-muted-foreground max-w-3xl mx-auto">
            Create and customize CSS box shadows with a live preview. Adjust properties using the controls below and copy the generated CSS with one click.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          {/* Controls Section */}
          <div className="lg:col-span-5 space-y-6 glass-card p-6 rounded-xl">
            <div className="flex items-center gap-2 mb-6">
              <Sliders className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-semibold">Shadow Controls</h2>
            </div>

            <div className="space-y-4">
              {/* Horizontal Offset */}
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label>Horizontal Offset</Label>
                  <span className="text-sm text-muted-foreground">{horizontalOffset}px</span>
                </div>
                <Slider 
                  value={[horizontalOffset]} 
                  min={-50} 
                  max={50} 
                  step={1} 
                  onValueChange={(value) => setHorizontalOffset(value[0])} 
                />
              </div>

              {/* Vertical Offset */}
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label>Vertical Offset</Label>
                  <span className="text-sm text-muted-foreground">{verticalOffset}px</span>
                </div>
                <Slider 
                  value={[verticalOffset]} 
                  min={-50} 
                  max={50} 
                  step={1} 
                  onValueChange={(value) => setVerticalOffset(value[0])} 
                />
              </div>

              {/* Blur Radius */}
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label>Blur Radius</Label>
                  <span className="text-sm text-muted-foreground">{blurRadius}px</span>
                </div>
                <Slider 
                  value={[blurRadius]} 
                  min={0} 
                  max={100} 
                  step={1} 
                  onValueChange={(value) => setBlurRadius(value[0])} 
                />
              </div>

              {/* Spread Radius */}
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label>Spread Radius</Label>
                  <span className="text-sm text-muted-foreground">{spreadRadius}px</span>
                </div>
                <Slider 
                  value={[spreadRadius]} 
                  min={-50} 
                  max={50} 
                  step={1} 
                  onValueChange={(value) => setSpreadRadius(value[0])} 
                />
              </div>

              {/* Shadow Color */}
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label>Shadow Color</Label>
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-4 h-4 rounded-full border border-border" 
                      style={{ backgroundColor: previewColor }}
                    ></div>
                    <span className="text-sm text-muted-foreground">{shadowColor}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={shadowColor}
                    onChange={(e) => setShadowColor(e.target.value)}
                    className="w-10 h-10 p-0 border-0 rounded-md cursor-pointer"
                  />
                  <Input 
                    type="text" 
                    value={shadowColor}
                    onChange={(e) => setShadowColor(e.target.value)}
                    className="w-24 font-mono text-sm"
                  />
                </div>
              </div>

              {/* Shadow Opacity */}
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label>Shadow Opacity</Label>
                  <span className="text-sm text-muted-foreground">{shadowOpacity.toFixed(2)}</span>
                </div>
                <Slider 
                  value={[shadowOpacity * 100]} 
                  min={0} 
                  max={100} 
                  step={1} 
                  onValueChange={(value) => setShadowOpacity(value[0] / 100)} 
                />
              </div>

              {/* Inset Toggle */}
              <div className="pt-2 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ToggleRight className="w-4 h-4 text-muted-foreground" />
                  <Label>Inset Shadow</Label>
                </div>
                <Switch 
                  checked={isInset} 
                  onCheckedChange={setIsInset} 
                />
              </div>
            </div>
          </div>

          {/* Preview Section */}
          <div className="lg:col-span-7 space-y-6">
            <div className="glass-card p-6 rounded-xl h-[350px] flex flex-col">
              <div className="flex items-center gap-2 mb-6">
                <Eye className="w-5 h-5 text-primary" />
                <h2 className="text-xl font-semibold">Live Preview</h2>
              </div>
              
              <div className="flex-grow flex items-center justify-center p-10">
                <div 
                  className="w-48 h-48 bg-card border border-border rounded-xl"
                  style={{ boxShadow: boxShadowValue }}
                ></div>
              </div>
            </div>

            <div className="glass-card p-6 rounded-xl">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Code className="w-5 h-5 text-primary" />
                  <h2 className="text-xl font-semibold">CSS Code</h2>
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={copyToClipboard}
                  className="flex items-center gap-2"
                >
                  {isCopied ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span>Copy CSS</span>
                    </>
                  )}
                </Button>
              </div>
              
              <div className="bg-muted p-4 rounded-md">
                <pre className="font-mono text-sm overflow-x-auto whitespace-pre-wrap break-all">
                  {cssCode}
                </pre>
              </div>
            </div>
          </div>
        </div>

        {/* How to Use Section */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-6 text-center">How to Use the Box Shadow Generator</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="pt-6">
                <div className="text-center mb-4">
                  <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Sliders className="text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">1. Adjust Parameters</h3>
                </div>
                <p className="text-muted-foreground text-sm">
                  Use the sliders to adjust the shadow's horizontal and vertical offset, blur, spread, color, and opacity. Toggle the inset option for inner shadows.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="text-center mb-4">
                  <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Eye className="text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">2. Preview Result</h3>
                </div>
                <p className="text-muted-foreground text-sm">
                  Watch the live preview update in real-time as you adjust the shadow properties. This helps you visualize exactly how your shadow will look.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="text-center mb-4">
                  <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Copy className="text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">3. Copy the CSS</h3>
                </div>
                <p className="text-muted-foreground text-sm">
                  Once you're happy with your box shadow, click the "Copy CSS" button to copy the generated CSS code to your clipboard, ready to use in your project.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Recommended Tools Section */}
        <div>
          <h2 className="text-2xl font-bold mb-6 text-center">Recommended Tools</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
    </MainLayout>
  );
};

export default BoxShadowGenerator;

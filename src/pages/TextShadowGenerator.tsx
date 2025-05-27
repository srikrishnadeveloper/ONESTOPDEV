
import { useState, useEffect } from "react";
import MainLayout from "@/layouts/MainLayout";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { WebTool, webTools } from "@/data/webToolsData";
import WebToolCard from "@/components/WebToolCard";
import { 
  Copy, 
  Check, 
  Text, 
  Sliders, 
  Code, 
  Palette,
  Eye,
  Plus,
  Trash2,
  MoveVertical,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import ToolNavigation from "@/components/ToolNavigation";

// Interface for shadow properties
interface TextShadow {
  id: string; // unique identifier
  horizontalOffset: number;
  verticalOffset: number;
  blurRadius: number;
  shadowColor: string;
  shadowOpacity: number;
}

const TextShadowGenerator = () => {
  // Preview text state
  const [previewText, setPreviewText] = useState("Text Shadow Preview");
  
  // Shadow properties state
  const [shadows, setShadows] = useState<TextShadow[]>([
    {
      id: "shadow-1",
      horizontalOffset: 2,
      verticalOffset: 2,
      blurRadius: 4,
      shadowColor: "#000000",
      shadowOpacity: 0.5,
    }
  ]);
  
  // Output states
  const [cssCode, setCssCode] = useState("");
  const [textShadowValue, setTextShadowValue] = useState(""); // Raw text-shadow value
  const [isCopied, setIsCopied] = useState(false);
  
  const { toast } = useToast();

  // Get similar tools for recommendations
  const recommendedTools = webTools
    .filter(tool => 
      tool.tags.some(tag => ['CSS', 'Design', 'Generators'].includes(tag)) && 
      tool.slug !== 'text-shadow-generator'
    )
    .slice(0, 4);

  // Generate CSS code on any state change
  useEffect(() => {
    generateCssCode();
  }, [shadows, previewText]);

  // Generate the CSS code
  const generateCssCode = () => {
    // Convert hex color to rgba
    const hexToRgba = (hex: string, opacity: number) => {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result 
        ? `rgba(${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}, ${opacity})`
        : `rgba(0, 0, 0, ${opacity})`;
    };

    // Generate shadow value for each shadow
    const shadowValues = shadows.map(shadow => {
      const rgba = hexToRgba(shadow.shadowColor, shadow.shadowOpacity);
      return `${shadow.horizontalOffset}px ${shadow.verticalOffset}px ${shadow.blurRadius}px ${rgba}`;
    });
    
    const combinedTextShadow = shadowValues.join(', ');
    const cssCodeValue = `text-shadow: ${combinedTextShadow};`;
    
    setTextShadowValue(combinedTextShadow); // Store the raw text-shadow value
    setCssCode(cssCodeValue);
  };

  // Add a new shadow layer
  const addShadow = () => {
    const newShadow: TextShadow = {
      id: `shadow-${shadows.length + 1}-${Date.now()}`, // Ensure unique ID
      horizontalOffset: 2,
      verticalOffset: 2,
      blurRadius: 4,
      shadowColor: "#000000",
      shadowOpacity: 0.5,
    };
    
    setShadows([...shadows, newShadow]);
    toast({
      title: "Shadow Added",
      description: "New shadow layer has been added",
    });
  };

  // Remove a shadow layer
  const removeShadow = (id: string) => {
    if (shadows.length <= 1) {
      toast({
        title: "Cannot Remove",
        description: "You need at least one shadow layer",
        variant: "destructive",
      });
      return;
    }
    
    setShadows(shadows.filter(shadow => shadow.id !== id));
    toast({
      title: "Shadow Removed",
      description: "Shadow layer has been removed",
    });
  };

  // Update a property of a specific shadow
  const updateShadowProperty = (id: string, property: keyof Omit<TextShadow, "id">, value: number | string) => {
    setShadows(shadows.map(shadow => 
      shadow.id === id ? { ...shadow, [property]: value } : shadow
    ));
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

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        {/* Add Tool Navigation */}
        <ToolNavigation currentToolSlug="text-shadow-generator" />
        
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-3 primary-gradient bg-clip-text text-transparent tracking-tight">
            Text Shadow Generator
          </h1>
          <p className="text-muted-foreground max-w-3xl mx-auto">
            Create and customize CSS text shadows with a live preview. Adjust properties using the controls below and copy the generated CSS with one click.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          {/* Controls Section */}
          <div className="lg:col-span-5 space-y-6 glass-card p-6 rounded-xl">
            <div className="flex items-center gap-2 mb-6">
              <Sliders className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-semibold">Shadow Controls</h2>
            </div>

            {/* Preview Text Input */}
            <div className="space-y-2">
              <Label htmlFor="preview-text">Preview Text</Label>
              <Input 
                id="preview-text"
                value={previewText}
                onChange={(e) => setPreviewText(e.target.value)}
                placeholder="Enter text to preview"
                className="w-full"
              />
            </div>

            {/* Shadow Layers */}
            <div className="space-y-6">
              {shadows.map((shadow, index) => (
                <div key={shadow.id} className="space-y-4 p-4 border border-border rounded-lg relative">
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="outline" className="flex items-center gap-1">
                      <MoveVertical className="w-3 h-3" />
                      <span>Shadow {index + 1}</span>
                    </Badge>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8 text-destructive" 
                      onClick={() => removeShadow(shadow.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>

                  {/* Horizontal Offset */}
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label>Horizontal Offset</Label>
                      <span className="text-sm text-muted-foreground">{shadow.horizontalOffset}px</span>
                    </div>
                    <Slider 
                      value={[shadow.horizontalOffset]} 
                      min={-50} 
                      max={50} 
                      step={1} 
                      onValueChange={(value) => updateShadowProperty(shadow.id, "horizontalOffset", value[0])} 
                    />
                  </div>

                  {/* Vertical Offset */}
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label>Vertical Offset</Label>
                      <span className="text-sm text-muted-foreground">{shadow.verticalOffset}px</span>
                    </div>
                    <Slider 
                      value={[shadow.verticalOffset]} 
                      min={-50} 
                      max={50} 
                      step={1} 
                      onValueChange={(value) => updateShadowProperty(shadow.id, "verticalOffset", value[0])} 
                    />
                  </div>

                  {/* Blur Radius */}
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label>Blur Radius</Label>
                      <span className="text-sm text-muted-foreground">{shadow.blurRadius}px</span>
                    </div>
                    <Slider 
                      value={[shadow.blurRadius]} 
                      min={0} 
                      max={100} 
                      step={1} 
                      onValueChange={(value) => updateShadowProperty(shadow.id, "blurRadius", value[0])} 
                    />
                  </div>

                  {/* Shadow Color */}
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label>Shadow Color</Label>
                      <div className="flex items-center gap-2">
                        <div 
                          className="w-4 h-4 rounded-full border border-border" 
                          style={{ backgroundColor: `${shadow.shadowColor}${Math.round(shadow.shadowOpacity * 255).toString(16).padStart(2, '0')}` }}
                        ></div>
                        <span className="text-sm text-muted-foreground">{shadow.shadowColor}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <input
                        type="color"
                        value={shadow.shadowColor}
                        onChange={(e) => updateShadowProperty(shadow.id, "shadowColor", e.target.value)}
                        className="w-10 h-10 p-0 border-0 rounded-md cursor-pointer"
                      />
                      <Input 
                        type="text" 
                        value={shadow.shadowColor}
                        onChange={(e) => updateShadowProperty(shadow.id, "shadowColor", e.target.value)}
                        className="w-24 font-mono text-sm"
                      />
                    </div>
                  </div>

                  {/* Shadow Opacity */}
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label>Shadow Opacity</Label>
                      <span className="text-sm text-muted-foreground">{shadow.shadowOpacity.toFixed(2)}</span>
                    </div>
                    <Slider 
                      value={[shadow.shadowOpacity * 100]} 
                      min={0} 
                      max={100} 
                      step={1} 
                      onValueChange={(value) => updateShadowProperty(shadow.id, "shadowOpacity", value[0] / 100)} 
                    />
                  </div>
                </div>
              ))}

              {/* Add Shadow Button */}
              <Button 
                variant="outline" 
                className="w-full flex items-center gap-2" 
                onClick={addShadow}
              >
                <Plus className="w-4 h-4" />
                <span>Add Shadow Layer</span>
              </Button>
            </div>
          </div>

          {/* Preview Section */}
          <div className="lg:col-span-7 space-y-6">
            <div className="glass-card p-6 rounded-xl h-[350px] flex flex-col">
              <div className="flex items-center gap-2 mb-6">
                <Eye className="w-5 h-5 text-primary" />
                <h2 className="text-xl font-semibold">Live Preview</h2>
              </div>
              
              <div className="flex-grow flex items-center justify-center p-10 overflow-hidden">
                <h2 
                  className="text-4xl font-bold text-center w-full break-words"
                  style={{ textShadow: textShadowValue }}
                >
                  {previewText || "Text Shadow Preview"}
                </h2>
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
          <h2 className="text-2xl font-bold mb-6 text-center">How to Use the Text Shadow Generator</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="pt-6">
                <div className="text-center mb-4">
                  <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Sliders className="text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">1. Customize Shadow</h3>
                </div>
                <p className="text-muted-foreground text-sm">
                  Use the text input and sliders to adjust the shadow's horizontal and vertical offset, blur, color, and opacity. Add multiple shadow layers for complex effects.
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
                  The live preview updates in real-time as you adjust the shadow properties. This helps you visualize exactly how your text shadow will appear on your website.
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
                  Once you're happy with your text shadow, click the "Copy CSS" button to copy the generated CSS code to your clipboard, ready to use in your project.
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

export default TextShadowGenerator;

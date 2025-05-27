import React, { useState, useEffect } from "react";
import MainLayout from "@/layouts/MainLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Copy, Check, CornerDownRight, SquareCode } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import WebToolCard from "@/components/WebToolCard";

const BorderRadiusGenerator = () => {
  // State for border radius values
  const [topLeft, setTopLeft] = useState<number>(10);
  const [topRight, setTopRight] = useState<number>(10);
  const [bottomLeft, setBottomLeft] = useState<number>(10);
  const [bottomRight, setBottomRight] = useState<number>(10);
  const [uniform, setUniform] = useState<boolean>(true);
  const [uniformValue, setUniformValue] = useState<number>(10);
  const [cssCode, setCssCode] = useState<string>("");
  const [copied, setCopied] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>("standard");

  const { toast } = useToast();

  // Generate CSS code based on border radius values
  useEffect(() => {
    if (uniform) {
      // When uniform is enabled, all corners have the same value
      setTopLeft(uniformValue);
      setTopRight(uniformValue);
      setBottomLeft(uniformValue);
      setBottomRight(uniformValue);
      
      // Generate single value CSS if all corners are the same
      setCssCode(`border-radius: ${uniformValue}px;`);
    } else {
      // Generate CSS code with individual corner values
      setCssCode(
        `border-radius: ${topLeft}px ${topRight}px ${bottomRight}px ${bottomLeft}px;`
      );
    }
  }, [uniform, uniformValue, topLeft, topRight, bottomLeft, bottomRight]);

  // Handle uniform slider change
  const handleUniformChange = (value: number[]) => {
    setUniformValue(value[0]);
  };

  // Handle individual corner slider changes
  const handleTopLeftChange = (value: number[]) => {
    setTopLeft(value[0]);
  };

  const handleTopRightChange = (value: number[]) => {
    setTopRight(value[0]);
  };

  const handleBottomLeftChange = (value: number[]) => {
    setBottomLeft(value[0]);
  };

  const handleBottomRightChange = (value: number[]) => {
    setBottomRight(value[0]);
  };

  // Toggle uniform mode
  const handleUniformToggle = (checked: boolean) => {
    setUniform(checked);
    if (checked) {
      // Set the uniform value to the average of the current corner values
      const avgValue = Math.round((topLeft + topRight + bottomLeft + bottomRight) / 4);
      setUniformValue(avgValue);
    }
  };

  // Copy CSS code to clipboard
  const handleCopyCSS = () => {
    navigator.clipboard.writeText(cssCode);
    setCopied(true);
    toast({
      title: "Copied!",
      description: "CSS code copied to clipboard.",
      duration: 2000,
    });
    setTimeout(() => setCopied(false), 2000);
  };

  // Reset all values to default
  const handleReset = () => {
    setUniform(true);
    setUniformValue(10);
    setTopLeft(10);
    setTopRight(10);
    setBottomLeft(10);
    setBottomRight(10);
    setActiveTab("standard");
    toast({
      title: "Reset!",
      description: "All values have been reset to default.",
      duration: 2000,
    });
  };

  // Define border-radius for the preview box
  const previewStyle = {
    borderTopLeftRadius: `${topLeft}px`,
    borderTopRightRadius: `${topRight}px`,
    borderBottomLeftRadius: `${bottomLeft}px`,
    borderBottomRightRadius: `${bottomRight}px`,
  };

  // Alternative formats for the CSS code
  const cssAsRem = () => {
    if (uniform) {
      return `border-radius: ${(uniformValue / 16).toFixed(2)}rem;`;
    }
    return `border-radius: ${(topLeft / 16).toFixed(2)}rem ${(topRight / 16).toFixed(2)}rem ${(bottomRight / 16).toFixed(2)}rem ${(bottomLeft / 16).toFixed(2)}rem;`;
  };

  const cssAsPercent = () => {
    if (uniform) {
      return `border-radius: ${uniformValue}%;`;
    }
    return `border-radius: ${topLeft}% ${topRight}% ${bottomRight}% ${bottomLeft}%;`;
  };

  const cssAsShorthand = () => {
    if (topLeft === topRight && bottomLeft === bottomRight && topLeft === bottomLeft) {
      return `border-radius: ${topLeft}px;`;
    } else if (topLeft === bottomRight && topRight === bottomLeft) {
      return `border-radius: ${topLeft}px ${topRight}px;`;
    } else if (topLeft === topRight && bottomLeft === bottomRight) {
      return `border-radius: ${topLeft}px ${topRight}px ${bottomRight}px;`;
    } else {
      return `border-radius: ${topLeft}px ${topRight}px ${bottomRight}px ${bottomLeft}px;`;
    }
  };

  // Generate individual property values
  const cssAsIndividual = () => {
    return `border-top-left-radius: ${topLeft}px;
border-top-right-radius: ${topRight}px;
border-bottom-right-radius: ${bottomRight}px;
border-bottom-left-radius: ${bottomLeft}px;`;
  };

  // Set the active CSS code based on the selected tab
  useEffect(() => {
    switch (activeTab) {
      case "standard":
        setCssCode(cssAsShorthand());
        break;
      case "rem":
        setCssCode(cssAsRem());
        break;
      case "percent":
        setCssCode(cssAsPercent());
        break;
      case "individual":
        setCssCode(cssAsIndividual());
        break;
      default:
        setCssCode(cssAsShorthand());
    }
  }, [activeTab, topLeft, topRight, bottomLeft, bottomRight, uniformValue, uniform]);
  
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-6 md:py-12 max-w-6xl">
        <h1 className="text-3xl md:text-4xl font-bold mb-2 primary-gradient bg-clip-text text-transparent tracking-tight">
          Border Radius Generator
        </h1>
        <p className="text-muted-foreground mb-8">
          Create custom border-radius values and get the CSS code with live preview.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Controls Section */}
          <Card className="lg:col-span-1 bg-card border-border">
            <CardContent className="pt-6">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold mb-2 flex items-center gap-2">
                    <SquareCode className="h-5 w-5 text-primary" />
                    Controls
                  </h2>
                  <div className="flex items-center space-x-2">
                    <Switch 
                      id="uniform-mode" 
                      checked={uniform} 
                      onCheckedChange={handleUniformToggle}
                    />
                    <Label htmlFor="uniform-mode" className="text-sm">Uniform</Label>
                  </div>
                </div>

                <Separator />

                {uniform ? (
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between">
                        <Label htmlFor="uniform-radius" className="text-sm">All Corners: {uniformValue}px</Label>
                      </div>
                      <Slider
                        id="uniform-radius"
                        value={[uniformValue]}
                        onValueChange={handleUniformChange}
                        max={100}
                        step={1}
                        className="mt-2"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div>
                      <div className="flex justify-between">
                        <Label htmlFor="top-left" className="text-sm">Top Left: {topLeft}px</Label>
                      </div>
                      <Slider
                        id="top-left"
                        value={[topLeft]}
                        onValueChange={handleTopLeftChange}
                        max={100}
                        step={1}
                        className="mt-2"
                      />
                    </div>
                    
                    <div>
                      <div className="flex justify-between">
                        <Label htmlFor="top-right" className="text-sm">Top Right: {topRight}px</Label>
                      </div>
                      <Slider
                        id="top-right"
                        value={[topRight]}
                        onValueChange={handleTopRightChange}
                        max={100}
                        step={1}
                        className="mt-2"
                      />
                    </div>
                    
                    <div>
                      <div className="flex justify-between">
                        <Label htmlFor="bottom-left" className="text-sm">Bottom Left: {bottomLeft}px</Label>
                      </div>
                      <Slider
                        id="bottom-left"
                        value={[bottomLeft]}
                        onValueChange={handleBottomLeftChange}
                        max={100}
                        step={1}
                        className="mt-2"
                      />
                    </div>
                    
                    <div>
                      <div className="flex justify-between">
                        <Label htmlFor="bottom-right" className="text-sm">Bottom Right: {bottomRight}px</Label>
                      </div>
                      <Slider
                        id="bottom-right"
                        value={[bottomRight]}
                        onValueChange={handleBottomRightChange}
                        max={100}
                        step={1}
                        className="mt-2"
                      />
                    </div>
                  </div>
                )}

                <div className="flex flex-col md:flex-row gap-3">
                  <Button 
                    onClick={handleReset} 
                    variant="outline" 
                    className="w-full"
                  >
                    Reset
                  </Button>
                  <Button 
                    onClick={handleCopyCSS} 
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                  >
                    {copied ? <Check className="mr-1 h-4 w-4" /> : <Copy className="mr-1 h-4 w-4" />}
                    {copied ? "Copied!" : "Copy CSS"}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Preview Section */}
          <Card className="lg:col-span-1 bg-card border-border">
            <CardContent className="flex flex-col justify-center items-center pt-6 h-full">
              <h2 className="text-xl font-semibold mb-6">Preview</h2>
              <div 
                className="w-[200px] h-[200px] bg-gradient-to-br from-primary/70 to-accent/70 mb-6"
                style={previewStyle}
              ></div>
              <div className="text-xs text-muted-foreground text-center mt-2">
                <span className="block">Top Left: {topLeft}px</span>
                <span className="inline-block mr-8">Bottom Left: {bottomLeft}px</span>
                <span className="inline-block ml-8">Bottom Right: {bottomRight}px</span>
                <span className="block">Top Right: {topRight}px</span>
              </div>
            </CardContent>
          </Card>

          {/* Output Section */}
          <Card className="lg:col-span-1 bg-card border-border">
            <CardContent className="pt-6">
              <h2 className="text-xl font-semibold mb-4">CSS Code</h2>
              
              <Tabs defaultValue="standard" value={activeTab} onValueChange={setActiveTab} className="mb-4">
                <TabsList className="grid grid-cols-4 w-full">
                  <TabsTrigger value="standard">px</TabsTrigger>
                  <TabsTrigger value="rem">rem</TabsTrigger>
                  <TabsTrigger value="percent">%</TabsTrigger>
                  <TabsTrigger value="individual">Individual</TabsTrigger>
                </TabsList>
              </Tabs>
              
              <div className="relative mt-2">
                <div className="bg-muted p-4 rounded-md font-mono text-sm whitespace-pre-wrap overflow-x-auto">
                  {cssCode}
                </div>
                <Button 
                  size="icon" 
                  variant="ghost" 
                  className="absolute top-2 right-2 h-8 w-8"
                  onClick={handleCopyCSS}
                >
                  {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
              
              <div className="mt-8">
                <h3 className="text-sm font-medium flex items-center gap-2 mb-2">
                  <CornerDownRight className="h-4 w-4 text-primary" />
                  Usage in CSS
                </h3>
                <div className="text-sm text-muted-foreground">
                  <p>Add this code to your CSS file or style tag to apply the border radius to your elements.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* How to Use Section */}
        <Card className="mb-8 bg-card border-border">
          <CardContent className="pt-6">
            <h2 className="text-2xl font-semibold mb-4">How to Use</h2>
            <div className="space-y-4 text-muted-foreground">
              <div className="flex gap-2">
                <div className="bg-primary/10 rounded-full h-6 w-6 flex items-center justify-center text-primary shrink-0">1</div>
                <p>Adjust the sliders to set the border radius values for each corner of your element.</p>
              </div>
              <div className="flex gap-2">
                <div className="bg-primary/10 rounded-full h-6 w-6 flex items-center justify-center text-primary shrink-0">2</div>
                <p>Toggle "Uniform" to apply the same radius to all corners or customize each corner individually.</p>
              </div>
              <div className="flex gap-2">
                <div className="bg-primary/10 rounded-full h-6 w-6 flex items-center justify-center text-primary shrink-0">3</div>
                <p>See the live preview update as you make changes to visualize your design.</p>
              </div>
              <div className="flex gap-2">
                <div className="bg-primary/10 rounded-full h-6 w-6 flex items-center justify-center text-primary shrink-0">4</div>
                <p>Select your preferred unit (px, rem, %) or view individual property values.</p>
              </div>
              <div className="flex gap-2">
                <div className="bg-primary/10 rounded-full h-6 w-6 flex items-center justify-center text-primary shrink-0">5</div>
                <p>Copy the generated CSS code to use in your project.</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recommended Tools Section */}
        <h2 className="text-2xl font-semibold mb-6">Recommended Tools</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <WebToolCard
            name="Box Shadow Generator"
            description="Design and customize CSS box shadows with live preview."
            tags={["CSS", "Design", "Generators"]}
            slug="box-shadow-generator"
            icon="Square"
          />
          <WebToolCard
            name="CSS Gradient Generator"
            description="Create beautiful linear and radial gradients with a visual editor."
            tags={["CSS", "Design", "Generators"]}
            slug="css-gradient-generator"
            icon="Palette"
          />
          <WebToolCard
            name="Button Generator"
            description="Create customized buttons with live preview and get the HTML & CSS code."
            tags={["CSS", "HTML", "Design", "Generators"]}
            slug="button-generator"
            icon="Square"
          />
        </div>
      </div>
    </MainLayout>
  );
};

export default BorderRadiusGenerator;


import { useState, useEffect } from "react";
import MainLayout from "@/layouts/MainLayout";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Check, Copy, ExternalLink, AlignLeft, AlignRight, Code, Maximize, Inbox, CircleDashed } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import WebToolCard from "@/components/WebToolCard";
import { webTools } from "@/data/webToolsData";

const CssFloatHelper = () => {
  // State for all the controls
  const [numberOfElements, setNumberOfElements] = useState<number>(3);
  const [floatDirection, setFloatDirection] = useState<string>("left");
  const [containerWidth, setContainerWidth] = useState<number>(800);
  const [elementWidth, setElementWidth] = useState<number>(150);
  const [margin, setMargin] = useState<number>(8);
  const [padding, setPadding] = useState<number>(16);
  const [clearfix, setClearfix] = useState<boolean>(true);
  const [copied, setCopied] = useState<boolean>(false);
  
  // Generate elements based on state
  const elements = Array.from({ length: numberOfElements }).map((_, index) => index + 1);
  
  // Generate CSS code based on current settings
  const generateCssCode = () => {
    const containerCss = `.float-container {
  width: ${containerWidth}px;
  border: 1px solid #ccc;
  padding: ${padding}px;
  box-sizing: border-box;${clearfix ? `
  /* Clearfix */
  &::after {
    content: "";
    display: table;
    clear: both;
  }` : ''}
}`;

    const elementCss = `.float-item {
  width: ${elementWidth}px;
  height: ${elementWidth}px;
  margin: ${margin}px;
  padding: 15px;
  background-color: #f0f0f0;
  border: 1px solid #ddd;
  color: #333;
  text-align: center;
  box-sizing: border-box;
  float: ${floatDirection === "none" ? "none" : floatDirection};
}`;

    return `${containerCss}\n\n${elementCss}${clearfix && floatDirection !== "none" ? `\n\n/* Clear float if needed */
.clear {
  clear: both;
}` : ''}`;
  };

  // Generate HTML code example
  const generateHtmlCode = () => {
    return `<div class="float-container">
  ${elements.map(num => `<div class="float-item">Item ${num}</div>`).join('\n  ')}${clearfix && floatDirection !== "none" ? `\n  <div class="clear"></div>` : ''}
</div>`;
  };

  // Combined code for output
  const [cssCode, setCssCode] = useState<string>('');
  
  // Update CSS code whenever settings change
  useEffect(() => {
    const css = generateCssCode();
    setCssCode(css);
  }, [numberOfElements, floatDirection, containerWidth, elementWidth, margin, padding, clearfix]);

  // Handle copy to clipboard
  const copyToClipboard = () => {
    const fullCode = `/* CSS */\n${generateCssCode()}\n\n/* HTML */\n${generateHtmlCode()}`;
    
    navigator.clipboard.writeText(fullCode)
      .then(() => {
        setCopied(true);
        toast({
          title: "Copied to clipboard!",
          description: "The CSS and HTML code has been copied to your clipboard.",
        });
        
        setTimeout(() => {
          setCopied(false);
        }, 2500);
      })
      .catch(err => {
        toast({
          title: "Failed to copy",
          description: "Something went wrong, please try again.",
          variant: "destructive",
        });
      });
  };

  // Find recommended tools (float-related, CSS, layout tools)
  const recommendedTools = webTools.filter(tool => {
    const keywords = ['CSS', 'Layout', 'Design', 'Grid', 'Flexbox'];
    return tool.tags.some(tag => keywords.includes(tag)) && tool.slug !== 'css-float-helper';
  }).slice(0, 4);

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-12">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold mb-4 primary-gradient bg-clip-text text-transparent tracking-tight">CSS Float Helper</h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Experiment with CSS float properties and generate code for your layouts
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Controls */}
          <Card className="border border-border bg-card/50 backdrop-blur-sm">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-6 flex items-center">
                <AlignLeft className="mr-2 h-5 w-5" />
                Customization Controls
              </h2>

              <div className="space-y-8">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="elements">Number of Elements: {numberOfElements}</Label>
                  </div>
                  <Slider 
                    id="elements"
                    min={1} 
                    max={10} 
                    step={1} 
                    value={[numberOfElements]} 
                    onValueChange={(values) => setNumberOfElements(values[0])} 
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="float-direction">Float Direction</Label>
                  <Select value={floatDirection} onValueChange={setFloatDirection}>
                    <SelectTrigger id="float-direction">
                      <SelectValue placeholder="Select float direction" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="left">Left</SelectItem>
                      <SelectItem value="right">Right</SelectItem>
                      <SelectItem value="none">None</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="container-width">Container Width: {containerWidth}px</Label>
                  </div>
                  <Slider 
                    id="container-width"
                    min={300} 
                    max={1200} 
                    step={10} 
                    value={[containerWidth]} 
                    onValueChange={(values) => setContainerWidth(values[0])} 
                  />
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="element-width">Element Width: {elementWidth}px</Label>
                  </div>
                  <Slider 
                    id="element-width"
                    min={50} 
                    max={300} 
                    step={5} 
                    value={[elementWidth]} 
                    onValueChange={(values) => setElementWidth(values[0])} 
                  />
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="margin">Margin: {margin}px</Label>
                  </div>
                  <Slider 
                    id="margin"
                    min={0} 
                    max={30} 
                    step={1} 
                    value={[margin]} 
                    onValueChange={(values) => setMargin(values[0])} 
                  />
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="padding">Container Padding: {padding}px</Label>
                  </div>
                  <Slider 
                    id="padding"
                    min={0} 
                    max={50} 
                    step={1} 
                    value={[padding]} 
                    onValueChange={(values) => setPadding(values[0])} 
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="clearfix">Clearfix</Label>
                    <p className="text-sm text-muted-foreground">Prevent container collapse</p>
                  </div>
                  <Switch 
                    id="clearfix"
                    checked={clearfix} 
                    onCheckedChange={setClearfix} 
                  />
                </div>

                <Button 
                  className="w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
                  onClick={copyToClipboard}
                >
                  {copied ? (
                    <>
                      <Check className="mr-2 h-4 w-4" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="mr-2 h-4 w-4" />
                      Copy Code
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Middle Column - Preview */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="border border-border bg-card/50 backdrop-blur-sm">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-6 flex items-center">
                  <Maximize className="mr-2 h-5 w-5" />
                  Live Preview
                </h2>
                
                <div 
                  className="overflow-x-auto border border-border rounded-md p-4"
                  style={{
                    width: '100%',
                    overflowX: 'auto'
                  }}
                >
                  <div 
                    className="float-container mx-auto relative"
                    style={{
                      width: `${containerWidth}px`,
                      border: '1px solid #ccc',
                      padding: `${padding}px`,
                      boxSizing: 'border-box',
                      maxWidth: '100%'
                    }}
                  >
                    {elements.map((num) => (
                      <div 
                        key={num}
                        style={{
                          width: `${elementWidth}px`,
                          height: `${elementWidth}px`,
                          margin: `${margin}px`,
                          padding: '15px',
                          backgroundColor: '#f0f0f0',
                          border: '1px solid #ddd',
                          color: '#333',
                          textAlign: 'center',
                          boxSizing: 'border-box',
                          float: floatDirection === "none" ? undefined : floatDirection as "left" | "right" | undefined,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '14px',
                          fontWeight: 'bold'
                        }}
                      >
                        Item {num}
                      </div>
                    ))}
                    {clearfix && floatDirection !== "none" && (
                      <div style={{ clear: 'both' }}></div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border border-border bg-card/50 backdrop-blur-sm">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-6 flex items-center">
                  <Code className="mr-2 h-5 w-5" />
                  Generated Code
                </h2>
                
                <div className="space-y-4">
                  <div className="bg-background/50 p-4 rounded-md border border-border overflow-x-auto">
                    <pre className="text-sm font-mono text-foreground">
                      <code>{`/* CSS */
${generateCssCode()}

/* HTML */
${generateHtmlCode()}`}</code>
                    </pre>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* How To Use Section */}
        <div className="mt-16 mb-16">
          <h2 className="text-2xl font-bold mb-8 text-center">How To Use the CSS Float Helper</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <Card className="border border-border bg-card/50 backdrop-blur-sm">
              <CardContent className="p-6 flex flex-col h-full items-center text-center">
                <div className="p-3 bg-gradient-to-br from-primary/20 to-accent/20 text-primary rounded-xl mb-4">
                  <CircleDashed size={32} />
                </div>
                <h3 className="text-lg font-semibold mb-2">1. Configure Properties</h3>
                <p className="text-muted-foreground text-sm">
                  Use the sliders and dropdowns to adjust the number of elements, float direction, 
                  width, margin, and padding. Toggle clearfix to prevent container collapse.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border border-border bg-card/50 backdrop-blur-sm">
              <CardContent className="p-6 flex flex-col h-full items-center text-center">
                <div className="p-3 bg-gradient-to-br from-primary/20 to-accent/20 text-primary rounded-xl mb-4">
                  <Maximize size={32} />
                </div>
                <h3 className="text-lg font-semibold mb-2">2. Preview Layout</h3>
                <p className="text-muted-foreground text-sm">
                  Watch the live preview update in real-time as you adjust the settings. 
                  This helps you visualize how float properties affect your layout.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border border-border bg-card/50 backdrop-blur-sm">
              <CardContent className="p-6 flex flex-col h-full items-center text-center">
                <div className="p-3 bg-gradient-to-br from-primary/20 to-accent/20 text-primary rounded-xl mb-4">
                  <Copy size={32} />
                </div>
                <h3 className="text-lg font-semibold mb-2">3. Use the Code</h3>
                <p className="text-muted-foreground text-sm">
                  Copy the generated CSS and HTML code to your project. The code includes 
                  all the float properties, dimensions, and clearfix (if enabled).
                </p>
              </CardContent>
            </Card>
          </div>
          
          <div className="mt-10 bg-accent/5 border border-border rounded-lg p-6 max-w-5xl mx-auto">
            <h3 className="text-lg font-semibold mb-4">Understanding CSS Floats</h3>
            <p className="text-muted-foreground mb-4">
              CSS float property is used for positioning elements horizontally. When an element is floated, it's taken out of the normal flow of the document and pushed to the left or right side of its containing element until it touches the edge of the container or another floated element.
            </p>
            <p className="text-muted-foreground mb-4">
              The clearfix technique is used to ensure that a container element will expand to contain its floated children. Without clearfix, a container might collapse if it contains only floated elements.
            </p>
            <div className="flex justify-center mt-6">
              <Button className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70" asChild>
                <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/float" target="_blank" rel="noopener noreferrer">
                  Learn More About Floats
                  <ExternalLink className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>
        </div>

        {/* Recommended Tools */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-8 text-center">Recommended CSS Tools</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {recommendedTools.map((tool) => (
              <WebToolCard
                key={tool.id}
                name={tool.name}
                description={tool.description}
                tags={tool.tags}
                slug={tool.slug}
                icon={tool.icon}
                url={tool.url}
              />
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default CssFloatHelper;

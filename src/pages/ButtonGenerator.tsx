
import { useState, useEffect } from "react";
import MainLayout from "@/layouts/MainLayout";
import { WebTool } from "@/data/webToolsData";
import WebToolCard from "@/components/WebToolCard";
import * as LucideIcons from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Copy, Check, Code, Square, Palette, Layout, Grid } from "lucide-react";

const ButtonGenerator = () => {
  // Button customization states
  const [buttonText, setButtonText] = useState("Click me");
  const [fontSize, setFontSize] = useState(16);
  const [backgroundColor, setBackgroundColor] = useState("#3b82f6");
  const [textColor, setTextColor] = useState("#ffffff");
  const [borderRadius, setBorderRadius] = useState(4);
  const [paddingX, setPaddingX] = useState(16);
  const [paddingY, setPaddingY] = useState(8);
  const [hoverEffect, setHoverEffect] = useState("darken");
  const [buttonType, setButtonType] = useState("primary");
  
  // Generated code state
  const [generatedHTML, setGeneratedHTML] = useState("");
  const [generatedCSS, setGeneratedCSS] = useState("");
  const [isCopied, setIsCopied] = useState(false);

  // Recommended tools
  const recommendedTools: WebTool[] = [
    {
      id: "rec-1",
      name: "CSS Flexbox Playground",
      description: "Visualize and learn how Flexbox works with interactive examples.",
      slug: "flexbox-playground",
      tags: ["CSS", "Layout"],
      icon: "Layout"
    },
    {
      id: "rec-2",
      name: "Color Palette Generator",
      description: "Create beautiful color palettes for your web projects.",
      slug: "color-palette",
      tags: ["CSS", "Design"],
      icon: "Palette"
    },
    {
      id: "rec-3",
      name: "CSS Grid Generator",
      description: "Build and export CSS grid layouts with a visual editor.",
      slug: "grid-generator",
      tags: ["CSS", "Design"],
      icon: "Grid"
    },
    {
      id: "rec-4",
      name: "CSS Animation Generator",
      description: "Create and export CSS animations with a visual timeline.",
      slug: "css-animation-generator",
      tags: ["CSS", "Animation"],
      icon: "Zap"
    }
  ];

  // Generate button code whenever any style changes
  useEffect(() => {
    generateButtonCode();
  }, [
    buttonText,
    fontSize,
    backgroundColor,
    textColor,
    borderRadius,
    paddingX,
    paddingY,
    hoverEffect,
    buttonType
  ]);

  // Generate HTML and CSS code for the button
  const generateButtonCode = () => {
    // Generate CSS for the button based on type
    let css = `.my-button {\n`;
    css += `  display: inline-block;\n`;
    css += `  font-size: ${fontSize}px;\n`;
    
    // Different background handling based on button type
    if (buttonType === "primary") {
      css += `  background-color: ${backgroundColor};\n`;
      css += `  color: ${textColor};\n`;
      css += `  border: none;\n`;
    } else if (buttonType === "secondary") {
      css += `  background-color: transparent;\n`;
      css += `  color: ${backgroundColor};\n`;
      css += `  border: 2px solid ${backgroundColor};\n`;
    } else if (buttonType === "outlined") {
      css += `  background-color: transparent;\n`;
      css += `  color: ${backgroundColor};\n`;
      css += `  border: 1px solid ${backgroundColor};\n`;
    }
    
    css += `  border-radius: ${borderRadius}px;\n`;
    css += `  padding: ${paddingY}px ${paddingX}px;\n`;
    css += `  cursor: pointer;\n`;
    css += `  text-align: center;\n`;
    css += `  text-decoration: none;\n`;
    css += `  transition: all 0.3s ease;\n`;
    css += `}\n\n`;

    // Add hover effects
    css += `.my-button:hover {\n`;
    if (hoverEffect === "darken") {
      if (buttonType === "primary") {
        css += `  filter: brightness(90%);\n`;
      } else {
        css += `  background-color: ${backgroundColor};\n`;
        css += `  color: ${textColor};\n`;
      }
    } else if (hoverEffect === "scale") {
      css += `  transform: scale(1.05);\n`;
    } else if (hoverEffect === "shadow") {
      css += `  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);\n`;
    }
    css += `}`;

    // Generate HTML
    const html = `<button class="my-button">${buttonText}</button>`;

    setGeneratedHTML(html);
    setGeneratedCSS(css);
  };

  // Copy the generated code to clipboard
  const copyCodeToClipboard = () => {
    const codeToCopy = `<!-- HTML -->\n${generatedHTML}\n\n/* CSS */\n${generatedCSS}`;
    navigator.clipboard.writeText(codeToCopy);
    setIsCopied(true);
    
    toast({
      title: "Copied to clipboard!",
      description: "The button code has been copied to your clipboard.",
    });
    
    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-12">
        <div className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Button Generator</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Create custom buttons with live preview. Customize styles, preview in real-time, and copy the generated HTML & CSS code.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Left Section - Customization Controls */}
          <div className="bg-card border border-border rounded-xl p-6 space-y-6">
            <h2 className="text-xl font-semibold mb-4">Customize Button</h2>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="buttonText">Button Text</Label>
                <Input
                  id="buttonText"
                  value={buttonText}
                  onChange={(e) => setButtonText(e.target.value)}
                  placeholder="Enter button text"
                />
              </div>

              <div>
                <Label htmlFor="buttonType">Button Type</Label>
                <div className="flex flex-wrap gap-2 mt-2">
                  <Button
                    type="button"
                    variant={buttonType === "primary" ? "default" : "outline"}
                    onClick={() => setButtonType("primary")}
                    className="flex-1"
                  >
                    Primary
                  </Button>
                  <Button
                    type="button"
                    variant={buttonType === "secondary" ? "default" : "outline"}
                    onClick={() => setButtonType("secondary")}
                    className="flex-1"
                  >
                    Secondary
                  </Button>
                  <Button
                    type="button"
                    variant={buttonType === "outlined" ? "default" : "outline"}
                    onClick={() => setButtonType("outlined")}
                    className="flex-1"
                  >
                    Outlined
                  </Button>
                </div>
              </div>
              
              <div>
                <Label htmlFor="fontSize">Font Size: {fontSize}px</Label>
                <Slider
                  id="fontSize"
                  value={[fontSize]}
                  min={10}
                  max={32}
                  step={1}
                  onValueChange={(value) => setFontSize(value[0])}
                  className="mt-2"
                />
              </div>
              
              <div>
                <Label htmlFor="backgroundColor">Background Color</Label>
                <div className="flex items-center gap-2 mt-2">
                  <div 
                    className="w-10 h-10 rounded border border-border" 
                    style={{ backgroundColor }}
                  />
                  <Input
                    id="backgroundColor"
                    type="color"
                    value={backgroundColor}
                    onChange={(e) => setBackgroundColor(e.target.value)}
                    className="w-full h-10"
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="textColor">Text Color</Label>
                <div className="flex items-center gap-2 mt-2">
                  <div 
                    className="w-10 h-10 rounded border border-border" 
                    style={{ backgroundColor: textColor }}
                  />
                  <Input
                    id="textColor"
                    type="color"
                    value={textColor}
                    onChange={(e) => setTextColor(e.target.value)}
                    className="w-full h-10"
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="borderRadius">Border Radius: {borderRadius}px</Label>
                <Slider
                  id="borderRadius"
                  value={[borderRadius]}
                  min={0}
                  max={50}
                  step={1}
                  onValueChange={(value) => setBorderRadius(value[0])}
                  className="mt-2"
                />
              </div>
              
              <div>
                <Label htmlFor="paddingX">Horizontal Padding: {paddingX}px</Label>
                <Slider
                  id="paddingX"
                  value={[paddingX]}
                  min={0}
                  max={50}
                  step={1}
                  onValueChange={(value) => setPaddingX(value[0])}
                  className="mt-2"
                />
              </div>
              
              <div>
                <Label htmlFor="paddingY">Vertical Padding: {paddingY}px</Label>
                <Slider
                  id="paddingY"
                  value={[paddingY]}
                  min={0}
                  max={50}
                  step={1}
                  onValueChange={(value) => setPaddingY(value[0])}
                  className="mt-2"
                />
              </div>
              
              <div>
                <Label htmlFor="hoverEffect">Hover Effect</Label>
                <div className="flex flex-wrap gap-2 mt-2">
                  <Button
                    type="button"
                    variant={hoverEffect === "none" ? "default" : "outline"}
                    onClick={() => setHoverEffect("none")}
                    className="flex-1"
                  >
                    None
                  </Button>
                  <Button
                    type="button"
                    variant={hoverEffect === "darken" ? "default" : "outline"}
                    onClick={() => setHoverEffect("darken")}
                    className="flex-1"
                  >
                    Darken
                  </Button>
                  <Button
                    type="button"
                    variant={hoverEffect === "scale" ? "default" : "outline"}
                    onClick={() => setHoverEffect("scale")}
                    className="flex-1"
                  >
                    Scale
                  </Button>
                  <Button
                    type="button"
                    variant={hoverEffect === "shadow" ? "default" : "outline"}
                    onClick={() => setHoverEffect("shadow")}
                    className="flex-1"
                  >
                    Shadow
                  </Button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Middle Section - Preview */}
          <div className="bg-card border border-border rounded-xl p-6 flex flex-col">
            <h2 className="text-xl font-semibold mb-4">Preview</h2>
            
            <div className="flex-grow flex items-center justify-center bg-background/50 rounded-lg p-8">
              <button
                className="my-button"
                style={{
                  fontSize: `${fontSize}px`,
                  backgroundColor: buttonType === "primary" ? backgroundColor : "transparent",
                  color: buttonType === "primary" ? textColor : backgroundColor,
                  border: buttonType === "primary" 
                    ? "none" 
                    : buttonType === "secondary"
                      ? `2px solid ${backgroundColor}`
                      : `1px solid ${backgroundColor}`,
                  borderRadius: `${borderRadius}px`,
                  padding: `${paddingY}px ${paddingX}px`,
                  cursor: "pointer",
                  textAlign: "center",
                  textDecoration: "none",
                  transition: "all 0.3s ease",
                }}
                onMouseOver={(e) => {
                  const btn = e.currentTarget;
                  if (hoverEffect === "darken") {
                    if (buttonType === "primary") {
                      btn.style.filter = "brightness(90%)";
                    } else {
                      btn.style.backgroundColor = backgroundColor;
                      btn.style.color = textColor;
                    }
                  } else if (hoverEffect === "scale") {
                    btn.style.transform = "scale(1.05)";
                  } else if (hoverEffect === "shadow") {
                    btn.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.2)";
                  }
                }}
                onMouseOut={(e) => {
                  const btn = e.currentTarget;
                  if (hoverEffect === "darken") {
                    btn.style.filter = "";
                    if (buttonType !== "primary") {
                      btn.style.backgroundColor = "transparent";
                      btn.style.color = backgroundColor;
                    }
                  } else if (hoverEffect === "scale") {
                    btn.style.transform = "";
                  } else if (hoverEffect === "shadow") {
                    btn.style.boxShadow = "";
                  }
                }}
              >
                {buttonText || "Click me"}
              </button>
            </div>
            
            <div className="mt-4">
              <Button
                className="w-full"
                onClick={copyCodeToClipboard}
              >
                {isCopied ? (
                  <>
                    <Check className="mr-2 h-4 w-4" /> Copied!
                  </>
                ) : (
                  <>
                    <Copy className="mr-2 h-4 w-4" /> Copy Code
                  </>
                )}
              </Button>
            </div>
          </div>
          
          {/* Right Section - Generated Code */}
          <div className="bg-card border border-border rounded-xl p-6 space-y-4">
            <h2 className="text-xl font-semibold mb-4">Generated Code</h2>
            
            <div>
              <Label htmlFor="htmlCode">HTML</Label>
              <div className="relative">
                <Textarea
                  id="htmlCode"
                  value={generatedHTML}
                  readOnly
                  className="font-mono text-sm h-[100px] bg-background/50"
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="cssCode">CSS</Label>
              <div className="relative">
                <Textarea
                  id="cssCode"
                  value={generatedCSS}
                  readOnly
                  className="font-mono text-sm h-[250px] bg-background/50"
                />
              </div>
            </div>
          </div>
        </div>

        {/* How to Use Section */}
        <div className="mb-12 bg-card border border-border rounded-xl p-6">
          <h2 className="text-2xl font-semibold mb-4">How to Use</h2>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-accent/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <div className="bg-primary/20 text-primary rounded-full w-8 h-8 flex items-center justify-center">1</div>
                  <h3 className="font-medium">Customize</h3>
                </div>
                <p className="text-sm text-muted-foreground">Use the controls to customize your button's appearance, including text, colors, size, and hover effects.</p>
              </div>
              
              <div className="bg-accent/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <div className="bg-primary/20 text-primary rounded-full w-8 h-8 flex items-center justify-center">2</div>
                  <h3 className="font-medium">Preview</h3>
                </div>
                <p className="text-sm text-muted-foreground">See your changes reflected in real-time in the preview section to ensure the button looks as expected.</p>
              </div>
              
              <div className="bg-accent/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <div className="bg-primary/20 text-primary rounded-full w-8 h-8 flex items-center justify-center">3</div>
                  <h3 className="font-medium">Generate Code</h3>
                </div>
                <p className="text-sm text-muted-foreground">The HTML and CSS code will automatically generate as you make changes to your button design.</p>
              </div>
              
              <div className="bg-accent/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <div className="bg-primary/20 text-primary rounded-full w-8 h-8 flex items-center justify-center">4</div>
                  <h3 className="font-medium">Copy & Use</h3>
                </div>
                <p className="text-sm text-muted-foreground">Click the "Copy Code" button to copy both HTML and CSS, then paste into your project and customize as needed.</p>
              </div>
            </div>
            
            <div className="mt-4 p-4 bg-primary/10 rounded-lg border border-primary/20">
              <h3 className="font-medium flex items-center gap-2">
                <Code className="h-5 w-5" /> Pro Tips
              </h3>
              <ul className="list-disc list-inside mt-2 space-y-1 text-sm text-muted-foreground">
                <li>Add the CSS to your stylesheet or in a <code className="bg-background/50 px-1 rounded text-xs">&lt;style&gt;</code> tag in your HTML document's head.</li>
                <li>Change the <code className="bg-background/50 px-1 rounded text-xs">my-button</code> class to your own custom class name to avoid conflicts.</li>
                <li>For better accessibility, consider adding <code className="bg-background/50 px-1 rounded text-xs">aria-</code> attributes to your button elements.</li>
                <li>Test your button with different screen sizes to ensure it looks good on all devices.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Recommended Tools Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Recommended Tools</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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

export default ButtonGenerator;

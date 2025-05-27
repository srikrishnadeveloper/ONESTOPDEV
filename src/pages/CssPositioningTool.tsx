
import React, { useState, useEffect, useRef } from "react";
import MainLayout from "@/layouts/MainLayout";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlignLeft,
  Copy,
  Check,
  Pin,
  Layers,
  SquareStack,
  Move,
  Maximize,
  MinusSquare,
  ExternalLink,
} from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { webTools } from "@/data/webToolsData";

// Import react-draggable
import Draggable from 'react-draggable';

const CssPositioningTool = () => {
  const navigate = useNavigate();
  const codeRef = useRef<HTMLPreElement>(null);
  const [copied, setCopied] = useState(false);
  
  // Positioning states
  const [positionType, setPositionType] = useState<string>("relative");
  const [parentPositionType, setParentPositionType] = useState<string>("relative");
  const [overflow, setOverflow] = useState<boolean>(false);
  const [topValue, setTopValue] = useState<number>(0);
  const [rightValue, setRightValue] = useState<number>(0);
  const [bottomValue, setBottomValue] = useState<number>(0);
  const [leftValue, setLeftValue] = useState<number>(0);
  const [zIndexValue, setZIndexValue] = useState<number>(1);
  
  // Element dragging state
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [isDraggable, setIsDraggable] = useState(true);
  
  // Generated CSS code
  const [cssCode, setCssCode] = useState<string>("");
  
  // Check if position type allows for dragging
  useEffect(() => {
    setIsDraggable(positionType !== "static");
    
    // Reset position when switching to static
    if (positionType === "static") {
      setPosition({ x: 0, y: 0 });
      setTopValue(0);
      setRightValue(0);
      setBottomValue(0);
      setLeftValue(0);
    }
  }, [positionType]);
  
  // Update CSS based on current settings
  useEffect(() => {
    generateCSS();
  }, [
    positionType,
    parentPositionType,
    overflow,
    topValue,
    rightValue,
    bottomValue,
    leftValue,
    zIndexValue,
    position
  ]);
  
  // Handle drag events
  const handleDrag = (e: any, data: { x: number; y: number }) => {
    setIsDragging(true);
    setPosition({ x: data.x, y: data.y });
    
    // Update top and left values to match the drag position
    setTopValue(data.y);
    setLeftValue(data.x);
  };
  
  const handleDragStop = () => {
    setIsDragging(false);
    generateCSS();
  };
  
  // Generate CSS code based on current settings
  const generateCSS = () => {
    let parentCSS = `.parent-container {
  position: ${parentPositionType};
  overflow: ${overflow ? "hidden" : "visible"};
  width: 100%;
  height: 300px;
  background-color: #f3f4f6;
  border: 2px dashed #d1d5db;
  padding: 20px;
}`;

    let childCSS = `.positioned-element {
  position: ${positionType};${positionType !== "static" ? `
  top: ${topValue}px;
  right: ${rightValue}px;
  bottom: ${bottomValue}px;
  left: ${leftValue}px;
  z-index: ${zIndexValue};` : ""}
  width: 100px;
  height: 100px;
  background-color: #2563eb;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  border-radius: 4px;
}`;

    setCssCode(`${parentCSS}\n\n${childCSS}`);
  };
  
  // Copy CSS code to clipboard
  const copyToClipboard = () => {
    if (!codeRef.current) return;
    
    const text = codeRef.current.textContent || "";
    navigator.clipboard.writeText(text)
      .then(() => {
        setCopied(true);
        toast({
          title: "CSS Copied",
          description: "CSS code copied to clipboard"
        });
        
        setTimeout(() => {
          setCopied(false);
        }, 2000);
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
        toast({
          title: "Error",
          description: "Failed to copy CSS code",
          variant: "destructive"
        });
      });
  };
  
  // Find recommended tools based on current tool tags
  const getRecommendedTools = () => {
    const cssPositioningToolTags = ["CSS", "Layout", "Design"];
    
    return webTools
      .filter((tool) => 
        tool.slug !== "css-positioning-tool" && 
        tool.tags.some(tag => cssPositioningToolTags.includes(tag))
      )
      .slice(0, 3);
  };
  
  const recommendedTools = getRecommendedTools();
  
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">CSS Positioning Tool</h1>
          <p className="text-muted-foreground">
            Experiment with CSS positioning properties and see visual results in real-time
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Controls Panel */}
          <div className="lg:col-span-4">
            <Card>
              <CardContent className="p-6 space-y-6">
                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <Pin size={18} /> Element Positioning
                </h2>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="position-type">Position Type</Label>
                    <Select 
                      value={positionType} 
                      onValueChange={setPositionType}
                    >
                      <SelectTrigger id="position-type">
                        <SelectValue placeholder="Select position type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="static">Static</SelectItem>
                        <SelectItem value="relative">Relative</SelectItem>
                        <SelectItem value="absolute">Absolute</SelectItem>
                        <SelectItem value="fixed">Fixed</SelectItem>
                        <SelectItem value="sticky">Sticky</SelectItem>
                      </SelectContent>
                    </Select>
                    
                    <p className="text-xs text-muted-foreground mt-1">
                      {positionType === "static" && "Default. Elements render in order as they appear in the document flow."}
                      {positionType === "relative" && "Positioned relative to its normal position."}
                      {positionType === "absolute" && "Positioned relative to the nearest positioned ancestor."}
                      {positionType === "fixed" && "Positioned relative to the viewport."}
                      {positionType === "sticky" && "Positioned based on scroll position."}
                    </p>
                  </div>
                  
                  {positionType !== "static" && (
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="top-value">Top: {topValue}px</Label>
                        <Slider
                          id="top-value"
                          min={-200}
                          max={200}
                          step={1}
                          value={[topValue]}
                          onValueChange={(values) => setTopValue(values[0])}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="right-value">Right: {rightValue}px</Label>
                        <Slider
                          id="right-value"
                          min={-200}
                          max={200}
                          step={1}
                          value={[rightValue]}
                          onValueChange={(values) => setRightValue(values[0])}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="bottom-value">Bottom: {bottomValue}px</Label>
                        <Slider
                          id="bottom-value"
                          min={-200}
                          max={200}
                          step={1}
                          value={[bottomValue]}
                          onValueChange={(values) => setBottomValue(values[0])}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="left-value">Left: {leftValue}px</Label>
                        <Slider
                          id="left-value"
                          min={-200}
                          max={200}
                          step={1}
                          value={[leftValue]}
                          onValueChange={(values) => setLeftValue(values[0])}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="z-index-value">Z-Index: {zIndexValue}</Label>
                        <Slider
                          id="z-index-value"
                          min={0}
                          max={9999}
                          step={1}
                          value={[zIndexValue]}
                          onValueChange={(values) => setZIndexValue(values[0])}
                        />
                      </div>
                    </>
                  )}
                </div>
                
                <div className="pt-4 border-t">
                  <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
                    <SquareStack size={18} /> Parent Container
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="parent-position-type">Parent Position</Label>
                      <Select 
                        value={parentPositionType} 
                        onValueChange={setParentPositionType}
                      >
                        <SelectTrigger id="parent-position-type">
                          <SelectValue placeholder="Select parent position" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="static">Static</SelectItem>
                          <SelectItem value="relative">Relative</SelectItem>
                          <SelectItem value="absolute">Absolute</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="overflow-toggle"
                        checked={overflow}
                        onCheckedChange={setOverflow}
                      />
                      <Label htmlFor="overflow-toggle">Overflow Hidden</Label>
                    </div>
                  </div>
                </div>
                
                <Button 
                  className="w-full"
                  onClick={generateCSS}
                >
                  <Layers className="mr-2 h-4 w-4" /> Generate CSS
                </Button>
              </CardContent>
            </Card>
          </div>
          
          {/* Preview Panel */}
          <div className="lg:col-span-8 space-y-6">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <Maximize size={18} /> Preview
                </h2>
                
                <div className="mb-4 text-sm text-muted-foreground">
                  {isDraggable ? (
                    <p className="flex items-center gap-1">
                      <Move size={16} /> 
                      Drag the element to adjust its position
                    </p>
                  ) : (
                    <p>Static positioning doesn't allow for offset adjustments</p>
                  )}
                </div>
                
                <div
                  className="relative mb-6"
                  style={{
                    position: parentPositionType as any,
                    overflow: overflow ? "hidden" : "visible",
                    height: "300px",
                    width: "100%",
                    backgroundColor: "#f3f4f6",
                    border: "2px dashed #d1d5db",
                    padding: "20px",
                  }}
                >
                  {positionType === "static" ? (
                    <div
                      style={{
                        position: positionType as any,
                        width: "100px",
                        height: "100px",
                        backgroundColor: "#2563eb",
                        color: "white",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        textAlign: "center",
                        borderRadius: "4px",
                      }}
                    >
                      Element
                    </div>
                  ) : (
                    <Draggable
                      position={position}
                      onDrag={handleDrag}
                      onStop={handleDragStop}
                      disabled={!isDraggable}
                    >
                      <div
                        style={{
                          position: positionType as any,
                          top: positionType === "static" ? undefined : `${topValue}px`,
                          right: positionType === "static" ? undefined : `${rightValue}px`,
                          bottom: positionType === "static" ? undefined : `${bottomValue}px`,
                          left: positionType === "static" ? undefined : `${leftValue}px`,
                          zIndex: positionType === "static" ? undefined : zIndexValue,
                          width: "100px",
                          height: "100px",
                          backgroundColor: "#2563eb",
                          color: "white",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          textAlign: "center",
                          borderRadius: "4px",
                          cursor: isDraggable ? "move" : "default"
                        }}
                      >
                        {isDraggable ? (
                          <>
                            <Move className="mr-1 h-4 w-4" /> Element
                          </>
                        ) : (
                          "Element"
                        )}
                      </div>
                    </Draggable>
                  )}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold flex items-center gap-2">
                    <AlignLeft size={18} /> Generated CSS
                  </h2>
                  
                  <Button 
                    size="sm" 
                    variant="outline" 
                    onClick={copyToClipboard}
                  >
                    {copied ? (
                      <>
                        <Check className="mr-2 h-4 w-4" /> Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="mr-2 h-4 w-4" /> Copy CSS
                      </>
                    )}
                  </Button>
                </div>
                
                <div className="bg-muted rounded-md p-4 overflow-auto max-h-[300px]">
                  <pre ref={codeRef} className="text-sm font-mono">
                    {cssCode}
                  </pre>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        
        {/* How to Use Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-4">How to Use</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-medium mb-2">1. Select Position Type</h3>
                <p className="text-muted-foreground">
                  Choose from static, relative, absolute, fixed, or sticky positioning to see how each 
                  affects element placement.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-medium mb-2">2. Adjust Properties</h3>
                <p className="text-muted-foreground">
                  Use the sliders to set top, right, bottom, left and z-index values. Alternatively,
                  drag the element directly in the preview area.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-medium mb-2">3. Get Your CSS</h3>
                <p className="text-muted-foreground">
                  Click "Generate CSS" to update the code output, then copy the CSS to use in your 
                  own projects.
                </p>
              </CardContent>
            </Card>
          </div>
          
          <div className="bg-muted rounded-lg p-6 mb-8">
            <h3 className="text-lg font-medium mb-2">CSS Positioning Types Explained:</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Static:</strong> The default positioning. Elements follow the normal flow of the page.</li>
              <li><strong>Relative:</strong> Positioned relative to its normal position. Setting top, right, etc. will move it from its normal position.</li>
              <li><strong>Absolute:</strong> Positioned relative to its nearest positioned ancestor (an element with position other than static).</li>
              <li><strong>Fixed:</strong> Positioned relative to the viewport, so it always stays in the same place even if the page is scrolled.</li>
              <li><strong>Sticky:</strong> Positioned based on the user's scroll position. It's treated as relative until it crosses a specified threshold, then treated as fixed.</li>
            </ul>
          </div>
        </div>
        
        {/* Recommended Tools Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Recommended Tools</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {recommendedTools.map((tool) => (
              <Card 
                key={tool.id}
                className="transition-transform hover:-translate-y-1 hover:shadow-lg"
              >
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-2">{tool.name}</h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    {tool.description}
                  </p>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => navigate(`/tools/${tool.slug}`)}
                  >
                    Launch Tool
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default CssPositioningTool;

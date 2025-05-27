
import React, { useState } from "react";
import MainLayout from "@/layouts/MainLayout";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  Code,
  Copy,
  Check,
  Play,
  RefreshCw,
  ArrowRight,
  Pause,
  Trash2,
} from "lucide-react";
import WebToolCard from "@/components/WebToolCard";
import * as LucideIcons from "lucide-react";
import { WebTool } from "@/data/webToolsData";

// Animation types
const animationTypes = [
  { name: "fadeIn", value: "fadeIn" },
  { name: "fadeOut", value: "fadeOut" },
  { name: "slideInLeft", value: "slideInLeft" },
  { name: "slideInRight", value: "slideInRight" },
  { name: "slideInUp", value: "slideInUp" },
  { name: "slideInDown", value: "slideInDown" },
  { name: "zoomIn", value: "zoomIn" },
  { name: "zoomOut", value: "zoomOut" },
  { name: "bounce", value: "bounce" },
  { name: "pulse", value: "pulse" },
  { name: "rotate", value: "rotate" },
  { name: "flip", value: "flip" },
  { name: "shake", value: "shake" },
  { name: "swing", value: "swing" },
  { name: "wobble", value: "wobble" },
];

// Timing functions
const timingFunctions = [
  { name: "ease", value: "ease" },
  { name: "linear", value: "linear" },
  { name: "ease-in", value: "ease-in" },
  { name: "ease-out", value: "ease-out" },
  { name: "ease-in-out", value: "ease-in-out" },
  { name: "cubic-bezier(0.1, 0.7, 1.0, 0.1)", value: "cubic-bezier(0.1, 0.7, 1.0, 0.1)" },
];

// Animation directions
const directions = [
  { name: "normal", value: "normal" },
  { name: "reverse", value: "reverse" },
  { name: "alternate", value: "alternate" },
  { name: "alternate-reverse", value: "alternate-reverse" },
];

// Fill modes
const fillModes = [
  { name: "none", value: "none" },
  { name: "forwards", value: "forwards" },
  { name: "backwards", value: "backwards" },
  { name: "both", value: "both" },
];

// Iteration counts
const iterationCounts = [
  { name: "1", value: "1" },
  { name: "2", value: "2" },
  { name: "3", value: "3" },
  { name: "5", value: "5" },
  { name: "10", value: "10" },
  { name: "infinite", value: "infinite" },
];

// Keyframes definitions
const keyframesDefinitions = {
  fadeIn: `@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}`,
  fadeOut: `@keyframes fadeOut {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}`,
  slideInLeft: `@keyframes slideInLeft {
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(0);
  }
}`,
  slideInRight: `@keyframes slideInRight {
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
}`,
  slideInUp: `@keyframes slideInUp {
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0);
  }
}`,
  slideInDown: `@keyframes slideInDown {
  from {
    transform: translateY(-100%);
  }
  to {
    transform: translateY(0);
  }
}`,
  zoomIn: `@keyframes zoomIn {
  from {
    transform: scale(0);
  }
  to {
    transform: scale(1);
  }
}`,
  zoomOut: `@keyframes zoomOut {
  from {
    transform: scale(1);
  }
  to {
    transform: scale(0);
  }
}`,
  bounce: `@keyframes bounce {
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-30px);
  }
  60% {
    transform: translateY(-15px);
  }
}`,
  pulse: `@keyframes pulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}`,
  rotate: `@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}`,
  flip: `@keyframes flip {
  0% {
    transform: perspective(400px) rotateY(0);
  }
  100% {
    transform: perspective(400px) rotateY(360deg);
  }
}`,
  shake: `@keyframes shake {
  0%, 100% {
    transform: translateX(0);
  }
  10%, 30%, 50%, 70%, 90% {
    transform: translateX(-10px);
  }
  20%, 40%, 60%, 80% {
    transform: translateX(10px);
  }
}`,
  swing: `@keyframes swing {
  20% {
    transform: rotate(15deg);
  }
  40% {
    transform: rotate(-10deg);
  }
  60% {
    transform: rotate(5deg);
  }
  80% {
    transform: rotate(-5deg);
  }
  100% {
    transform: rotate(0deg);
  }
}`,
  wobble: `@keyframes wobble {
  0% {
    transform: translateX(0%);
  }
  15% {
    transform: translateX(-25%) rotate(-5deg);
  }
  30% {
    transform: translateX(20%) rotate(3deg);
  }
  45% {
    transform: translateX(-15%) rotate(-3deg);
  }
  60% {
    transform: translateX(10%) rotate(2deg);
  }
  75% {
    transform: translateX(-5%) rotate(-1deg);
  }
  100% {
    transform: translateX(0%);
  }
}`,
};

// Recommended tools
const recommendedTools: WebTool[] = [
  {
    id: "tool-1",
    name: "CSS Flexbox Playground",
    description: "Visualize and learn how Flexbox works with interactive examples.",
    slug: "flexbox-playground",
    tags: ["CSS", "Layout", "Design"],
    icon: "Layout",
  },
  {
    id: "tool-7",
    name: "CSS Grid Generator",
    description: "Build and export CSS grid layouts with a visual editor.",
    slug: "grid-generator",
    tags: ["CSS", "Generators", "Design"],
    icon: "Grid",
  },
  {
    id: "tool-13",
    name: "CSS Formatter",
    description: "Format and beautify your CSS code or minify it for production.",
    slug: "css-formatter",
    tags: ["CSS", "Formatters", "Utilities"],
    icon: "Code",
  },
  {
    id: "tool-15",
    name: "JSON Formatter",
    description: "Format, validate, and beautify your JSON with syntax highlighting.",
    slug: "json-formatter",
    tags: ["JavaScript", "Formatters", "Utilities"],
    icon: "Code",
  },
];

const CssAnimationGenerator = () => {
  // Animation properties state
  const [animationType, setAnimationType] = useState<string>("fadeIn");
  const [duration, setDuration] = useState<number>(1);
  const [delay, setDelay] = useState<number>(0);
  const [timingFunction, setTimingFunction] = useState<string>("ease");
  const [iterationCount, setIterationCount] = useState<string>("1");
  const [direction, setDirection] = useState<string>("normal");
  const [fillMode, setFillMode] = useState<string>("forwards");
  const [isCopied, setIsCopied] = useState<boolean>(false);

  // Generate the CSS animation code
  const generateCssCode = () => {
    const animationShorthand = `${animationType} ${duration}s ${timingFunction} ${delay}s ${iterationCount} ${direction} ${fillMode}`;
    
    return `.animated-element {
  animation: ${animationShorthand};
}

/* Keyframes definition */
${keyframesDefinitions[animationType as keyof typeof keyframesDefinitions]}`;
  };

  // Handle reset
  const handleReset = () => {
    setAnimationType("fadeIn");
    setDuration(1);
    setDelay(0);
    setTimingFunction("ease");
    setIterationCount("1");
    setDirection("normal");
    setFillMode("forwards");
  };

  // Handle copy to clipboard
  const handleCopy = () => {
    navigator.clipboard.writeText(generateCssCode());
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };

  return (
    <MainLayout>
      <section className="relative py-12 md:py-16 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-primary/5 to-transparent"></div>
        
        <div className="container mx-auto px-4 mb-12 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <Badge className="mb-4 bg-primary/10 text-primary hover:bg-primary/20 border-none">
              Web Tool
            </Badge>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              CSS Animation Generator
            </h1>
            <p className="text-muted-foreground text-lg mb-6">
              Create custom CSS animations with a visual editor
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left Column - Controls */}
            <Card className="border-border bg-card">
              <CardContent className="p-6">
                <div className="space-y-6">
                  {/* Animation Type */}
                  <div className="space-y-2">
                    <Label>Animation Type</Label>
                    <Select 
                      value={animationType} 
                      onValueChange={setAnimationType}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select animation type" />
                      </SelectTrigger>
                      <SelectContent>
                        {animationTypes.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            {type.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Duration */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <Label>Duration: {duration}s</Label>
                    </div>
                    <Slider
                      value={[duration]}
                      min={0.1}
                      max={5}
                      step={0.1}
                      onValueChange={([value]) => setDuration(value)}
                    />
                  </div>

                  {/* Delay */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <Label>Delay: {delay}s</Label>
                    </div>
                    <Slider
                      value={[delay]}
                      min={0}
                      max={3}
                      step={0.1}
                      onValueChange={([value]) => setDelay(value)}
                    />
                  </div>

                  {/* Timing Function */}
                  <div className="space-y-2">
                    <Label>Timing Function</Label>
                    <Select 
                      value={timingFunction} 
                      onValueChange={setTimingFunction}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select timing function" />
                      </SelectTrigger>
                      <SelectContent>
                        {timingFunctions.map((func) => (
                          <SelectItem key={func.value} value={func.value}>
                            {func.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Iteration Count */}
                  <div className="space-y-2">
                    <Label>Iteration Count</Label>
                    <Select 
                      value={iterationCount} 
                      onValueChange={setIterationCount}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select iteration count" />
                      </SelectTrigger>
                      <SelectContent>
                        {iterationCounts.map((count) => (
                          <SelectItem key={count.value} value={count.value}>
                            {count.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Direction */}
                  <div className="space-y-2">
                    <Label>Direction</Label>
                    <Select 
                      value={direction} 
                      onValueChange={setDirection}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select direction" />
                      </SelectTrigger>
                      <SelectContent>
                        {directions.map((dir) => (
                          <SelectItem key={dir.value} value={dir.value}>
                            {dir.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Fill Mode */}
                  <div className="space-y-2">
                    <Label>Fill Mode</Label>
                    <Select 
                      value={fillMode} 
                      onValueChange={setFillMode}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select fill mode" />
                      </SelectTrigger>
                      <SelectContent>
                        {fillModes.map((mode) => (
                          <SelectItem key={mode.value} value={mode.value}>
                            {mode.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-3 pt-4">
                    <Button onClick={handleReset} variant="outline" className="text-muted-foreground">
                      <Trash2 size={16} className="mr-2" />
                      Reset All
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Right Column - Code */}
            <Card className="border-border bg-card">
              <CardContent className="p-6">
                <div className="space-y-8">
                  {/* Generated CSS */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-medium flex items-center gap-2">
                        <Code size={18} className="text-primary" />
                        Generated CSS
                      </h3>
                      <Button 
                        onClick={handleCopy} 
                        size="sm" 
                        variant="outline"
                      >
                        {isCopied ? (
                          <>
                            <Check size={14} className="mr-2" />
                            Copied!
                          </>
                        ) : (
                          <>
                            <Copy size={14} className="mr-2" />
                            Copy CSS
                          </>
                        )}
                      </Button>
                    </div>

                    <div className="max-h-[300px] overflow-auto border border-border rounded-md">
                      <SyntaxHighlighter
                        language="css"
                        style={vscDarkPlus}
                        className="rounded-md text-sm"
                        customStyle={{ margin: 0, borderRadius: '0.375rem' }}
                      >
                        {generateCssCode()}
                      </SyntaxHighlighter>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Recommended Tools Section */}
        <div className="container mx-auto px-4 mt-20">
          <div className="max-w-3xl mx-auto text-center mb-10">
            <h2 className="text-2xl font-bold mb-3">Related CSS Tools</h2>
            <p className="text-muted-foreground">
              Explore these other tools to enhance your CSS workflows
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
      </section>
    </MainLayout>
  );
};

export default CssAnimationGenerator;

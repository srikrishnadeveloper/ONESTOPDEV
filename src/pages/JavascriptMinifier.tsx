
import { useState, useEffect } from "react";
import MainLayout from "@/layouts/MainLayout";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { toast } from "@/hooks/use-toast";
import { webTools } from "@/data/webToolsData";
import { Link } from "react-router-dom";
import { 
  Code, 
  Copy, 
  Check, 
  FileCode, 
  AlertCircle,
  Hammer,
  Search,
  HelpCircle,
  ArrowRight
} from "lucide-react";

const JavascriptMinifier = () => {
  // State
  const [inputJS, setInputJS] = useState("");
  const [outputJS, setOutputJS] = useState("");
  const [beautifyMode, setBeautifyMode] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [statsVisible, setStatsVisible] = useState(false);
  const [originalSize, setOriginalSize] = useState(0);
  const [minifiedSize, setMinifiedSize] = useState(0);

  // Reset error when input changes
  useEffect(() => {
    if (error) setError(null);
  }, [inputJS]);

  // Handle minification
  const handleMinify = () => {
    try {
      setError(null);
      if (!inputJS.trim()) {
        setOutputJS("");
        setStatsVisible(false);
        return;
      }

      // Simple minification
      if (!beautifyMode) {
        // Remove comments (except special comments with /*!), whitespace, and newlines
        const minified = inputJS
          // Preserve important comments
          .replace(/\/\*[^!][\s\S]*?\*\/|\/\/[^\n]*\n/g, '')
          // Remove extra spaces
          .replace(/\s{2,}/g, ' ')
          // Remove spaces around operators
          .replace(/\s*([=+\-*/%&|^<>!?:;,.()])\s*/g, '$1')
          // Remove trailing semicolons in blocks
          .replace(/;\}/g, '}')
          // Remove newlines
          .replace(/\n/g, '')
          .trim();

        setOutputJS(minified);
        setOriginalSize(new Blob([inputJS]).size);
        setMinifiedSize(new Blob([minified]).size);
        setStatsVisible(true);
      } else {
        // Beautify code
        const beautified = beautifyJS(inputJS);
        setOutputJS(beautified);
        setStatsVisible(false);
      }

      toast({
        title: beautifyMode ? "JavaScript Beautified" : "JavaScript Minified",
        description: "Your code has been processed successfully.",
        duration: 3000,
      });
    } catch (err) {
      console.error("Minification error:", err);
      setError(`Error processing JavaScript: ${err instanceof Error ? err.message : 'Unknown error'}`);
      setOutputJS("");
      setStatsVisible(false);
    }
  };

  // Beautify JavaScript
  const beautifyJS = (code: string) => {
    let result = '';
    let indentLevel = 0;
    let inString = false;
    let currentStringChar = '';
    let lastChar = '';
    
    for (let i = 0; i < code.length; i++) {
      const char = code[i];
      
      // Handle strings
      if ((char === '"' || char === "'" || char === '`') && lastChar !== '\\') {
        if (inString && char === currentStringChar) {
          inString = false;
        } else if (!inString) {
          inString = true;
          currentStringChar = char;
        }
      }
      
      if (!inString) {
        // Handle indentation
        if (char === '{' || char === '[') {
          result += char;
          result += '\n' + ' '.repeat(++indentLevel * 2);
          continue;
        }
        
        if (char === '}' || char === ']') {
          result += '\n' + ' '.repeat(--indentLevel * 2) + char;
          continue;
        }
        
        if (char === ';') {
          result += char + '\n' + ' '.repeat(indentLevel * 2);
          continue;
        }
        
        if (char === ',') {
          result += char + '\n' + ' '.repeat(indentLevel * 2);
          continue;
        }
      }
      
      result += char;
      lastChar = char;
    }
    
    return result;
  };

  // Copy to clipboard
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(outputJS);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      
      toast({
        title: "Copied!",
        description: "Code copied to clipboard.",
        duration: 3000,
      });
    } catch (err) {
      console.error("Copy error:", err);
      toast({
        title: "Copy failed",
        description: "Failed to copy code to clipboard.",
        variant: "destructive",
        duration: 3000,
      });
    }
  };

  // Example JavaScript
  const handleLoadExample = () => {
    const exampleJS = `// This is a sample JavaScript function
function calculateTotalPrice(items) {
  // Initialize total
  let total = 0;
  
  // Loop through all items
  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    
    // Add price to total
    total += item.price * item.quantity;
    
    // Apply discount if available
    if (item.discount) {
      total -= item.discount;
    }
  }
  
  // Apply tax (10%)
  total = total * 1.1;
  
  /* Format total to 2 decimal places */
  return total.toFixed(2);
}

// Example usage
const shoppingCart = [
  { name: 'Laptop', price: 999.99, quantity: 1, discount: 100 },
  { name: 'Mouse', price: 29.99, quantity: 2, discount: 0 },
  { name: 'Keyboard', price: 59.99, quantity: 1, discount: 10 }
];

console.log('Total price:', calculateTotalPrice(shoppingCart));`;
    
    setInputJS(exampleJS);
    setOutputJS('');
    setError(null);
    setStatsVisible(false);
  };

  // Recommended tools
  const recommendedTools = webTools.filter(tool => 
    tool.tags.some(tag => ["JavaScript", "Performance", "Utilities"].includes(tag)) && 
    tool.slug !== "javascript-minifier"
  ).slice(0, 3);

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        {/* Tool Header */}
        <div className="mb-10 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 primary-gradient bg-clip-text text-transparent">
            JavaScript Minifier
          </h1>
          <p className="text-muted-foreground max-w-3xl mx-auto">
            Compress your JavaScript code by removing unnecessary characters, whitespace, and comments.
            Toggle beautify mode to format minified code for readability.
          </p>
        </div>

        {/* How to Use Section */}
        <div className="mb-12 bg-muted/30 rounded-lg p-6">
          <div className="flex items-center gap-2 mb-4">
            <HelpCircle className="h-5 w-5 text-primary" />
            <h2 className="text-xl font-medium">How to Use</h2>
          </div>
          
          <div className="space-y-3">
            <div className="flex gap-2">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-sm font-medium">1</div>
              <p>Paste your JavaScript code into the input field on the left, or click "Load Example" to use a sample code.</p>
            </div>
            
            <div className="flex gap-2">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-sm font-medium">2</div>
              <p>Toggle "Beautify Mode" if you want to format your code for readability instead of minifying it.</p>
            </div>
            
            <div className="flex gap-2">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-sm font-medium">3</div>
              <p>Click the "Minify JavaScript" button (or "Beautify JavaScript" if in beautify mode) to process your code.</p>
            </div>
            
            <div className="flex gap-2">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-sm font-medium">4</div>
              <p>The processed code will appear in the output field on the right, along with size statistics for minified code.</p>
            </div>
            
            <div className="flex gap-2">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-sm font-medium">5</div>
              <p>Click "Copy Code" to copy the processed JavaScript to your clipboard.</p>
            </div>
          </div>
        </div>

        {/* Main Tool UI */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
          {/* Input Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Code className="h-5 w-5 text-primary" />
                <h2 className="text-xl font-medium">Input JavaScript</h2>
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleLoadExample}
                className="text-xs"
              >
                Load Example
              </Button>
            </div>
            
            <Textarea
              value={inputJS}
              onChange={(e) => setInputJS(e.target.value)}
              placeholder="Paste your JavaScript code here..."
              className="font-mono text-sm h-[400px] resize-none whitespace-pre overflow-auto"
            />
          </div>

          {/* Output Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <FileCode className="h-5 w-5 text-primary" />
                <h2 className="text-xl font-medium">Output JavaScript</h2>
              </div>

              <div className="flex items-center gap-2">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="beautify-mode"
                    checked={beautifyMode}
                    onCheckedChange={setBeautifyMode}
                    className="data-[state=checked]:bg-green-500"
                  />
                  <Label htmlFor="beautify-mode" className="text-sm cursor-pointer">
                    Beautify Mode
                  </Label>
                </div>
              </div>
            </div>
            
            <Textarea
              value={outputJS}
              readOnly
              placeholder={
                beautifyMode 
                  ? "Beautified JavaScript will appear here..." 
                  : "Minified JavaScript will appear here..."
              }
              className="font-mono text-sm h-[400px] resize-none whitespace-pre overflow-auto bg-muted/30"
            />

            {/* Statistics */}
            {statsVisible && (
              <div className="bg-muted/30 p-3 rounded-md text-sm space-y-1">
                <p>Original size: {(originalSize / 1024).toFixed(2)} KB</p>
                <p>Minified size: {(minifiedSize / 1024).toFixed(2)} KB</p>
                <p>Reduction: {((1 - minifiedSize / originalSize) * 100).toFixed(2)}%</p>
              </div>
            )}

            {/* Error Alert */}
            {error && (
              <Alert variant="destructive" className="mt-4">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  {error}
                </AlertDescription>
              </Alert>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <Button 
            onClick={handleMinify} 
            className="min-w-32"
            disabled={!inputJS.trim()}
          >
            <Hammer className="mr-2 h-4 w-4" />
            {beautifyMode ? "Beautify JavaScript" : "Minify JavaScript"}
          </Button>
          
          <Button 
            variant="outline" 
            onClick={handleCopy} 
            className="min-w-32"
            disabled={!outputJS.trim()}
          >
            {copied ? <Check className="mr-2 h-4 w-4" /> : <Copy className="mr-2 h-4 w-4" />}
            {copied ? "Copied!" : "Copy Code"}
          </Button>
        </div>

        {/* Recommended Tools */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6 text-center">Recommended Tools</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {recommendedTools.map((tool) => (
              <Link to={`/tools/${tool.slug}`} key={tool.id}>
                <Card className="h-full hover:shadow-md transition-shadow duration-300 cursor-pointer">
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      {tool.slug === "regex-tester" ? (
                        <Search className="h-5 w-5 text-primary" />
                      ) : (
                        <Code className="h-5 w-5 text-primary" />
                      )}
                      <h3 className="font-medium text-lg">{tool.name}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">{tool.description}</p>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default JavascriptMinifier;

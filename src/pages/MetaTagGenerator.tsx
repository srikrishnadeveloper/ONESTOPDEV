import { useState, useEffect } from "react";
import MainLayout from "@/layouts/MainLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Copy, Check, Clipboard, Code, Table, FileText, Tag, ExternalLink } from "lucide-react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { WebTool } from "@/data/webToolsData";
import WebToolCard from "@/components/WebToolCard";
import * as LucideIcons from "lucide-react";

// Sample recommended tools data
const recommendedTools: WebTool[] = [
  {
    id: "tool-1",
    name: "JSON Formatter",
    description: "Format, validate, and beautify your JSON with syntax highlighting.",
    slug: "json-formatter",
    tags: ["Formatters", "JSON", "Utilities"],
    icon: "Code"
  },
  {
    id: "tool-2",
    name: "Markdown Preview",
    description: "Write and preview Markdown with real-time rendering.",
    slug: "markdown-preview",
    tags: ["Formatters", "Utilities"],
    icon: "FileText"
  },
  {
    id: "tool-3",
    name: "CSS Formatter",
    description: "Format and beautify your CSS code or minify it for production.",
    slug: "css-formatter",
    tags: ["CSS", "Formatters", "Utilities"],
    icon: "Code"
  },
  {
    id: "tool-4",
    name: "HTML Validator",
    description: "Validate your HTML code to ensure it meets standards.",
    slug: "html-validator",
    tags: ["HTML", "Validation", "Utilities"],
    icon: "Code"
  }
];

// Define default values
const defaultViewport = "width=device-width, initial-scale=1.0";

const MetaTagGenerator = () => {
  const { toast } = useToast();
  const [isCopied, setIsCopied] = useState(false);

  // Form state
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [author, setAuthor] = useState("");
  const [keywords, setKeywords] = useState("");
  const [favicon, setFavicon] = useState("");
  const [themeColor, setThemeColor] = useState("#ffffff");
  const [viewport, setViewport] = useState(defaultViewport);
  
  // Open Graph state
  const [includeOG, setIncludeOG] = useState(true);
  const [ogTitle, setOgTitle] = useState("");
  const [ogDescription, setOgDescription] = useState("");
  const [ogImage, setOgImage] = useState("");
  const [ogUrl, setOgUrl] = useState("");
  
  // Twitter Card state
  const [includeTwitter, setIncludeTwitter] = useState(true);
  const [twitterTitle, setTwitterTitle] = useState("");
  const [twitterDescription, setTwitterDescription] = useState("");
  const [twitterImage, setTwitterImage] = useState("");
  const [twitterCard, setTwitterCard] = useState("summary_large_image");
  
  // Generated meta tags
  const [metaTags, setMetaTags] = useState("");

  // Generate meta tags whenever input changes
  useEffect(() => {
    let generatedTags = "";
    
    // Basic meta tags
    if (title) {
      generatedTags += `<title>${title}</title>\n`;
      generatedTags += `<meta name="title" content="${title}">\n`;
    }
    
    if (description) {
      generatedTags += `<meta name="description" content="${description}">\n`;
    }
    
    if (author) {
      generatedTags += `<meta name="author" content="${author}">\n`;
    }
    
    if (keywords) {
      generatedTags += `<meta name="keywords" content="${keywords}">\n`;
    }
    
    if (viewport) {
      generatedTags += `<meta name="viewport" content="${viewport}">\n`;
    }
    
    if (favicon) {
      generatedTags += `<link rel="icon" href="${favicon}">\n`;
    }
    
    if (themeColor) {
      generatedTags += `<meta name="theme-color" content="${themeColor}">\n`;
    }
    
    // Open Graph tags
    if (includeOG) {
      generatedTags += `\n<!-- Open Graph / Facebook -->\n`;
      generatedTags += `<meta property="og:type" content="website">\n`;
      
      if (ogTitle || title) {
        generatedTags += `<meta property="og:title" content="${ogTitle || title}">\n`;
      }
      
      if (ogDescription || description) {
        generatedTags += `<meta property="og:description" content="${ogDescription || description}">\n`;
      }
      
      if (ogUrl) {
        generatedTags += `<meta property="og:url" content="${ogUrl}">\n`;
      }
      
      if (ogImage) {
        generatedTags += `<meta property="og:image" content="${ogImage}">\n`;
      }
    }
    
    // Twitter Card tags
    if (includeTwitter) {
      generatedTags += `\n<!-- Twitter -->\n`;
      generatedTags += `<meta property="twitter:card" content="${twitterCard}">\n`;
      
      if (ogUrl) {
        generatedTags += `<meta property="twitter:url" content="${ogUrl}">\n`;
      }
      
      if (twitterTitle || ogTitle || title) {
        generatedTags += `<meta property="twitter:title" content="${twitterTitle || ogTitle || title}">\n`;
      }
      
      if (twitterDescription || ogDescription || description) {
        generatedTags += `<meta property="twitter:description" content="${twitterDescription || ogDescription || description}">\n`;
      }
      
      if (twitterImage || ogImage) {
        generatedTags += `<meta property="twitter:image" content="${twitterImage || ogImage}">\n`;
      }
    }
    
    setMetaTags(generatedTags);
  }, [
    title, description, author, keywords, favicon, themeColor, viewport,
    includeOG, ogTitle, ogDescription, ogImage, ogUrl,
    includeTwitter, twitterTitle, twitterDescription, twitterImage, twitterCard
  ]);

  // Copy meta tags to clipboard
  const handleCopy = () => {
    navigator.clipboard.writeText(metaTags);
    setIsCopied(true);
    
    toast({
      title: "Copied to clipboard",
      description: "Meta tags have been copied to your clipboard",
    });
    
    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };

  // Reset all fields
  const handleReset = () => {
    setTitle("");
    setDescription("");
    setAuthor("");
    setKeywords("");
    setFavicon("");
    setThemeColor("#ffffff");
    setViewport(defaultViewport);
    setIncludeOG(true);
    setOgTitle("");
    setOgDescription("");
    setOgImage("");
    setOgUrl("");
    setIncludeTwitter(true);
    setTwitterTitle("");
    setTwitterDescription("");
    setTwitterImage("");
    setTwitterCard("summary_large_image");
    
    toast({
      title: "Form reset",
      description: "All fields have been cleared",
    });
  };

  return (
    <MainLayout>
      {/* Hero Section */}
      <div className="bg-background text-foreground py-14 md:py-20 relative overflow-hidden">
        {/* Grid background overlay */}
        <div className="absolute inset-0 grid-bg opacity-20"></div>
        
        {/* Gradient orbs for visual interest */}
        <div className="absolute top-1/4 -left-20 w-80 h-80 rounded-full bg-primary/10 blur-3xl"></div>
        <div className="absolute bottom-1/3 -right-20 w-80 h-80 rounded-full bg-accent/10 blur-3xl"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 primary-gradient bg-clip-text text-transparent tracking-tight">
              Meta Tag Generator
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-6">
              Create optimized meta tags for SEO, social media, and browser compatibility with ease.
            </p>
          </div>
        </div>
      </div>

      {/* Main Tool Section */}
      <div className="container mx-auto px-4 py-8 md:py-12">
        
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Form Column */}
          <div className="flex-1">
            <Card className="border border-border bg-card">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl font-medium flex items-center gap-2">
                  <Tag className="h-5 w-5 text-primary" />
                  Meta Tags Form
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Basic Meta Tags */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Basic Meta Tags</h3>
                  
                  <div className="space-y-3">
                    <div>
                      <Label htmlFor="title">Website Title</Label>
                      <Input
                        id="title"
                        placeholder="My Website"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        placeholder="A brief description of your website"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="resize-none h-20"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="author">Author</Label>
                      <Input
                        id="author"
                        placeholder="John Doe"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="keywords">Keywords (comma-separated)</Label>
                      <Input
                        id="keywords"
                        placeholder="website, web development, html"
                        value={keywords}
                        onChange={(e) => setKeywords(e.target.value)}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="favicon">Favicon URL</Label>
                      <Input
                        id="favicon"
                        placeholder="https://example.com/favicon.ico"
                        value={favicon}
                        onChange={(e) => setFavicon(e.target.value)}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="themeColor">Theme Color</Label>
                      <div className="flex items-center gap-3">
                        <Input
                          id="themeColor"
                          type="color"
                          value={themeColor}
                          onChange={(e) => setThemeColor(e.target.value)}
                          className="w-16 h-10 p-1"
                        />
                        <Input
                          value={themeColor}
                          onChange={(e) => setThemeColor(e.target.value)}
                          className="flex-1"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="viewport">Viewport</Label>
                      <Input
                        id="viewport"
                        placeholder="width=device-width, initial-scale=1.0"
                        value={viewport}
                        onChange={(e) => setViewport(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                
                {/* Open Graph Tags */}
                <div className="space-y-4 pt-2">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium">Open Graph Tags</h3>
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="include-og"
                        checked={includeOG}
                        onCheckedChange={setIncludeOG}
                      />
                      <Label htmlFor="include-og" className="cursor-pointer">Include</Label>
                    </div>
                  </div>
                  
                  {includeOG && (
                    <div className="space-y-3">
                      <div>
                        <Label htmlFor="og-title">OG Title (optional, uses website title if empty)</Label>
                        <Input
                          id="og-title"
                          placeholder="Same as website title"
                          value={ogTitle}
                          onChange={(e) => setOgTitle(e.target.value)}
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="og-description">OG Description (optional)</Label>
                        <Textarea
                          id="og-description"
                          placeholder="Same as website description"
                          value={ogDescription}
                          onChange={(e) => setOgDescription(e.target.value)}
                          className="resize-none h-20"
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="og-image">OG Image URL</Label>
                        <Input
                          id="og-image"
                          placeholder="https://example.com/image.jpg"
                          value={ogImage}
                          onChange={(e) => setOgImage(e.target.value)}
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="og-url">Website URL</Label>
                        <Input
                          id="og-url"
                          placeholder="https://example.com"
                          value={ogUrl}
                          onChange={(e) => setOgUrl(e.target.value)}
                        />
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Twitter Card Tags */}
                <div className="space-y-4 pt-2">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium">Twitter Card Tags</h3>
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="include-twitter"
                        checked={includeTwitter}
                        onCheckedChange={setIncludeTwitter}
                      />
                      <Label htmlFor="include-twitter" className="cursor-pointer">Include</Label>
                    </div>
                  </div>
                  
                  {includeTwitter && (
                    <div className="space-y-3">
                      <div>
                        <Label htmlFor="twitter-card">Twitter Card Type</Label>
                        <Select
                          value={twitterCard}
                          onValueChange={setTwitterCard}
                        >
                          <SelectTrigger id="twitter-card">
                            <SelectValue placeholder="Select card type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="summary">Summary</SelectItem>
                            <SelectItem value="summary_large_image">Summary with Large Image</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <Label htmlFor="twitter-title">Twitter Title (optional)</Label>
                        <Input
                          id="twitter-title"
                          placeholder="Same as OG or website title"
                          value={twitterTitle}
                          onChange={(e) => setTwitterTitle(e.target.value)}
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="twitter-description">Twitter Description (optional)</Label>
                        <Textarea
                          id="twitter-description"
                          placeholder="Same as OG or website description"
                          value={twitterDescription}
                          onChange={(e) => setTwitterDescription(e.target.value)}
                          className="resize-none h-20"
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="twitter-image">Twitter Image URL (optional)</Label>
                        <Input
                          id="twitter-image"
                          placeholder="Same as OG image if left empty"
                          value={twitterImage}
                          onChange={(e) => setTwitterImage(e.target.value)}
                        />
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Form Actions */}
                <div className="flex justify-end gap-3 pt-4">
                  <Button 
                    variant="outline" 
                    onClick={handleReset}
                  >
                    Reset
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Preview Column */}
          <div className="flex-1">
            <Card className="border border-border bg-card h-full">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                <CardTitle className="text-xl font-medium flex items-center gap-2">
                  <Code className="h-5 w-5 text-primary" />
                  Generated Meta Tags
                </CardTitle>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleCopy}
                  disabled={!metaTags.trim()}
                  className="h-9"
                >
                  {isCopied ? (
                    <>
                      <Check className="mr-2 h-4 w-4" />
                      Copied
                    </>
                  ) : (
                    <>
                      <Copy className="mr-2 h-4 w-4" />
                      Copy
                    </>
                  )}
                </Button>
              </CardHeader>
              <CardContent>
                <div className="relative rounded-md bg-black overflow-hidden">
                  <SyntaxHighlighter 
                    language="html" 
                    style={oneDark}
                    customStyle={{ 
                      margin: 0,
                      padding: "1.5rem",
                      borderRadius: "0.375rem",
                      fontSize: "0.875rem", 
                      minHeight: "500px",
                      maxHeight: "500px",
                      overflow: "auto"
                    }}
                  >
                    {metaTags || "<!-- Fill in the form to generate meta tags -->"}
                  </SyntaxHighlighter>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Tool explanation section */}
        <div className="mt-12 max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-4">How to Use This Tool</h2>
          <div className="space-y-4 text-muted-foreground">
            <p>
              The Meta Tag Generator helps you create essential meta tags for your website, improving SEO, social media sharing, and browser compatibility.
            </p>
            
            <div className="space-y-2">
              <h3 className="text-lg font-medium text-foreground">Features:</h3>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>Generate basic meta tags for SEO</li>
                <li>Create Open Graph tags for social media sharing on Facebook and other platforms</li>
                <li>Add Twitter Card tags for optimized Twitter sharing</li>
                <li>Copy all generated tags with a single click</li>
              </ul>
            </div>
            
            <div className="space-y-2">
              <h3 className="text-lg font-medium text-foreground">Instructions:</h3>
              <ol className="list-decimal list-inside space-y-1 ml-2">
                <li>Fill in the basic meta tag information (title, description, etc.)</li>
                <li>Add Open Graph tags for Facebook and other social platforms</li>
                <li>Include Twitter Card tags for Twitter sharing</li>
                <li>Copy the generated code and paste it into your website's <code>&lt;head&gt;</code> section</li>
              </ol>
            </div>
            
            <div className="p-4 bg-muted/30 rounded-md mt-4">
              <h3 className="text-lg font-medium text-foreground mb-2">Pro Tips:</h3>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>Keep your meta descriptions between 150-160 characters for optimal display in search results</li>
                <li>Use high-quality images for Open Graph and Twitter Cards (recommended size: 1200×630 pixels)</li>
                <li>Include relevant keywords in your meta title and description, but avoid keyword stuffing</li>
                <li>Test your meta tags using social media platform validators after implementation</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Recommended Tools Section */}
        <div className="mt-16 mb-8">
          <h2 className="text-2xl font-bold mb-6">Recommended Tools</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {recommendedTools.map((tool) => (
              <WebToolCard
                key={tool.id}
                name={tool.name}
                description={tool.description}
                tags={tool.tags}
                slug={tool.slug}
                icon={tool.icon as keyof typeof LucideIcons}
                url={tool.url}
              />
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default MetaTagGenerator;

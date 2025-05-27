
import { useState, useRef, useEffect } from "react";
import MainLayout from "@/layouts/MainLayout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import { Image as ImageIcon, Download, Upload, Copy, Settings, HelpCircle, AlertTriangle, Info, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { webTools } from "@/data/webToolsData";

// Helper function to format file size
const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
};

const ImageCompressor = () => {
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // State variables
  const [originalImage, setOriginalImage] = useState<File | null>(null);
  const [originalPreview, setOriginalPreview] = useState<string | null>(null);
  const [originalSize, setOriginalSize] = useState<number>(0);
  const [compressedImage, setCompressedImage] = useState<Blob | null>(null);
  const [compressedPreview, setCompressedPreview] = useState<string | null>(null);
  const [compressedSize, setCompressedSize] = useState<number>(0);
  const [quality, setQuality] = useState<number>(80);
  const [format, setFormat] = useState<string>("jpeg");
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [maintainDimensions, setMaintainDimensions] = useState<boolean>(true);

  // Create recommended tools array (filter from webTools data)
  const recommendedTools = webTools.filter(tool => 
    ["css-formatter", "color-palette", "json-formatter", "meta-tag-generator"].includes(tool.slug)
  );

  // Function to handle file upload
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    const file = e.target.files?.[0];
    
    if (!file) return;
    
    // Validate file type
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      setError("Please upload a valid image file (JPEG, PNG, or WebP)");
      return;
    }
    
    // Validate file size (10MB max)
    if (file.size > 10 * 1024 * 1024) {
      setError("Image too large. Maximum size: 10MB");
      return;
    }
    
    setOriginalImage(file);
    setOriginalSize(file.size);
    
    // Generate preview for original image
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        setOriginalPreview(event.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  // Compress image when settings change
  useEffect(() => {
    if (!originalImage || !originalPreview) return;
    
    const compressImage = async () => {
      setIsProcessing(true);
      setError(null);
      
      try {
        // Create an image element to load the original image
        const img = new window.Image();
        img.src = originalPreview;
        
        await new Promise((resolve, reject) => {
          img.onload = resolve;
          img.onerror = reject;
        });
        
        // Set up canvas with original dimensions
        const canvas = canvasRef.current;
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        
        // Set canvas dimensions
        canvas.width = img.width;
        canvas.height = img.height;
        
        // Draw image to canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        
        // Convert canvas to blob with compression
        const mimeType = `image/${format === 'jpg' ? 'jpeg' : format}`;
        
        canvas.toBlob(
          (blob) => {
            if (blob) {
              setCompressedImage(blob);
              setCompressedSize(blob.size);
              
              // Generate preview for compressed image
              const reader = new FileReader();
              reader.onload = (event) => {
                if (event.target?.result) {
                  setCompressedPreview(event.target.result as string);
                }
              };
              reader.readAsDataURL(blob);
            }
            setIsProcessing(false);
          },
          mimeType,
          quality / 100
        );
      } catch (err) {
        setError("Failed to compress image. Please try again.");
        setIsProcessing(false);
      }
    };
    
    compressImage();
  }, [originalImage, quality, format, originalPreview, maintainDimensions]);

  // Function to handle download
  const handleDownload = () => {
    if (!compressedImage) return;
    
    const url = URL.createObjectURL(compressedImage);
    const a = document.createElement('a');
    a.href = url;
    
    // Generate file name
    const extension = format === 'jpg' ? 'jpeg' : format;
    const fileName = originalImage?.name 
      ? `${originalImage.name.split('.')[0]}-compressed.${extension}`
      : `compressed-image.${extension}`;
    
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Image downloaded",
      description: "Your compressed image has been downloaded",
    });
  };

  // Handle copy image filename
  const handleCopyFilename = () => {
    if (!compressedImage || !originalImage) return;
    
    const extension = format === 'jpg' ? 'jpeg' : format;
    const fileName = originalImage.name 
      ? `${originalImage.name.split('.')[0]}-compressed.${extension}`
      : `compressed-image.${extension}`;
    
    navigator.clipboard.writeText(fileName);
    
    toast({
      title: "Filename copied",
      description: "The compressed image filename has been copied to clipboard",
    });
  };

  // Function to trigger file input click
  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // Calculate compression percentage
  const compressionPercentage = originalSize && compressedSize
    ? Math.round(((originalSize - compressedSize) / originalSize) * 100)
    : 0;

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Image Compressor</h1>
          <p className="text-muted-foreground text-lg">
            Compress and optimize your images without uploading to any server. Fast, secure, and client-side only.
          </p>
        </div>

        {/* Hidden canvas for image processing */}
        <canvas ref={canvasRef} className="hidden"></canvas>
        
        {/* Main content area */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
          {/* Left column: Upload and settings */}
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Upload & Settings</CardTitle>
              <CardDescription>
                Upload your image and adjust compression settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* File upload area */}
              <div 
                className={cn(
                  "border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer transition-colors duration-200",
                  "hover:border-primary/50 hover:bg-muted/50",
                  originalImage ? "border-primary/30 bg-primary/5" : "border-muted"
                )}
                onClick={handleUploadClick}
              >
                <Input 
                  ref={fileInputRef}
                  type="file" 
                  onChange={handleFileChange}
                  accept=".jpg,.jpeg,.png,.webp"
                  className="hidden"
                />
                
                {originalImage ? (
                  <div className="text-center">
                    <div className="w-full flex justify-center mb-4">
                      {originalPreview && (
                        <div className="relative w-32 h-32 overflow-hidden rounded-md border">
                          <img 
                            src={originalPreview} 
                            alt="Original"
                            className="w-full h-full object-contain"
                          />
                        </div>
                      )}
                    </div>
                    <p className="text-sm font-medium">{originalImage.name}</p>
                    <p className="text-xs text-muted-foreground mb-2">
                      {originalImage.type.split('/')[1].toUpperCase()} • {formatFileSize(originalSize)}
                    </p>
                    <Button size="sm" variant="outline" className="mt-2">
                      <Upload className="mr-2 h-4 w-4" />
                      Change Image
                    </Button>
                  </div>
                ) : (
                  <>
                    <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
                      <Upload className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <p className="text-base font-medium">Drag and drop your image here</p>
                    <p className="text-sm text-muted-foreground mb-4">or click to browse</p>
                    <p className="text-xs text-muted-foreground">
                      Supports JPG, PNG, WebP up to 10MB
                    </p>
                  </>
                )}
              </div>
              
              {/* Show error message if any */}
              {error && (
                <div className="bg-destructive/10 text-destructive p-3 rounded-md flex items-start">
                  <AlertTriangle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">{error}</span>
                </div>
              )}
              
              {/* Compression settings */}
              <div className={cn("space-y-4", !originalImage && "opacity-50 pointer-events-none")}>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <Label htmlFor="quality">Quality: {quality}%</Label>
                    <span className="text-xs text-muted-foreground">
                      Lower = smaller file
                    </span>
                  </div>
                  <Slider
                    id="quality"
                    min={1}
                    max={100}
                    step={1}
                    value={[quality]}
                    onValueChange={(value) => setQuality(value[0])}
                    className="py-2"
                  />
                </div>
                
                <div>
                  <Label htmlFor="format" className="mb-2 block">Output Format</Label>
                  <Select value={format} onValueChange={setFormat}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select format" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="jpeg">JPEG</SelectItem>
                      <SelectItem value="png">PNG</SelectItem>
                      <SelectItem value="webp">WebP</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground mt-1">
                    WebP typically offers the best compression
                  </p>
                </div>
              </div>
              
              {/* Compression info */}
              {originalImage && compressedImage && (
                <div className="bg-background rounded-lg border p-4">
                  <h3 className="text-sm font-medium mb-2 flex items-center">
                    <Info className="h-4 w-4 mr-1.5" />
                    Compression Results
                  </h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Original Size</p>
                      <p className="font-medium">{formatFileSize(originalSize)}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Compressed Size</p>
                      <p className="font-medium">{formatFileSize(compressedSize)}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Format</p>
                      <p className="font-medium uppercase">{format}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Saved</p>
                      <p className="font-medium text-green-600 dark:text-green-400">
                        {compressionPercentage}% ({formatFileSize(originalSize - compressedSize)})
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
          
          {/* Right column: Preview and download */}
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Preview</CardTitle>
              <CardDescription>
                View and download your compressed image
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center min-h-[300px]">
              {isProcessing ? (
                <div className="flex flex-col items-center justify-center p-12">
                  <Loader2 className="h-12 w-12 text-primary animate-spin mb-4" />
                  <p className="text-muted-foreground">Processing your image...</p>
                </div>
              ) : compressedPreview ? (
                <div className="w-full flex flex-col items-center">
                  <div className="relative max-w-full h-auto overflow-hidden rounded-md border mb-4">
                    <img 
                      src={compressedPreview} 
                      alt="Compressed Preview"
                      className="max-w-full max-h-[400px] object-contain"
                    />
                  </div>
                  <div className="text-sm text-center text-muted-foreground mt-2">
                    <p>Compressed: {formatFileSize(compressedSize)}</p>
                    {compressionPercentage > 0 && (
                      <p className="text-green-600 dark:text-green-400">
                        {compressionPercentage}% smaller than original
                      </p>
                    )}
                  </div>
                </div>
              ) : originalImage ? (
                <div className="text-center p-8">
                  <Settings className="h-12 w-12 text-muted-foreground mb-4 animate-pulse" />
                  <p>Adjust settings to preview compression</p>
                </div>
              ) : (
                <div className="text-center p-12">
                  <ImageIcon className="h-16 w-16 text-muted-foreground mb-4 mx-auto opacity-20" />
                  <p className="text-lg font-medium text-muted-foreground mb-2">No image uploaded</p>
                  <p className="text-sm text-muted-foreground">
                    Upload an image to see compression preview
                  </p>
                </div>
              )}
            </CardContent>
            <CardFooter className="flex gap-3 flex-wrap justify-center">
              <Button
                onClick={handleDownload}
                disabled={!compressedImage}
                className="flex-1 min-w-[140px]"
              >
                <Download className="mr-2 h-4 w-4" />
                Download
              </Button>
              <Button
                variant="outline"
                onClick={handleCopyFilename}
                disabled={!compressedImage}
                className="flex-1 min-w-[140px]"
              >
                <Copy className="mr-2 h-4 w-4" />
                Copy Filename
              </Button>
            </CardFooter>
          </Card>
        </div>
        
        {/* Tool Tips Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Image Compression Tips</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center">
                  <HelpCircle className="h-5 w-5 mr-2 text-primary" />
                  Choose the Right Format
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  <strong>JPEG:</strong> Best for photographs and complex images with many colors.<br />
                  <strong>PNG:</strong> Better for graphics, logos, and images with transparency.<br />
                  <strong>WebP:</strong> Modern format that often provides better compression than both.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center">
                  <HelpCircle className="h-5 w-5 mr-2 text-primary" />
                  Optimize Quality Settings
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  <strong>80-90%:</strong> High quality with little visible difference from original.<br />
                  <strong>60-80%:</strong> Good balance of quality and file size reduction.<br />
                  <strong>Below 60%:</strong> Significant file size savings but noticeable quality loss.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Recommended Tools Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Recommended Tools</h2>
          <p className="text-muted-foreground mb-6">
            Explore these related tools to enhance your web development workflow
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {recommendedTools.map((tool) => (
              <Card key={tool.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="p-4">
                  <CardTitle className="text-lg flex items-center">
                    <div className="p-2 mr-3 bg-primary/10 text-primary rounded-md">
                      {/* Import and use icon dynamically */}
                      {(() => {
                        // Use dynamic import for Lucide icons
                        const IconComponent = tool.icon === "Image" ? ImageIcon :
                                            tool.icon === "Download" ? Download :
                                            tool.icon === "Upload" ? Upload :
                                            tool.icon === "Copy" ? Copy :
                                            tool.icon === "Settings" ? Settings :
                                            tool.icon === "HelpCircle" ? HelpCircle :
                                            tool.icon === "AlertTriangle" ? AlertTriangle : 
                                            tool.icon === "Info" ? Info :
                                            tool.icon === "Loader2" ? Loader2 : ImageIcon;
                        
                        return <IconComponent size={18} />;
                      })()}
                    </div>
                    {tool.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <p className="text-sm text-muted-foreground mb-4">
                    {tool.description}
                  </p>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    asChild 
                    className="w-full"
                  >
                    <a href={`/tools/${tool.slug}`}>
                      Launch Tool
                    </a>
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

export default ImageCompressor;

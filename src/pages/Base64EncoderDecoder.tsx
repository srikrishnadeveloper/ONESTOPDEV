
import React, { useState, useRef, useEffect } from "react";
import MainLayout from "@/layouts/MainLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import {
  File,
  Upload,
  Download,
  Copy,
  Check,
  AlertTriangle,
  ExternalLink,
  FileType,
  FileCode,
  Code,
  Lock,
  Unlock,
} from "lucide-react";
import { webTools } from "@/data/webToolsData";
import WebToolCard from "@/components/WebToolCard";
import * as LucideIcons from "lucide-react";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

const Base64EncoderDecoder: React.FC = () => {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [activeTab, setActiveTab] = useState<"encode" | "decode">("encode");
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [fileType, setFileType] = useState<string>("");
  const [isOutputFile, setIsOutputFile] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Reset state when tab changes
    setError(null);
    setOutputText("");
    setFile(null);
    setFileType("");
    setIsOutputFile(false);
  }, [activeTab]);

  const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputText(e.target.value);
    setFile(null);
    setError(null);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      
      if (selectedFile.size > MAX_FILE_SIZE) {
        setError(`File size exceeds the 5MB limit. Your file is ${(selectedFile.size / (1024 * 1024)).toFixed(2)}MB.`);
        e.target.value = '';
        return;
      }
      
      setFile(selectedFile);
      setFileType(selectedFile.type || "application/octet-stream");
      setInputText("");
      
      // Read file content if in encode mode
      if (activeTab === "encode") {
        const reader = new FileReader();
        reader.onload = () => {
          // No need to show the binary content in the input
          setInputText(`File loaded: ${selectedFile.name} (${(selectedFile.size / 1024).toFixed(2)} KB)`);
        };
        reader.onerror = () => {
          setError("Failed to read the file.");
        };
        reader.readAsArrayBuffer(selectedFile);
      } else {
        // For decode mode, try to read as text to display in input area
        const reader = new FileReader();
        reader.onload = () => {
          if (typeof reader.result === "string") {
            setInputText(reader.result);
          }
        };
        reader.onerror = () => {
          setError("Failed to read the file.");
        };
        reader.readAsText(selectedFile);
      }
    }
  };

  const resetFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const encodeToBase64 = async () => {
    setIsLoading(true);
    setError(null);
    setOutputText("");
    setIsOutputFile(false);
    
    try {
      if (!inputText && !file) {
        setError("Please enter text or upload a file to encode.");
        setIsLoading(false);
        return;
      }
      
      if (file) {
        // Encode file to Base64
        const reader = new FileReader();
        reader.onload = () => {
          const base64String = reader.result as string;
          // Get the part after the comma (remove data:image/png;base64, part)
          const base64Data = base64String.split(',')[1] || base64String;
          setOutputText(base64Data);
          setIsLoading(false);
        };
        reader.onerror = () => {
          setError("Failed to encode the file.");
          setIsLoading(false);
        };
        reader.readAsDataURL(file);
      } else {
        // Encode text to Base64
        try {
          const base64Encoded = btoa(encodeURIComponent(inputText));
          setOutputText(base64Encoded);
        } catch (err) {
          setError("Failed to encode the text. Make sure it contains valid characters.");
        }
      }
    } catch (err) {
      setError("An error occurred during encoding.");
    }
    
    setIsLoading(false);
  };

  const decodeFromBase64 = async () => {
    setIsLoading(true);
    setError(null);
    setOutputText("");
    setIsOutputFile(false);
    
    try {
      if (!inputText && !file) {
        setError("Please enter Base64 text or upload a file to decode.");
        setIsLoading(false);
        return;
      }
      
      const base64Content = file ? await readFileAsText(file) : inputText;

      // Check if it's likely a Base64 encoded file by looking for MIME type pattern
      const isDataUri = base64Content.match(/^data:([a-z]+\/[a-z0-9-+.]+);base64,/i);
      
      if (isDataUri) {
        // Handle data URI format
        const mimeType = isDataUri[1];
        setFileType(mimeType);
        setIsOutputFile(true);
        setOutputText(base64Content);
      } else {
        // Try to decode as plain Base64 text
        try {
          // Remove any whitespace
          const cleanBase64 = base64Content.replace(/\s/g, '');
          
          // Basic validation
          if (!/^[A-Za-z0-9+/=]+$/.test(cleanBase64)) {
            throw new Error("Invalid Base64 characters detected.");
          }
          
          try {
            // See if it might be a file by trying to detect MIME type
            const binaryString = atob(cleanBase64);
            
            // Check for common file signatures in the binary data
            const uint8Array = new Uint8Array(binaryString.length);
            for (let i = 0; i < binaryString.length; i++) {
              uint8Array[i] = binaryString.charCodeAt(i);
            }
            
            // Detect common file types by their signatures
            const mimeType = detectMimeType(uint8Array);
            
            if (mimeType && isLikelyBinaryContent(binaryString)) {
              // Likely binary content
              setFileType(mimeType);
              setIsOutputFile(true);
              setOutputText(cleanBase64);
            } else {
              // Text content
              try {
                const decodedText = decodeURIComponent(atob(cleanBase64));
                setOutputText(decodedText);
              } catch {
                // If decodeURIComponent fails, try without it
                setOutputText(atob(cleanBase64));
              }
            }
          } catch {
            // Not a valid Base64 string
            setError("Invalid Base64 input. Please check your input and try again.");
          }
        } catch (err) {
          if (err instanceof Error) {
            setError(err.message);
          } else {
            setError("Failed to decode the Base64 input.");
          }
        }
      }
    } catch (err) {
      setError("An error occurred during decoding.");
    }
    
    setIsLoading(false);
  };

  const readFileAsText = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === "string") {
          resolve(reader.result);
        } else {
          reject(new Error("Failed to read file as text."));
        }
      };
      reader.onerror = () => reject(reader.error);
      reader.readAsText(file);
    });
  };

  const isLikelyBinaryContent = (text: string): boolean => {
    // Check if the string contains a high percentage of non-printable characters
    const nonPrintable = text.split('').filter(char => 
      char.charCodeAt(0) < 32 || char.charCodeAt(0) > 126
    ).length;
    
    return (nonPrintable / text.length) > 0.1; // If more than 10% are non-printable
  };

  const detectMimeType = (bytes: Uint8Array): string | null => {
    // Check common file signatures
    const signatures: Record<string, number[]> = {
      "image/jpeg": [0xFF, 0xD8, 0xFF],
      "image/png": [0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A],
      "image/gif": [0x47, 0x49, 0x46, 0x38],
      "image/webp": [0x52, 0x49, 0x46, 0x46, null, null, null, null, 0x57, 0x45, 0x42, 0x50],
      "application/pdf": [0x25, 0x50, 0x44, 0x46],
      "application/zip": [0x50, 0x4B, 0x03, 0x04],
    };
    
    for (const [mimeType, signature] of Object.entries(signatures)) {
      if (bytes.length >= signature.length) {
        let match = true;
        for (let i = 0; i < signature.length; i++) {
          if (signature[i] !== null && bytes[i] !== signature[i]) {
            match = false;
            break;
          }
        }
        if (match) return mimeType;
      }
    }
    
    return null;
  };

  const copyToClipboard = () => {
    if (!outputText) {
      toast({
        title: "Nothing to copy",
        description: "Generate some output first.",
        variant: "destructive",
      });
      return;
    }
    
    navigator.clipboard.writeText(outputText).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      toast({
        title: "Copied!",
        description: "Output copied to clipboard.",
      });
    }).catch(() => {
      toast({
        title: "Copy failed",
        description: "Failed to copy to clipboard.",
        variant: "destructive",
      });
    });
  };

  const downloadDecodedFile = () => {
    if (!outputText) return;
    
    try {
      let dataUrl: string;
      
      if (outputText.startsWith('data:')) {
        // Already a data URL
        dataUrl = outputText;
      } else {
        // Convert Base64 to data URL
        dataUrl = `data:${fileType || 'application/octet-stream'};base64,${outputText}`;
      }
      
      // Create a link and trigger download
      const link = document.createElement('a');
      link.href = dataUrl;
      link.download = `decoded-file${getFileExtension(fileType)}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      toast({
        title: "File downloaded",
        description: "Your decoded file has been downloaded.",
      });
    } catch (err) {
      setError("Failed to download the file. Try copying the Base64 instead.");
    }
  };

  const getFileExtension = (mimeType: string): string => {
    const extensions: Record<string, string> = {
      'image/jpeg': '.jpg',
      'image/png': '.png',
      'image/gif': '.gif',
      'image/webp': '.webp',
      'application/pdf': '.pdf',
      'text/plain': '.txt',
      'text/html': '.html',
      'text/css': '.css',
      'text/javascript': '.js',
    };
    
    return extensions[mimeType] || '';
  };

  // Filter recommended tools
  const recommendedTools = webTools.filter(tool => 
    tool.slug !== "base64-encoder-decoder" && 
    (tool.tags.includes("Utilities") || tool.tags.includes("DevOps"))
  ).slice(0, 4);

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Base64 Encoder/Decoder</h1>
          <p className="text-muted-foreground">
            Encode text or files to Base64 format, or decode Base64 strings back to their original form.
          </p>
        </div>

        <div className="bg-card border border-border rounded-lg p-4 md:p-6 shadow-sm">
          <Tabs
            defaultValue="encode"
            value={activeTab}
            onValueChange={(value) => setActiveTab(value as "encode" | "decode")}
            className="w-full"
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6">
              <TabsList className="grid w-full max-w-xs grid-cols-2">
                <TabsTrigger value="encode" className="flex items-center gap-2">
                  <Lock className="h-4 w-4" /> Encode
                </TabsTrigger>
                <TabsTrigger value="decode" className="flex items-center gap-2">
                  <Unlock className="h-4 w-4" /> Decode
                </TabsTrigger>
              </TabsList>
              
              <div className="flex items-center">
                <Label htmlFor="file-upload" className="flex items-center gap-2 cursor-pointer">
                  <div className="relative">
                    <Input
                      id="file-upload"
                      ref={fileInputRef}
                      type="file"
                      onChange={handleFileUpload}
                      className="absolute inset-0 opacity-0 w-0 h-0"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => fileInputRef.current?.click()}
                      className="flex items-center gap-2"
                    >
                      <Upload className="h-4 w-4" /> Upload File
                    </Button>
                  </div>
                </Label>
              </div>
            </div>

            <div className="space-y-6">
              {error && (
                <Alert variant="destructive" className="mb-4">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="input" className="text-sm font-medium">
                    {activeTab === "encode" ? "Text to Encode" : "Base64 to Decode"}
                  </Label>
                  <Textarea
                    id="input"
                    value={inputText}
                    onChange={handleTextAreaChange}
                    placeholder={
                      activeTab === "encode"
                        ? "Enter text to encode to Base64..."
                        : "Enter Base64 text to decode..."
                    }
                    className="min-h-[200px] md:min-h-[300px] font-mono resize-y"
                  />
                  {file && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <File className="h-4 w-4" />
                      <span>
                        {file.name} ({(file.size / 1024).toFixed(2)} KB)
                      </span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setFile(null);
                          resetFileInput();
                          setInputText("");
                        }}
                        className="h-6 p-0 text-muted-foreground hover:text-foreground"
                      >
                        Remove
                      </Button>
                    </div>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="output" className="text-sm font-medium">
                    {activeTab === "encode" ? "Base64 Result" : "Decoded Result"}
                  </Label>
                  <Textarea
                    id="output"
                    value={outputText}
                    readOnly
                    placeholder={
                      activeTab === "encode"
                        ? "Encoded Base64 will appear here..."
                        : "Decoded text will appear here..."
                    }
                    className="min-h-[200px] md:min-h-[300px] font-mono resize-y"
                  />
                  {isOutputFile && !error && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <FileType className="h-4 w-4" />
                      <span>
                        Detected file type: {fileType || "Unknown"}
                      </span>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="flex flex-wrap gap-3 justify-center mt-6">
                <Button
                  onClick={activeTab === "encode" ? encodeToBase64 : decodeFromBase64}
                  disabled={isLoading}
                  className="gap-2"
                >
                  {activeTab === "encode" ? (
                    <>
                      <Lock className="h-4 w-4" /> Encode to Base64
                    </>
                  ) : (
                    <>
                      <Unlock className="h-4 w-4" /> Decode from Base64
                    </>
                  )}
                </Button>
                
                <Button onClick={copyToClipboard} variant="outline" className="gap-2">
                  {copied ? (
                    <>
                      <Check className="h-4 w-4" /> Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4" /> Copy Output
                    </>
                  )}
                </Button>
                
                {isOutputFile && !error && (
                  <Button onClick={downloadDecodedFile} variant="outline" className="gap-2">
                    <Download className="h-4 w-4" /> Download File
                  </Button>
                )}
              </div>
            </div>
          </Tabs>
        </div>

        {/* How to Use Section */}
        <div className="mt-12 mb-12">
          <h2 className="text-2xl font-bold mb-4">How to Use</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <Lock className="h-5 w-5" /> Encoding
              </h3>
              <ol className="space-y-2 list-decimal list-inside text-muted-foreground">
                <li>Switch to the <strong>Encode</strong> tab.</li>
                <li>Enter text in the input field or upload a file using the "Upload File" button.</li>
                <li>Click "Encode to Base64" to convert your content.</li>
                <li>Use the "Copy Output" button to copy the encoded Base64 string.</li>
              </ol>
            </Card>
            
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <Unlock className="h-5 w-5" /> Decoding
              </h3>
              <ol className="space-y-2 list-decimal list-inside text-muted-foreground">
                <li>Switch to the <strong>Decode</strong> tab.</li>
                <li>Paste a Base64 string in the input field or upload a file containing Base64.</li>
                <li>Click "Decode from Base64" to convert back to the original format.</li>
                <li>For decoded files, use the "Download File" button to save the result.</li>
              </ol>
            </Card>
          </div>
          
          <div className="mt-6 p-4 bg-muted/30 rounded-lg border border-border">
            <h3 className="text-lg font-semibold mb-2">Tips</h3>
            <ul className="space-y-1 list-disc list-inside text-muted-foreground">
              <li>Base64 encoding increases the size by approximately 33%.</li>
              <li>For large files, the process might take a few seconds.</li>
              <li>Maximum file size is limited to 5MB to ensure browser performance.</li>
              <li>The tool automatically detects common file types when decoding.</li>
            </ul>
          </div>
        </div>

        {/* Recommended Tools Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Recommended Tools</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
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

export default Base64EncoderDecoder;

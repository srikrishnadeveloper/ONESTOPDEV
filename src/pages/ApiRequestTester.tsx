
import { useState, useEffect } from "react";
import MainLayout from "@/layouts/MainLayout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Globe, Send, Copy, Trash2, Plus, X, ChevronRight, ChevronDown, AlertCircle, Clock, FileJson, Code, Server } from "lucide-react";
import { cn } from "@/lib/utils";
import { webTools } from "@/data/webToolsData";
import { useNavigate } from "react-router-dom";
import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import json from "react-syntax-highlighter/dist/esm/languages/hljs/json";
import atomOneDark from "react-syntax-highlighter/dist/esm/styles/hljs/atom-one-dark";

// Register languages for syntax highlighting
SyntaxHighlighter.registerLanguage("json", json);

// Type for key-value pairs
type KeyValuePair = {
  id: string;
  key: string;
  value: string;
  enabled: boolean;
};

// HTTP methods
const HTTP_METHODS = ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS", "HEAD"];

// Helper function to generate unique IDs
const generateId = () => Math.random().toString(36).substring(2, 11);

// Helper function to check if a string is valid JSON
const isValidJson = (str: string): boolean => {
  if (!str.trim()) return true;
  try {
    JSON.parse(str);
    return true;
  } catch (e) {
    return false;
  }
};

const ApiRequestTester = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  
  // Request configuration state
  const [url, setUrl] = useState<string>("");
  const [method, setMethod] = useState<string>("GET");
  const [headers, setHeaders] = useState<KeyValuePair[]>([
    { id: generateId(), key: "Content-Type", value: "application/json", enabled: true }
  ]);
  const [params, setParams] = useState<KeyValuePair[]>([
    { id: generateId(), key: "", value: "", enabled: true }
  ]);
  const [body, setBody] = useState<string>("");
  const [isBodyValid, setIsBodyValid] = useState<boolean>(true);

  // Response state
  const [response, setResponse] = useState<any>(null);
  const [responseHeaders, setResponseHeaders] = useState<Record<string, string>>({});
  const [statusCode, setStatusCode] = useState<number | null>(null);
  const [responseTime, setResponseTime] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  
  // UI state
  const [activeTab, setActiveTab] = useState<string>("request");
  const [isBodyCollapsed, setIsBodyCollapsed] = useState<boolean>(false);
  const [isHeadersCollapsed, setIsHeadersCollapsed] = useState<boolean>(false);
  const [isParamsCollapsed, setIsParamsCollapsed] = useState<boolean>(false);

  // Body validation on change
  useEffect(() => {
    if (method === "GET" || method === "HEAD") {
      setIsBodyValid(true);
      return;
    }
    setIsBodyValid(isValidJson(body));
  }, [body, method]);

  // Add a new key-value pair (header or param)
  const addKeyValuePair = (type: "headers" | "params") => {
    const newItem = { id: generateId(), key: "", value: "", enabled: true };
    if (type === "headers") {
      setHeaders([...headers, newItem]);
    } else {
      setParams([...params, newItem]);
    }
  };

  // Remove a key-value pair (header or param)
  const removeKeyValuePair = (type: "headers" | "params", id: string) => {
    if (type === "headers") {
      setHeaders(headers.filter(h => h.id !== id));
    } else {
      setParams(params.filter(p => p.id !== id));
    }
  };

  // Update key-value pair (header or param)
  const updateKeyValuePair = (
    type: "headers" | "params",
    id: string,
    field: "key" | "value" | "enabled",
    value: string | boolean
  ) => {
    if (type === "headers") {
      setHeaders(
        headers.map(h => (h.id === id ? { ...h, [field]: value } : h))
      );
    } else {
      setParams(
        params.map(p => (p.id === id ? { ...p, [field]: value } : p))
      );
    }
  };

  // Reset the form
  const resetForm = () => {
    if (window.confirm("Are you sure you want to reset all fields?")) {
      setUrl("");
      setMethod("GET");
      setHeaders([
        { id: generateId(), key: "Content-Type", value: "application/json", enabled: true }
      ]);
      setParams([
        { id: generateId(), key: "", value: "", enabled: true }
      ]);
      setBody("");
      setResponse(null);
      setResponseHeaders({});
      setStatusCode(null);
      setResponseTime(null);
      setError(null);
    }
  };

  // Prepare query parameters for the URL
  const buildUrlWithParams = (baseUrl: string): string => {
    const enabledParams = params.filter(p => p.enabled && p.key.trim());
    if (enabledParams.length === 0) return baseUrl;

    const urlObj = new URL(baseUrl.startsWith("http") ? baseUrl : `http://${baseUrl}`);
    
    enabledParams.forEach(p => {
      urlObj.searchParams.append(p.key, p.value);
    });
    
    return urlObj.toString();
  };

  // Prepare headers for the request
  const buildHeaders = (): HeadersInit => {
    const headerObj: HeadersInit = {};
    headers
      .filter(h => h.enabled && h.key.trim())
      .forEach(h => {
        headerObj[h.key] = h.value;
      });
    return headerObj;
  };

  // Send the API request
  const sendRequest = async () => {
    // Input validation
    if (!url) {
      toast({
        title: "URL is required",
        description: "Please enter a URL to send the request",
        variant: "destructive"
      });
      return;
    }

    // JSON validation for request body
    if ((method === "POST" || method === "PUT" || method === "PATCH") && body.trim() && !isBodyValid) {
      toast({
        title: "Invalid JSON",
        description: "Please enter valid JSON in the request body",
        variant: "destructive"
      });
      return;
    }

    try {
      // Prepare the URL
      let requestUrl = url;
      if (!requestUrl.startsWith("http://") && !requestUrl.startsWith("https://")) {
        requestUrl = `https://${requestUrl}`;
      }

      // Build full URL with parameters
      const fullUrl = buildUrlWithParams(requestUrl);
      
      // Reset previous response
      setResponse(null);
      setResponseHeaders({});
      setStatusCode(null);
      setResponseTime(null);
      setError(null);
      
      // Show loading state
      setIsLoading(true);
      setActiveTab("response");
      
      // Record start time
      const startTime = performance.now();
      
      // Prepare request options
      const options: RequestInit = {
        method,
        headers: buildHeaders(),
      };
      
      // Add body to non-GET/HEAD requests
      if (method !== "GET" && method !== "HEAD" && body.trim()) {
        options.body = body;
      }

      // Send the request
      const response = await fetch(fullUrl, options);
      
      // Record end time
      const endTime = performance.now();
      setResponseTime(Math.round(endTime - startTime));
      
      // Process response headers
      const headers: Record<string, string> = {};
      response.headers.forEach((value, key) => {
        headers[key] = value;
      });
      
      setResponseHeaders(headers);
      setStatusCode(response.status);
      
      // Process the response body
      try {
        const responseText = await response.text();
        try {
          // Try to parse as JSON
          const jsonResponse = JSON.parse(responseText);
          setResponse(jsonResponse);
        } catch (e) {
          // If not JSON, treat as text
          setResponse(responseText);
        }
      } catch (e) {
        setResponse("No response body");
      }
    } catch (err: any) {
      setError(err.message || "An error occurred while sending the request");
      toast({
        title: "Request Failed",
        description: err.message || "Failed to send request",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Copy text to clipboard
  const copyToClipboard = (text: string, what: string) => {
    navigator.clipboard.writeText(text).then(() => {
      toast({
        title: "Copied!",
        description: `${what} copied to clipboard`,
      });
    }).catch(() => {
      toast({
        title: "Failed to copy",
        description: "Please try again or copy manually",
        variant: "destructive"
      });
    });
  };

  // Format JSON for display
  const formatJson = (json: any): string => {
    return typeof json === "object" ? JSON.stringify(json, null, 2) : json;
  };

  // Get status code label with color
  const getStatusCodeLabel = (code: number | null) => {
    if (code === null) return null;

    let color = "bg-gray-500";
    let textColor = "text-white";

    if (code >= 200 && code < 300) {
      color = "bg-green-500";
    } else if (code >= 300 && code < 400) {
      color = "bg-blue-500";
    } else if (code >= 400 && code < 500) {
      color = "bg-yellow-500";
    } else if (code >= 500) {
      color = "bg-red-500";
    }

    return (
      <Badge className={`${color} ${textColor} text-sm font-mono`}>
        {code}
      </Badge>
    );
  };

  // Filtered tools for recommendations
  const recommendedTools = webTools
    .filter(tool => 
      tool.tags.some(tag => ["JavaScript", "DevOps", "Utilities"].includes(tag)) &&
      tool.slug !== "api-request-tester"
    )
    .slice(0, 3);

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8 text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 primary-gradient bg-clip-text text-transparent tracking-tight">
              API Request Tester
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Test API endpoints with custom methods, headers, query parameters, and request bodies. 
              View formatted responses in real-time.
            </p>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Request Configuration */}
            <div className="space-y-6">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-xl flex items-center">
                    <Globe className="mr-2 h-5 w-5 text-primary" />
                    Request Configuration
                  </CardTitle>
                  <CardDescription>
                    Configure your API request details
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* URL and Method */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-start">
                    <div className="md:col-span-3">
                      <Label htmlFor="url">Request URL</Label>
                      <Input
                        id="url"
                        placeholder="https://api.example.com/data"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        className="font-mono text-sm"
                      />
                    </div>
                    <div>
                      <Label htmlFor="method">Method</Label>
                      <Select value={method} onValueChange={setMethod}>
                        <SelectTrigger id="method" className="font-mono">
                          <SelectValue placeholder="GET" />
                        </SelectTrigger>
                        <SelectContent>
                          {HTTP_METHODS.map((m) => (
                            <SelectItem key={m} value={m} className="font-mono">
                              {m}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Headers */}
                  <Collapsible 
                    open={!isHeadersCollapsed} 
                    onOpenChange={(open) => setIsHeadersCollapsed(!open)}
                    className="border rounded-md"
                  >
                    <CollapsibleTrigger className="flex items-center justify-between w-full p-3 hover:bg-accent/50 rounded-md">
                      <div className="flex items-center font-medium">
                        {isHeadersCollapsed ? <ChevronRight className="w-4 h-4 mr-2" /> : <ChevronDown className="w-4 h-4 mr-2" />}
                        Headers
                      </div>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={(e) => {
                          e.stopPropagation();
                          addKeyValuePair("headers");
                        }}
                      >
                        <Plus className="h-4 w-4 mr-1" /> Add
                      </Button>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="p-3 pt-0">
                      <div className="space-y-2">
                        {headers.map((header) => (
                          <div key={header.id} className="grid grid-cols-12 gap-2 items-center">
                            <div className="col-span-5">
                              <Input
                                placeholder="Header Name"
                                value={header.key}
                                onChange={(e) => updateKeyValuePair("headers", header.id, "key", e.target.value)}
                                className="font-mono text-sm h-9"
                              />
                            </div>
                            <div className="col-span-6">
                              <Input
                                placeholder="Value"
                                value={header.value}
                                onChange={(e) => updateKeyValuePair("headers", header.id, "value", e.target.value)}
                                className="font-mono text-sm h-9"
                              />
                            </div>
                            <div className="col-span-1 flex justify-end">
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => removeKeyValuePair("headers", header.id)}
                                className="h-9 w-9"
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CollapsibleContent>
                  </Collapsible>

                  {/* Query Parameters */}
                  <Collapsible 
                    open={!isParamsCollapsed} 
                    onOpenChange={(open) => setIsParamsCollapsed(!open)}
                    className="border rounded-md"
                  >
                    <CollapsibleTrigger className="flex items-center justify-between w-full p-3 hover:bg-accent/50 rounded-md">
                      <div className="flex items-center font-medium">
                        {isParamsCollapsed ? <ChevronRight className="w-4 h-4 mr-2" /> : <ChevronDown className="w-4 h-4 mr-2" />}
                        Query Parameters
                      </div>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={(e) => {
                          e.stopPropagation();
                          addKeyValuePair("params");
                        }}
                      >
                        <Plus className="h-4 w-4 mr-1" /> Add
                      </Button>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="p-3 pt-0">
                      <div className="space-y-2">
                        {params.map((param) => (
                          <div key={param.id} className="grid grid-cols-12 gap-2 items-center">
                            <div className="col-span-5">
                              <Input
                                placeholder="Parameter Name"
                                value={param.key}
                                onChange={(e) => updateKeyValuePair("params", param.id, "key", e.target.value)}
                                className="font-mono text-sm h-9"
                              />
                            </div>
                            <div className="col-span-6">
                              <Input
                                placeholder="Value"
                                value={param.value}
                                onChange={(e) => updateKeyValuePair("params", param.id, "value", e.target.value)}
                                className="font-mono text-sm h-9"
                              />
                            </div>
                            <div className="col-span-1 flex justify-end">
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => removeKeyValuePair("params", param.id)}
                                className="h-9 w-9"
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CollapsibleContent>
                  </Collapsible>

                  {/* Request Body */}
                  {method !== "GET" && method !== "HEAD" && (
                    <Collapsible 
                      open={!isBodyCollapsed} 
                      onOpenChange={(open) => setIsBodyCollapsed(!open)}
                      className="border rounded-md"
                    >
                      <CollapsibleTrigger className="flex items-center justify-between w-full p-3 hover:bg-accent/50 rounded-md">
                        <div className="flex items-center font-medium">
                          {isBodyCollapsed ? <ChevronRight className="w-4 h-4 mr-2" /> : <ChevronDown className="w-4 h-4 mr-2" />}
                          JSON Body
                        </div>
                        {!isBodyValid && (
                          <Badge variant="destructive" className="mr-2">
                            <AlertCircle className="h-3 w-3 mr-1" /> 
                            Invalid JSON
                          </Badge>
                        )}
                      </CollapsibleTrigger>
                      <CollapsibleContent className="p-3 pt-0">
                        <div>
                          <Textarea
                            placeholder='{ "key": "value" }'
                            value={body}
                            onChange={(e) => setBody(e.target.value)}
                            className={cn(
                              "font-mono text-sm min-h-[200px]",
                              !isBodyValid && "border-red-500"
                            )}
                          />
                          {!isBodyValid && (
                            <p className="text-red-500 text-xs mt-1">
                              Invalid JSON: Please check your syntax
                            </p>
                          )}
                        </div>
                      </CollapsibleContent>
                    </Collapsible>
                  )}
                </CardContent>
                <CardFooter className="flex justify-between pt-0">
                  <Button 
                    variant="outline" 
                    onClick={resetForm}
                  >
                    <Trash2 className="mr-2 h-4 w-4" /> Reset
                  </Button>
                  <Button 
                    onClick={sendRequest} 
                    disabled={isLoading || (body.trim() && !isBodyValid)}
                    className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
                  >
                    {isLoading ? (
                      <>
                        <Clock className="mr-2 h-4 w-4 animate-spin" /> Sending...
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" /> Send Request
                      </>
                    )}
                  </Button>
                </CardFooter>
              </Card>
            </div>

            {/* Response Display */}
            <div>
              <Card className="h-full">
                <CardHeader className="pb-3">
                  <CardTitle className="text-xl flex items-center">
                    <Server className="mr-2 h-5 w-5 text-primary" />
                    Response
                  </CardTitle>
                  <CardDescription>
                    View the API response details
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 h-[calc(100%-150px)] overflow-y-auto">
                  {isLoading ? (
                    <div className="flex items-center justify-center h-64">
                      <div className="text-center">
                        <Clock className="h-10 w-10 animate-spin mx-auto text-primary mb-4" />
                        <p className="text-muted-foreground">Sending request...</p>
                      </div>
                    </div>
                  ) : error ? (
                    <div className="border border-red-300 bg-red-50 dark:bg-red-950/20 p-4 rounded-md">
                      <div className="flex items-start">
                        <AlertCircle className="h-5 w-5 text-red-500 mr-2 mt-0.5" />
                        <div>
                          <h4 className="font-medium text-red-700 dark:text-red-300">Request failed</h4>
                          <p className="text-red-600 dark:text-red-400">{error}</p>
                        </div>
                      </div>
                    </div>
                  ) : statusCode ? (
                    <div className="space-y-4">
                      {/* Status and Response Time */}
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">Status</p>
                          <div className="flex items-center">
                            {getStatusCodeLabel(statusCode)}
                          </div>
                        </div>
                        {responseTime && (
                          <div className="text-right">
                            <p className="text-sm text-muted-foreground mb-1">Response Time</p>
                            <p className="font-mono">{responseTime} ms</p>
                          </div>
                        )}
                      </div>

                      {/* Response Headers */}
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <p className="font-medium">Response Headers</p>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyToClipboard(JSON.stringify(responseHeaders, null, 2), "Headers")}
                            className="h-7"
                          >
                            <Copy className="h-3.5 w-3.5 mr-1" /> Copy
                          </Button>
                        </div>
                        <div className="bg-muted p-3 rounded-md max-h-40 overflow-y-auto">
                          {Object.keys(responseHeaders).length > 0 ? (
                            <div className="space-y-1 font-mono text-xs">
                              {Object.entries(responseHeaders).map(([key, value]) => (
                                <div key={key} className="flex">
                                  <span className="font-semibold min-w-[150px] break-all">{key}:</span>
                                  <span className="ml-2 break-all">{value}</span>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <p className="text-muted-foreground text-sm">No headers returned</p>
                          )}
                        </div>
                      </div>

                      {/* Response Body */}
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <p className="font-medium">Response Body</p>
                          {response && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => copyToClipboard(
                                typeof response === "string" ? response : JSON.stringify(response, null, 2), 
                                "Response body"
                              )}
                              className="h-7"
                            >
                              <Copy className="h-3.5 w-3.5 mr-1" /> Copy
                            </Button>
                          )}
                        </div>
                        <div className="rounded-md border overflow-hidden max-h-96">
                          {response ? (
                            typeof response === "object" ? (
                              <SyntaxHighlighter
                                language="json"
                                style={atomOneDark}
                                customStyle={{ margin: 0, borderRadius: 0, maxHeight: "384px" }}
                              >
                                {formatJson(response)}
                              </SyntaxHighlighter>
                            ) : (
                              <div className="bg-muted p-3 font-mono text-xs overflow-auto max-h-96">
                                {response}
                              </div>
                            )
                          ) : (
                            <div className="bg-muted p-3 text-center text-muted-foreground">
                              No response body
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center h-64 flex-col">
                      <Server className="h-16 w-16 text-muted-foreground mb-4 opacity-20" />
                      <p className="text-lg font-medium text-muted-foreground mb-2">No response yet</p>
                      <p className="text-sm text-muted-foreground text-center max-w-md">
                        Configure your request parameters and click "Send Request" to see the response here
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
          
          {/* Tool Tips / Help Section */}
          <div className="mt-12">
            <Card>
              <CardHeader>
                <CardTitle>API Request Tips</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="flex flex-col">
                    <h3 className="text-lg font-medium mb-2 flex items-center">
                      <Code className="h-5 w-5 mr-2 text-primary" />
                      Headers
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Common headers to include: 
                      <span className="font-mono block mt-1">
                        Content-Type: application/json
                        <br />
                        Authorization: Bearer token
                        <br />
                        Accept: application/json
                      </span>
                    </p>
                  </div>
                  <div className="flex flex-col">
                    <h3 className="text-lg font-medium mb-2 flex items-center">
                      <FileJson className="h-5 w-5 mr-2 text-primary" />
                      Request Body
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      For POST/PUT requests, use JSON format:
                      <span className="font-mono block mt-1">
                        {`{
  "name": "value",
  "items": [1, 2, 3]
}`}
                      </span>
                    </p>
                  </div>
                  <div className="flex flex-col">
                    <h3 className="text-lg font-medium mb-2 flex items-center">
                      <Globe className="h-5 w-5 mr-2 text-primary" />
                      Test APIs
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Try these free APIs:
                      <span className="block mt-1">
                        <a href="#" onClick={(e) => {
                          e.preventDefault();
                          setUrl("https://jsonplaceholder.typicode.com/posts");
                          setMethod("GET");
                        }} className="text-primary hover:underline">JSONPlaceholder</a>
                        <br />
                        <a href="#" onClick={(e) => {
                          e.preventDefault();
                          setUrl("https://api.publicapis.org/entries");
                          setMethod("GET");
                        }} className="text-primary hover:underline">Public APIs Directory</a>
                      </span>
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recommended Tools */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6">Recommended Tools</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {recommendedTools.map((tool) => (
                <Card
                  key={tool.id}
                  className="hover:shadow-lg transition-all cursor-pointer"
                  onClick={() => navigate(`/tools/${tool.slug}`)}
                >
                  <CardHeader className="p-4">
                    <CardTitle className="text-lg flex items-center">
                      <div className="p-2 mr-3 bg-primary/10 text-primary rounded-md">
                        {(() => {
                          // Dynamic import for Lucide icons
                          const iconName = tool.icon as keyof typeof import("lucide-react");
                          const LucideIcon = require("lucide-react")[iconName];
                          return LucideIcon ? <LucideIcon size={18} /> : null;
                        })()}
                      </div>
                      {tool.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <p className="text-muted-foreground text-sm">{tool.description}</p>
                  </CardContent>
                  <CardFooter className="p-4 pt-0">
                    <div className="flex gap-2">
                      {tool.tags.slice(0, 2).map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default ApiRequestTester;

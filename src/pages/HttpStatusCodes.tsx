import React, { useState, useEffect } from "react";
import MainLayout from "@/layouts/MainLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Copy, Check, Search, Info, CheckCircle, ArrowRight, AlertTriangle, AlertCircle, ServerCrash, X, ArrowUp, Server, Globe } from "lucide-react";
import WebToolCard from "@/components/WebToolCard";
import * as LucideIcons from "lucide-react";
import { WebTool } from "@/data/webToolsData";

// Define the interface for HTTP status codes
interface HttpStatusCode {
  code: number;
  title: string;
  description: string;
  category: string;
}

// Define the HTTP status codes data
const httpStatusCodes: HttpStatusCode[] = [
// 1xx - Informational
{
  code: 100,
  title: "Continue",
  description: "The server has received the request headers and the client should proceed to send the request body.",
  category: "1xx"
}, {
  code: 101,
  title: "Switching Protocols",
  description: "The requester has asked the server to switch protocols and the server has agreed to do so.",
  category: "1xx"
}, {
  code: 102,
  title: "Processing",
  description: "The server has received and is processing the request, but no response is available yet.",
  category: "1xx"
}, {
  code: 103,
  title: "Early Hints",
  description: "Used to return some response headers before final HTTP message.",
  category: "1xx"
},
// 2xx - Success
{
  code: 200,
  title: "OK",
  description: "Standard response for successful HTTP requests. The actual response will depend on the request method used.",
  category: "2xx"
}, {
  code: 201,
  title: "Created",
  description: "The request has been fulfilled, resulting in the creation of a new resource.",
  category: "2xx"
}, {
  code: 202,
  title: "Accepted",
  description: "The request has been accepted for processing, but the processing has not been completed.",
  category: "2xx"
}, {
  code: 203,
  title: "Non-Authoritative Information",
  description: "The server is a transforming proxy that received a 200 OK from its origin, but is returning a modified version of the origin's response.",
  category: "2xx"
}, {
  code: 204,
  title: "No Content",
  description: "The server successfully processed the request, but is not returning any content.",
  category: "2xx"
}, {
  code: 205,
  title: "Reset Content",
  description: "The server successfully processed the request, but is not returning any content. Unlike a 204 response, this response requires that the requester reset the document view.",
  category: "2xx"
}, {
  code: 206,
  title: "Partial Content",
  description: "The server is delivering only part of the resource due to a range header sent by the client.",
  category: "2xx"
}, {
  code: 207,
  title: "Multi-Status",
  description: "The message body that follows is an XML message and can contain a number of separate response codes, depending on how many sub-requests were made.",
  category: "2xx"
}, {
  code: 208,
  title: "Already Reported",
  description: "The members of a DAV binding have already been enumerated in a previous reply to this request, and are not being included again.",
  category: "2xx"
}, {
  code: 226,
  title: "IM Used",
  description: "The server has fulfilled a GET request for the resource, and the response is a representation of the result of one or more instance-manipulations applied to the current instance.",
  category: "2xx"
},
// 3xx - Redirection
{
  code: 300,
  title: "Multiple Choices",
  description: "Indicates multiple options for the resource that the client may follow. It, for instance, could be used to present different format options for video, list files with different extensions, or word sense disambiguation.",
  category: "3xx"
}, {
  code: 301,
  title: "Moved Permanently",
  description: "This and all future requests should be directed to the given URI.",
  category: "3xx"
}, {
  code: 302,
  title: "Found",
  description: "Tells the client to look at (browse to) another URL. 302 has been superseded by 303 and 307. This is an example of industry practice contradicting the standard.",
  category: "3xx"
}, {
  code: 303,
  title: "See Other",
  description: "The response to the request can be found under another URI using a GET method.",
  category: "3xx"
}, {
  code: 304,
  title: "Not Modified",
  description: "Indicates that the resource has not been modified since the version specified by the request headers If-Modified-Since or If-None-Match.",
  category: "3xx"
}, {
  code: 305,
  title: "Use Proxy",
  description: "The requested resource is available only through a proxy, the address for which is provided in the response.",
  category: "3xx"
}, {
  code: 307,
  title: "Temporary Redirect",
  description: "In this case, the request should be repeated with another URI; however, future requests should still use the original URI.",
  category: "3xx"
}, {
  code: 308,
  title: "Permanent Redirect",
  description: "The request and all future requests should be repeated using another URI.",
  category: "3xx"
},
// 4xx - Client Errors
{
  code: 400,
  title: "Bad Request",
  description: "The server cannot or will not process the request due to an apparent client error.",
  category: "4xx"
}, {
  code: 401,
  title: "Unauthorized",
  description: "Similar to 403 Forbidden, but specifically for use when authentication is required and has failed or has not yet been provided.",
  category: "4xx"
}, {
  code: 402,
  title: "Payment Required",
  description: "Reserved for future use. The original intention was that this code might be used as part of some form of digital cash or micropayment scheme.",
  category: "4xx"
}, {
  code: 403,
  title: "Forbidden",
  description: "The request was valid, but the server is refusing action. The user might not have the necessary permissions for a resource, or may need an account of some sort.",
  category: "4xx"
}, {
  code: 404,
  title: "Not Found",
  description: "The requested resource could not be found but may be available in the future. Subsequent requests by the client are permissible.",
  category: "4xx"
}, {
  code: 405,
  title: "Method Not Allowed",
  description: "A request method is not supported for the requested resource; for example, a GET request on a form that requires data to be presented via POST, or a PUT request on a read-only resource.",
  category: "4xx"
}, {
  code: 406,
  title: "Not Acceptable",
  description: "The requested resource is capable of generating only content not acceptable according to the Accept headers sent in the request.",
  category: "4xx"
}, {
  code: 407,
  title: "Proxy Authentication Required",
  description: "The client must first authenticate itself with the proxy.",
  category: "4xx"
}, {
  code: 408,
  title: "Request Timeout",
  description: "The server timed out waiting for the request.",
  category: "4xx"
}, {
  code: 409,
  title: "Conflict",
  description: "Indicates that the request could not be processed because of conflict in the current state of the resource, such as an edit conflict between multiple simultaneous updates.",
  category: "4xx"
}, {
  code: 410,
  title: "Gone",
  description: "Indicates that the resource requested is no longer available and will not be available again.",
  category: "4xx"
}, {
  code: 411,
  title: "Length Required",
  description: "The request did not specify the length of its content, which is required by the requested resource.",
  category: "4xx"
}, {
  code: 412,
  title: "Precondition Failed",
  description: "The server does not meet one of the preconditions that the requester put on the request.",
  category: "4xx"
}, {
  code: 413,
  title: "Payload Too Large",
  description: "The request is larger than the server is willing or able to process.",
  category: "4xx"
}, {
  code: 414,
  title: "URI Too Long",
  description: "The URI provided was too long for the server to process.",
  category: "4xx"
}, {
  code: 415,
  title: "Unsupported Media Type",
  description: "The request entity has a media type which the server or resource does not support.",
  category: "4xx"
}, {
  code: 416,
  title: "Range Not Satisfiable",
  description: "The client has asked for a portion of the file, but the server cannot supply that portion.",
  category: "4xx"
}, {
  code: 417,
  title: "Expectation Failed",
  description: "The server cannot meet the requirements of the Expect request-header field.",
  category: "4xx"
}, {
  code: 418,
  title: "I'm a teapot",
  description: "The server refuses the attempt to brew coffee with a teapot.",
  category: "4xx"
}, {
  code: 421,
  title: "Misdirected Request",
  description: "The request was directed at a server that is not able to produce a response.",
  category: "4xx"
}, {
  code: 422,
  title: "Unprocessable Entity",
  description: "The request was well-formed but was unable to be followed due to semantic errors.",
  category: "4xx"
}, {
  code: 423,
  title: "Locked",
  description: "The resource that is being accessed is locked.",
  category: "4xx"
}, {
  code: 424,
  title: "Failed Dependency",
  description: "The request failed because it depended on another request and that request failed.",
  category: "4xx"
}, {
  code: 425,
  title: "Too Early",
  description: "Indicates that the server is unwilling to risk processing a request that might be replayed.",
  category: "4xx"
}, {
  code: 426,
  title: "Upgrade Required",
  description: "The client should switch to a different protocol such as TLS/1.0, given in the Upgrade header field.",
  category: "4xx"
}, {
  code: 428,
  title: "Precondition Required",
  description: "The origin server requires the request to be conditional.",
  category: "4xx"
}, {
  code: 429,
  title: "Too Many Requests",
  description: "The user has sent too many requests in a given amount of time.",
  category: "4xx"
}, {
  code: 431,
  title: "Request Header Fields Too Large",
  description: "The server is unwilling to process the request because either an individual header field, or all the header fields collectively, are too large.",
  category: "4xx"
}, {
  code: 451,
  title: "Unavailable For Legal Reasons",
  description: "A server operator has received a legal demand to deny access to a resource or to a set of resources that includes the requested resource.",
  category: "4xx"
},
// 5xx - Server Errors
{
  code: 500,
  title: "Internal Server Error",
  description: "A generic error message, given when an unexpected condition was encountered and no more specific message is suitable.",
  category: "5xx"
}, {
  code: 501,
  title: "Not Implemented",
  description: "The server either does not recognize the request method, or it lacks the ability to fulfil the request.",
  category: "5xx"
}, {
  code: 502,
  title: "Bad Gateway",
  description: "The server was acting as a gateway or proxy and received an invalid response from the upstream server.",
  category: "5xx"
}, {
  code: 503,
  title: "Service Unavailable",
  description: "The server is currently unavailable (because it is overloaded or down for maintenance). Generally, this is a temporary state.",
  category: "5xx"
}, {
  code: 504,
  title: "Gateway Timeout",
  description: "The server was acting as a gateway or proxy and did not receive a timely response from the upstream server.",
  category: "5xx"
}, {
  code: 505,
  title: "HTTP Version Not Supported",
  description: "The server does not support the HTTP protocol version used in the request.",
  category: "5xx"
}, {
  code: 506,
  title: "Variant Also Negotiates",
  description: "Transparent content negotiation for the request results in a circular reference.",
  category: "5xx"
}, {
  code: 507,
  title: "Insufficient Storage",
  description: "The server is unable to store the representation needed to complete the request.",
  category: "5xx"
}, {
  code: 508,
  title: "Loop Detected",
  description: "The server detected an infinite loop while processing the request.",
  category: "5xx"
}, {
  code: 510,
  title: "Not Extended",
  description: "Further extensions to the request are required for the server to fulfil it.",
  category: "5xx"
}, {
  code: 511,
  title: "Network Authentication Required",
  description: "The client needs to authenticate to gain network access.",
  category: "5xx"
}];

// Recommended tools for the bottom section
const recommendedTools: WebTool[] = [{
  id: "tool-11",
  name: "API Request Tester",
  description: "Test API endpoints with custom headers and authentication.",
  slug: "api-request-tester",
  tags: ["DevOps", "JavaScript", "Utilities"],
  icon: "Globe"
}, {
  id: "tool-3",
  name: "JSON Formatter & Validator",
  description: "Format, validate, and analyze JSON with syntax highlighting.",
  slug: "json-formatter",
  tags: ["JavaScript", "Formatters", "Utilities"],
  icon: "Code"
}, {
  id: "tool-8",
  name: "Regex Tester",
  description: "Test and debug regular expressions with real-time highlighting.",
  slug: "regex-tester",
  tags: ["JavaScript", "Utilities", "DevOps"],
  icon: "Search"
}, {
  id: "tool-5",
  name: "SVG Optimizer",
  description: "Clean and optimize SVG files to reduce file size.",
  slug: "svg-optimizer",
  tags: ["HTML", "Performance", "Utilities"],
  icon: "ImageIcon"
}];

// Category definitions with their icons and colors
const categories = [{
  id: "all",
  label: "All Codes",
  icon: <Globe size={16} />,
  color: "bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300",
  hoverColor: "hover:bg-gray-300 dark:hover:bg-gray-600"
}, {
  id: "1xx",
  label: "Informational",
  icon: <Info size={16} />,
  color: "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300",
  hoverColor: "hover:bg-blue-200 dark:hover:bg-blue-800",
  textColor: "text-blue-500"
}, {
  id: "2xx",
  label: "Success",
  icon: <CheckCircle size={16} />,
  color: "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300",
  hoverColor: "hover:bg-green-200 dark:hover:bg-green-800",
  textColor: "text-green-500"
}, {
  id: "3xx",
  label: "Redirection",
  icon: <ArrowRight size={16} />,
  color: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300",
  hoverColor: "hover:bg-yellow-200 dark:hover:bg-yellow-800",
  textColor: "text-yellow-500"
}, {
  id: "4xx",
  label: "Client Errors",
  icon: <AlertTriangle size={16} />,
  color: "bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300",
  hoverColor: "hover:bg-orange-200 dark:hover:bg-orange-800",
  textColor: "text-orange-500"
}, {
  id: "5xx",
  label: "Server Errors",
  icon: <ServerCrash size={16} />,
  color: "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300",
  hoverColor: "hover:bg-red-200 dark:hover:bg-red-800",
  textColor: "text-red-500"
}];
const HttpStatusCodes = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [copiedCode, setCopiedCode] = useState<number | null>(null);
  const [showScrollButton, setShowScrollButton] = useState<boolean>(false);

  // Filter status codes based on search query and selected category
  const filteredCodes = httpStatusCodes.filter(code => {
    const matchesSearch = code.code.toString().includes(searchQuery.toLowerCase()) || code.title.toLowerCase().includes(searchQuery.toLowerCase()) || code.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || code.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Handle copying status code to clipboard
  const handleCopy = (code: number) => {
    const statusCode = httpStatusCodes.find(c => c.code === code);
    if (statusCode) {
      navigator.clipboard.writeText(`${statusCode.code} ${statusCode.title}`);
      setCopiedCode(code);
      setTimeout(() => {
        setCopiedCode(null);
      }, 2000);
    }
  };

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  // Show scroll button when page is scrolled down
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollButton(true);
      } else {
        setShowScrollButton(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Get category color for a specific status code
  const getCategoryColorForCode = (category: string): string => {
    const foundCategory = categories.find(cat => cat.id === category);
    return foundCategory ? foundCategory.textColor : "text-gray-500";
  };
  return <MainLayout>
      <section className="relative py-12 md:py-16 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-primary/5 to-transparent"></div>
        
        <div className="container mx-auto px-4 mb-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <Badge className="mb-4 bg-primary/10 text-primary hover:bg-primary/20 border-none">
              Web Tool
            </Badge>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              HTTP Status Code Reference
            </h1>
            <p className="text-muted-foreground text-lg mb-8">
              Comprehensive guide to all HTTP status codes, their meaning, and usage
            </p>
          </div>

          {/* Search Input */}
          <div className="max-w-md mx-auto mb-8 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input type="search" placeholder="Search by status code or keyword..." className="pl-10" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
            {searchQuery && <Button variant="ghost" size="sm" className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 px-2" onClick={() => setSearchQuery("")}>
                <X className="h-4 w-4" />
              </Button>}
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {categories.map(category => <Badge key={category.id} variant="outline" className={`
                  cursor-pointer py-2 px-4 text-sm rounded-full transition-all flex items-center gap-1.5
                  ${selectedCategory === category.id ? category.color : "bg-background border-border"}
                  ${selectedCategory !== category.id ? category.hoverColor : ""}
                `} onClick={() => setSelectedCategory(category.id)}>
                {category.icon}
                {category.label}
              </Badge>)}
          </div>

          {/* Status Code Cards */}
          {filteredCodes.length > 0 ? <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCodes.map(code => <Card key={code.code} className="border-border bg-card hover:shadow-md transition-shadow duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <Badge className="">
                            {code.code}
                          </Badge>
                          <h3 className="text-xl font-semibold">{code.title}</h3>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {code.category === "1xx" && "Informational"}
                          {code.category === "2xx" && "Success"}
                          {code.category === "3xx" && "Redirection"}
                          {code.category === "4xx" && "Client Error"}
                          {code.category === "5xx" && "Server Error"}
                        </Badge>
                      </div>
                      <Button variant="outline" size="sm" className="h-8 ml-2" onClick={() => handleCopy(code.code)}>
                        {copiedCode === code.code ? <>
                            <Check className="h-3.5 w-3.5 mr-1" />
                            Copied
                          </> : <>
                            <Copy className="h-3.5 w-3.5 mr-1" />
                            Copy
                          </>}
                      </Button>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {code.description}
                    </p>
                  </CardContent>
                </Card>)}
            </div> : <div className="text-center py-12 bg-card rounded-lg border border-border">
              <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-50" />
              <h3 className="text-xl font-medium mb-2">No status codes found</h3>
              <p className="text-muted-foreground mb-6">
                Try adjusting your search criteria
              </p>
              <Button onClick={() => {
            setSearchQuery("");
            setSelectedCategory("all");
          }}>
                Clear Filters
              </Button>
            </div>}
        </div>

        {/* Recommended Tools Section */}
        <div className="container mx-auto px-4 mt-20">
          <div className="max-w-3xl mx-auto text-center mb-10">
            <h2 className="text-2xl font-bold mb-3">Recommended Tools</h2>
            <p className="text-muted-foreground">
              Check out these related tools to enhance your development workflow
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {recommendedTools.map(tool => <WebToolCard key={tool.id} name={tool.name} description={tool.description} tags={tool.tags} slug={tool.slug} icon={tool.icon as keyof typeof LucideIcons} />)}
          </div>
        </div>

        {/* Scroll to Top Button */}
        {showScrollButton && <Button variant="secondary" size="icon" className="fixed bottom-6 right-6 z-50 shadow-md rounded-full" onClick={scrollToTop}>
            <ArrowUp className="h-5 w-5" />
          </Button>}
      </section>
    </MainLayout>;
};
export default HttpStatusCodes;
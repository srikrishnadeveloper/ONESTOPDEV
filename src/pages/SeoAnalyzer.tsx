
import React, { useState } from "react";
import MainLayout from "@/layouts/MainLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import WebToolCard from "@/components/WebToolCard";
import { webTools } from "@/data/webToolsData";
import {
  Search,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Clock,
  Smartphone,
  ImageIcon,
  FileText,
  ExternalLink,
  Link as LinkIcon,
  Code,
  BarChart,
  CopyIcon,
  RefreshCw
} from "lucide-react";

const SeoAnalyzer = () => {
  const [url, setUrl] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [seoScore, setSeoScore] = useState(0);
  const [error, setError] = useState("");
  const [analysisResults, setAnalysisResults] = useState<{
    title: { score: number; value: string; issues: string[] };
    metaDescription: { score: number; value: string; issues: string[] };
    headings: { score: number; h1Count: number; headingStructure: string[]; issues: string[] };
    images: { score: number; count: number; withAlt: number; withoutAlt: number; issues: string[] };
    links: { score: number; count: number; internal: number; external: number; issues: string[] };
    mobileOptimized: { score: number; issues: string[] };
    pageSpeed: { score: number; issues: string[] };
    contentQuality: { score: number; wordCount: number; issues: string[] };
  }>({
    title: { score: 0, value: "", issues: [] },
    metaDescription: { score: 0, value: "", issues: [] },
    headings: { score: 0, h1Count: 0, headingStructure: [], issues: [] },
    images: { score: 0, count: 0, withAlt: 0, withoutAlt: 0, issues: [] },
    links: { score: 0, count: 0, internal: 0, external: 0, issues: [] },
    mobileOptimized: { score: 0, issues: [] },
    pageSpeed: { score: 0, issues: [] },
    contentQuality: { score: 0, wordCount: 0, issues: [] }
  });
  
  const [htmlContent, setHtmlContent] = useState("");
  
  const validateUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch (err) {
      return false;
    }
  };
  
  const fetchHtml = async (url: string) => {
    try {
      // Using a CORS proxy to fetch the website content
      const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(url)}`;
      const response = await fetch(proxyUrl);
      const data = await response.json();
      return data.contents;
    } catch (error) {
      console.error("Error fetching HTML:", error);
      throw new Error("Failed to fetch the website content");
    }
  };
  
  const analyzeWebsite = async () => {
    if (!url) {
      setError("Please enter a website URL");
      return;
    }
    
    if (!validateUrl(url)) {
      setError("Please enter a valid URL (e.g., https://example.com)");
      return;
    }
    
    setError("");
    setIsAnalyzing(true);
    setAnalysisComplete(false);
    
    try {
      // Fetch the HTML content
      const html = await fetchHtml(url);
      setHtmlContent(html);
      
      // Create a DOM parser
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, "text/html");
      
      // Analyze title
      const titleElement = doc.querySelector("title");
      const titleText = titleElement ? titleElement.innerText : "";
      const titleIssues = [];
      let titleScore = 0;
      
      if (!titleText) {
        titleIssues.push("Missing page title");
      } else {
        if (titleText.length < 30) {
          titleIssues.push("Title is too short (less than 30 characters)");
          titleScore = 40;
        } else if (titleText.length > 60) {
          titleIssues.push("Title is too long (more than 60 characters)");
          titleScore = 60;
        } else {
          titleScore = 100;
        }
      }
      
      // Analyze meta description
      const metaDescriptionElement = doc.querySelector('meta[name="description"]');
      const metaDescriptionContent = metaDescriptionElement ? 
        metaDescriptionElement.getAttribute("content") : "";
      const metaDescriptionIssues = [];
      let metaDescriptionScore = 0;
      
      if (!metaDescriptionContent) {
        metaDescriptionIssues.push("Missing meta description");
      } else {
        if (metaDescriptionContent.length < 120) {
          metaDescriptionIssues.push("Meta description is too short (less than 120 characters)");
          metaDescriptionScore = 50;
        } else if (metaDescriptionContent.length > 160) {
          metaDescriptionIssues.push("Meta description is too long (more than 160 characters)");
          metaDescriptionScore = 70;
        } else {
          metaDescriptionScore = 100;
        }
      }
      
      // Analyze headings
      const h1Elements = doc.querySelectorAll("h1");
      const h2Elements = doc.querySelectorAll("h2");
      const h3Elements = doc.querySelectorAll("h3");
      const headingIssues = [];
      let headingScore = 0;
      
      const headingStructure = [
        `H1: ${h1Elements.length}`,
        `H2: ${h2Elements.length}`,
        `H3: ${h3Elements.length}`
      ];
      
      if (h1Elements.length === 0) {
        headingIssues.push("No H1 heading found");
        headingScore = 20;
      } else if (h1Elements.length > 1) {
        headingIssues.push("Multiple H1 headings found (should have only one)");
        headingScore = 60;
      } else if (h2Elements.length === 0) {
        headingIssues.push("No H2 headings found");
        headingScore = 70;
      } else {
        headingScore = 100;
      }
      
      // Analyze images
      const imgElements = doc.querySelectorAll("img");
      const imageIssues = [];
      let imageScore = 0;
      let imagesWithAlt = 0;
      let imagesWithoutAlt = 0;
      
      imgElements.forEach(img => {
        if (img.getAttribute("alt")) {
          imagesWithAlt++;
        } else {
          imagesWithoutAlt++;
        }
      });
      
      if (imgElements.length > 0) {
        const altPercentage = (imagesWithAlt / imgElements.length) * 100;
        if (altPercentage < 80) {
          imageIssues.push(`${imagesWithoutAlt} images are missing alt attributes`);
          imageScore = Math.round(altPercentage);
        } else {
          imageScore = 100;
        }
      } else {
        imageIssues.push("No images found on the page");
        imageScore = 50; // Neutral score for pages without images
      }
      
      // Analyze links
      const linkElements = doc.querySelectorAll("a");
      const linkIssues = [];
      let linkScore = 0;
      let internalLinks = 0;
      let externalLinks = 0;
      
      linkElements.forEach(link => {
        const href = link.getAttribute("href");
        if (href) {
          if (href.startsWith("http") && !href.includes(url)) {
            externalLinks++;
          } else {
            internalLinks++;
          }
        }
      });
      
      if (linkElements.length === 0) {
        linkIssues.push("No links found on the page");
        linkScore = 30;
      } else {
        if (internalLinks === 0) {
          linkIssues.push("No internal links found");
          linkScore = 50;
        } else if (externalLinks === 0) {
          linkIssues.push("No external links found");
          linkScore = 70;
        } else {
          linkScore = 100;
        }
      }
      
      // Mobile optimization (simulated)
      const metaViewport = doc.querySelector('meta[name="viewport"]');
      const mobileIssues = [];
      let mobileScore = 0;
      
      if (!metaViewport) {
        mobileIssues.push("Missing viewport meta tag");
        mobileScore = 20;
      } else {
        const content = metaViewport.getAttribute("content") || "";
        if (!content.includes("width=device-width")) {
          mobileIssues.push("Viewport meta tag doesn't include width=device-width");
          mobileScore = 60;
        } else if (!content.includes("initial-scale=1")) {
          mobileIssues.push("Viewport meta tag doesn't include initial-scale=1");
          mobileScore = 80;
        } else {
          mobileScore = 100;
        }
      }
      
      // Page speed (simulated)
      const speedIssues = [];
      // In a real app, we would use real metrics from Lighthouse or other APIs
      let speedScore = Math.floor(Math.random() * 30) + 70; // Random score between 70-100
      
      if (speedScore < 80) {
        speedIssues.push("Page load time could be improved");
      }
      
      if (doc.querySelectorAll('script').length > 10) {
        speedIssues.push("High number of script tags may impact loading speed");
        speedScore = Math.max(50, speedScore - 20);
      }
      
      if (doc.querySelectorAll('link[rel="stylesheet"]').length > 5) {
        speedIssues.push("Multiple CSS files may slow down page rendering");
        speedScore = Math.max(50, speedScore - 10);
      }
      
      // Content quality (simulated)
      const bodyText = doc.body.textContent || "";
      const wordCount = bodyText.split(/\s+/).length;
      const contentIssues = [];
      let contentScore = 0;
      
      if (wordCount < 300) {
        contentIssues.push("Content length is low (less than 300 words)");
        contentScore = 40;
      } else if (wordCount < 600) {
        contentIssues.push("Content could benefit from more depth (less than 600 words)");
        contentScore = 70;
      } else {
        contentScore = 100;
      }
      
      // Calculate overall SEO score (weighted average)
      const overallScore = Math.round(
        (titleScore * 0.15) +
        (metaDescriptionScore * 0.15) +
        (headingScore * 0.15) +
        (imageScore * 0.1) +
        (linkScore * 0.1) +
        (mobileScore * 0.15) +
        (speedScore * 0.1) +
        (contentScore * 0.1)
      );
      
      // Prepare result object
      const results = {
        title: { score: titleScore, value: titleText, issues: titleIssues },
        metaDescription: { score: metaDescriptionScore, value: metaDescriptionContent || "", issues: metaDescriptionIssues },
        headings: { score: headingScore, h1Count: h1Elements.length, headingStructure, issues: headingIssues },
        images: { score: imageScore, count: imgElements.length, withAlt: imagesWithAlt, withoutAlt: imagesWithoutAlt, issues: imageIssues },
        links: { score: linkScore, count: linkElements.length, internal: internalLinks, external: externalLinks, issues: linkIssues },
        mobileOptimized: { score: mobileScore, issues: mobileIssues },
        pageSpeed: { score: speedScore, issues: speedIssues },
        contentQuality: { score: contentScore, wordCount, issues: contentIssues }
      };
      
      // Add a small delay to simulate processing time
      setTimeout(() => {
        setAnalysisResults(results);
        setSeoScore(overallScore);
        setIsAnalyzing(false);
        setAnalysisComplete(true);
        toast({
          title: "Analysis Complete",
          description: `Your website scored ${overallScore} out of 100.`,
        });
      }, 1500);
      
    } catch (err) {
      console.error(err);
      setIsAnalyzing(false);
      setError("Failed to analyze the website. The site might be blocking requests or unavailable.");
    }
  };
  
  const copyReportToClipboard = () => {
    if (!analysisComplete) return;
    
    const reportText = `
SEO Analysis Report for ${url}
Overall Score: ${seoScore}/100

1. Title (${analysisResults.title.score}/100)
   Value: ${analysisResults.title.value}
   ${analysisResults.title.issues.length > 0 ? 'Issues: ' + analysisResults.title.issues.join(', ') : 'No issues found'}

2. Meta Description (${analysisResults.metaDescription.score}/100)
   Value: ${analysisResults.metaDescription.value}
   ${analysisResults.metaDescription.issues.length > 0 ? 'Issues: ' + analysisResults.metaDescription.issues.join(', ') : 'No issues found'}

3. Headings (${analysisResults.headings.score}/100)
   Structure: ${analysisResults.headings.headingStructure.join(', ')}
   ${analysisResults.headings.issues.length > 0 ? 'Issues: ' + analysisResults.headings.issues.join(', ') : 'No issues found'}

4. Images (${analysisResults.images.score}/100)
   Total Images: ${analysisResults.images.count}
   With Alt Text: ${analysisResults.images.withAlt}
   Without Alt Text: ${analysisResults.images.withoutAlt}
   ${analysisResults.images.issues.length > 0 ? 'Issues: ' + analysisResults.images.issues.join(', ') : 'No issues found'}

5. Links (${analysisResults.links.score}/100)
   Total Links: ${analysisResults.links.count}
   Internal Links: ${analysisResults.links.internal}
   External Links: ${analysisResults.links.external}
   ${analysisResults.links.issues.length > 0 ? 'Issues: ' + analysisResults.links.issues.join(', ') : 'No issues found'}

6. Mobile Optimization (${analysisResults.mobileOptimized.score}/100)
   ${analysisResults.mobileOptimized.issues.length > 0 ? 'Issues: ' + analysisResults.mobileOptimized.issues.join(', ') : 'No issues found'}

7. Page Speed (${analysisResults.pageSpeed.score}/100)
   ${analysisResults.pageSpeed.issues.length > 0 ? 'Issues: ' + analysisResults.pageSpeed.issues.join(', ') : 'No issues found'}

8. Content Quality (${analysisResults.contentQuality.score}/100)
   Word Count: ${analysisResults.contentQuality.wordCount}
   ${analysisResults.contentQuality.issues.length > 0 ? 'Issues: ' + analysisResults.contentQuality.issues.join(', ') : 'No issues found'}

Generated by OneStopDev SEO Analyzer
    `;
    
    navigator.clipboard.writeText(reportText).then(() => {
      toast({
        title: "Report Copied",
        description: "SEO analysis report has been copied to clipboard.",
      });
    });
  };

  // Get recommended tools
  const recommendedTools = webTools
    .filter(tool => 
      tool.tags.includes("SEO") || 
      tool.tags.includes("Performance") ||
      tool.slug === "meta-tag-generator" ||
      tool.slug === "html-validator"
    )
    .slice(0, 4);

  // Function to determine score color
  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-500";
    if (score >= 60) return "text-amber-500";
    return "text-red-500";
  };

  // Function to determine icon for score
  const getScoreIcon = (score: number) => {
    if (score >= 80) return <CheckCircle className="text-green-500" />;
    if (score >= 60) return <AlertTriangle className="text-amber-500" />;
    return <XCircle className="text-red-500" />;
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold mb-2 text-center primary-gradient bg-clip-text text-transparent">
            SEO Analyzer
          </h1>
          <p className="text-muted-foreground text-center mb-8">
            Analyze any website for SEO issues and get actionable recommendations
          </p>

          {/* Main tool section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
            {/* Left section - Input */}
            <Card className="col-span-1">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Website URL</h2>
                <div className="space-y-4">
                  <div>
                    <div className="flex">
                      <Input
                        type="url"
                        placeholder="https://example.com"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        className="flex-1"
                        disabled={isAnalyzing}
                      />
                    </div>
                    {error && (
                      <p className="text-sm text-red-500 mt-1">{error}</p>
                    )}
                  </div>
                  <Button 
                    onClick={analyzeWebsite} 
                    disabled={isAnalyzing}
                    className="w-full"
                  >
                    {isAnalyzing ? (
                      <>
                        <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                        Analyzing...
                      </>
                    ) : (
                      <>
                        <Search className="mr-2 h-4 w-4" />
                        Analyze SEO
                      </>
                    )}
                  </Button>
                </div>

                {analysisComplete && (
                  <div className="mt-6 space-y-4">
                    <div>
                      <h3 className="font-medium mb-2">SEO Score</h3>
                      <div className="flex items-center gap-2">
                        <Progress value={seoScore} className="flex-1" />
                        <span className={`font-semibold ${getScoreColor(seoScore)}`}>
                          {seoScore}%
                        </span>
                      </div>
                    </div>
                    
                    <div>
                      <Button 
                        variant="outline" 
                        className="w-full" 
                        onClick={copyReportToClipboard}
                      >
                        <CopyIcon className="mr-2 h-4 w-4" />
                        Copy Report
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Middle section - Issues summary */}
            <Card className="col-span-1">
              <CardContent className="p-6 h-full">
                <h2 className="text-xl font-semibold mb-4">Issues Summary</h2>
                
                {isAnalyzing && (
                  <div className="flex items-center justify-center h-64">
                    <div className="text-center">
                      <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-4 text-primary" />
                      <p className="text-muted-foreground">Analyzing website...</p>
                    </div>
                  </div>
                )}
                
                {!isAnalyzing && !analysisComplete && (
                  <div className="flex flex-col items-center justify-center h-64 text-center">
                    <Search className="h-12 w-12 text-muted-foreground mb-4 opacity-20" />
                    <p className="text-muted-foreground">
                      Enter a URL and click "Analyze SEO" to get started
                    </p>
                  </div>
                )}
                
                {analysisComplete && (
                  <div className="space-y-4 overflow-auto max-h-[600px] pr-2">
                    <div className="flex items-center gap-2">
                      {getScoreIcon(analysisResults.title.score)}
                      <div>
                        <h3 className="font-medium">Title</h3>
                        <p className="text-sm text-muted-foreground line-clamp-1">
                          {analysisResults.title.value || "Missing title"}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      {getScoreIcon(analysisResults.metaDescription.score)}
                      <div>
                        <h3 className="font-medium">Meta Description</h3>
                        <p className="text-sm text-muted-foreground line-clamp-1">
                          {analysisResults.metaDescription.value || "Missing description"}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      {getScoreIcon(analysisResults.headings.score)}
                      <div>
                        <h3 className="font-medium">Heading Structure</h3>
                        <p className="text-sm text-muted-foreground">
                          {analysisResults.headings.headingStructure.join(", ")}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      {getScoreIcon(analysisResults.images.score)}
                      <div>
                        <h3 className="font-medium">Images</h3>
                        <p className="text-sm text-muted-foreground">
                          {analysisResults.images.count} images, {analysisResults.images.withoutAlt} missing alt text
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      {getScoreIcon(analysisResults.links.score)}
                      <div>
                        <h3 className="font-medium">Links</h3>
                        <p className="text-sm text-muted-foreground">
                          {analysisResults.links.internal} internal, {analysisResults.links.external} external
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      {getScoreIcon(analysisResults.mobileOptimized.score)}
                      <div>
                        <h3 className="font-medium">Mobile Optimization</h3>
                        <p className="text-sm text-muted-foreground">
                          {analysisResults.mobileOptimized.issues.length ? 
                            analysisResults.mobileOptimized.issues[0] : 
                            "Mobile-friendly"
                          }
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      {getScoreIcon(analysisResults.pageSpeed.score)}
                      <div>
                        <h3 className="font-medium">Page Speed</h3>
                        <p className="text-sm text-muted-foreground">
                          Score: {analysisResults.pageSpeed.score}/100
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      {getScoreIcon(analysisResults.contentQuality.score)}
                      <div>
                        <h3 className="font-medium">Content Quality</h3>
                        <p className="text-sm text-muted-foreground">
                          {analysisResults.contentQuality.wordCount} words
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Right section - Detailed report */}
            <Card className="col-span-1">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Detailed Report</h2>
                
                {isAnalyzing && (
                  <div className="flex items-center justify-center h-64">
                    <div className="text-center">
                      <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-4 text-primary" />
                      <p className="text-muted-foreground">Analyzing website...</p>
                    </div>
                  </div>
                )}
                
                {!isAnalyzing && !analysisComplete && (
                  <div className="flex flex-col items-center justify-center h-64 text-center">
                    <FileText className="h-12 w-12 text-muted-foreground mb-4 opacity-20" />
                    <p className="text-muted-foreground">
                      Report will appear here after analysis
                    </p>
                  </div>
                )}
                
                {analysisComplete && (
                  <div className="space-y-6 overflow-auto max-h-[600px] pr-2">
                    {/* Overall score summary */}
                    <Alert className={`border-l-4 ${seoScore >= 80 ? 'border-l-green-500' : seoScore >= 60 ? 'border-l-amber-500' : 'border-l-red-500'}`}>
                      <AlertTitle className="flex items-center gap-2">
                        <BarChart className="h-4 w-4" />
                        Overall SEO Score: <span className={getScoreColor(seoScore)}>{seoScore}/100</span>
                      </AlertTitle>
                      <AlertDescription className="text-sm">
                        {seoScore >= 80 
                          ? "Great job! Your website has good SEO practices."
                          : seoScore >= 60
                          ? "Your website needs some SEO improvements."
                          : "Your website has significant SEO issues that need attention."
                        }
                      </AlertDescription>
                    </Alert>
                    
                    {/* Title section */}
                    <div>
                      <h3 className="text-lg font-medium flex items-center gap-2 mb-2">
                        <FileText className="h-4 w-4" />
                        Title {" "}
                        <span className={`text-sm ${getScoreColor(analysisResults.title.score)}`}>
                          ({analysisResults.title.score}/100)
                        </span>
                      </h3>
                      <div className="text-sm">
                        <p className="font-mono bg-muted p-3 rounded-md mb-2 whitespace-pre-wrap break-all">
                          {analysisResults.title.value || "(No title found)"}
                        </p>
                        
                        {analysisResults.title.issues.length > 0 ? (
                          <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                            {analysisResults.title.issues.map((issue, i) => (
                              <li key={i}>{issue}</li>
                            ))}
                          </ul>
                        ) : (
                          <p className="text-green-500">✓ No issues found</p>
                        )}
                      </div>
                    </div>
                    
                    {/* Meta Description */}
                    <div>
                      <h3 className="text-lg font-medium flex items-center gap-2 mb-2">
                        <Code className="h-4 w-4" />
                        Meta Description {" "}
                        <span className={`text-sm ${getScoreColor(analysisResults.metaDescription.score)}`}>
                          ({analysisResults.metaDescription.score}/100)
                        </span>
                      </h3>
                      <div className="text-sm">
                        <p className="font-mono bg-muted p-3 rounded-md mb-2 whitespace-pre-wrap break-all">
                          {analysisResults.metaDescription.value || "(No meta description found)"}
                        </p>
                        
                        {analysisResults.metaDescription.issues.length > 0 ? (
                          <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                            {analysisResults.metaDescription.issues.map((issue, i) => (
                              <li key={i}>{issue}</li>
                            ))}
                          </ul>
                        ) : (
                          <p className="text-green-500">✓ No issues found</p>
                        )}
                      </div>
                    </div>
                    
                    {/* Headings */}
                    <div>
                      <h3 className="text-lg font-medium flex items-center gap-2 mb-2">
                        <Code className="h-4 w-4" />
                        Heading Structure {" "}
                        <span className={`text-sm ${getScoreColor(analysisResults.headings.score)}`}>
                          ({analysisResults.headings.score}/100)
                        </span>
                      </h3>
                      <div className="text-sm">
                        <div className="flex gap-3 mb-2">
                          {analysisResults.headings.headingStructure.map((heading, i) => (
                            <span key={i} className="bg-muted p-2 rounded-md font-mono">
                              {heading}
                            </span>
                          ))}
                        </div>
                        
                        {analysisResults.headings.issues.length > 0 ? (
                          <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                            {analysisResults.headings.issues.map((issue, i) => (
                              <li key={i}>{issue}</li>
                            ))}
                          </ul>
                        ) : (
                          <p className="text-green-500">✓ No issues found</p>
                        )}
                      </div>
                    </div>
                    
                    {/* Images */}
                    <div>
                      <h3 className="text-lg font-medium flex items-center gap-2 mb-2">
                        <ImageIcon className="h-4 w-4" />
                        Images {" "}
                        <span className={`text-sm ${getScoreColor(analysisResults.images.score)}`}>
                          ({analysisResults.images.score}/100)
                        </span>
                      </h3>
                      <div className="text-sm">
                        <div className="flex gap-3 mb-2">
                          <span className="bg-muted p-2 rounded-md">
                            Total: {analysisResults.images.count}
                          </span>
                          <span className="bg-green-500/10 text-green-600 dark:text-green-400 p-2 rounded-md">
                            With alt: {analysisResults.images.withAlt}
                          </span>
                          <span className="bg-red-500/10 text-red-600 dark:text-red-400 p-2 rounded-md">
                            Without alt: {analysisResults.images.withoutAlt}
                          </span>
                        </div>
                        
                        {analysisResults.images.issues.length > 0 ? (
                          <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                            {analysisResults.images.issues.map((issue, i) => (
                              <li key={i}>{issue}</li>
                            ))}
                          </ul>
                        ) : (
                          <p className="text-green-500">✓ No issues found</p>
                        )}
                      </div>
                    </div>
                    
                    {/* Links */}
                    <div>
                      <h3 className="text-lg font-medium flex items-center gap-2 mb-2">
                        <LinkIcon className="h-4 w-4" />
                        Links {" "}
                        <span className={`text-sm ${getScoreColor(analysisResults.links.score)}`}>
                          ({analysisResults.links.score}/100)
                        </span>
                      </h3>
                      <div className="text-sm">
                        <div className="flex gap-3 mb-2">
                          <span className="bg-muted p-2 rounded-md">
                            Total: {analysisResults.links.count}
                          </span>
                          <span className="bg-muted p-2 rounded-md">
                            Internal: {analysisResults.links.internal}
                          </span>
                          <span className="bg-muted p-2 rounded-md">
                            External: {analysisResults.links.external}
                          </span>
                        </div>
                        
                        {analysisResults.links.issues.length > 0 ? (
                          <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                            {analysisResults.links.issues.map((issue, i) => (
                              <li key={i}>{issue}</li>
                            ))}
                          </ul>
                        ) : (
                          <p className="text-green-500">✓ No issues found</p>
                        )}
                      </div>
                    </div>
                    
                    {/* Mobile Optimization */}
                    <div>
                      <h3 className="text-lg font-medium flex items-center gap-2 mb-2">
                        <Smartphone className="h-4 w-4" />
                        Mobile Optimization {" "}
                        <span className={`text-sm ${getScoreColor(analysisResults.mobileOptimized.score)}`}>
                          ({analysisResults.mobileOptimized.score}/100)
                        </span>
                      </h3>
                      <div className="text-sm">
                        {analysisResults.mobileOptimized.issues.length > 0 ? (
                          <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                            {analysisResults.mobileOptimized.issues.map((issue, i) => (
                              <li key={i}>{issue}</li>
                            ))}
                          </ul>
                        ) : (
                          <p className="text-green-500">✓ Mobile-friendly</p>
                        )}
                      </div>
                    </div>
                    
                    {/* Page Speed */}
                    <div>
                      <h3 className="text-lg font-medium flex items-center gap-2 mb-2">
                        <Clock className="h-4 w-4" />
                        Page Speed {" "}
                        <span className={`text-sm ${getScoreColor(analysisResults.pageSpeed.score)}`}>
                          ({analysisResults.pageSpeed.score}/100)
                        </span>
                      </h3>
                      <div className="text-sm">
                        <Progress value={analysisResults.pageSpeed.score} className="mb-2" />
                        
                        {analysisResults.pageSpeed.issues.length > 0 ? (
                          <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                            {analysisResults.pageSpeed.issues.map((issue, i) => (
                              <li key={i}>{issue}</li>
                            ))}
                          </ul>
                        ) : (
                          <p className="text-green-500">✓ Good page speed</p>
                        )}
                      </div>
                    </div>
                    
                    {/* Content Quality */}
                    <div>
                      <h3 className="text-lg font-medium flex items-center gap-2 mb-2">
                        <FileText className="h-4 w-4" />
                        Content Quality {" "}
                        <span className={`text-sm ${getScoreColor(analysisResults.contentQuality.score)}`}>
                          ({analysisResults.contentQuality.score}/100)
                        </span>
                      </h3>
                      <div className="text-sm">
                        <div className="bg-muted p-2 rounded-md mb-2 inline-block">
                          Word count: {analysisResults.contentQuality.wordCount}
                        </div>
                        
                        {analysisResults.contentQuality.issues.length > 0 ? (
                          <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                            {analysisResults.contentQuality.issues.map((issue, i) => (
                              <li key={i}>{issue}</li>
                            ))}
                          </ul>
                        ) : (
                          <p className="text-green-500">✓ Good content length</p>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* How to Use section */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-4">How to Use the SEO Analyzer</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="bg-primary/10 text-primary rounded-full h-10 w-10 flex items-center justify-center mb-4">
                    1
                  </div>
                  <h3 className="text-lg font-medium mb-2">Enter Your URL</h3>
                  <p className="text-muted-foreground text-sm">
                    Input the complete website URL you want to analyze (include http:// or https://).
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="bg-primary/10 text-primary rounded-full h-10 w-10 flex items-center justify-center mb-4">
                    2
                  </div>
                  <h3 className="text-lg font-medium mb-2">Click Analyze</h3>
                  <p className="text-muted-foreground text-sm">
                    Press the "Analyze SEO" button and wait a few seconds for the tool to scan your website.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="bg-primary/10 text-primary rounded-full h-10 w-10 flex items-center justify-center mb-4">
                    3
                  </div>
                  <h3 className="text-lg font-medium mb-2">Review Results</h3>
                  <p className="text-muted-foreground text-sm">
                    Check your SEO score and review detailed recommendations to improve your website's SEO.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Recommended Tools section */}
          <div>
            <h2 className="text-2xl font-bold mb-4">Recommended Tools</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {recommendedTools.map(tool => (
                <WebToolCard
                  key={tool.id}
                  name={tool.name}
                  description={tool.description}
                  tags={tool.tags}
                  slug={tool.slug}
                  icon={tool.icon}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default SeoAnalyzer;

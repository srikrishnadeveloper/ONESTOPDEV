
import { useState, useEffect } from "react";
import { Copy, Check, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AIChatButton from "@/components/AIChatButton";
import { useToast } from "@/hooks/use-toast";

const RegexTester = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [pattern, setPattern] = useState("");
  const [flags, setFlags] = useState("g");
  const [testString, setTestString] = useState("Test this regex pattern to see if it works!");
  const [matches, setMatches] = useState<string[]>([]);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const [examples, setExamples] = useState<Array<{ name: string; pattern: string; flags: string; description: string }>>(
    [
      { 
        name: "Email", 
        pattern: "[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}",
        flags: "g",
        description: "Matches email addresses" 
      },
      { 
        name: "URL", 
        pattern: "https?:\\/\\/(?:www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\\.[a-zA-Z0-9()]{1,6}\\b(?:[-a-zA-Z0-9()@:%_\\+.~#?&\\/=]*)",
        flags: "g",
        description: "Matches URLs" 
      },
      { 
        name: "Phone Number", 
        pattern: "\\+?\\d{1,4}?[-.\\s]?\\(?\\d{1,3}?\\)?[-.\\s]?\\d{1,4}[-.\\s]?\\d{1,4}[-.\\s]?\\d{1,9}",
        flags: "g",
        description: "Matches phone numbers in various formats" 
      },
      { 
        name: "Date (YYYY-MM-DD)", 
        pattern: "\\d{4}-\\d{2}-\\d{2}",
        flags: "g",
        description: "Matches dates in YYYY-MM-DD format" 
      },
    ]
  );
  const { toast } = useToast();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const testRegex = () => {
    setError("");
    setMatches([]);

    if (!pattern) {
      return;
    }

    try {
      const regex = new RegExp(pattern, flags);
      const results = testString.match(regex);
      
      if (results) {
        setMatches(results);
      } else {
        setMatches([]);
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Invalid regular expression");
      }
    }
  };

  const copyRegexToClipboard = () => {
    navigator.clipboard.writeText(`/${pattern}/${flags}`);
    setCopied(true);
    
    toast({
      title: "Copied!",
      description: "Regular expression copied to clipboard",
    });
    
    setTimeout(() => setCopied(false), 2000);
  };

  const loadExample = (example: typeof examples[0]) => {
    setPattern(example.pattern);
    setFlags(example.flags);
  };

  // Test regex when pattern, flags, or testString changes
  useEffect(() => {
    if (pattern) {
      testRegex();
    }
  }, [pattern, flags, testString]);

  const highlightMatches = () => {
    if (!pattern || error || !matches.length) {
      return testString;
    }

    let highlightedText = testString;
    try {
      // This is a simple implementation. For a more robust solution, consider libraries like highlight.js
      const regex = new RegExp(pattern, flags);
      highlightedText = testString.replace(
        regex,
        (match) => `<mark class="bg-green-300 dark:bg-green-700">${match}</mark>`
      );
    } catch (err) {
      // If there's an issue with the regex, just return the original string
      return testString;
    }

    return highlightedText;
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      
      <main className="flex-1 py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Regex Tester</h1>
        <p className="text-muted-foreground mb-8">
          Test and debug regular expressions with live feedback and explanations.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {/* Regex Input */}
            <div className="glass-card p-6 rounded-xl">
              <div className="flex flex-col sm:flex-row gap-4 items-start mb-4">
                <div className="flex-1 w-full">
                  <label htmlFor="pattern" className="block text-sm font-medium mb-1">
                    Regular Expression Pattern
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-2 text-muted-foreground">/</span>
                    <input
                      id="pattern"
                      type="text"
                      value={pattern}
                      onChange={(e) => setPattern(e.target.value)}
                      placeholder="Enter regex pattern"
                      className="pl-6 pr-6 py-2 w-full rounded-md border focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary"
                    />
                    <span className="absolute right-12 top-2 text-muted-foreground">/</span>
                    <input
                      type="text"
                      value={flags}
                      onChange={(e) => setFlags(e.target.value)}
                      className="absolute right-0 top-0 w-10 h-full rounded-r-md border-l border-y focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary text-center"
                      maxLength={5}
                    />
                  </div>
                </div>
                <div className="flex gap-2 sm:self-end">
                  <Button onClick={testRegex}>Test</Button>
                  <Button
                    variant="outline"
                    onClick={copyRegexToClipboard}
                    className="flex items-center gap-1"
                  >
                    {copied ? <Check size={16} /> : <Copy size={16} />}
                  </Button>
                </div>
              </div>

              {error && <div className="p-3 bg-red-100 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-md text-sm text-red-700 dark:text-red-400 mb-4">{error}</div>}
            </div>

            {/* Test String */}
            <div className="glass-card p-6 rounded-xl">
              <label htmlFor="testString" className="block text-sm font-medium mb-1">
                Test String
              </label>
              <textarea
                id="testString"
                value={testString}
                onChange={(e) => setTestString(e.target.value)}
                className="w-full h-32 p-3 rounded-md border focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary"
                placeholder="Enter text to test against your regex pattern"
              />
            </div>

            {/* Results */}
            <div className="glass-card p-6 rounded-xl">
              <h3 className="font-medium mb-4">Matches</h3>
              <div className="p-4 bg-muted/50 border rounded-md overflow-auto">
                <div
                  dangerouslySetInnerHTML={{ __html: highlightMatches() }}
                  className="whitespace-pre-wrap mb-4"
                />

                {pattern && !error && (
                  <>
                    <h4 className="font-medium mt-6 mb-2">Match Results:</h4>
                    {matches.length > 0 ? (
                      <ul className="space-y-1 list-disc list-inside">
                        {matches.map((match, idx) => (
                          <li key={idx} className="text-sm">
                            {match}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-sm text-muted-foreground">No matches found</p>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar with Examples and Explanation */}
          <div className="space-y-6">
            {/* Examples */}
            <div className="glass-card p-6 rounded-xl">
              <h3 className="font-medium mb-4">Examples</h3>
              <div className="space-y-3">
                {examples.map((example) => (
                  <div 
                    key={example.name}
                    className="p-3 border rounded-md hover:bg-muted/50 cursor-pointer transition-colors"
                    onClick={() => loadExample(example)}
                  >
                    <div className="flex justify-between items-center mb-1">
                      <h4 className="font-medium">{example.name}</h4>
                      <Button variant="ghost" size="sm" onClick={(e) => {
                        e.stopPropagation();
                        loadExample(example);
                      }}>
                        <RefreshCw size={14} />
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground">{example.description}</p>
                    <code className="text-xs block mt-2 font-mono">{`/${example.pattern}/${example.flags}`}</code>
                  </div>
                ))}
              </div>
            </div>

            {/* Common Regex Patterns */}
            <div className="glass-card p-6 rounded-xl">
              <h3 className="font-medium mb-4">Common Patterns</h3>
              <ul className="space-y-3 text-sm">
                <li>
                  <code className="text-xs font-mono bg-muted px-1 py-0.5 rounded">\d</code>
                  <span className="ml-2">Any digit (0-9)</span>
                </li>
                <li>
                  <code className="text-xs font-mono bg-muted px-1 py-0.5 rounded">\w</code>
                  <span className="ml-2">Any word character (a-z, A-Z, 0-9, _)</span>
                </li>
                <li>
                  <code className="text-xs font-mono bg-muted px-1 py-0.5 rounded">\s</code>
                  <span className="ml-2">Any whitespace character</span>
                </li>
                <li>
                  <code className="text-xs font-mono bg-muted px-1 py-0.5 rounded">[abc]</code>
                  <span className="ml-2">Any character in the set</span>
                </li>
                <li>
                  <code className="text-xs font-mono bg-muted px-1 py-0.5 rounded">[^abc]</code>
                  <span className="ml-2">Any character not in the set</span>
                </li>
                <li>
                  <code className="text-xs font-mono bg-muted px-1 py-0.5 rounded">{`a{1,3}`}</code>
                  <span className="ml-2">1 to 3 occurrences of 'a'</span>
                </li>
                <li>
                  <code className="text-xs font-mono bg-muted px-1 py-0.5 rounded">a+</code>
                  <span className="ml-2">1 or more occurrences of 'a'</span>
                </li>
                <li>
                  <code className="text-xs font-mono bg-muted px-1 py-0.5 rounded">a*</code>
                  <span className="ml-2">0 or more occurrences of 'a'</span>
                </li>
                <li>
                  <code className="text-xs font-mono bg-muted px-1 py-0.5 rounded">a?</code>
                  <span className="ml-2">0 or 1 occurrence of 'a'</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <AIChatButton />
    </div>
  );
};

export default RegexTester;

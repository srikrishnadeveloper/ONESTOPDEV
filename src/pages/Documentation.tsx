
import MainLayout from "@/layouts/MainLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageCircleQuestion, ExternalLink, BookOpen, Bot, Palette, Wrench, Gift, Key, HelpCircle, LucideProps, Lightbulb } from "lucide-react";
import { Link } from "react-router-dom";

const Documentation = () => {
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-10">
        {/* Header Section */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Documentation</h1>
          <p className="text-muted-foreground text-lg mb-6">
            Everything you need to know about using OneStopDev's features and tools
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Button asChild>
              <a href="#getting-started">
                <BookOpen className="mr-2 h-4 w-4" />
                Getting Started
              </a>
            </Button>
            <Button variant="outline" asChild>
              <a href="#faqs">
                <HelpCircle className="mr-2 h-4 w-4" />
                FAQs
              </a>
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto space-y-16">
          {/* Welcome Section */}
          <section id="getting-started" className="scroll-mt-20">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-1">
                <div className="sticky top-24">
                  <h2 className="text-2xl font-semibold mb-4">Welcome to OneStopDev</h2>
                  <p className="text-muted-foreground">
                    Your all-in-one developer resource hub
                  </p>
                </div>
              </div>
              <div className="md:col-span-2 space-y-6">
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="text-xl font-medium mb-4">Getting Started</h3>
                    <p className="text-muted-foreground mb-4">
                      OneStopDev is designed to be your central hub for developer tools, AI assistance, API management, and exclusive developer perks. This documentation will help you navigate all the features and get the most out of the platform.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                      <FeatureCard
                        icon={Bot}
                        title="AI Assistant"
                        description="Get code help, explanations and more"
                        link="#ai-assistant"
                      />
                      <FeatureCard
                        icon={Wrench}
                        title="Developer Tools"
                        description="Boost your productivity with our tools"
                        link="#web-tools"
                      />
                      <FeatureCard
                        icon={Gift}
                        title="Dev Perks"
                        description="Exclusive deals for developers"
                        link="#dev-perks"
                      />
                      <FeatureCard
                        icon={Key}
                        title="API Management"
                        description="Organize your API keys in one place"
                        link="#api-keys"
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          {/* AI Assistant Section */}
          <section id="ai-assistant" className="scroll-mt-20">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-1">
                <div className="sticky top-24">
                  <h2 className="text-2xl font-semibold mb-4">
                    How to Use AI Assistant
                  </h2>
                  <p className="text-muted-foreground">
                    Your personal development companion
                  </p>
                </div>
              </div>
              <div className="md:col-span-2 space-y-6">
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="text-xl font-medium mb-4">AI Assistant Features</h3>
                    <p className="text-muted-foreground mb-6">
                      The AI Assistant is accessible from every page via the chat button in the bottom right corner. It's designed to help you with various development tasks.
                    </p>
                    
                    <Tabs defaultValue="access" className="mb-6">
                      <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="access">Accessing</TabsTrigger>
                        <TabsTrigger value="capabilities">Capabilities</TabsTrigger>
                        <TabsTrigger value="tips">Pro Tips</TabsTrigger>
                      </TabsList>
                      <TabsContent value="access" className="p-4 border rounded-md mt-2">
                        <div className="space-y-4">
                          <p>To access the AI Assistant:</p>
                          <ol className="list-decimal pl-5 space-y-2">
                            <li>Click the chat icon in the bottom right corner of any page</li>
                            <li>Type your question or request in the chat input</li>
                            <li>Press Enter or click the send button</li>
                          </ol>
                          <p className="text-sm text-muted-foreground mt-4">
                            The assistant is available 24/7 and doesn't require authentication to use basic features.
                          </p>
                        </div>
                      </TabsContent>
                      <TabsContent value="capabilities" className="p-4 border rounded-md mt-2">
                        <div className="space-y-4">
                          <p>The AI Assistant can help with:</p>
                          <ul className="list-disc pl-5 space-y-2">
                            <li>Coding questions and problem-solving</li>
                            <li>Explaining programming concepts</li>
                            <li>Suggesting tools for specific tasks</li>
                            <li>Guiding you through OneStopDev features</li>
                            <li>Providing documentation references</li>
                            <li>Debugging assistance</li>
                          </ul>
                        </div>
                      </TabsContent>
                      <TabsContent value="tips" className="p-4 border rounded-md mt-2">
                        <div className="space-y-4">
                          <p>Pro tips for better AI responses:</p>
                          <ul className="list-disc pl-5 space-y-2">
                            <li>Be specific in your questions</li>
                            <li>Provide context when asking about code</li>
                            <li>Use code formatting for code snippets (backticks)</li>
                            <li>Ask follow-up questions if needed</li>
                            <li>Specify programming language when relevant</li>
                          </ul>
                        </div>
                      </TabsContent>
                    </Tabs>

                    <div className="bg-muted p-4 rounded-md">
                      <div className="flex items-start gap-3">
                        <Lightbulb className="h-5 w-5 text-yellow-500 mt-0.5" />
                        <div>
                          <h4 className="font-medium mb-1">Pro Tip</h4>
                          <p className="text-sm text-muted-foreground">
                            For longer sessions and personalized responses, 
                            consider logging in to save your chat history and 
                            access premium AI features.
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          {/* Web Tools Section */}
          <section id="web-tools" className="scroll-mt-20">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-1">
                <div className="sticky top-24">
                  <h2 className="text-2xl font-semibold mb-4">
                    Using Web Tools
                  </h2>
                  <p className="text-muted-foreground">
                    Powerful developer utilities at your fingertips
                  </p>
                </div>
              </div>
              <div className="md:col-span-2 space-y-6">
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="text-xl font-medium mb-4">Available Tools</h3>
                    <p className="text-muted-foreground mb-6">
                      OneStopDev offers a variety of web tools to help with common development tasks. 
                      Here's how to access and use some of our most popular tools:
                    </p>
                    
                    <div className="space-y-6">
                      <ToolGuide 
                        title="Color Palette Generator"
                        description="Create beautiful color schemes for your projects"
                        steps={[
                          "Navigate to Web Tools → Color Palette Generator",
                          "Choose a base color or generate a random palette",
                          "Adjust settings like harmony and saturation",
                          "Copy color codes in various formats (HEX, RGB, HSL)"
                        ]}
                        link="/tools/color-palette"
                      />
                      
                      <ToolGuide 
                        title="Flexbox Playground"
                        description="Experiment with CSS Flexbox layouts visually"
                        steps={[
                          "Navigate to Web Tools → Flexbox Playground",
                          "Modify flex container properties using the controls",
                          "Add, remove, or modify flex items",
                          "Copy the generated CSS code"
                        ]}
                        link="/tools/flexbox-playground"
                      />
                      
                      <ToolGuide 
                        title="Regex Tester"
                        description="Test and debug regular expressions"
                        steps={[
                          "Navigate to Web Tools → Regex Tester",
                          "Enter your regular expression pattern",
                          "Add test text to validate against",
                          "View matches and capture groups in real-time"
                        ]}
                        link="/tools/regex-tester"
                      />
                    </div>
                    
                    <div className="mt-6">
                      <Button asChild variant="outline" className="w-full">
                        <Link to="/web-tools">
                          Explore All Web Tools
                          <ExternalLink className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          {/* Dev Perks Section */}
          <section id="dev-perks" className="scroll-mt-20">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-1">
                <div className="sticky top-24">
                  <h2 className="text-2xl font-semibold mb-4">
                    Accessing Dev Perks
                  </h2>
                  <p className="text-muted-foreground">
                    Exclusive deals and resources for developers
                  </p>
                </div>
              </div>
              <div className="md:col-span-2">
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="text-xl font-medium mb-4">Developer Perks</h3>
                    <p className="text-muted-foreground mb-6">
                      OneStopDev provides access to exclusive offers, discounts, and free resources 
                      from popular developer services and tools.
                    </p>
                    
                    <div className="space-y-4">
                      <div className="border p-4 rounded-md">
                        <h4 className="font-medium mb-2">How to Access Perks</h4>
                        <ol className="list-decimal pl-5 space-y-2 text-muted-foreground">
                          <li>Navigate to the <Link to="/dev-perks" className="text-primary underline">Dev Perks</Link> page</li>
                          <li>Browse through available offers by category</li>
                          <li>Click on any perk to view details and redemption instructions</li>
                          <li>Follow the provided steps to claim your perk</li>
                        </ol>
                      </div>
                      
                      <div className="border p-4 rounded-md">
                        <h4 className="font-medium mb-2">Perk Categories</h4>
                        <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                          <li>Cloud Services</li>
                          <li>Development Tools</li>
                          <li>Learning Resources</li>
                          <li>Design Assets</li>
                          <li>Productivity Tools</li>
                        </ul>
                      </div>
                      
                      <div className="bg-muted/50 p-4 rounded-md text-sm">
                        <p className="font-medium mb-1">Note:</p>
                        <p className="text-muted-foreground">
                          Some perks may require authentication or have eligibility requirements. 
                          Details for each offer are provided on the perk's page.
                        </p>
                      </div>
                    </div>
                    
                    <div className="mt-6">
                      <Button asChild className="w-full">
                        <Link to="/dev-perks">
                          <Gift className="mr-2 h-4 w-4" />
                          Browse Developer Perks
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          {/* API Keys Section */}
          <section id="api-keys" className="scroll-mt-20">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-1">
                <div className="sticky top-24">
                  <h2 className="text-2xl font-semibold mb-4">
                    Getting API Keys
                  </h2>
                  <p className="text-muted-foreground">
                    Managing your API connections
                  </p>
                </div>
              </div>
              <div className="md:col-span-2">
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="text-xl font-medium mb-4">API Management</h3>
                    <p className="text-muted-foreground mb-6">
                      OneStopDev provides information and resources for obtaining and managing API keys 
                      from various services.
                    </p>
                    
                    <div className="space-y-6">
                      <div className="border p-4 rounded-md">
                        <h4 className="font-medium mb-2">API Hub</h4>
                        <p className="text-muted-foreground mb-4">
                          Visit our <Link to="/api-hub" className="text-primary underline">API Hub</Link> to find:
                        </p>
                        <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                          <li>Links to popular API providers</li>
                          <li>Documentation for common APIs</li>
                          <li>Registration information</li>
                          <li>Pricing details</li>
                        </ul>
                      </div>
                      
                      <div className="border p-4 rounded-md">
                        <h4 className="font-medium mb-2">API Vault (For Logged-In Users)</h4>
                        <p className="text-muted-foreground mb-4">
                          Store and manage your API keys securely in our API Vault:
                        </p>
                        <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                          <li>Securely store API keys and tokens</li>
                          <li>Organize keys by service</li>
                          <li>Add notes for each key</li>
                          <li>Easily copy keys when needed</li>
                        </ul>
                        <p className="text-sm mt-4">
                          <strong>Note:</strong> API Vault requires authentication to protect your sensitive information.
                        </p>
                      </div>
                    </div>
                    
                    <div className="mt-6 flex gap-4">
                      <Button asChild className="flex-1">
                        <Link to="/api-hub">
                          Explore API Hub
                        </Link>
                      </Button>
                      <Button asChild variant="outline" className="flex-1">
                        <Link to="/api-vault">
                          Access API Vault
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          {/* FAQs Section */}
          <section id="faqs" className="scroll-mt-20">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-1">
                <div className="sticky top-24">
                  <h2 className="text-2xl font-semibold mb-4">
                    FAQs / Troubleshooting
                  </h2>
                  <p className="text-muted-foreground">
                    Common questions and solutions
                  </p>
                </div>
              </div>
              <div className="md:col-span-2">
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="text-xl font-medium mb-6">Frequently Asked Questions</h3>
                    
                    <div className="space-y-6">
                      <FaqItem 
                        question="Why is my AI response slow?"
                        answer="AI response times can vary based on server load, complexity of your question, and network conditions. If responses are consistently slow, try refreshing the page or checking your internet connection. For complex queries, the AI may take longer to generate a comprehensive response."
                      />
                      
                      <FaqItem 
                        question="Why can't I access a certain tool?"
                        answer="Some tools might be temporarily unavailable due to maintenance or updates. If you're having trouble accessing a specific tool, try the following: check if you're logged in (some tools require authentication), clear your browser cache, or try a different browser. If the issue persists, please contact our support team."
                      />
                      
                      <FaqItem 
                        question="How do I save my work in the web tools?"
                        answer="Most web tools have a 'Save' or 'Export' option that allows you to download your work or copy code snippets. For logged-in users, some tools automatically save your recent work. If you're working on something important, we recommend regularly exporting or copying your work to avoid any data loss."
                      />
                      
                      <FaqItem 
                        question="Is my data secure when using OneStopDev?"
                        answer="We take data security seriously. Any sensitive information like API keys stored in our API Vault is encrypted. We do not store chat history for non-authenticated users. For authenticated users, chat logs are stored securely and are only accessible to you. For more information, please review our Privacy Policy."
                      />
                    </div>
                    
                    <div className="mt-8 bg-muted p-4 rounded-md">
                      <div className="flex items-start gap-3">
                        <MessageCircleQuestion className="h-5 w-5 text-primary mt-0.5" />
                        <div>
                          <h4 className="font-medium mb-1">Need More Help?</h4>
                          <p className="text-sm text-muted-foreground mb-3">
                            If you couldn't find an answer to your question, you can:
                          </p>
                          <ul className="text-sm list-disc pl-5 space-y-1 text-muted-foreground">
                            <li>Use the AI Assistant (chat icon in the corner)</li>
                            <li>Submit a question through our contact form</li>
                            <li>Check our GitHub repository for technical issues</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          {/* Contribute Section */}
          <section id="contribute" className="scroll-mt-20">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-1">
                <div className="sticky top-24">
                  <h2 className="text-2xl font-semibold mb-4">
                    Contribute or Suggest
                  </h2>
                  <p className="text-muted-foreground">
                    Help us improve OneStopDev
                  </p>
                </div>
              </div>
              <div className="md:col-span-2">
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="text-xl font-medium mb-4">Suggest New Tools</h3>
                    <p className="text-muted-foreground mb-6">
                      We're always looking to improve OneStopDev by adding new tools and features that 
                      benefit the developer community. Your suggestions are valuable to us!
                    </p>
                    
                    <div className="space-y-6">
                      <div className="border p-4 rounded-md space-y-4">
                        <h4 className="font-medium">Ways to Contribute:</h4>
                        <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                          <li>
                            <strong>Suggest a Tool:</strong> Have an idea for a useful developer tool? 
                            Let us know through the suggestion form below.
                          </li>
                          <li>
                            <strong>Report Issues:</strong> Found a bug or issue with an existing tool? 
                            Report it so we can fix it quickly.
                          </li>
                          <li>
                            <strong>Feature Requests:</strong> If you have ideas for enhancing existing tools, 
                            we'd love to hear them.
                          </li>
                        </ul>
                      </div>
                    </div>
                    
                    <div className="mt-6 space-y-4">
                      <Button className="w-full">
                        Submit Tool Suggestion or Feedback
                      </Button>
                      <Button variant="outline" className="w-full" asChild>
                        <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                          Visit Our GitHub Repository
                          <ExternalLink className="ml-2 h-4 w-4" />
                        </a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>
        </div>
      </div>
    </MainLayout>
  );
};

// Helper Components
interface FeatureCardProps {
  icon: React.ComponentType<LucideProps>;
  title: string;
  description: string;
  link: string;
}

const FeatureCard = ({ icon: Icon, title, description, link }: FeatureCardProps) => (
  <a 
    href={link} 
    className="block p-4 border rounded-lg hover:border-primary/50 hover:bg-accent/50 transition-colors"
  >
    <div className="flex items-start gap-3">
      <div className="bg-primary/10 p-2 rounded-md">
        <Icon className="h-5 w-5 text-primary" />
      </div>
      <div>
        <h4 className="font-medium mb-1">{title}</h4>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  </a>
);

interface ToolGuideProps {
  title: string;
  description: string;
  steps: string[];
  link: string;
}

const ToolGuide = ({ title, description, steps, link }: ToolGuideProps) => (
  <div className="border p-4 rounded-md">
    <div className="flex justify-between items-start mb-3">
      <div>
        <h4 className="font-medium">{title}</h4>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      <Button size="sm" variant="outline" asChild>
        <Link to={link}>
          <Palette className="mr-2 h-4 w-4" />
          Open
        </Link>
      </Button>
    </div>
    <div className="mt-4">
      <h5 className="text-sm font-medium mb-2">How to use:</h5>
      <ol className="list-decimal pl-5 text-sm space-y-1 text-muted-foreground">
        {steps.map((step, index) => (
          <li key={index}>{step}</li>
        ))}
      </ol>
    </div>
  </div>
);

interface FaqItemProps {
  question: string;
  answer: string;
}

const FaqItem = ({ question, answer }: FaqItemProps) => (
  <div className="border p-4 rounded-md">
    <h4 className="font-medium mb-2 flex items-center gap-2">
      <HelpCircle className="h-4 w-4 text-primary" />
      {question}
    </h4>
    <p className="text-muted-foreground text-sm">
      {answer}
    </p>
  </div>
);

export default Documentation;

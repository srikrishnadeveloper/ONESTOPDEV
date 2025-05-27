
import Hero from "@/components/Hero";
import ToolsGrid from "@/components/ToolsGrid";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import MainLayout from "@/layouts/MainLayout";

const Index = () => {
  return (
    <MainLayout>
      <Hero />
        
      <ToolsGrid 
        title="Developer Tools" 
        subtitle="Enhance your workflow with our curated collection of developer tools"
      />

      {/* AI Hub Section */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2 space-y-6">
              <div className="inline-block bg-accent/20 text-accent px-3 py-1 rounded-full text-sm font-medium">
                AI Powered
              </div>
              <h2 className="text-3xl font-bold">Harness the Power of AI for Development</h2>
              <p className="text-muted-foreground">
                Explore over 200 AI tools designed to enhance your development workflow.
                From code generation to debugging assistance, our AI Hub has everything
                you need to boost productivity.
              </p>
              <Button className="group" asChild>
                <a href="/ai-hub">
                  Explore AI Hub
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
              </Button>
            </div>
            <div className="md:w-1/2">
              <div className="grid grid-cols-2 gap-4 md:gap-6">
                {[
                  { name: "ChatGPT", tag: "Text Generation" },
                  { name: "GitHub Copilot", tag: "Code Assistant" },
                  { name: "Midjourney", tag: "Image Generation" },
                  { name: "Jasper", tag: "Content Creation" }
                ].map((tool, index) => (
                  <div key={index} className="glass-card p-6 rounded-xl hover-scale">
                    <div className="mb-2 text-lg font-medium">{tool.name}</div>
                    <div className="text-xs bg-muted rounded-full px-2 py-1 w-fit">
                      {tool.tag}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* API Vault Preview */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">API Vault</h2>
            <p className="text-muted-foreground">
              Find, organize, and manage your API keys across multiple services
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: "OpenAI API", description: "Text generation, embeddings, and more", link: "https://platform.openai.com/signup" },
              { name: "Google Cloud", description: "Cloud services, machine learning, and infrastructure", link: "https://cloud.google.com/free" },
              { name: "Stripe API", description: "Payment processing and subscription management", link: "https://dashboard.stripe.com/register" }
            ].map((api, index) => (
              <div key={index} className="glass-card p-6 rounded-xl hover-scale">
                <h3 className="text-lg font-medium mb-2">{api.name}</h3>
                <p className="text-sm text-muted-foreground mb-4">{api.description}</p>
                <Button variant="outline" size="sm" className="w-full" onClick={() => window.open(api.link, '_blank')}>
                  Get API Key
                </Button>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-10">
            <Button variant="ghost" className="group" asChild>
              <a href="/api-vault">
                View All APIs
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
            </Button>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default Index;

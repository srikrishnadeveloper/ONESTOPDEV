
import { Button } from "@/components/ui/button";
import { ChevronRight, Code, Zap, Database, UserPlus } from "lucide-react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="relative overflow-hidden py-20 md:py-28">
      {/* Grid background */}
      <div className="absolute inset-0 grid-bg animate-grid-background opacity-50" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <div className="inline-block bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4 animate-fade-in">
            The Ultimate Developer Resource Hub
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-balance animate-fade-in">
            <span className="primary-gradient bg-clip-text text-transparent">One Stop Dev</span>
            <span> for all your coding needs</span>
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto animate-fade-in">
            Access developer tools, AI assistants, API keys, and resources - all in one beautiful platform
            designed to boost your productivity.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4 animate-fade-in">
            <Button size="lg" className="group" asChild>
              <Link to="/tools/developer-tools">
                Explore Tools
                <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to="/ai-hub">
                View AI Hub
              </Link>
            </Button>
          </div>
        </div>

        {/* Feature highlights */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-20 animate-fade-in">
          {[
            {
              icon: <Code className="h-6 w-6" />,
              title: "Developer Tools",
              description: "Access a comprehensive suite of web development tools and utilities."
            },
            {
              icon: <Zap className="h-6 w-6" />,
              title: "AI Assistance",
              description: "Get help from our AI chatbot for code explanations, debugging, and more."
            },
            {
              icon: <Database className="h-6 w-6" />,
              title: "API Vault",
              description: "Find, organize, and manage your API keys across multiple services."
            },
            {
              icon: <UserPlus className="h-6 w-6" />,
              title: "Dev Perks",
              description: "Discover free resources, student packs, and developer offers."
            }
          ].map((feature, index) => (
            <div key={index} className="glass-card rounded-xl p-6 hover-scale">
              <div className="p-3 bg-primary/10 text-primary rounded-lg w-fit mb-4">
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;

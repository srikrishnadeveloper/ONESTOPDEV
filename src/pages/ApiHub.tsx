
import MainLayout from "@/layouts/MainLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ExternalLink, Key } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

const ApiHub = () => {
  const { user } = useAuth();
  
  const apiCategories = [
    {
      title: "AI & Machine Learning",
      apis: [
        {
          name: "OpenAI API",
          description: "Access GPT models, DALL-E, and more",
          link: "https://platform.openai.com/signup"
        },
        {
          name: "Google Cloud AI",
          description: "Machine learning and AI services",
          link: "https://cloud.google.com/ai-platform"
        }
      ]
    },
    {
      title: "Payment Processing",
      apis: [
        {
          name: "Stripe API",
          description: "Payment processing and subscriptions",
          link: "https://dashboard.stripe.com/register"
        },
        {
          name: "PayPal API",
          description: "Global payment solutions",
          link: "https://developer.paypal.com/home"
        }
      ]
    }
  ];

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-10">
        <div className="max-w-3xl mx-auto text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">API Hub</h1>
          <p className="text-muted-foreground mb-6">
            Discover and integrate popular APIs for your projects
          </p>
          
          {user && (
            <Card className="p-6 mb-8 bg-primary/5 border-primary/20">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="text-center md:text-left">
                  <h3 className="text-lg font-semibold">Manage Your API Keys</h3>
                  <p className="text-sm text-muted-foreground">
                    Store and access your API keys securely in your personal vault
                  </p>
                </div>
                <Button asChild>
                  <Link to="/api-vault">
                    <Key className="mr-2 h-4 w-4" />
                    Open API Vault
                  </Link>
                </Button>
              </div>
            </Card>
          )}
        </div>

        <div className="space-y-12">
          {apiCategories.map((category, index) => (
            <div key={index}>
              <h2 className="text-2xl font-semibold mb-6">{category.title}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.apis.map((api, apiIndex) => (
                  <Card key={apiIndex} className="p-6">
                    <h3 className="text-lg font-medium mb-2">{api.name}</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      {api.description}
                    </p>
                    <Button className="w-full" onClick={() => window.open(api.link, '_blank')}>
                      Get API Key <ExternalLink className="ml-2 h-4 w-4" />
                    </Button>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default ApiHub;

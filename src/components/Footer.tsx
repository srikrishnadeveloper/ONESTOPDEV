
import { Github, Heart } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-1">
            <h3 className="text-xl font-bold primary-gradient bg-clip-text text-transparent mb-4">
              OneStopDev
            </h3>
            <p className="text-sm text-muted-foreground max-w-xs mb-4">
              The ultimate resource hub for developers, 
              providing tools, AI assistance, and resources to boost productivity.
            </p>
            <div className="flex space-x-4">
              <a href="https://github.com/ONESTOPDEV" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                <Github size={20} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-medium mb-4">Resources</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/documentation" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Documentation
                </Link>
              </li>
              <li>
                <Link to="/developer-apis" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Developer APIs
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium mb-4">Categories</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/tools/developer-tools" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Developer Tools
                </Link>
              </li>
              <li>
                <Link to="/ai-hub" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  AI Hub
                </Link>
              </li>
              <li>
                <Link to="/api-vault" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  API Vault
                </Link>
              </li>
              <li>
                <Link to="/dev-perks" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Dev Perks
                </Link>
              </li>
              <li>
                <Link to="/web-tools" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Web Tools
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              © {currentYear} OneStopDev. All rights reserved.
            </p>
            <div className="flex items-center text-sm text-muted-foreground">
              <span>Made with</span>
              <Heart size={14} className="mx-1 text-destructive" />
              <span>for developers</span>
            </div>
            <div className="flex space-x-6">
              <Link 
                to="/privacy-policy" 
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Privacy Policy
              </Link>
              <Link 
                to="/terms-of-service" 
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

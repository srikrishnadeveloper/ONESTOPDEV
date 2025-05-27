
import { Home, Wrench, Bot, Code, Gift, Globe, Database } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import UserProfileSection from "./UserProfileSection";

// Navigation items
const navItems = [
  {
    title: "Home",
    path: "/",
    icon: <Home size={20} />
  },
  {
    title: "Web Tools",
    path: "/web-tools",
    icon: <Globe size={20} />
  },
  {
    title: "Developer Tools",
    path: "/tools/developer-tools",
    icon: <Wrench size={20} />
  },
  {
    title: "AI Hub",
    path: "/ai-hub",
    icon: <Bot size={20} />
  },
  {
    title: "API Vault",
    path: "/api-vault",
    icon: <Code size={20} />
  },
  {
    title: "Developer APIs",
    path: "/developer-apis",
    icon: <Database size={20} />
  },
  {
    title: "Dev Perks",
    path: "/dev-perks",
    icon: <Gift size={20} />
  },
];

interface SidebarNavigationProps {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

const SidebarNavigation: React.FC<SidebarNavigationProps> = ({ 
  isSidebarOpen, 
  toggleSidebar 
}) => {
  const location = useLocation();

  return (
    <>
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40"
          onClick={toggleSidebar}
        />
      )}
      
      <div
        className={cn(
          "fixed top-16 bottom-0 left-0 z-50 w-64 bg-background border-r",
          "transition-transform duration-300 ease-in-out transform",
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Removed SearchBar that was here */}

          <nav className="flex-1 overflow-y-auto px-3 py-4">
            {navItems.map((item) => (
              <Link
                key={item.title}
                to={item.path}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 my-1 rounded-md",
                  "text-sm font-medium transition-colors",
                  "hover:bg-accent hover:text-accent-foreground",
                  location.pathname === item.path || 
                  (location.pathname.startsWith(item.path) && item.path !== "/") 
                    ? "bg-accent text-accent-foreground" 
                    : ""
                )}
              >
                {item.icon}
                <span>{item.title}</span>
              </Link>
            ))}
          </nav>

          <UserProfileSection isSidebarOpen={true} />
        </div>
      </div>
    </>
  );
};

export default SidebarNavigation;


import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "./ThemeToggle";
import UserProfileSection from "./UserProfileSection";

interface HeaderProps {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ isSidebarOpen, toggleSidebar }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b transition-all duration-200",
        isScrolled ? "bg-background/80 backdrop-blur-md" : "bg-background"
      )}
    >
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="md:flex"
            onClick={toggleSidebar}
          >
            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </Button>
          <a href="/" className="flex items-center gap-2">
            <span className="text-xl font-bold primary-gradient bg-clip-text text-transparent">
              OneStopDev
            </span>
          </a>
        </div>

        {/* Removed the GlobalSearch component that was here */}

        <div className="flex items-center gap-4">
          <ThemeToggle />
          <UserProfileSection isSidebarOpen={false} />
        </div>
      </div>
    </header>
  );
};

export default Header;

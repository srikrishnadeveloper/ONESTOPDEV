
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AIChatButton from "@/components/AIChatButton";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      
      <main className="flex-1 transition-all duration-300">
        {children}
      </main>
      
      <Footer />
      <AIChatButton />
    </div>
  );
};

export default MainLayout;

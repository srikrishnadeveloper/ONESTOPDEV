
import { useState } from "react";
import Header from "./Header";
import SidebarNavigation from "./SidebarNavigation";

interface NavbarProps {
  isSidebarOpen?: boolean;
  toggleSidebar?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ 
  isSidebarOpen: externalIsSidebarOpen, 
  toggleSidebar: externalToggleSidebar 
}) => {
  const [internalIsSidebarOpen, setInternalIsSidebarOpen] = useState(false);

  const internalToggleSidebar = () => {
    setInternalIsSidebarOpen(!internalIsSidebarOpen);
  };

  // Use external state if provided, otherwise use internal state
  const isSidebarOpen = externalIsSidebarOpen !== undefined ? externalIsSidebarOpen : internalIsSidebarOpen;
  const toggleSidebar = externalToggleSidebar || internalToggleSidebar;

  return (
    <>
      <Header isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <SidebarNavigation isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
    </>
  );
};

export default Navbar;

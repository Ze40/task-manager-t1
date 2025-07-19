import { Outlet } from "react-router";

import { SidebarProvider } from "@/shared/ui/sidebar";
import { AppSidebar, Header } from "@/widgets";

const Layout = () => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="flex-1">
        <Header />
        <main>
          <Outlet />
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Layout;

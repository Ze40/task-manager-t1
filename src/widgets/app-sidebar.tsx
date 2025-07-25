import { Calendar, CheckSquare, type LucideProps } from "lucide-react";
import { NavLink } from "react-router";

import { UserSidebar } from "@/entities/user/ui";
import { ThemeSwitch } from "@/feat";
import { cn } from "@/lib/utils";
import { Logo } from "@/shared/ui/logo";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/shared/ui/sidebar";

interface IItem {
  url: string;
  title: string;
  icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
  id: number;
}

const items: IItem[] = [
  {
    url: "/",
    title: "Список задач",
    icon: Calendar,
    id: 1,
  },
  {
    url: "/doned",
    title: "Выполненные задачи",
    icon: CheckSquare,
    id: 2,
  },
];

const AppSidebar = () => {
  const { open } = useSidebar();
  return (
    <Sidebar collapsible={"icon"} className="collapsed:w-40">
      <SidebarHeader className="p-6 border-b h-20 justify-center">
        <SidebarMenu>
          <SidebarMenuItem>
            <Logo variant={"sidebar"} />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup className="p-4">
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton>
                    <NavLink
                      to={item.url}
                      className={({ isActive }) =>
                        cn(
                          "text-sm flex gap-3 items-center font-medium",
                          isActive ? "text-foreground" : "text-ghost"
                        )
                      }
                    >
                      <item.icon size={16} />
                      <span className={"text-nowrap"}>{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        {open && (
          <SidebarGroup className="p-4">
            <ThemeSwitch />
          </SidebarGroup>
        )}
        <SidebarGroup className="p-4 border-t">
          <UserSidebar />
        </SidebarGroup>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;

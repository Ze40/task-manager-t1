import { User } from "lucide-react";

import { cn } from "@/lib/utils";
import { useSidebar } from "@/shared/ui/sidebar";

const UserSidebar = () => {
  const { open } = useSidebar();
  return (
    <div className={cn("w-full flex items-center gap-3")}>
      <div className={cn("aspect-square", { "rounded-full bg-secondary p-2": open })}>
        <User size={open ? 24 : 20} />
      </div>
      {open && (
        <div>
          <p className="text-sm font-medium">User name</p>
          <p className="text-xs text-ghost">email@example.com</p>
        </div>
      )}
    </div>
  );
};

export default UserSidebar;

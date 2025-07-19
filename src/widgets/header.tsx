import { AddTaskBtn, SearchTasks, TasksVisualSwitch } from "@/feat";
import { SidebarTrigger } from "@/shared/ui/sidebar";

const Header = () => {
  return (
    <header className="h-20 border-b w-full flex items-center p-6 justify-between">
      <div className="flex items-center gap-4">
        <SidebarTrigger />
        <SearchTasks />
      </div>
      <div className="flex items-center gap-4">
        <TasksVisualSwitch />
        <AddTaskBtn />
      </div>
    </header>
  );
};

export default Header;

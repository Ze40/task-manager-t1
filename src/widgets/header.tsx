import { TaskForm } from "@/entities/task/ui";
import { SearchTasks, TasksVisualSwitch } from "@/feat";
import { useTasksStore } from "@/feat/store";
import { Button } from "@/shared/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui/popover";
import { SidebarTrigger } from "@/shared/ui/sidebar";

const Header = () => {
  const addTask = useTasksStore((state) => state.addTask);
  return (
    <header className="h-20 border-b w-full flex items-center p-6 justify-between sticky top-0 bg-background">
      <div className="flex items-center gap-4">
        <SidebarTrigger />
        <Popover>
          <PopoverTrigger>
            <Button>Добавить задачу</Button>
          </PopoverTrigger>
          <PopoverContent className="w-min">
            <TaskForm action="добавить" onSubmit={(data) => addTask(data, "inbox")} />
          </PopoverContent>
        </Popover>
      </div>
      <div className="flex items-center gap-4">
        <TasksVisualSwitch />
        <SearchTasks />
      </div>
    </header>
  );
};

export default Header;

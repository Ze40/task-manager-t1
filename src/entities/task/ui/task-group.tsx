import { useEffect, useRef, useState } from "react";

import { ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";

import type { ITasksGroup } from "../types";
import TaskListCard from "./task-list-card";

interface TaskGroupProps extends Omit<ITasksGroup, "id"> {
  variant: "kanban" | "list";
  id?: string;
}

const TaskGroup = ({ variant, tasks, name, id }: TaskGroupProps) => {
  if (variant === "kanban") {
    return <></>;
  }
  if (variant === "list") {
    return <List tasks={tasks} name={name} id={id} />;
  }
};

export default TaskGroup;

const List = ({ tasks, name }: Omit<ITasksGroup, "id"> & { id?: string }) => {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const [contentHeight, setContentHeight] = useState<number>(0);
  const contentRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(isOpen ? contentRef.current.scrollHeight : 0);
    }
  }, [isOpen, tasks]);

  return (
    <div>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full gap-2 items-center cursor-pointer p-2"
      >
        <ChevronDown className={cn("transition-all duration-200", !isOpen && "-rotate-90")} />
        <h4 className="text-sm font-semibold">{name}</h4>
      </button>

      <ul
        ref={contentRef}
        className="flex flex-col gap-3 pl-6 overflow-hidden transition-all duration-300 ease-in-out"
        style={{
          maxHeight: `${contentHeight}px`,
          opacity: isOpen ? 1 : 0,
        }}
      >
        {tasks.map((task) => (
          <TaskListCard
            key={task.id}
            title={task.title}
            description={task.description}
            tags={task.tags}
            id={task.id}
            status={task.status}
            priority={task.priority}
            date={task.date}
          />
        ))}
      </ul>
    </div>
  );
};

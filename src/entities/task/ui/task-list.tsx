import { useTasksStore } from "@/feat/store";

import type { ITasksGroup } from "../types";
import TaskGroup from "./task-group";

interface TaskListProps {
  tasks: ITasksGroup[];
}

const TaskList = ({ tasks }: TaskListProps) => {
  const visualMode = useTasksStore((state) => state.visualMode);
  return (
    <div className={visualMode === "list" ? "flex flex-col" : ""}>
      {tasks.map((group) => (
        <TaskGroup
          variant={visualMode}
          tasks={group.tasks}
          name={group.name}
          id={group.id}
          key={group.id}
        />
      ))}
    </div>
  );
};

export default TaskList;

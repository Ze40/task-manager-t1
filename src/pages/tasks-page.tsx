import { TaskList } from "@/entities/task/ui";
import { useTasksStore } from "@/feat/store";

const TasksPage = () => {
  const taskList = useTasksStore((state) => state.tasksGroups);
  return (
    <div className="p-6">
      <TaskList tasks={taskList} />
    </div>
  );
};

export default TasksPage;

import { TaskGroup } from "@/entities/task/ui";
import { useTasksStore } from "@/feat/store";

const DonedTasksPage = () => {
  const taskList = useTasksStore((state) => state.donedTasks);
  return (
    <div className="p-6">
      <TaskGroup tasks={taskList} name="Выполненные задачи" variant="list" />
    </div>
  );
};

export default DonedTasksPage;

import { TaskList } from "@/entities/task/ui";

const TodayTasksPage = () => {
  return (
    <div className="">
      <TaskList tasks={[]} />
    </div>
  );
};

export default TodayTasksPage;

import { useEffect, useState } from "react";

import { useParams } from "react-router";

import type { ITask, ITaskForm } from "@/entities/task/types";
import { TaskForm } from "@/entities/task/ui";
import { useTasksStore } from "@/feat/store";

const TaskInfoPage = () => {
  const { id } = useParams();
  const getTask = useTasksStore((state) => state.getTaskById);
  const editTask = useTasksStore((state) => state.editTask);
  const [task, setTask] = useState<ITaskForm | undefined>(undefined);

  useEffect(() => {
    if (id) {
      const t = getTask(id);
      if (t) {
        const parseDate = t.task.date ? new Date(t.task.date) : undefined;
        setTask({
          date: parseDate,
          title: t.task.title,
          description: t.task.description,
          status: t.task.status,
          priority: t.task.priority,
          tags: t.task.tags?.toString(),
          group: t.group,
        });
      } else {
        setTask(undefined);
      }
    }
  }, [id, getTask]);

  const onSubmit = (data: Omit<ITask, "id">, group: string) => {
    if (id) editTask(id, data, group);
  };

  return (
    <div className="flex items-center justify-center">
      <TaskForm defaultState={task} action="изменить" onSubmit={onSubmit} />
    </div>
  );
};

export default TaskInfoPage;

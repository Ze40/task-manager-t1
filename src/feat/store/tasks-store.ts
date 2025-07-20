import { nanoid } from "nanoid";
import { create } from "zustand";
import { persist } from "zustand/middleware";

import type { ITask, ITasksGroup } from "@/entities/task/types";

interface ITasksStore {
  tasksGroups: ITasksGroup[];
  visualMode: "list" | "kanban";
  donedTasks: ITask[];
  addTask: (task: Omit<ITask, "id">, groupId: string) => void;
  doneTask: (taskId: string) => void;
}

export const useTasksStore = create<ITasksStore>()(
  persist(
    (set) => ({
      tasksGroups: [
        {
          name: "Входящие",
          id: "inbox",
          tasks: [
            {
              title: "Сделать что-то",
              description: "Что-то",
              id: nanoid(),
              status: "to-do",
              tags: ["tag"],
              priority: "high",
            },
          ],
        },
      ],
      visualMode: "list",
      donedTasks: [],
      addTask: (task, groupId) =>
        set((state) => ({
          tasksGroups: state.tasksGroups.map((group) =>
            group.id === groupId
              ? { ...group, tasks: [...group.tasks, { ...task, id: nanoid() }] }
              : group
          ),
        })),
      doneTask: (taskId) =>
        set((state) => {
          let doneTask: ITask | undefined;

          const newTasksGroups = state.tasksGroups.map((group) => ({
            ...group,
            tasks: group.tasks.filter((task) => {
              if (task.id === taskId) {
                doneTask = {
                  ...task,
                  status: "done",
                };
                return false;
              }
              return true;
            }),
          }));

          return {
            tasksGroups: newTasksGroups,
            donedTasks: doneTask ? [...state.donedTasks, doneTask] : state.donedTasks,
          };
        }),
    }),
    { name: "task-storage" }
  )
);

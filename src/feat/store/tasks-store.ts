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
              date: undefined,
            },
          ],
        },
      ],
      visualMode: "list",
      donedTasks: [],
      addTask: (task, addGroup) =>
        set((state) => {
          const groupIndex = state.tasksGroups.findIndex(
            (group) => group.name.toLowerCase() === addGroup.toLowerCase()
          );

          const newTask = { ...task, id: nanoid() };

          if (task.status === "done") {
            return {
              donedTasks: [...state.donedTasks, newTask],
            };
          }

          if (groupIndex !== -1) {
            const newTasksGroups = [...state.tasksGroups];
            newTasksGroups[groupIndex] = {
              ...newTasksGroups[groupIndex],
              tasks: [...newTasksGroups[groupIndex].tasks, newTask],
            };
            return {
              tasksGroups: newTasksGroups,
            };
          } else {
            const newGroup = {
              name: addGroup,
              id: nanoid(),
              tasks: [newTask],
            };
            return {
              tasksGroups: [...state.tasksGroups, newGroup],
            };
          }
        }),
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

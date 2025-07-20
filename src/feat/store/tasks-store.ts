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
  getTaskById: (taskId: string) => { task: Omit<ITask, "id">; group?: string } | undefined;
  editTask: (taskId: string, task: Omit<ITask, "id">, groupId: string) => void;
}

export const useTasksStore = create<ITasksStore>()(
  persist(
    (set, get) => ({
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
      getTaskById: (taskId) => {
        const { tasksGroups, donedTasks } = get();

        for (const group of tasksGroups) {
          const task = group.tasks.find((t) => t.id === taskId);
          if (task) return { task, group: group.name };
        }

        const doneTask = donedTasks.find((t) => t.id === taskId);
        if (doneTask) return { task: doneTask };

        return undefined;
      },
      editTask: (taskId, updatedTask, groupName) =>
        set((state) => {
          const newTasksGroups = state.tasksGroups.map((group) => {
            if (group.name === groupName) {
              const newTasks = group.tasks.map((task) => {
                if (task.id === taskId) {
                  return { ...task, ...updatedTask };
                }
                return task;
              });
              return { ...group, tasks: newTasks };
            }
            return group;
          });

          const newDonedTasks = state.donedTasks.map((task) => {
            if (task.id === taskId) {
              return { ...task, ...updatedTask };
            }
            return task;
          });

          return {
            tasksGroups: newTasksGroups,
            donedTasks: newDonedTasks,
          };
        }),
    }),
    { name: "task-storage" }
  )
);

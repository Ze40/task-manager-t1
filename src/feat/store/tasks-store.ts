import { create } from "zustand";
import { persist } from "zustand/middleware";

import type { ITask, ITasksGroup } from "@/entities/task/types";

interface ITasksStore {
  tasksGroups: ITasksGroup[];
  visualMode: "list" | "kanban";
  addTask: (task: ITask, groupId: string) => void;
}

export const useTasksStore = create<ITasksStore>()(
  persist(
    (set) => ({
      tasksGroups: [
        {
          name: "Входящие",
          id: "0",
          tasks: [
            {
              title: "Зделать что-то",
              description: "Что-то",
              id: "0",
              status: "to do",
              tags: [
                {
                  name: "tag",
                  id: "0",
                },
              ],
              priority: "high",
            },
            {
              title: "Зделать что-то",
              description: "Что-то",
              id: "0",
              status: "to do",
              tags: [
                {
                  name: "tag",
                  id: "0",
                },
              ],
              priority: "high",
            },
            {
              title: "Зделать что-то",
              description: "Что-то",
              id: "0",
              status: "to do",
              tags: [
                {
                  name: "tag",
                  id: "0",
                },
              ],
              priority: "high",
            },
            {
              title: "Зделать что-то",
              description: "Что-то",
              id: "0",
              status: "to do",
              tags: [
                {
                  name: "tag",
                  id: "0",
                },
                {
                  name: "tag2",
                  id: "1",
                },
                {
                  name: "tag3",
                  id: "2",
                },
              ],
              priority: "high",
              date: "19.07.2025",
            },
          ],
        },
        {
          name: "Входящие",
          id: "0",
          tasks: [
            {
              title: "Зделать что-то",
              description: "Что-то",
              id: "0",
              status: "to do",
              tags: [
                {
                  name: "tag",
                  id: "0",
                },
              ],
              priority: "high",
            },
            {
              title: "Зделать что-то",
              description: "Что-то",
              id: "0",
              status: "to do",
              tags: [
                {
                  name: "tag",
                  id: "0",
                },
              ],
              priority: "high",
            },
            {
              title: "Зделать что-то",
              description: "Что-то",
              id: "0",
              status: "to do",
              tags: [
                {
                  name: "tag",
                  id: "0",
                },
              ],
              priority: "high",
            },
            {
              title: "Зделать что-то",
              description: "Что-то",
              id: "0",
              status: "to do",
              tags: [
                {
                  name: "tag",
                  id: "0",
                },
                {
                  name: "tag2",
                  id: "1",
                },
                {
                  name: "tag3",
                  id: "2",
                },
              ],
              priority: "high",
              date: "19.07.2025",
            },
          ],
        },
        {
          name: "Входящие",
          id: "0",
          tasks: [
            {
              title: "Зделать что-то",
              description: "Что-то",
              id: "0",
              status: "to do",
              tags: [
                {
                  name: "tag",
                  id: "0",
                },
              ],
              priority: "high",
            },
            {
              title: "Зделать что-то",
              description: "Что-то",
              id: "0",
              status: "to do",
              tags: [
                {
                  name: "tag",
                  id: "0",
                },
              ],
              priority: "high",
            },
            {
              title: "Зделать что-то",
              description: "Что-то",
              id: "0",
              status: "to do",
              tags: [
                {
                  name: "tag",
                  id: "0",
                },
              ],
              priority: "high",
            },
            {
              title: "Зделать что-то",
              description: "Что-то",
              id: "0",
              status: "to do",
              tags: [
                {
                  name: "tag",
                  id: "0",
                },
                {
                  name: "tag2",
                  id: "1",
                },
                {
                  name: "tag3",
                  id: "2",
                },
              ],
              priority: "high",
              date: "19.07.2025",
            },
          ],
        },
        {
          name: "Входящие",
          id: "0",
          tasks: [
            {
              title: "Зделать что-то",
              description: "Что-то",
              id: "0",
              status: "to do",
              tags: [
                {
                  name: "tag",
                  id: "0",
                },
              ],
              priority: "high",
            },
            {
              title: "Зделать что-то",
              description: "Что-то",
              id: "0",
              status: "to do",
              tags: [
                {
                  name: "tag",
                  id: "0",
                },
              ],
              priority: "high",
            },
            {
              title: "Зделать что-то",
              description: "Что-то",
              id: "0",
              status: "to do",
              tags: [
                {
                  name: "tag",
                  id: "0",
                },
              ],
              priority: "high",
            },
            {
              title: "Зделать что-то",
              description: "Что-то",
              id: "0",
              status: "to do",
              tags: [
                {
                  name: "tag",
                  id: "0",
                },
                {
                  name: "tag2",
                  id: "1",
                },
                {
                  name: "tag3",
                  id: "2",
                },
              ],
              priority: "high",
              date: "19.07.2025",
            },
          ],
        },
      ],
      visualMode: "list",
      addTask: (task, groupId) =>
        set((state) => ({
          tasksGroups: state.tasksGroups.map((group) =>
            group.id === groupId ? { ...group, tasks: [...group.tasks, task] } : group
          ),
        })),
    }),
    { name: "task-storage" }
  )
);

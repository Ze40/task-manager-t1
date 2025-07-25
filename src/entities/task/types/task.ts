export interface ITask {
  title: string;
  description?: string;
  tags?: string[];
  status: "to-do" | "in-progress" | "done";
  priority: "low" | "medium" | "high";
  date?: string;
  id: string;
}

export interface ITasksGroup {
  name: string;
  id: string;
  tasks: ITask[];
}

export type ITaskForm = Omit<ITask, "id" | "tags" | "date"> & {
  tags?: string;
  group?: string;
  date?: Date;
};

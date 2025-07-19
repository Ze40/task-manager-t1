import { NotepadText } from "lucide-react";

import { useTasksStore } from "@/feat/store";
import { cn } from "@/lib/utils";

import type { ITask } from "../types";

const TaskListCard = ({ title, description, priority, status, tags, id, date }: ITask) => {
  const doneTask = useTasksStore((state) => state.doneTask);

  return (
    <li className="w-full">
      <button
        type="button"
        className="flex justify-between border-b p-2 w-full"
        onClick={() => doneTask(id)}
      >
        <div className="flex items-center gap-2">
          <button
            className={cn("size-5 rounded-sm cursor-pointer duration-300 hover:scale-110", {
              "border-red-500 border-2": priority === "high",
            })}
          ></button>
          <p>{title}</p>
        </div>
        <div className="flex items-center gap-2">
          {description && <NotepadText size={12} className="text-ghost" />}
          <ul className="flex gap-1 items-center">
            {tags?.slice(0, 3).map((tag) => (
              <li
                key={tag.id}
                className="text-xs text-secondary bg-primary py-1 px-2 rounded-xl text-ellipsis overflow-hidden max-w-20"
              >
                #{tag.name}
              </li>
            ))}
          </ul>
          {date && <p className="text-sm text-chart-2">{date}</p>}
        </div>
      </button>
    </li>
  );
};

export default TaskListCard;

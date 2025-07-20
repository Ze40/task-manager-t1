import { NotepadText } from "lucide-react";
import { Link } from "react-router";

import { useTasksStore } from "@/feat/store";
import { cn } from "@/lib/utils";

import type { ITask } from "../types";

const TaskListCard = ({ title, description, priority, tags, id, date, status }: ITask) => {
  const doneTask = useTasksStore((state) => state.doneTask);

  return (
    <li className="flex gap-3 border-b p-2 w-full relative">
      {status === "done" && (
        <div className="w-full absolute left-0 top-1/2 h-0.5 bg-ghost z-20"></div>
      )}
      <button
        disabled={status === "done"}
        onClick={() => doneTask(id)}
        className={cn("size-5 rounded-sm cursor-pointer duration-300 hover:scale-110", {
          "border-chart-1 border-2": priority === "high",
          "border-chart-3 border-2": priority === "medium",
          "border-chart-2 border-2": priority === "low",
          "border-ghost": status === "done",
        })}
      ></button>
      <Link
        to={`/task-info/${id}`}
        type="button"
        className="flex w-full justify-between cursor-pointer hover:scale-[1.005] duration-200"
      >
        <p>{title}</p>
        <div className="flex items-center gap-2">
          {description && <NotepadText size={12} className="text-ghost" />}
          <ul className="flex gap-1 items-center">
            {tags?.slice(0, 3).map((tag) => (
              <li
                key={tag}
                className="text-xs text-secondary bg-primary py-1 px-2 rounded-xl text-ellipsis overflow-hidden max-w-20"
              >
                #{tag}
              </li>
            ))}
          </ul>
          {date && <p className="text-sm text-chart-2">{date}</p>}
        </div>
      </Link>
    </li>
  );
};

export default TaskListCard;

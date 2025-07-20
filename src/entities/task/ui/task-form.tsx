import { useEffect } from "react";

import { Controller, useForm } from "react-hook-form";

import { Button } from "@/shared/ui/button";
import { Combobox } from "@/shared/ui/combobox";
import { DatePicker } from "@/shared/ui/date-picker";
import { Input } from "@/shared/ui/input";
import { Textarea } from "@/shared/ui/textarea";

import type { ITask } from "../types";
import type { ITaskForm } from "../types/task";

const statusList = [
  { value: "to-do", label: "To Do" },
  { value: "in-progress", label: "In Progress" },
  { value: "done", label: "Done" },
];

const priorityList = [
  { value: "low", label: "Низкий" },
  { value: "medium", label: "Средний" },
  { value: "high", label: "Высокий" },
];

interface TaskFormProps {
  onSubmit: (data: Omit<ITask, "id">, group: string) => void;
  action: "изменить" | "добавить";
  defaultState?: ITaskForm;
}

const TaskForm = ({ onSubmit, action, defaultState }: TaskFormProps) => {
  const {
    reset,
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ITaskForm>({
    defaultValues: defaultState,
  });

  useEffect(() => {
    if (defaultState) {
      reset(defaultState);
    }
  }, [defaultState, reset]);

  const submit = (data: ITaskForm) => {
    const tagsArray = data.tags?.trim().split(/\s+/);
    const processedData: Omit<ITask, "id"> = {
      title: data.title,
      description: data.description,
      date: data.date ? data.date.toDateString() : undefined,
      status: data.status,
      priority: data.priority,
      tags: tagsArray,
    };
    onSubmit(processedData, data.group || "входящие");
  };

  return (
    <form className="w-sm flex flex-col gap-3 p-4" onSubmit={handleSubmit(submit)}>
      <div className="flex items-center gap-2">
        <Input
          placeholder="Заголовок:"
          {...register("title", {
            required: "Заголовок обязателен",
          })}
        />

        <Controller
          name="date"
          control={control}
          render={({ field }) => (
            <DatePicker
              size="icon"
              value={field.value}
              onChange={field.onChange}
              ref={field.ref}
              onBlur={field.onBlur}
            />
          )}
        />
      </div>

      <Textarea placeholder="Описание:" {...register("description")} />

      <div className="flex items-center gap-2 justify-between">
        <Controller
          name="status"
          control={control}
          render={({ field }) => (
            <Combobox
              className="w-[45%]"
              items={statusList}
              label="Статус задачи:"
              value={field.value}
              onChange={field.onChange}
            />
          )}
        />

        <Controller
          name="priority"
          control={control}
          render={({ field }) => (
            <Combobox
              className="w-[50%]"
              items={priorityList}
              label="Приоритет задачи:"
              value={field.value}
              onChange={field.onChange}
            />
          )}
        />
      </div>

      <div className="flex items-center gap-2">
        {action === "изменить" && defaultState?.status !== "done" && (
          <Input placeholder="Группа:" {...register("group")} />
        )}
        <Input placeholder="Теги: (через пробел)" {...register("tags")} />
      </div>

      {errors.root && <p className="text-xs text-chart-1 text-center">{errors.root.message}</p>}

      <Button type="submit" className={"capitalize"}>
        {action}
      </Button>
    </form>
  );
};

export default TaskForm;

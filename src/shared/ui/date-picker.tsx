import * as React from "react";

import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/shared/ui/button";
import { Calendar } from "@/shared/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui/popover";

interface DatePickerProps {
  value?: Date;
  onChange?: (date: Date | undefined) => void;
  ref?: React.Ref<typeof Button>;
  className?: string;
  onBlur?: () => void;
  size?: "default" | "icon";
}

export const DatePicker = React.forwardRef<HTMLButtonElement, DatePickerProps>(
  ({ className, size = "default", ...props }, ref) => {
    const { value, onChange } = props;
    const [date, setDate] = React.useState<Date | undefined>(value);

    const handleSelect = (date: Date | undefined) => {
      setDate(date);
      if (onChange) {
        onChange(date);
      }
    };

    return (
      <Popover>
        <PopoverTrigger asChild>
          <Button
            ref={ref}
            variant="outline"
            data-empty={!date}
            className={cn(
              "data-[empty=true]:text-muted-foreground justify-start text-left font-normal",
              size === "default" ? "w-[280px]" : "w-min",
              className
            )}
          >
            <CalendarIcon />
            {size === "default" && (date ? format(date, "PPP") : <span>Выберите дату</span>)}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar mode="single" selected={date} onSelect={(date) => handleSelect(date)} />
        </PopoverContent>
      </Popover>
    );
  }
);

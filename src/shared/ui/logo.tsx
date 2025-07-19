import { cn } from "@/lib/utils";

import { useSidebar } from "./sidebar";

interface LogoProps {
  className?: string;
  variant?: "sidebar" | "default";
}

export const Logo = ({ className, variant = "default" }: LogoProps) => {
  const { open } = useSidebar();

  if (variant === "default") {
    return (
      <div className={cn("flex items-center gap-2", className)}>
        <img src={`${import.meta.env.BASE_URL}/images/logo.png`} alt="Logo" className="h-5 w-5" />
        <p className="text-lg font-semibold text-nowrap">Do More</p>
      </div>
    );
  }
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className="relative min-w-5 h-5">
        <img
          src={`${import.meta.env.BASE_URL}/images/logo.png`}
          alt="Logo"
          className="w-full h-full object-contain"
        />
      </div>

      <p className={cn("text-lg font-semibold text-nowrap", !open && "hidden")}>Do More</p>
    </div>
  );
};

import * as React from "react";
import {cn} from "@/lib/utils";

type Direction = "rtl" | "ltr" | "auto";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
 dir?: Direction;
 error?: string;
 describedById?: string; 
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
 ({className, type = "text", dir = "rtl", error, describedById, ...props}, ref) => {
  const isTel = type === "tel";

  return (
   <input
    ref={ref}
    type={type}
    data-slot="input"
    dir={dir}
    inputMode={isTel ? "numeric" : props.inputMode}
    autoComplete={isTel ? "tel" : props.autoComplete}
    pattern={isTel && !props.pattern ? "^(09\\d{9}|00989\\d{9}|\\+989\\d{9})$" : props.pattern}
    aria-invalid={Boolean(error) || undefined}
    aria-describedby={error ? describedById : props["aria-describedby"]}
    className={cn(
     "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30",
     "border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs",
     "transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
     "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
     "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
     "text-right",
     error ? "border-destructive" : "",
     className
    )}
    {...props}
   />
  );
 }
);

Input.displayName = "Input";

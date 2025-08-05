import { cn } from "@/utils/commons";
import { ComponentProps, ReactNode } from "react";

const TextArea = ({
  label,
  error,
  ...props
}: { label?: ReactNode; error?: ReactNode } & ComponentProps<"textarea">) => {
  const { className, ...rest } = props;
  return (
    <div className="flex flex-col gap-1 w-full">
      {label ? (
        <div className="text-sm text-text-secondary/60">{label}</div>
      ) : null}
      <textarea
        className={cn(
          "w-full bg-secondary border-2 border-secondary-border rounded text-sm px-2 py-1 outline-none ring-offset-1 focus:ring-2 ring-primary-outline",
          className,
        )}
        {...rest}
      />
      {error ? <div className="text-xs text-danger">{error}</div> : null}
    </div>
  );
};

export default TextArea;

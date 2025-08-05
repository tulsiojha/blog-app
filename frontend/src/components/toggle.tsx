import { ComponentProps, ReactNode } from "react";

const Toggle = ({
  label,
  ...props
}: {
  label?: ReactNode;
  checked?: boolean;
} & ComponentProps<"input">) => {
  return (
    <div className="flex flex-row gap-3 w-full">
      <label className="relative inline-block w-11 h-6">
        <input
          type="checkbox"
          {...props}
          className="peer appearance-none hidden"
        />
        <div className="w-full h-full bg-tertiary-active rounded-full peer-checked:bg-blue-600 transition-colors" />
        <div className="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-all peer-checked:left-5.5" />
      </label>
      {label ? (
        <div className="text-sm text-text-secondary/60 font-bold">{label}</div>
      ) : null}
    </div>
  );
};

export default Toggle;

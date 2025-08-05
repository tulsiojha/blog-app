import { cn } from "@/utils/commons";
import Select, { ISelect } from "@zener/react-select";
import { X } from "lucide-react";
import { ReactNode } from "react";

const SelectV2 = <T, U extends boolean>(
  props: ISelect<T, U> & {
    label?: ReactNode;
    error?: ReactNode;
  },
) => {
  const { label, error, ...rest } = props;
  return (
    <div className="flex flex-col gap-1 w-full">
      {label ? (
        <div className="text-sm text-text-secondary/60">{label}</div>
      ) : null}
      <Select
        {...rest}
        className={() => {
          const custom =
            "bg-secondary text-sm text-text-secondary px-2 py-0.5 border-solid font-sans rounded min-w-[50px] outline-none border-2";
          return {
            default: `${custom} border-secondary-border`,
            focus: `${custom}`,
            disabled: `${custom} text-black/25 bg-black/5 border-stone-100`,
          };
        }}
        placeholder={
          <div className="text-text-secondary/20">{rest.placeholder}</div>
        }
        menuClass="bg-tertiary p-1 rounded shadow-2xl"
        menuItemRender={({ label, innerProps, active, focused }) => {
          return (
            <div className="py-px truncate" {...innerProps}>
              <div
                className={cn(
                  "py-2 px-1 rounded truncate text-text-secondary",
                  {
                    "bg-tertiary-active": !!active,
                    "bg-tertiary-hover": !!focused && !active,
                  },
                )}
              >
                {label}
              </div>
            </div>
          );
        }}
        tagRender={({ label, remove, value }) => {
          return (
            <div
              className="bg-tertiary-active text-text-secondary rounded px-1.5 truncate py-0.5 flex flex-row items-center justify-center gap-2"
              key={value}
            >
              <span className="truncate">{label}</span>
              <span
                className="cursor-pointer hover:opacity-60"
                onClick={() => remove(value)}
              >
                <X size={12} />
              </span>
            </div>
          );
        }}
      />
      {error ? <div className="text-xs text-danger">{error}</div> : null}
    </div>
  );
};

export default SelectV2;

import { SearchIcon } from "lucide-react";
import { ComponentProps, ReactNode } from "react";

const SearchInput = ({
  label,
  error,
  ...props
}: { label?: ReactNode; error?: ReactNode } & ComponentProps<"input">) => {
  return (
    <div className="flex flex-col gap-1 w-full">
      {label ? (
        <div className="text-sm text-text-secondary/60">{label}</div>
      ) : null}
      <div className="bg-secondary border-2 border-secondary-border rounded text-sm flex flex-row items-center px-2 gap-2 w-full">
        <SearchIcon size={16} />
        <input size={10} className="w-full py-1 outline-none" {...props} />
      </div>
      {error ? <div className="text-xs text-danger">{error}</div> : null}
    </div>
  );
};

export default SearchInput;

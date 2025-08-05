import { Popover } from "react-tiny-popover";

import { FilterIcon } from "lucide-react";
import SelectV2 from "./selectV2";
import { ITagResponse } from "@/utils/types";
import { useState } from "react";

const PostFilter = ({
  value,
  onChange,
  tags,
}: {
  value?: string[];
  onChange?: (filters: string[]) => void;
  tags: ITagResponse | null;
}) => {
  const [open, setOpen] = useState(false);
  return (
    <Popover
      isOpen={open}
      positions={["bottom", "top", "left", "right"]} // preferred positions by priority
      content={
        <div className="text-text-secondary min-w-[220px] max-w-[220px] p-3 flex flex-col gap-2 rounded-md bg-secondary border-1 border-secondary-border shadow-2xl will-change-[opacity,transform]">
          <div>Filter by tags</div>
          <SelectV2
            value={value}
            placeholder="Select by tags"
            options={async () =>
              (tags?.data.tags || []).map((tag) => ({
                label: tag.name,
                value: tag.name,
              }))
            }
            onChange={(_, data) => {
              onChange?.(data);
            }}
            multiple
            onWheel={(e) => {
              e.stopPropagation();
            }}
            onTouchMove={(e) => {
              e.stopPropagation();
            }}
          />
        </div>
      }
    >
      <button
        className="relative bg-secondary border-2 border-secondary-border rounded px-2 py-1 "
        onClick={() => setOpen((p) => !p)}
      >
        {value?.length ? (
          <span className="absolute flex items-center justify-center -right-2.5 -top-2.5 rounded-full bg-tertiary-active text-text-secondary w-5 h-5 text-xs">
            {value?.length}
          </span>
        ) : null}
        <FilterIcon size={18} />
      </button>
    </Popover>
  );
};

export default PostFilter;

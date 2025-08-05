import { Upload } from "lucide-react";
import { ChangeEventHandler, ReactNode } from "react";

const ImageInput = ({
  value,
  onChange,
  error,
  label,
}: {
  value?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  className?: string;
  label?: ReactNode;
  error?: ReactNode;
}) => {
  return (
    <div className="flex flex-col gap-1 w-full">
      {label ? (
        <div className="text-sm text-text-secondary/60">{label}</div>
      ) : null}
      <label
        htmlFor="upload-image"
        className="flex flex-row items-center gap-2 font-normal cursor-pointer border border-gray-300 bg-gray-100 rounded px-2 py-1 hover:bg-gray-50"
      >
        <div className="w-full flex flex-row items-center justify-center gap-1 min-h-[24px] py-14 text-center">
          <Upload size={18} />
          <span className="hidden md:inline-block">Upload image</span>
        </div>
        <input
          id="upload-image"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={onChange}
        />
        {value ? (
          <div>
            <img src={value} />
          </div>
        ) : null}
      </label>
      {error ? <div className="text-xs text-danger">{error}</div> : null}
    </div>
  );
};

export default ImageInput;

import classnames from "classnames";
import { ReadonlyURLSearchParams } from "next/navigation";
import { toast as t } from "sonner";

export const cn = classnames;

export const toast = (message: string, type: "error" | "success") => {
  const options = { richColors: true, closeButton: true };
  switch (type) {
    case "error":
      return t.error(message, options);
    case "success":
      return t.success(message, options);
    default:
      return t.info(message, options);
  }
};

export const perPageItems = [5, 10, 15, 20, 30, 40, 50, 60, 70, 80, 90, 100];

export const getParams = (
  label: string,
  value: string | number,
  searchParams: ReadonlyURLSearchParams,
) => {
  const params = new URLSearchParams(searchParams.toString());
  params.set(label, `${value}`);
  return `?${params.toString()}`;
};

export const formatDate = (date?: string | Date) =>
  date
    ? new Date(date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "-";

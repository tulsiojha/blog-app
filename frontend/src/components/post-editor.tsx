"use client";

import Button from "@/components/button";
import TextInput from "@/components/input";
import * as z from "zod";
import dynamic from "next/dynamic";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { NepaliDate } from "@zener/nepali-datepicker-react";
import SelectV2 from "./selectV2";
import { IPost } from "@/utils/types";
import Toggle from "./toggle";
import usePosts from "@/hooks/use-posts";
import useTags from "@/hooks/use-tags";
import { toast } from "@/utils/commons";
import handleErrors from "@/utils/handleErrors";

const TinyMCE = dynamic(() => import("@/components/editor"), { ssr: false });

const schema = z.object({
  slug: z
    .string()
    .nonempty("Slug is required")
    .refine(
      (s) => !s.includes(" "),
      "Spaces are not allowed. Use hypens (-) instead",
    ),
  title: z.string().nonempty("Title is required"),
  content: z.string({ error: "Content is required" }),
  tags: z.array(z.string(), { error: "Tags are required" }).min(1),
  is_draft: z.boolean().default(false),
});

const PostEditor = ({ initialValues }: { initialValues?: IPost }) => {
  const router = useRouter();
  const is_update = !!initialValues;

  const { create, update } = usePosts({});

  const { tags } = useTags({ prefetchTags: true });

  const {
    control,
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    setValue,
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { ...initialValues },
  });

  const onSubmit = async (e: any) => {
    try {
      const payload = e;
      if (is_update) {
        const res = await update(initialValues.id, {
          ...payload,
        });
        toast("Post updated successfully.", "success");
        return res;
      } else {
        const res = await create({ ...e });
        toast("Post created successfully.", "success");
        router.push("/dashboard/posts");
        return res;
      }
    } catch (e) {
      console.log("here");
      toast(handleErrors(e), "error");
    }
  };

  const today = new NepaliDate();
  const date = is_update
    ? new NepaliDate(new Date(initialValues.created_at || "")).format(
        "MMMM D, YYYY",
      )
    : today.format("MMMM D, YYYY");

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="py-3 grid grid-cols-1 md:grid-cols-[auto_300px] gap-3"
      >
        <div className="border border-secondary-border flex flex-col gap-5 p-5 rounded h-fit">
          <div className="font-bold italic text-text-secondary">{date}</div>
          <TextInput
            label="Title"
            {...register("title")}
            placeholder="Enter post title"
            error={errors.title?.message}
          />
          <TextInput
            label="Slug"
            {...register("slug", {
              onChange(e) {
                setValue(
                  "slug",
                  e.target.value.toLowerCase().replaceAll(" ", "-"),
                );
              },
            })}
            placeholder="Enter slug url"
            error={errors.slug?.message}
          />
          <Controller
            control={control}
            name="tags"
            render={({ field }) => {
              return (
                <SelectV2
                  label="Tags"
                  placeholder="Enter tags"
                  error={errors.tags?.message}
                  value={field.value}
                  options={async () =>
                    (tags?.data.tags || []).map((tag) => ({
                      label: tag.name,
                      value: tag.name,
                    }))
                  }
                  multiple={true}
                  creatable
                  onChange={(_, value) => {
                    field.onChange(value);
                  }}
                />
              );
            }}
          />
          <Controller
            name="content"
            control={control}
            render={({ field }) => {
              return (
                <TinyMCE
                  label="Content"
                  error={errors.content?.message}
                  {...field}
                />
              );
            }}
          />
        </div>
        <div className="border border-secondary-border flex flex-col gap-5 p-5 rounded h-fit">
          <Toggle label="Draft" {...register("is_draft")} />
          <div className="flex flex-col gap-2">
            <div className="flex flex-row items-center gap-2">
              <Button block type="submit" loading={isSubmitting}>
                {is_update ? "Update" : "Create"}
              </Button>
              <Button
                variant="secondary"
                block
                type="button"
                onClick={() => {
                  router.push("/dashboard/posts");
                }}
              >
                Discard
              </Button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default PostEditor;

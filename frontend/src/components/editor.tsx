"use client";
import { useTheme } from "@/hooks/use-theme";
import { Editor } from "@tinymce/tinymce-react";
import { ReactNode, useRef, useState } from "react";

export default function TinyMCE({
  value,
  onChange,
  error,
  label,
}: {
  label?: ReactNode;
  error?: ReactNode;
  value?: string;
  onChange?: (value: string) => void;
}) {
  const editor = useRef<Editor>(null);

  const { binaryTheme } = useTheme();

  return (
    <>
      <div className="flex flex-col gap-1 w-full">
        {label ? (
          <div className="text-sm text-text-secondary/60">{label}</div>
        ) : null}
        <Editor
          tinymceScriptSrc="/tinymce/tinymce.min.js"
          licenseKey="gpl"
          ref={editor}
          init={{
            setup: (e) => {
              e.ui.registry.addButton("gallery", {
                text: "Image",
                icon: "image",
                onAction: () => {},
              });
            },
            branding: false,
            height: 500,
            menubar: false,
            plugins: [
              "advlist",
              "autolink",
              "lists",
              "link",
              "image",
              "charmap",
              "anchor",
              "searchreplace",
              "visualblocks",
              "code",
              "fullscreen",
              "insertdatetime",
              "media",
              "table",
              "preview",
              "help",
              "wordcount",
            ],
            toolbar:
              "undo redo | blocks | " +
              "bold italic forecolor | alignleft aligncenter " +
              "alignright alignjustify | bullist numlist outdent indent | " +
              "gallery " +
              "removeformat",
            content_style:
              "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
            skin: binaryTheme === "dark" ? "oxide-dark" : "oxide",
            content_css: binaryTheme === "dark" ? "dark" : "default",
          }}
          onEditorChange={(value) => onChange?.(value)}
          value={value}
        />
        {error ? <div className="text-xs text-danger">{error}</div> : null}
      </div>
    </>
  );
}

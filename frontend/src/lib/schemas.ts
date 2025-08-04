import * as z from "zod";

// user schemas
const userBaseSchema = {
  email: z.email("invalid email"),
};

const passwordSchema = {
  password: z.string().min(6, "at least 6 characters are required"),
  repassword: z.string().min(6, "at least 6 characters are required"),
};

export const registerSchema = z
  .object({
    first_name: z.string(),
    last_name: z.string(),
    ...userBaseSchema,
    ...passwordSchema,
  })
  .superRefine(({ password, repassword }, ctx) => {
    if (repassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "Password did not match",
        path: ["repassword"],
      });
    }
  });

export const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(6),
});

// post schemas

export const postSchema = z.object({
  title: z.string(),
  slug: z.string(),
  content: z.string(),
  cover: z.string(),
  tags: z.string(),
  category: z.number(),
  is_draft: z.boolean(),
});

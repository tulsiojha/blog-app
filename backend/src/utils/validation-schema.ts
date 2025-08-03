import { z } from "zod";
import { IUser } from "../services/user.service";
import { IPost } from "../services/post.service";

export const validateUser = (data: IUser) => {
  const schema = z.object({
    email: z
      .string({
        required_error: "email is required",
      })
      .email("invalid email"),
    password: z
      .string({
        invalid_type_error: "invalid password",
        required_error: "password is required",
      })
      .min(6, "at least 6 characters are required"),
  });
  return schema.parse(data);
};

export const validatePost = (data: IPost) => {
  const schema = z.object({
    title: z.string(),
    slug: z.string(),
    content: z.string(),
    cover: z.string(),
    tags: z.string(),
    category: z.number(),
    is_draft: z.boolean(),
  });
  return schema.parse(data);
};

export const validateLogin = (data: { email: string; password: string }) => {
  const schema = z.object({
    email: z
      .string({ required_error: "email is required" })
      .email("invalid email"),
    password: z
      .string({
        invalid_type_error: "invalid password",
        required_error: "password is required",
      })
      .min(6, "at least 6 characters are required"),
  });
  return schema.parse(data);
};

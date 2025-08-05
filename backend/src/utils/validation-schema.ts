import { z } from "zod";
import { IUser } from "../services/user.service";
import { IPost } from "../services/post.service";
import { ITag } from "../services/tag.service";

export const validateUser = (data: IUser) => {
  const schema = z.object({
    first_name: z.string({
      required_error: "first_name is required",
    }),
    last_name: z.string({
      required_error: "last_name is required",
    }),
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
    tags: z.array(z.string()).min(1),
    is_draft: z.boolean(),
  });
  return schema.parse(data);
};

export const validateTag = (data: ITag) => {
  const schema = z.object({
    name: z.string(),
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

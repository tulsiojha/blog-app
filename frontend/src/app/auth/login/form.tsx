"use client";
import Button from "@/components/button";
import TextInput from "@/components/input";
import Link from "next/link";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/lib/schemas";
import useAuth from "@/hooks/use-auth";

type ISchema = z.infer<typeof loginSchema>;

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const { login } = useAuth();

  const onSubmit = async (e: ISchema) => {
    return login?.(e);
  };

  return (
    <form
      className="flex flex-col gap-5 w-[300px]"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="text-center font-bold text-xl text-text-secondary">
        Login
      </div>
      <div className="flex flex-col gap-2">
        <TextInput
          label="Email"
          placeholder="Enter your email address"
          error={errors.email?.message}
          {...register("email")}
        />
        <TextInput
          label="Password"
          placeholder="Enter password"
          type="password"
          error={errors.password?.message}
          {...register("password")}
        />
      </div>
      <Button variant="primary" type="submit" loading={isSubmitting}>
        Login
      </Button>
      <div className="text-center text-text-secondary">
        Don't have an account?{" "}
        <Link
          href={"/auth/register"}
          className="outline-none text-primary ring-offset-1 focus:ring-2 focus:ring-primary-outline rounded"
        >
          Signup
        </Link>
      </div>
    </form>
  );
};

export default LoginForm;

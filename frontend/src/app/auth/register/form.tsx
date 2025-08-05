"use client";
import Button from "@/components/button";
import TextInput from "@/components/input";
import Link from "next/link";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "@/lib/schemas";
import useAuth from "@/hooks/use-auth";

type ISchema = z.infer<typeof registerSchema>;

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const { register: signup } = useAuth();

  const onSubmit = async (e: ISchema) => {
    const { repassword: _, ...data } = e;
    return signup?.(data);
  };

  return (
    <form
      className="flex flex-col gap-5 w-[350px]"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="text-center font-bold text-xl text-text-secondary">
        Register
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex flex-row items-start gap-2">
          <TextInput
            label="First name"
            placeholder="Enter your first name"
            error={errors.first_name?.message}
            {...register("first_name")}
          />
          <TextInput
            label="Last name"
            placeholder="Enter your last name"
            error={errors.last_name?.message}
            {...register("last_name")}
          />
        </div>
        <TextInput
          label="Email"
          placeholder="Enter your email address"
          type="email"
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
        <TextInput
          label="Confirm password"
          placeholder="Enter confirm password"
          type="password"
          error={errors.repassword?.message}
          {...register("repassword")}
        />
      </div>
      <Button variant="primary" type="submit" loading={isSubmitting}>
        Register
      </Button>
      <div className="text-center text-text-secondary">
        Already have an account?{" "}
        <Link
          href={"/auth/login"}
          className="outline-none text-primary ring-offset-1 focus:ring-2 focus:ring-primary-outline rounded"
        >
          Login
        </Link>
      </div>
    </form>
  );
};

export default RegisterForm;

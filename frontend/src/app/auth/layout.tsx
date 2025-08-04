"use client";
import useAuth from "@/hooks/use-auth";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";

const AuthLayout = ({ children }: { children?: ReactNode }) => {
  const { user } = useAuth();
  const router = useRouter();
  if (user) {
    router.push("/dashboard");
  }
  return <>{children}</>;
};

export default AuthLayout;

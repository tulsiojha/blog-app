"use client";
import useAuth from "@/hooks/use-auth";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";

const AuthLayout = ({ children }: { children?: ReactNode }) => {
  const { user, loading } = useAuth();

  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      router.push("/dashboard");
    } else {
      router.push("/auth/login");
    }
  }, [loading, user, router]);

  if (loading) {
    return (
      <div className="h-screen text-text-primary">Checking authentication…</div>
    );
  }

  if (user) {
    return null;
  }

  return <>{children}</>;
};

export default AuthLayout;

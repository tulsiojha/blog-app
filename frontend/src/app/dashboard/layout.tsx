"use client";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";
import Dash from "./dash";
import useAuth from "@/hooks/use-auth";

const DashLayout = ({ children }: { children?: ReactNode }) => {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/auth/login");
    }
  }, [user, router]);

  if (loading) {
    return (
      <div className="h-screen text-text-primary">Checking authentication…</div>
    );
  }

  if (!user) {
    return null;
  }

  return <Dash>{children}</Dash>;
};

export default DashLayout;

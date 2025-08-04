"use client";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";
import Dash from "./dash";
import useAuth from "@/hooks/use-auth";

const DashLayout = ({ children }: { children?: ReactNode }) => {
  const user = useAuth();
  const router = useRouter();
  if (!user) {
    router.push("/auth/login");
  }
  return <Dash>{children}</Dash>;
};

export default DashLayout;

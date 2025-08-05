"use client";

import { AuthProvider } from "@/hooks/use-auth";
import { ReactNode } from "react";
import { Toaster } from "sonner";

const Wrapper = ({ children }: { children?: ReactNode }) => {
  return (
    <AuthProvider>
      {children}
      <Toaster />
    </AuthProvider>
  );
};

export default Wrapper;

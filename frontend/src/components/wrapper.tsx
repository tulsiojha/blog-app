"use client";

import { AuthProvider } from "@/hooks/use-auth";
import ThemeProvider from "@/hooks/use-theme";
import { ReactNode } from "react";
import { Toaster } from "sonner";

const Wrapper = ({ children }: { children?: ReactNode }) => {
  return (
    <ThemeProvider>
      <AuthProvider>
        {children}
        <Toaster />
      </AuthProvider>
    </ThemeProvider>
  );
};

export default Wrapper;

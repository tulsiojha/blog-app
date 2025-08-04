"use client";

import Header from "@/components/header";
import Sidebar from "@/components/sidebar";
import { AuthProvider } from "@/hooks/use-auth";
import { ReactNode } from "react";

const Dash = ({ children }: { children?: ReactNode }) => {
  return (
    <AuthProvider>
      <div className="grid grid-cols-1 grid-rows-[68px] lg:grid-rows-1 lg:grid-cols-[250px_auto] h-full">
        <Header />
        <Sidebar />
        <div className="grid lg:pt-3">
          <div className="grid px-3 lg:border-1 border-tertiary-border  bg-secondary lg:rounded-tl-xl">
            {children}
          </div>
        </div>
      </div>
    </AuthProvider>
  );
};

export default Dash;

"use client";

import Header from "@/components/header";
import Sidebar from "@/components/sidebar";
import { ReactNode } from "react";

const Dash = ({ children }: { children?: ReactNode }) => {
  return (
    <div className="h-full">
      <Header />
      <Sidebar />
      <div className="grid lg:pt-3 lg:pl-[250px] h-full bg-secondary">
        <div className="grid px-3 lg:border-1 border-tertiary-border  bg-secondary lg:rounded-tl-xl">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Dash;

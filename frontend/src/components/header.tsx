"use client";

import { Menu, PowerCircle, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { menuItems } from "./sidebar";
import useAuth from "@/hooks/use-auth";
import Link from "next/link";
import { cn } from "@/utils/commons";
import Button from "./button";
import ThemeToggle from "./theme-toggle";

const Header = () => {
  const [open, setOpen] = useState(false);
  const path = usePathname();
  const { logout } = useAuth();

  const [logoutLoading, setLogoutLoading] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [path]);

  return (
    <nav className="border-b-2 border-tertiary-border bg-surface h-[68px] flex items-center px-5 lg:hidden">
      <div className="flex flex-row justify-between items-center w-full">
        <div className="font-bold text-primary">Blog app</div>
        <button
          className="p-3 flex items-center justify-center text-text-secondary"
          onClick={() => {
            setOpen((p) => !p);
          }}
          disabled={logoutLoading}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      {open ? (
        <div className="fixed inset-0 z-[999999] bg-tertiary top-[68px] p-4 text-text-secondary">
          <ul>
            {menuItems.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.to}
                  className={cn(
                    "px-3 py-2 flex flex-row gap-2 items-center rounded-lg",
                    {
                      "bg-tertiary-active": path.includes(item.to),
                      "hover:bg-surface-hover": !path.includes(item.to),
                      "pointer-events-none": logoutLoading,
                    },
                  )}
                >
                  {item.icon}
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
          <div className="px-5">
            <ThemeToggle />
          </div>
          <Button
            className="!p-5 flex items-center justify-center gap-2 border border-tertiary-border rounded w-full mt-5 text-text-secondary"
            variant="secondary"
            loading={logoutLoading}
            onClick={async () => {
              setLogoutLoading(true);
              logout();
              setOpen(false);
              setLogoutLoading(false);
            }}
          >
            <PowerCircle size={20} />
            <span>Logout</span>
          </Button>
        </div>
      ) : null}
    </nav>
  );
};

export default Header;

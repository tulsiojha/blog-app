"use client";
import { cn } from "@/utils/commons";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { List, Pen } from "lucide-react";
import ProfileMenu from "./profile-menu";
import ThemeProvider from "@/hooks/use-theme";
import ThemeToggle from "./theme-toggle";

export const menuItems = [
  {
    name: "List posts",
    icon: <List size={16} />,
    to: "/dashboard/posts",
  },
  {
    name: "Create post",
    icon: <Pen size={16} />,
    to: "/dashboard/create-post",
  },
];
const Sidebar = () => {
  const pathname = usePathname();
  return (
    <nav className="hidden flex-col px-4 bg-tertiary lg:flex fixed left-0 top-0 bottom-0">
      <div className="font-bold text-2xl py-5 flex items-center text-primary">
        Blog app
      </div>
      <div className="text-sm text-text-secondary/50 mb-3">Menu</div>
      <ul className="flex-1">
        {menuItems.map((item) => (
          <li key={item.name}>
            <Link
              href={item.to}
              className={cn(
                "px-3 py-2 flex flex-row gap-2 items-center rounded-lg text-text-secondary",
                {
                  "bg-tertiary-active": pathname.includes(item.to),
                  "hover:bg-surface-hover": !pathname.includes(item.to),
                },
              )}
            >
              {item.icon}
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
      <ThemeToggle />
      <ProfileMenu />
    </nav>
  );
};

export default Sidebar;

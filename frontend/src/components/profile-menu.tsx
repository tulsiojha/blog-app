"use client";
import React, { ReactNode, useEffect, useState } from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import useAuth from "@/hooks/use-auth";
import { IUser } from "@/utils/types";
import { ChevronsUpDown, PowerCircle, User2 } from "lucide-react";

const getInitials = (user: IUser | null) => {
  if (!user) {
    return <User2 size={14} />;
  }
  const initial = user.first_name[0] + user.last_name[0];
  return initial.toUpperCase();
};

const ProfileMenu = () => {
  const [initials, setInitials] = useState<ReactNode>(null);
  const { logout, user } = useAuth();

  const handleLogout = async () => {
    logout();
  };

  useEffect(() => {
    setInitials(getInitials(user) || "");
  }, [user]);

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button className="border-t-1 -mx-4 px-2 min-w-[233px] h-[57px] border-tertiary-border py-2 flex flex-row items-center gap-2 cursor-pointer hover:bg-tertiary-hover">
          {initials ? (
            <>
              <div className="font-bold rounded-full flex items-center justify-center bg-pink-400 h-10 w-10 text-white">
                {initials}
              </div>
              <div className="flex flex-col items-start flex-1">
                <span className="text-sm font-bold text-text-secondary">
                  {user?.first_name} {user?.last_name}
                </span>
                <span className="text-xs text-text-secondary">
                  {user?.email}
                </span>
              </div>
              <div>
                <ChevronsUpDown size={20} />
              </div>
            </>
          ) : null}
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className="min-w-[220px] rounded-md bg-secondary border-1 border-secondary-border p-[5px] shadow-2xl will-change-[opacity,transform]"
          sideOffset={5}
        >
          <DropdownMenu.Item
            className="cursor-pointer group relative flex select-none flex-row items-center gap-2 p-2 rounded-[3px] leading-none text-text-secondary outline-none data-[disabled]:pointer-events-none hover:bg-surface-hover"
            onSelect={handleLogout}
          >
            <PowerCircle size={16} />
            Logout
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

export default ProfileMenu;

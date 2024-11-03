"use client";

import { Loader2, LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import { useState } from "react";

type LogOutButtonProps = {
  keepDropdownOpen?: boolean;
};

export default function LogAuth({ keepDropdownOpen }: LogOutButtonProps) {
  const [isPending, setIsPending] = useState(false);

  const handleClick = async (event: React.MouseEvent) => {
    if (keepDropdownOpen) {
      event.stopPropagation();
    }
    setIsPending(true);
    await signOut();
    setIsPending(false);
  };

  return (
    <div
      className="flex w-full cursor-pointer items-center gap-2 px-2"
      onClick={handleClick}
    >
      {isPending ? <Loader2 className="mr-2 size-4 animate-spin" /> : null}
      <LogOut width={16} height={16} /> Logout
    </div>
  );
}

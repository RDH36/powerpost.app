import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Wallet } from "lucide-react";
import Image from "next/image";
import LogAuth from "../../auth/LogOutButton";

type UserProps = {
  name?: string | null;
  email?: string | null;
  image?: string | null;
};

export default function User({ name, image }: UserProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="focus:outline-none focus:ring focus:ring-primary/10">
        <div className="flex w-full items-center justify-center gap-2 rounded-md border border-gray-500/50 p-1 px-2">
          <p className="text-sm ">{name}</p>
          <Avatar className="size-6">
            <Image
              src={image || "/avatar-placeholder.svg"}
              width={64}
              height={64}
              alt={name || "User avatar"}
              className="rounded-full"
            />
            <AvatarFallback className="text-xs">
              {name?.split(" ")[0].charAt(0).toLocaleUpperCase()}
              {name?.split(" ")[1].charAt(0).toLocaleUpperCase()}
            </AvatarFallback>
          </Avatar>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-52">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="flex cursor-pointer items-center gap-1 px-4">
          <Wallet width={16} height={16} />
          <p className="ml-2">Billing</p>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <LogAuth keepDropdownOpen />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

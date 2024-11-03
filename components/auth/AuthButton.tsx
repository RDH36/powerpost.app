"use client";

import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { signIn } from "next-auth/react";
import { useState } from "react";

export default function AuthButton() {
  const [isPending, setIsPending] = useState(false);
  return (
    <div>
      <Button
        className="rounded-sm font-medium text-white"
        onClick={async () => {
          setIsPending(true);
          await signIn();
          setIsPending(false);
        }}
      >
        {isPending ? <Loader2 className="mr-2 size-4 animate-spin" /> : null}
        Login
      </Button>
    </div>
  );
}

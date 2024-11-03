import AuthButton from "@/components/auth/AuthButton";
import User from "@/components/features/user/User";
import { ThemeToggle } from "@/components/themes/ThemeToggle";
import { getAuthSession } from "@/lib/auth";

import Link from "next/link";

export async function Header() {
  const session = await getAuthSession();

  const user = session?.user ? <User {...session.user} /> : <AuthButton />;

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background px-3">
      <div className="mt-0 flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <div className="flex items-center gap-2">
          <Link href="/" className="text-xl font-bold">
            PowerPost
          </Link>
        </div>

        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-1">
            {user}
            <ThemeToggle />
          </nav>
        </div>
      </div>
    </header>
  );
}

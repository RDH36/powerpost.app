// app/layout.
import { Header } from "@/components/features/header/Header";
import Link from "next/link";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex h-full flex-col gap-3 bg-background">
      <Header />
      <nav className="px-3">
        <ul className="flex space-x-4">
          <li>
            <Link href="/dashboard/">Created posts</Link>
          </li>
          <li>
            <Link href="/dashboard/new-post">New post</Link>
          </li>
        </ul>
      </nav>
      {children}
    </main>
  );
}

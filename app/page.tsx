import Link from "next/link";

export default function Home() {
  return (
    <div className="size-full p-4">
      <Link href="/dashboard"> Dashboard </Link>
    </div>
  );
}

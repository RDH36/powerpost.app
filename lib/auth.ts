import { authConfig } from "@/src/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export const getAuthSession = () => {
  return getServerSession(authConfig);
};

export const requireAuth = async () => {
  const session = await getAuthSession();
  if (!session?.user) {
    redirect("/");
  }
};

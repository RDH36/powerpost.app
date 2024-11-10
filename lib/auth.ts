import { authConfig } from "@/src/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";

export const getAuthSession = () => {
  return getServerSession(authConfig);
};

export const requireAuth = async () => {
  const session = await getAuthSession();
  if (session?.user) {
    return session.user;
  }

  throw new Error("Need to be authenticated");
};

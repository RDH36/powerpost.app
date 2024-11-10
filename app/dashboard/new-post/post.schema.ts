import { LANGUAGE } from "@/app/dashboard/new-post/post.const";
import { PostMode } from "@prisma/client";
import { z } from "zod";

export const PowerPostSchema = z.object({
  sourceUrl: z.string().url({ message: "Please enter a valid URL" }),
  mode: z.nativeEnum(PostMode),
  language: z.enum(Object.keys(LANGUAGE) as [keyof typeof LANGUAGE]),
});

export type PostSchema = z.infer<typeof PowerPostSchema>;

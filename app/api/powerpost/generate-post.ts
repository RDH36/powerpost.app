import { openai } from "@/lib/openai";
import { PostMode } from "@prisma/client";
import { generatePostMode } from "./generate-post-mode";

export const generatePost = async (params: {
  markdown: string;
  mode: PostMode;
  language: string;
}) => {
  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content: generatePostMode({
          language: params.language,
          mode: params.mode,
        }),
      },
      {
        role: "user",
        content: params.markdown,
      },
    ],
  });
  const post = completion.choices[0].message.content;

  if (!post) {
    throw new Error("Failed to generate post");
  }

  return post;
};

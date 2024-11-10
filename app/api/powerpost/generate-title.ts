import { openai } from "@/lib/openai";

export const generateTitle = async ({
  powerpost,
  language,
}: {
  powerpost: string;
  language: string;
}) => {
  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content: `context:
        You are Title Generator, an application that takes a post and generates a perfect title.
        You are an expert of SEO to create a title that will be clicked by the reader and perfect for the post.
        
        Goal: 
        You need to create the perfect title for the post.
        
        Criteria: 
        - The title must be catchy and SEO friendly.
        - The title must be related to the content of the post.
        - The title must be short and easy to read 60 caractere maximun.
        - The title MUST include the main points of the post.
        - you never add the author name in the title.
        - you never add the word "post" or "article" in the title.
        - you never add the word "summary" in the title.
        - you never add the word "PowerPost" in the title.
        - you never add " or ' in the title, you only return the title in plain text.
        - the title must be in ${language} language.`,
      },
      {
        role: "user",
        content: powerpost,
      },
    ],
  });
  const title = completion.choices[0].message.content;

  if (!title) {
    throw new Error("Failed to generate post");
  }

  return title;
};

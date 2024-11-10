import { PowerPostSchema } from "@/app/dashboard/new-post/post.schema";
import { requireAuth } from "@/lib/auth";
import prisma from "@/src/db/prisma";
import { NextResponse } from "next/server";
import { generatePost } from "./generate-post";
import { generateTitle } from "./generate-title";
import { postScrap } from "./post-scrap";

export const POST = async (req: Request) => {
  try {
    const session = await requireAuth();
    const body = await req.json();
    const data = PowerPostSchema.parse(body);

    const { markdown } = await postScrap(data.sourceUrl);

    const powerpost = await generatePost({
      markdown,
      mode: data.mode,
      language: data.language,
    });
    const title = await generateTitle({ powerpost, language: data.language });

    const savePost = await prisma.post.create({
      data: {
        title,
        content: markdown,
        powerPost: powerpost,
        source: data.sourceUrl,
        mode: data.mode,
        userId: session.id,
      },
    });

    if (!savePost) {
      throw new Error("Failed to save post");
    }

    return NextResponse.json({
      title,
      powerpost,
    });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        {
          error: error.message,
        },
        { status: 400 }
      );
    }
  }
};

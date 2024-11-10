import { load } from "cheerio";
import { NodeHtmlMarkdown } from "node-html-markdown";

const nhm = new NodeHtmlMarkdown({}, undefined, undefined);

export async function postScrap(
  sourceUrl: string
): Promise<{ markdown: string; url: string }> {
  const acrticle = await fetch(sourceUrl).then((res) => res.text());
  const $ = load(acrticle);
  const articleHtml =
    $("article").html() ||
    $(".prose").html() ||
    $(".content").html() ||
    $("#content").html() ||
    $(".article").html() ||
    $(".post").html() ||
    $("main").html() ||
    $("body").html();

  if (!articleHtml) {
    throw new Error("No article content found");
  }

  const markdown = nhm.translate(articleHtml);

  const $head = $("head");

  const url =
    $head.children("meta[property='og:image']").attr("content") ||
    $head.children("meta[name='og:image']").attr("content") ||
    $head.children("meta[name='twitter:image']").attr("content") ||
    $head.children("meta[name='twitter:image:src']").attr("content");

  if (!url) {
    throw new Error("No url content found");
  }
  return { markdown, url };
}

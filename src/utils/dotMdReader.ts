import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const sourceDirectory = path.join(process.cwd(), "source-docs");

interface BlogPost {
  slug: string;
  title: string;
  date: any;
}

export function getMdPostData() {
  // get file names under source-docs
  const fileNames = fs.readdirSync(sourceDirectory);
  const allPostsData = fileNames.map((fileName) => {
    // Remove ".md" from file name and get slug
    const slug = fileName.replace(/\.md$/, "");

    // Read markdown file as string
    const fullPath = path.join(sourceDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);
    const blogPost: BlogPost = {
      slug,
      title: matterResult.data.title,
      date: matterResult.data["ms.date"],
    };

    // Combine the date with the slug
    return blogPost;
  });

  // Sort posts by date
  return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getPostData(slug: string) {
  const fullPath = path.join(sourceDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);

  const contentHtml = processedContent.toString();

  const mdWithHtml: BlogPost & { contentHtml: string } = {
    slug,
    title: matterResult.data.title,
    date: matterResult.data["ms.date"],
    contentHtml,
  };

  // Combine the data with the slug
  return mdWithHtml;
}

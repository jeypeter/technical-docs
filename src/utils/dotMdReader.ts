import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import { MdSourceTree, MdFileData } from "@/components/dataTypes/MainContext";

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

export async function getPostContent(mdFilePath: string) {
  const fileDir = path.join(process.cwd(), mdFilePath);

  // console.log("fileDir", fileDir);

  const fullPath = path.join(`${fileDir}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);

  const contentHtml = processedContent.toString();

  const mdWithHtml: BlogPost & { contentHtml: string } = {
    slug: mdFilePath,
    title: matterResult.data.title || "",
    date: matterResult.data["ms.date"] || "",
    contentHtml,
  };

  // Combine the data with the slug
  return mdWithHtml;
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

type FileTree = {
  tree: [
    {
      path: string;
    },
  ];
};

export async function getPostByName(
  fileName: string,
): Promise<MdFileData | undefined> {
  const res = await fetch(
    `https://raw.githubusercontent.com/gitdagray/test-blogposts/main/${fileName}`,
    {
      headers: {
        Accept: "application/vnd.github+json",
        Authorization: `Bearer ${process.env.GITHUB_ACCESS_TOKEN}`,
        "X-GitHub-Api-Version": "2022-11-28",
      },
    },
  );

  if (!res.ok) return undefined;

  const rawMD = await res.text();

  if (rawMD === "404: Not Found") return undefined;
  return rawMD;
}

export async function getMdFilesSourceTree(): Promise<
  MdSourceTree[] | undefined
> {
  // const res = await fetch("https://api.github.com/repos/peterjey/technical-docs/contents/source-docs")
  const res = await fetch(
    "https://api.github.com/repos/gitdagray/test-blogposts/git/trees/main?recursive=1",
    {
      headers: {
        Accept: "application/vnd.github+json",
        Authorization: `Bearer ${process.env.GITHUB_ACCESS_TOKEN}`,
        "X-GitHub-Api-Version": "2022-11-28",
      },
    },
  );

  if (!res.ok) return undefined;

  const repoFiletree: FileTree = res.json;

  const filesArray = repoFiletree.tree
    .map((obj) => obj.path)
    .filter((_path) => _path.endsWith(".md"));

  const posts: MdSourceTree[] = [];

  filesArray.forEach((file) => {
    const post = getPostByName(file);
    if (post) {
      const { meta } = post;
      posts.push(meta);
    }
  });

  // for (const file of filesArray) {
  //   const post = await getPostByName(file);
  //   if (post) {
  //     const { meta } = post;
  //     posts.push(meta);
  //   }
  // }

  // Sort posts by date
  return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
}

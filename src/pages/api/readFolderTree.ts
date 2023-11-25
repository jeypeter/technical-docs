// pages/api/readFolder.js
import fs from "fs";
import path from "path";

const readFolderRecursive = (folderPath: string) => {
  const stats = fs.statSync(folderPath);

  if (!stats.isDirectory()) {
    return {
      type: "file",
      name: path.basename(folderPath),
    };
  }

  const folderContents = fs.readdirSync(folderPath);
  const folderTree = {
    type: "folder",
    name: path.basename(folderPath),
    children: [],
  };

  folderContents.forEach((item) => {
    const itemPath = path.join(folderPath, item);
    const child = readFolderRecursive(itemPath);
    folderTree.children.push(child);
  });

  return folderTree;
};

export default function handler(req, res) {
  const rootDir = path.join(process.cwd(), "content"); // Change this to your desired directory

  try {
    const folderTree = readFolderRecursive(rootDir);
    // console.log("folderTree", folderTree);

    res.status(200).json({ folderTree });
  } catch (error) {
    console.error("Error reading folder:", error);
    res.status(500).json({ message: "Error reading folder." });
  }
}

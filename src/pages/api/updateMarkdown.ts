import fs from "fs";
import path from "path";

export default function handler(req: any, res: any) {
  const { filename, content } = req.body; // Assuming you're sending the filename and updated content in the request body

  const filePath = path.join(process.cwd(), "public/source-docs", filename);

  try {
    fs.writeFileSync(filePath, content);

    res.status(200).json({ message: `File ${filename} updated successfully!` });
  } catch (error) {
    console.log("Error updating file:", error);
    res.status(500).json({ message: "Error updating file." });
  }
}

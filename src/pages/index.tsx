import React from "react";
import { Grid, Box, Button } from "@mui/material";
import { getMdPostData } from "@/utils/dotMdReader";
import { GetServerSideProps } from "next";
import dynamic from "next/dynamic";
import CustomizedBreadcrumbs from "@/components/CustomizedBreadcrumbs";

import AuthenticatedLayout from "../layouts/AuthenticatedLayout";

const MarkdownPreviewEdit = dynamic(
  () => import("../components/MarkdownPreviewEdit"),
  {
    ssr: false,
  },
);

export default function Index({ navTree }) {
  const filePath = "source-docs/razor-pages-start.md";
  const [isEditing, setIsEditing] = React.useState(false);

  const [markdownContent, setMarkdownContent] = React.useState("");

  React.useEffect(() => {
    const fetchMarkdownContent = async () => {
      try {
        const response = await fetch(filePath);
        const text = await response.text();
        setMarkdownContent(text);
      } catch (error) {
        console.error("Error fetching Markdown content:", error);
      }
    };

    fetchMarkdownContent();
  }, [filePath]);

  const handleTextareaChange = (event) => {
    setMarkdownContent(event.target.value);
  };

  const updateMdFileLocally = async (filename, content) => {
    try {
      const response = await fetch("/api/updateMarkdown", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ filename, content }),
      });

      const data = await response.json();
      console.log(data.message); // Output: File example.md updated successfully!
    } catch (error) {
      console.error("Error updating file:", error);
    }
  };

  const updateMdFileOnGithub = async () => {
    const owner = "peterjey"; // Replace 'username' with the GitHub username or organization name
    const repo = "technical-docs"; // Replace 'repository-name' with the repository where you want to create the file
    const path = "source-docs/razor-pages-start.md"; // Path to the new file in the repository
    const message = "Updated razor-pages-start.md file"; // Commit message
    const content = btoa(markdownContent); // Base64-encoded content of the file

    const token = "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"; // Replace with your personal access token

    const apiUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`;

    fetch(apiUrl, {
      method: "PUT",
      headers: {
        Authorization: `token ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message,
        content,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("File created:", data);
      })
      .catch((error) => {
        console.error("Error creating file:", error);
      });
  };

  const handleEditToggle = async () => {
    if (isEditing === true) {
      // update the file locally in the public folder
      // update the file on github
      await updateMdFileLocally("razor-pages-start.md", markdownContent);
      // await updateMdFileOnGithub();
    }
    setIsEditing((prevIsEditing) => !prevIsEditing);
  };

  return (
    <AuthenticatedLayout color="" navTree={navTree}>
      <Box height="80vh">
        <CustomizedBreadcrumbs />
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Button variant="contained" onClick={handleEditToggle}>
              {isEditing ? "Preview" : "Edit"}
            </Button>
          </Grid>

          <MarkdownPreviewEdit
            markdownContent={markdownContent}
            isEditing={isEditing}
            handleTextareaChange={handleTextareaChange}
            setMarkdownContent={setMarkdownContent}

            // value={values.description || ""}
            // error={!!errors.description && touched.description}
            // helperText={errors.description || null}
            // onChange={(enteredValue) => {
            //   setFieldValue("description", enteredValue, true);
            // }}
            // height={500}
            // sx={{
            //   margin: 1.25,
            // }}
          />
        </Grid>
      </Box>
    </AuthenticatedLayout>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  type BlogPost = {
    slug: string;
    title: string;
    date: string;
  };
  const navTree: BlogPost = getMdPostData();

  console.log("navTree", navTree);
  return {
    props: {
      navTree,
    },
  };
};

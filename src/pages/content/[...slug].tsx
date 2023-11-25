import React from "react";
import { Grid, Box, Typography } from "@mui/material";
import { getPostContent } from "@/utils/dotMdReader";
import { GetServerSideProps } from "next";
import CustomizedBreadcrumbs from "@/components/CustomizedBreadcrumbs";
import { MuiMarkdown, getOverrides } from "mui-markdown";
import Contribution from "../../components/Contribution";
import AuthenticatedLayout from "../../layouts/AuthenticatedLayout";

export default function Index({
  navTree,
  mdFilePath,
  treeResult,
  title,
  date,
  contentHtml,
}) {
  // const [isEditing, setIsEditing] = React.useState(false);
  return (
    <AuthenticatedLayout color="" navTree={navTree} treeResult={treeResult}>
      <Box height="80vh">
        <CustomizedBreadcrumbs />
        <Grid container spacing={1}>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Typography>{title}</Typography>
              <Typography>{date}</Typography>
            </Grid>
            <Grid item xs={12}>
              <MuiMarkdown
                overrides={{
                  ...getOverrides({}), // This will keep the other default overrides.
                  h1: {
                    component: "p",
                    props: {
                      style: { color: "#d987d5" },
                    },
                  },
                }}
              >
                {contentHtml}
              </MuiMarkdown>
              {/* <section dangerouslySetInnerHTML={{ __html: contentHtml }} /> */}
            </Grid>
            <Grid>
              <Contribution mdFilePath={mdFilePath} />
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </AuthenticatedLayout>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const mdFilePath = context.resolvedUrl;
  // console.log("context", context.resolvedUrl);
  let treeResult = "";
  const fetchData = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/readFolderTree`,
        {
          method: "GET",
        },
      );

      const data = await response.json();

      treeResult = data.folderTree;
    } catch (error) {
      console.error("Error fetching folder tree:", error);
    }
  };

  await fetchData();

  const { title, date, contentHtml } = await getPostContent(mdFilePath);

  // console.log("contentHtml", contentHtml);

  return {
    props: {
      title,
      date,
      contentHtml,
      treeResult,
      mdFilePath,
    },
  };
};

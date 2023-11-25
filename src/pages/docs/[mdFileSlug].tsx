import React from "react";
import { Grid, Box, Typography } from "@mui/material";
import { getMdPostData, getPostData } from "@/utils/dotMdReader";
import { GetServerSideProps } from "next";
// import { MuiMarkdown, getOverrides } from "mui-markdown";
import AuthenticatedLayout from "../../layouts/AuthenticatedLayout";

export default function Index({ navTree, title, date, contentHtml }) {
  return (
    <AuthenticatedLayout color="#F9F9F9" navTree={navTree} treeResult={}>
      <Box height="80vh">
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Typography>{title}</Typography>
            <Typography>{date}</Typography>
          </Grid>
          <Grid item xs={12}>
            {/* <MuiMarkdown
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
            </MuiMarkdown> */}
            <section dangerouslySetInnerHTML={{ __html: contentHtml }} />
          </Grid>
        </Grid>
      </Box>
    </AuthenticatedLayout>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { mdFileSlug } = query;

  type BlogPost = {
    slug: string;
    title: string;
    date: string;
  };
  const navTree: BlogPost = getMdPostData();
  const { title, date, contentHtml } = await getPostData(mdFileSlug);

  // console.log("navTree", navTree);
  // console.log("mdFileSlug", mdFileSlug);
  // console.log("title", title);
  // console.log("contentHtml", contentHtml);
  return {
    props: {
      navTree,
      title,
      date,
      contentHtml,
    },
  };
};

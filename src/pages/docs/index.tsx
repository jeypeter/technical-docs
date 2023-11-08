import React from "react";
import { Grid, Box, Typography } from "@mui/material";
import { getMdPostData } from "@/utils/dotMdReader";
import { GetServerSideProps } from "next";
import AuthenticatedLayout from "../../layouts/AuthenticatedLayout";

export default function Index({ navTree }) {
  return (
    <AuthenticatedLayout color="#F9F9F9" navTree={navTree}>
      <Box height="80vh">
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Typography>Default docs landing page</Typography>
          </Grid>
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

  // console.log("navTree", navTree);
  return {
    props: {
      navTree,
    },
  };
};

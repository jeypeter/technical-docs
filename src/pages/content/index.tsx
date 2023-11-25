import React from "react";
import { Grid, Box, Typography } from "@mui/material";
import { GetServerSideProps } from "next";
import AuthenticatedLayout from "../../layouts/AuthenticatedLayout";

export default function Index({ navTree, treeResult }) {
  return (
    <AuthenticatedLayout
      color="#F9F9F9"
      navTree={navTree}
      treeResult={treeResult}
    >
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
  return {
    props: {
      treeResult,
    },
  };
};

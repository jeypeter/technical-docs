import React from "react";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { styled, useTheme } from "@mui/material/styles";
import { useRouter } from "next/router";
import List from "@mui/material/List";
import NextLink from "next/link";

const ListItemContent = styled(ListItem)(() => ({
  padding: "5px 8px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontStyle: "normal",
  fontWeight: "400",
  fontSize: "14px",
  lineHeight: "150%",
  color: "rgba(0, 0, 0, 0.5)",
  "&:hover": {
    cursor: "pointer",
  },
}));

export default function SideBar({ navTree }) {
  const router = useRouter();
  const { asPath } = router;
  const theme = useTheme();
  // console.log("SideBar", navTree);

  return (
    <List>
      {navTree &&
        navTree.map((navItem: any) => (
          <NextLink
            href={`/docs/${navItem?.slug}`}
            key={navItem?.slug}
            legacyBehavior
          >
            <ListItemContent
              sx={{
                background: `${
                  asPath === `${navItem?.slug}`
                    ? "rgba(47, 197, 109, 0.05)"
                    : ""
                }`,
                borderLeft: `${
                  asPath === `${navItem?.slug}` ? "4px solid #2FC56D" : ""
                }`,
                borderRadius: `${
                  asPath === `${navItem?.slug}` ? "0px 4px 4px 0px" : ""
                }`,
              }}
            >
              <ListItemText
                className="line-clamp"
                primary={navItem?.title}
                sx={{
                  whiteSpace: "nowrap",
                  color:
                    asPath === `${navItem?.slug}`
                      ? theme.palette.secondary.main
                      : "inherit",
                  "& .MuiListItemText-primary": {
                    fontWeight: asPath === `${navItem?.slug}` ? 400 : "inherit",
                  },
                }}
              />
            </ListItemContent>
          </NextLink>
        ))}
    </List>
  );
}

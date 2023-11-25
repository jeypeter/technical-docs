import React from "react";
import ListItem from "@mui/material/ListItem";
import Button from "@mui/material/Button";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import {
  UploadFileOutlined,
  FolderOutlined,
  FileCopyOutlined,
} from "@mui/icons-material";
import { styled, useTheme } from "@mui/material/styles";
import { useRouter } from "next/router";
import List from "@mui/material/List";
import NextLink from "next/link";
import Box from "@mui/material/Box";

import SvgIcon, { SvgIconProps } from "@mui/material/SvgIcon";

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

function MinusSquare(props: SvgIconProps) {
  return (
    <SvgIcon fontSize="inherit" style={{ width: 14, height: 14 }} {...props}>
      <path d="M22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0zM17.873 11.023h-11.826q-.375 0-.669.281t-.294.682v0q0 .401.294 .682t.669.281h11.826q.375 0 .669-.281t.294-.682v0q0-.401-.294-.682t-.669-.281z" />
    </SvgIcon>
  );
}

function PlusSquare(props: SvgIconProps) {
  return (
    <SvgIcon fontSize="inherit" style={{ width: 14, height: 14 }} {...props}>
      <path d="M22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0zM17.873 12.977h-4.923v4.896q0 .401-.281.682t-.682.281v0q-.375 0-.669-.281t-.294-.682v-4.896h-4.923q-.401 0-.682-.294t-.281-.669v0q0-.401.281-.682t.682-.281h4.923v-4.896q0-.401.294-.682t.669-.281v0q.401 0 .682.281t.281.682v4.896h4.923q.401 0 .682.281t.281.682v0q0 .375-.281.669t-.682.294z" />
    </SvgIcon>
  );
}

export default function SideBar({ navTree, treeResult }) {
  const router = useRouter();
  const { asPath } = router;
  const theme = useTheme();
  const [expandedFolders, setExpandedFolders] = React.useState(["content"]); // the rootFolder (content) to be oppended by default

  // console.log("treeResult", treeResult);

  interface RenderTree {
    id: string;
    name: string;
    children?: readonly RenderTree[];
  }

  const toggleCollapse = (folderName) => {
    setExpandedFolders((prevExpandedFolders) => {
      if (prevExpandedFolders.includes(folderName)) {
        return prevExpandedFolders.filter((folder) => folder !== folderName);
      }
      return [...prevExpandedFolders, folderName];
    });
  };

  const renderNode = (node, currentPath = "") => {
    const folderPath = `${currentPath}/${node.name}`;

    if (node.type === "file") {
      return (
        <NextLink href={`${folderPath.replace(/\.md$/, "")}`} legacyBehavior>
          {node.name.replace(/\.md$/, "")}
        </NextLink>
      );
    }

    if (node.type === "folder") {
      const isExpanded = expandedFolders.includes(node.name);

      return (
        <Box key={node.name}>
          <Box style={{ display: "flex", alignItems: "center" }}>
            <IconButton onClick={() => toggleCollapse(node.name)}>
              {isExpanded ? <MinusSquare /> : <PlusSquare />}
            </IconButton>
            {node.name}
          </Box>
          {isExpanded && node.children && (
            <Box style={{ marginLeft: "20px" }}>
              {node.children.map((child) => renderNode(child, folderPath))}
            </Box>
          )}
        </Box>
      );
    }

    return null;
  };

  return (
    <List>
      <ListItem>
        <Button
          variant="outlined"
          color="primary"
          startIcon={<UploadFileOutlined />}
        >
          Upload
        </Button>
        <Button
          variant="outlined"
          color="primary"
          startIcon={<FolderOutlined />}
        >
          New
        </Button>
        <Button
          variant="outlined"
          color="primary"
          startIcon={<FileCopyOutlined />}
        >
          New
        </Button>
      </ListItem>

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

      <ListItem>
        <div>{renderNode(treeResult)}</div>
      </ListItem>
    </List>
  );
}

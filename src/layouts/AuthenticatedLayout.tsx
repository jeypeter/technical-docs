import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import SideBar from "./SideBar";
import AdminTopToolbar from "./AdminTopToolbar";

const drawerWidth = 350;

export default function AuthenticatedLayout({
  children,
  color,
  navTree,
}: {
  children: React.ReactNode;
  color: string;
  navTree;
}) {
  return (
    <Box sx={{ display: "flex", background: color }}>
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          "&.MuiPaper-root": {
            boxShadow: "none",
            background: (theme) => theme.palette.primary.light,
          },
        }}
      >
        <AdminTopToolbar />
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
            padding: "4px",
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: "auto" }}>
          <SideBar navTree={navTree} />
        </Box>
      </Drawer>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          mx: "auto",
          maxWidth: "lg",
        }}
      >
        <Toolbar />
        <Box>{children}</Box>
      </Box>
    </Box>
  );
}

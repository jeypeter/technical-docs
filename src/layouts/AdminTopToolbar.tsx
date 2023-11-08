import * as React from "react";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import PersonAdd from "@mui/icons-material/PersonAdd";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import NextLink from "next/link";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import { styled, useTheme } from "@mui/material/styles";
import SafaricomIconLogo from "../components/icons/SafaricomIconLogo";

const ToolbarContent = styled(Toolbar)(() => ({
  display: "flex",
  justifyContent: "flex-start",
  alignSelf: "center",
  width: "100%",
}));

export default function AdminTopToolbar() {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <ToolbarContent>
      <Box
        sx={{
          display: "flex",
          height: "32px",
          alignItems: "center",
          gap: "8px",
          color: `${theme.palette.white.main}`,
        }}
      >
        <SafaricomIconLogo />
        <Typography
          variant="h6"
          noWrap
          component="div"
          sx={{
            fontSize: "16px",
            fontStyle: "normal",
            fontWeight: "700",
            lineHeight: "20px",
            letterSpacing: "0.64px;",
          }}
        >
          Technical Docs
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexGrow: 1,
          alignItems: "center",
          textAlign: "center",
          justifyContent: "flex-end",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            textAlign: "center",
            width: "100%",
            justifyContent: "flex-end",
          }}
        >
          <Box
            sx={{ display: "flex", alignItems: "center", textAlign: "center" }}
          >
            <NextLink href="/" legacyBehavior>
              <Typography sx={{ minWidth: 100, cursor: "pointer" }}>
                Link
              </Typography>
            </NextLink>

            <NextLink href="/" legacyBehavior>
              <NotificationsOutlinedIcon sx={{ cursor: "pointer" }} />
            </NextLink>

            <Tooltip title="Account settings">
              <IconButton
                onClick={handleClick}
                size="small"
                sx={{
                  ml: 2,
                  color: "#fff",
                  "&.MuiIconButton-root": {
                    border: "none",
                    borderRadius: "0px",
                  },
                }}
                aria-controls={open ? "account-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
              >
                <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
                <Typography sx={{ padding: "0px 4px" }}>User Name</Typography>
                <KeyboardArrowDownIcon />
              </IconButton>
            </Tooltip>
          </Box>
          <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            PaperProps={{
              elevation: 0,
              sx: {
                overflow: "visible",
                filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                mt: 1.5,
                "& .MuiAvatar-root": {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
                "&:before": {
                  content: '""',
                  display: "block",
                  position: "absolute",
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: "background.paper",
                  transform: "translateY(-50%) rotate(45deg)",
                  zIndex: 0,
                },
              },
            }}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          >
            <MenuItem onClick={handleClose}>
              <Avatar /> Profile
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <Avatar /> My account
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleClose}>
              <ListItemIcon>
                <PersonAdd fontSize="small" />
              </ListItemIcon>
              Add another account
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <ListItemIcon>
                <Settings fontSize="small" />
              </ListItemIcon>
              Settings
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <ListItemIcon>
                <Logout fontSize="small" />
              </ListItemIcon>
              Logout
            </MenuItem>
          </Menu>
        </Box>
      </Box>
    </ToolbarContent>
  );
}

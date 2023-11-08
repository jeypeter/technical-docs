import { createTheme, colors } from "@mui/material";
import typography from "./typography";

const theme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 70,
          textTransform: "inherit",
          boxShadow: "none",
          "&.Mui-disabled": {
            background: "#DFE2E5",
            color: "#919EAB",
          },
          "&:hover": {
            backgroundColor: "#00892A",
          },
        },
        sizeSmall: {
          fontSize: 12,
          height: "2rem",
          padding: "2px 20px",
        },
        sizeMedium: {
          fontSize: 14,
          padding: "7px 33px",
          height: "2.25rem",
        },
        sizeLarge: {
          fontSize: 18,
          padding: "5px 32px",
          height: "2.5rem",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          width: "100%",
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      sd: 1100, // small desktops
      lg: 1200,
      xl: 1536,
    },
  },

  palette: {
    white: {
      main: "#FFFFFF",
    },
    black: {
      main: "#000000",
    },
    background: {
      dark: "#F4F6F8",
      light: " #f5f8fc",
      default: colors.common.white,
      paper: colors.common.white,
    },
    primary: {
      dark: "#005f1d",
      main: "#00892A",
      light: "#41AA28",
    },
    secondary: {
      dark: "#13542e",
      main: "#1C7943",
      light: "#499368",
    },
    tertiary: {
      dark: "#13542e",
      main: "#FF2A58",
      light: "#499368",
    },
    sector: {
      dark: "#13542e",
      main: "#9A4D00",
      light: "#499368",
    },
    success: {
      main: "#2CB34A",
      background: "rgba(56, 161, 105, 0.1)",
    },
    create: {
      main: "#477067",
      background: "rgba(71, 112, 103, 0.08)",
    },
    update: {
      main: "#637ED5",
      background: "rgba(99, 126, 213, 0.08)",
    },
    delete: {
      main: "#E93755",
      background: "rgba(233, 55, 85, 0.08)",
    },
    warning: {
      main: "#FFC700",
      background: "rgba(255, 199, 0, 0.1)",
    },
    error: {
      main: "#EF373E",
      background: "rgba(233, 55, 85, 0.05)",
    },
    text: {
      primary: "#262626",
      secondary: "#1a1a1a",
      dark: "#262626",
      link: "#00892A",
      textGray: "#475569",
      textMidGray: "#AAACA7",
    },
    border: {
      main: "#e7e7e7",
    },
  },
  typography,
});

export default theme;

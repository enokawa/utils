import { type FC, useState } from "react";

import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import GitHubIcon from "@mui/icons-material/GitHub";
import HomeIcon from "@mui/icons-material/Home";
import MenuIcon from "@mui/icons-material/Menu";
import BaseAppBar, { type AppBarProps } from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import BaseDrawer, { type DrawerProps } from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import { styled } from "@mui/material/styles";

import { Link } from "./Link";
import { Menu } from "./Menu";

const drawerWidth = 240;

const AppBar = styled(BaseAppBar, {
  shouldForwardProp: (prop) => prop !== "drawerWidth" && prop !== "open",
})<AppBarProps & { drawerWidth: number; open: boolean }>(({ theme, drawerWidth, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(BaseDrawer, {
  shouldForwardProp: (prop) => prop !== "drawerWidth" && prop !== "open",
})<DrawerProps & { drawerWidth: number; open: boolean }>(({ theme, drawerWidth, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    height: "100%",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

export const AppNavigation: FC = (props) => {
  const [open, setOpen] = useState(false);
  const toggleDrawer = () => setOpen(!open);

  return (
    <>
      <AppBar position="absolute" drawerWidth={drawerWidth} open={open}>
        <Toolbar
          sx={{
            pr: "24px", // keep right padding when drawer closed
            justifyContent: "space-between",
          }}
        >
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer}
            sx={{
              ...(open && { visibility: "hidden" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Link href="https://github.com/y13i/utils">
            <Button startIcon={<GitHubIcon />} sx={{ color: "white" }}>
              Source Code
            </Button>
          </Link>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" drawerWidth={drawerWidth} open={open}>
        <Toolbar
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            px: [1],
          }}
        >
          <IconButton>
            <Link href="/">
              <HomeIcon />
            </Link>
          </IconButton>
          <IconButton onClick={toggleDrawer}>
            <ChevronLeftIcon />
          </IconButton>
        </Toolbar>
        <Divider />
        <Menu disableTooltip={open} />
      </Drawer>
    </>
  );
};

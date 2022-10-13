import { useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import {
  Avatar,
  List,
  Tooltip,
  useMediaQuery,
  Container,
  Stack,
  Menu,
  MenuItem,
} from "@mui/material";
import { Outlet, useNavigate } from "react-router-dom";
import CustomListCollapse from "./CustomListCollapse";
import SchoolIcon from "@mui/icons-material/School";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";
import EmojiPeopleIcon from "@mui/icons-material/EmojiPeople";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import MeetingRoomOutlinedIcon from "@mui/icons-material/MeetingRoomOutlined";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import {
  DonOpportunitiesRoutes,
  EduOpportunitiesRoutes,
  VolOpportunitiesRoutes,
  AdminReportRoutes,
  AdminRoutes,
  AdminUserRoutes,
} from "./DrawerRoutes";
import NavListitem from "./NavListitem";
import { useSelector } from "react-redux";
import { signOut } from "firebase/auth";

import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import AssessmentIcon from "@mui/icons-material/Assessment";
import { motion } from "framer-motion";
// import Logo from "../../Assets/images/Logo.png";
const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-around",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  [theme.breakpoints.up("sm")]: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),

    ...(open && {
      marginLeft: drawerWidth,
      [theme.breakpoints.up("sm")]: {
        width: `calc(100% - ${drawerWidth}px)`,
      },
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  },
}));

const Drawer = styled(MuiDrawer)(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  [theme.breakpoints.up("sm")]: {
    ...(open && {
      ...openedMixin(theme),
      "& .MuiDrawer-paper": openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      "& .MuiDrawer-paper": closedMixin(theme),
    }),
  },
}));

export default function CustomDrawer() {
  const theme = useTheme();

  const { curruntUser, isLoggedIn } = useSelector((state) => state.user);
  const reslution = useMediaQuery(theme.breakpoints.down("sm"));
  const [open, setOpen] = useState(reslution ? false : true);
  const [anchor, setAnchor] = useState(false);
  const navigate = useNavigate();
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const closeNavigation = () => {
    //if resultion match only drawer auto lose when clik button
    if (reslution) {
      setOpen(false);
    }
  };

  const handleClick = (event) => {
    setAnchor(event.currentTarget);
  };

  const handleClose = (path) => {
    // if (path === "logout") {
    //   signOut(auth);
    //   setAnchor(false);
    // } else {
    //   navigate(path);
    //   setAnchor(false);
    // }
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" color="secondary" open={open}>
        <Toolbar>
          <Tooltip title="Open">
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{
                marginRight: 5,
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>
          </Tooltip>
          <Container maxWidth="xl">
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography variant="h6" noWrap component="div">
                Hello!
              </Typography>
              <IconButton
                aria-label="delete"
                onClick={handleClick}
                size="large"
              >
                <Avatar alt="Remy Sharp" src={""} />
              </IconButton>
            </Stack>
          </Container>
        </Toolbar>
      </AppBar>
      <Drawer variant={reslution ? "temporary" : "permanent"} open={open}>
        <DrawerHeader>
          <Stack direction="row" justifyContent="center" alignItems="center">
            {/* <Avatar alt="Logo" src={Logo} sx={{ width: 46, height: 46 }} /> */}
            <Typography
              variant="h5"
              color={theme.palette.primary.main}
              component="div"
            >
              C&M <Typography variant="caption">Constructions</Typography>
            </Typography>
          </Stack>
          <Tooltip title="Close">
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "rtl" ? (
                <ChevronRightIcon />
              ) : (
                <ChevronLeftIcon />
              )}
            </IconButton>
          </Tooltip>
        </DrawerHeader>
        <Divider />
        <List
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            flex: 1,
          }}
        >
          {/* {curruntUser?.role === "org" && ( */}
          <>
            <NavListitem
              label="Home"
              activeIcon={<MeetingRoomIcon />}
              icon={<MeetingRoomOutlinedIcon />}
              path="/"
            />
            <NavListitem
              label="Orders"
              activeIcon={<MeetingRoomIcon />}
              icon={<MeetingRoomOutlinedIcon />}
              path="/orders"
            />
            {/* <CustomListCollapse
                TitleIcon={<SchoolIcon />}
                TitleText="Education"
                Subheader="Education Opportunities"
                ListItems={EduOpportunitiesRoutes}
                onclicks={closeNavigation}
                DrawerStatus={open}
                path={["/edu", "/edu/response", "/edu/summury"]}
              />
              <Divider />
              <Divider />
              <CustomListCollapse
                TitleIcon={<EmojiPeopleIcon />}
                TitleText="Volunteering"
                Subheader="Volunteering Opportunities"
                ListItems={VolOpportunitiesRoutes}
                onclicks={closeNavigation}
                DrawerStatus={open}
                path={["/vol", "/vol/response", "/vol/summury"]}
              />
              <Divider />
              <Divider />
              <CustomListCollapse
                TitleIcon={<VolunteerActivismIcon />}
                TitleText="Donations"
                Subheader="Dontaions Opportunities"
                ListItems={DonOpportunitiesRoutes}
                onclicks={closeNavigation}
                DrawerStatus={open}
                path={["/don", "/don/response", "/don/summury"]}
              />
              <Divider />
            </>
          )}

          {curruntUser?.role === "admin" && (
            <>
              <CustomListCollapse
                TitleIcon={<AdminPanelSettingsIcon />}
                TitleText="Form Controll"
                Subheader="Admin Setting"
                ListItems={AdminRoutes}
                onclicks={closeNavigation}
                DrawerStatus={open}
                path="/interested"
              />
              <Divider />
              <CustomListCollapse
                TitleIcon={<ManageAccountsIcon />}
                TitleText="User Controll"
                Subheader="User Setting"
                ListItems={AdminUserRoutes}
                onclicks={closeNavigation}
                DrawerStatus={open}
                path="/usercontrol"
              />
              <CustomListCollapse
                TitleIcon={<AssessmentIcon />}
                TitleText="Analytics"
                Subheader="Analytics Reports"
                ListItems={AdminReportRoutes}
                onclicks={closeNavigation}
                DrawerStatus={open}
                path="/report"
              /> */}

            <Divider />
          </>
          {/* )} */}

          <Box sx={{ flex: 1 }}></Box>
          <NavListitem
            label="Log Out"
            activeIcon={<MeetingRoomIcon />}
            icon={<MeetingRoomOutlinedIcon />}
            path="logout"
          />
        </List>

        {/* <Menu
          id="simple-menu"
          anchorEl={anchor}
          keepMounted
          open={anchor}
          onClose={handleClose}
        >
          {curruntUser?.role != "admin" && (
            <MenuItem onClick={() => handleClose("/userprofile")}>
              My account
            </MenuItem>
          )}
          <MenuItem onClick={() => handleClose("logout")}>Logout</MenuItem>
        </Menu> */}
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3, marginTop: 10 }}>
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{
            opacity: 0,
            x: -100,
            transition: { duration: 0.1, ease: "easeIn", bounce: 0.5 },
          }}
        >
          <Outlet />
        </motion.div>
      </Box>
    </Box>
  );
}

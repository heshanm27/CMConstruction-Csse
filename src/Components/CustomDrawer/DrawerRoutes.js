import AssessmentIcon from "@mui/icons-material/Assessment";
import AssessmentOutlinedIcon from "@mui/icons-material/AssessmentOutlined";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import SettingsApplicationsOutlinedIcon from "@mui/icons-material/SettingsApplicationsOutlined";
import InboxIcon from "@mui/icons-material/Inbox";
import InboxOutlinedIcon from "@mui/icons-material/InboxOutlined";
export const EduOpportunitiesRoutes = [
  {
    label: "Manage",
    path: "/edu",
    icon: <SettingsApplicationsOutlinedIcon />,
    activeIcon: <SettingsApplicationsIcon />,
    component: "Warrenty",
  },
  {
    label: "Response",
    path: "/edu/response",
    icon: <InboxOutlinedIcon />,
    activeIcon: <InboxIcon />,
  },
  {
    label: "Summary",
    path: "/edu/summary",
    icon: <AssessmentOutlinedIcon />,
    activeIcon: <AssessmentIcon />,
    component: "Reports",
  },
];

export const DonOpportunitiesRoutes = [
  {
    label: "Manage",
    path: "/don",
    icon: <SettingsApplicationsOutlinedIcon />,
    activeIcon: <SettingsApplicationsIcon />,
    component: "Spare Parts",
  },
  {
    label: "Response",
    path: "/don/response",
    icon: <InboxOutlinedIcon />,
    activeIcon: <InboxIcon />,
  },
  {
    label: "Summary",
    path: "/don/summary",
    icon: <AssessmentOutlinedIcon />,
    activeIcon: <AssessmentIcon />,
    component: "Reports",
  },
];

export const VolOpportunitiesRoutes = [
  {
    label: "Manage",
    path: "/vol",
    icon: <SettingsApplicationsOutlinedIcon />,
    activeIcon: <SettingsApplicationsIcon />,
    component: "vehicle",
  },
  {
    label: "Response",
    path: "/vol/response",
    icon: <InboxOutlinedIcon />,
    activeIcon: <InboxIcon />,
  },
  {
    label: "Summary",
    path: "/vol/summary",
    icon: <AssessmentOutlinedIcon />,
    activeIcon: <AssessmentIcon />,
    component: "Reports",
  },
];

export const AdminRoutes = [
  {
    label: "Interested",
    path: "/interested",
    icon: <SettingsApplicationsOutlinedIcon />,
    activeIcon: <SettingsApplicationsIcon />,
    component: "Reports",
  },
];

export const AdminUserRoutes = [
  {
    label: "Settings",
    path: "/usercontrol",
    icon: <SettingsApplicationsOutlinedIcon />,
    activeIcon: <SettingsApplicationsIcon />,
    component: "vehicle",
  },
];
export const AdminReportRoutes = [
  {
    label: "Volunteer",
    path: "/adminvolreport",
    icon: <SettingsApplicationsOutlinedIcon />,
    activeIcon: <SettingsApplicationsIcon />,
    component: "vehicle",
  },
  {
    label: "Education",
    path: "/adminedureport",
    icon: <SettingsApplicationsOutlinedIcon />,
    activeIcon: <SettingsApplicationsIcon />,
    component: "vehicle",
  },
  {
    label: "Donation",
    path: "/admindonreport",
    icon: <SettingsApplicationsOutlinedIcon />,
    activeIcon: <SettingsApplicationsIcon />,
    component: "vehicle",
  },
];

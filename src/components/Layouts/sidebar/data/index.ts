import * as Icons from "../icons";

export const NAV_DATA = [
  {
    label: "MAIN MENU",
    items: [
      {
        title: "Overview",
        url: "/overview",
        icon: Icons.HomeIcon,
        items: [],
      },
      {
        title: "Projects",
        url: "/projects",
        icon: Icons.Table,
        items: [],
      },
      {
        title: "Insights",
        url: "/insights",
        icon: Icons.PieChart,
        items: [],
      },
      {
        title: "Content Lab",
        url: "/content-lab",
        icon: Icons.FourCircle,
        items: [],
      },
      {
        title: "Experiments",
        url: "/experiments",
        icon: Icons.Calendar,
        items: [],
      },
      {
        title: "Alerts",
        url: "/alerts",
        icon: Icons.Notification,
        items: [],
      },
      {
        title: "Integrations",
        url: "/integrations",
        icon: Icons.Alphabet,
        items: [],
      },
      {
        title: "Admin",
        url: "/admin",
        icon: Icons.Authentication,
        items: [],
      },
      {
        title: "Settings",
        url: "/settings",
        icon: Icons.Alphabet,
        items: [],
      },
    ],
  },
  // Keep an OTHERS group minimal or remove to streamline GENSHARK-AI nav
];

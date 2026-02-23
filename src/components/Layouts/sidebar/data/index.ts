import * as Icons from "../icons";

export const NAV_DATA = [
  {
    label: "MAIN MENU",
    items: [
      {
        title: "Overview",
        url: "/",
        icon: Icons.HomeIcon,
        items: [],
      },
      {
        title: "Content Intelligence",
        url: "/content-intelligence",
        icon: Icons.Table,
        items: [],
      },
      {
        title: "Content Health",
        url: "/content-health",
        icon: Icons.PieChart,
        items: [],
      },
      {
        title: "Trust & Opportunity",
        url: "/trust-opportunity",
        icon: Icons.FourCircle,
        items: [],
      },
      {
        title: "Page wise analysis",
        url: "/experiments",
        icon: Icons.Calendar,
        items: [],
      },
      {
        title: "Keywords and cluster",
        url: "/keywords-cluster",
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

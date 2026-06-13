import {
  FaHome,
  FaPlus,
  FaClipboardList,
  FaUsers,
  FaUser,
  FaCheckCircle,
  FaChartBar,
  FaHandsHelping,
} from "react-icons/fa";

export const Dashdata = [

  /* ================= ADMIN ================= */

  {
    id: 1,
    name: "Dashboard",
    path: "/admin",
    icon: FaHome,
    roles: ["admin"],
  },

  {
    id: 2,
    name: "All Donations",
    path: "/admin/donations",
    icon: FaClipboardList,
    roles: ["admin"],
  },

  {
    id: 3,
    name: "Available Donations",
    path: "/admin/available",
    icon: FaClipboardList,
    roles: ["admin"],
  },

  {
    id: 4,
    name: "Accepted Donations",
    path: "/admin/accepted",
    icon: FaCheckCircle,
    roles: ["admin"],
  },

  {
    id: 5,
    name: "NGOs",
    path: "/admin/ngos",
    icon: FaUsers,
    roles: ["admin"],
  },

  {
    id: 6,
    name: "Volunteers",
    path: "/admin/volunteers",
    icon: FaHandsHelping,
    roles: ["admin"],
  },

  {
    id: 7,
    name: "Analytics",
    path: "/admin/analytics",
    icon: FaChartBar,
    roles: ["admin"],
  },

  {
    id: 8,
    name: "Profile",
    path: "/admin/profile",
    icon: FaUser,
    roles: ["admin"],
  },

  /* ================= donor ================= */

  {
    id: 9,
    name: "Dashboard",
    path: "/dashboard",
    icon: FaHome,
    roles: ["donor"],
  },

  {
    id: 10,
    name: "Add Donation",
    path: "/dashboard/add-donation",
    icon: FaPlus,
    roles: ["donor"],
  },

  {
    id: 11,
    name: "My Donations",
    path: "/dashboard/my-donations",
    icon: FaClipboardList,
    roles: ["donor"],
  },

  {
    id: 12,
    name: "Profile",
    path: "/dashboard/profile",
    icon: FaUser,
    roles: ["donor"],
  },

  /* ================= NGO ================= */

  {
    id: 13,
    name: "Dashboard",
    path: "/ngo",
    icon: FaHome,
    roles: ["ngo"],
  },

  {
    id: 14,
    name: "Available Donations",
    path: "/ngo/available",
    icon: FaClipboardList,
    roles: ["ngo"],
  },

  {
    id: 15,
    name: "Accepted Donations",
    path: "/ngo/accepted",
    icon: FaCheckCircle,
    roles: ["ngo"],
  },

  {
    id: 16,
    name: "Profile",
    path: "/ngo/profile",
    icon: FaUser,
    roles: ["ngo"],
  },

  /* ================= VOLUNTEER ================= */

  {
    id: 17,
    name: "Dashboard",
    path: "/volunteer",
    icon: FaHome,
    roles: ["volunteer"],
  },

  {
    id: 18,
    name: "Available Pickups",
    path: "/volunteer/pickups",
    icon: FaHandsHelping,
    roles: ["volunteer"],
  },

  {
    id: 19,
    name: "Profile",
    path: "/volunteer/profile",
    icon: FaUser,
    roles: ["volunteer"],
  },

];
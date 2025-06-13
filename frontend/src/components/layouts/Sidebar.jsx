import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  MdDashboard,
  MdSearch,
  MdAssessment,
  MdSettings,
} from "react-icons/md";
import { IoMdMenu } from "react-icons/io";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);

  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-2 rounded-md transition duration-200 ${
      isActive
        ? "bg-white text-green-600 font-semibold shadow"
        : "text-white hover:bg-white/20 hover:text-white"
    }`;

  const menuItems = [
    { path: "/dashboard", label: "Dashboard", icon: <MdDashboard className="text-xl" /> },
    { path: "/search-scores", label: "Search Scores", icon: <MdSearch className="text-xl" /> },
    { path: "/reports", label: "Reports", icon: <MdAssessment className="text-xl" /> },
    { path: "/settings", label: "Settings", icon: <MdSettings className="text-xl" /> },
  ];

  return (
    <div
      className={`${
        collapsed ? "w-20" : "w-64"
      } bg-gradient-to-b from-yellow-400 to-green-500 p-4 text-white h-[calc(100vh-64px)] shadow-lg transition-all duration-300`}
    >
      <div className="flex items-center justify-between mb-6">
        {!collapsed && (
          <h2 className="text-xl font-bold tracking-wide flex items-center gap-2">
            <IoMdMenu className="text-2xl" />
            Menu
          </h2>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="text-white hover:text-white/80 p-2"
          title={collapsed ? "Expand" : "Collapse"}
        >
          {collapsed ? (
            <IoIosArrowForward className="text-2xl" />
          ) : (
            <IoIosArrowBack className="text-2xl" />
          )}
        </button>
      </div>

      <ul className="space-y-2">
        {menuItems.map((item) => (
          <li key={item.path}>
            <NavLink to={item.path} className={linkClass}>
              {item.icon}
              {!collapsed && <span>{item.label}</span>}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;

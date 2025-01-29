import { useLocation, Link } from "react-router-dom";
import SideProfile from "./sideProfile/SideProfile";
import { List, ListItem, ListItemPrefix } from "@material-tailwind/react";
import {
  BriefcaseIcon,
  BuildingOffice2Icon,
  ChatBubbleBottomCenterTextIcon,
  InboxIcon,
  InformationCircleIcon,
  PresentationChartBarIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";

const SideBar = () => {
  const location = useLocation();

  const navItems = [
    { to: "/dashboard", label: "Dashboard", icon: PresentationChartBarIcon },
    { to: "/services", label: "All Services", icon: BriefcaseIcon },
    { to: "/providers", label: "Service Providers", icon: BuildingOffice2Icon },
    { to: "/customers", label: "Customers", icon: UserGroupIcon },
    { to: "/help", label: "Help & Support", icon: InformationCircleIcon },
    {
      to: "/feedback",
      label: "Feedback",
      icon: ChatBubbleBottomCenterTextIcon,
    },
  ];

  return (
    <div className="w-80 hidden lg:inline absolute sm:relative bg-gray-900 shadow md:h-full flex-col justify-between">
      <div className="px-8 pt-5 mb-10">
        <SideProfile />
      </div>
      <List>
        {navItems.map((item) => (
          <Link key={item.to} to={item.to}>
            <ListItem
              className={`text-gray-100 ${
                location.pathname === item.to ? "bg-gray-700 font-bold" : ""
              }`}
            >
              <ListItemPrefix>
                <item.icon className="h-5 w-5" />
              </ListItemPrefix>
              {item.label}
            </ListItem>
          </Link>
        ))}
      </List>
    </div>
  );
};

export default SideBar;

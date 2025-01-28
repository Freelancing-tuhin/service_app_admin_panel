import React, { useState } from "react";
import SideProfile from "./sideProfile/SideProfile";
import {
  Chip,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
} from "@material-tailwind/react";
import {
  ChatBubbleBottomCenterTextIcon,
  Cog6ToothIcon,
  InboxIcon,
  InformationCircleIcon,
  PowerIcon,
  PresentationChartBarIcon,
  ShoppingBagIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

const SideBar = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div
        className={`w-80 hidden lg:inline absolute sm:relative bg-gray-900 shadow md:h-full flex-col justify-between `}
      >
        <div className="px-8 pt-5 mb-10">
          <SideProfile />
        </div>
        <List>
          <Link to="/dashboard">
            <ListItem className="text-gray-100 ">
              <ListItemPrefix>
                <PresentationChartBarIcon className="h-5 w-5" />
              </ListItemPrefix>
              Dashboard
            </ListItem>
          </Link>
          <Link to="/services">
            <ListItem className="text-gray-100">
              <ListItemPrefix>
                <InboxIcon className="h-5 w-5" />
              </ListItemPrefix>
              All Services
            </ListItem>
          </Link>
          <Link to="/providers">
            <ListItem className="text-gray-100">
              <ListItemPrefix>
                <InboxIcon className="h-5 w-5" />
              </ListItemPrefix>
              Service Providers
              <ListItemSuffix>
                <Chip
                  value="14"
                  size="sm"
                  variant="gradient"
                  color="blue-gray"
                  className="rounded-full"
                />
              </ListItemSuffix>
            </ListItem>
          </Link>
          <Link to="/customers">
            <ListItem className="text-gray-100">
              <ListItemPrefix>
                <InboxIcon className="h-5 w-5" />
              </ListItemPrefix>
              Customers
              <ListItemSuffix>
                <Chip
                  value="14"
                  size="sm"
                  variant="gradient"
                  color="blue-gray"
                  className="rounded-full"
                />
              </ListItemSuffix>
            </ListItem>
          </Link>

          <ListItem className="text-gray-100">
            <ListItemPrefix>
              <InformationCircleIcon className="h-5 w-5" />
            </ListItemPrefix>
            Help & support
          </ListItem>
          <ListItem className="text-gray-100">
            <ListItemPrefix>
              <ChatBubbleBottomCenterTextIcon className="h-5 w-5" />
            </ListItemPrefix>
            Feedback
          </ListItem>
        </List>
      </div>
    </>
  );
};

export default SideBar;

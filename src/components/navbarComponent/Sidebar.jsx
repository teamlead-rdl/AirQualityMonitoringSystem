import { useEffect, useState } from "react";
import "./Sidebar.scss";
import {DrawerObject, SidebarItems} from "./SidebarItems";

export default function Sidebar(props, { defaultActive }) {
  const location = props?.history?.location ? props.history.location : '/login';
  const lastActiveIndexString = localStorage.getItem("lastActiveIndex");
  const lastActiveIndex = Number(lastActiveIndexString);
  const [activeIndex, setActiveIndex] = useState(lastActiveIndex || defaultActive);

  // useEffect(() => {
  //   const activeItem = SidebarItems.findIndex(item => getPath(item.route) === getPath(location.pathname));
  //   changeActiveIndex(activeItem);
  // }, [location])

  function changeActiveIndex(newIndex) {
    localStorage.setItem("lastActiveIndex", newIndex)
    setActiveIndex(newIndex)
  }

  function getPath(path) {
    if (path && path.charAt(0) !== "/") {
      return "/" + path;
    }
    return path;
  }

  return (<DrawerObject />);
}
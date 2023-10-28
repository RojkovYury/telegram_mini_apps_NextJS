import clsx from "clsx";
import { useState } from "react";

import MenuItem from "./MenuItem";

const sidebarItems: any[][] = [
  [
    { id: "0", title: "DashBoard", href: "", notifications: false },
    { id: "1", title: "Students", href: "students", notifications: false },
    { id: "2", title: "Pending", href: "pending", notifications: false },
    // { id: "2", title: "Chat", notifications: "soon", disabled: true },
    // { id: "3", title: "Team", notifications: "soon", disabled: true },
  ],
];
function SideBar({ onSidebarHide, showSidebar }: any) {
  const [selected, setSelected] = useState("0");

  return (
    <div
      className={clsx(
        "fixed inset-y-0 left-0 bg-card w-full sm:w-20 xl:w-60 sm:flex flex-col z-10",
        showSidebar ? "flex" : "hidden"
      )}
    >
      <div className="flex-shrink-0 overflow-hidden p-2">
        <div className="flex items-center h-full sm:justify-center xl:justify-start p-2 sidebar-separator-top">
          <div className="block sm:hidden xl:block ml-2 font-bold text-xl text-white">
            React
          </div>
          <div className="flex-grow sm:hidden xl:block" />
          <button className="block sm:hidden" onClick={onSidebarHide}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>
      <div className="flex-grow overflow-x-hidden overflow-y-auto flex flex-col">
        <div className="w-full p-3 h-24 sm:h-20 xl:h-24 hidden sm:block flex-shrink-0"></div>
        {sidebarItems[0].map((i) => (
          <MenuItem
            onSidebarHide={onSidebarHide}
            key={i.id}
            item={i}
            setSelected={setSelected}
            selected={selected}
          />
        ))}

        <div className="flex-grow" />
        <div className="w-full p-3 h-28 hidden sm:block sm:h-20 xl:h-32"></div>
      </div>
    </div>
  );
}

export default SideBar;

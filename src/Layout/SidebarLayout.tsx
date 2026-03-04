import { Outlet, useLocation } from "react-router-dom";
import { pagesWithoutSidebar } from "../utils/util";
import Sidebar from "../components/Sidebar";
import { Breadcrumb } from "antd";
import { IoHomeOutline } from "react-icons/io5";
import { MdOutlineLightMode } from "react-icons/md";
import { useTheme } from "../utils/useTheme";
const SidebarLayout = () => {
  const path = useLocation().pathname;
  const [theme, setTheme] = useTheme();
  if (pagesWithoutSidebar.includes(path)) return <Outlet />;
  return (
    <div className="flex h-full">
      <Sidebar />
      <div className="grow flex flex-col">
        <div className="h-15 flex justify-between items-center dark:text-white">
          <div className="flex gap-4 items-center dark:white">
            {path.toLowerCase() === "/dashboard" ? "Dashboard" : "Scan"}{" "}
            <Breadcrumb
              className="mt-1!"
              items={
                path.toLowerCase() === "/dashboard"
                  ? []
                  : [
                      {
                        href: "/dashboard",
                        title: (
                          <IoHomeOutline className="dark:text-white! mt-1" />
                        ),
                      },
                      {
                        href: "",
                        title: (
                          <span className="dark:text-white!">
                            Private Asset
                          </span>
                        ),
                      },
                      {
                        title: <span className="text-primary">New Scan</span>,
                      },
                    ]
              }
            />
          </div>
          <div className="flex items-center gap-4 pr-4">
            <button
              className=""
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              <MdOutlineLightMode />
            </button>
            <button className="px-4 py-2 rounded-md border dark:border-white">
              Export Report
            </button>
            <button className="px-4 py-2 rounded-md border dark:bg-[#201417] dark:text-[#cc3b3c]">
              Stop Scan
            </button>
          </div>
        </div>
        <div className=" p-2 border-l border-t border-[#e8edf2] dark:border-[#2c333a] grow bg-[#f9f9fb] dark:bg-inherit">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default SidebarLayout;

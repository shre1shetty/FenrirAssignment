import { AiOutlineAppstoreAdd } from "react-icons/ai";
import { BsClipboardCheck } from "react-icons/bs";
import { CiBellOn, CiCircleInfo } from "react-icons/ci";
import { HiOutlineDocumentReport } from "react-icons/hi";
import { IoSettingsOutline } from "react-icons/io5";
import { MdOutlineDateRange } from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();
  const pathname = useLocation().pathname;
  const sidebarOptions = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: <AiOutlineAppstoreAdd />,
    },
    {
      name: "Projects",
      path: "/projects",
      icon: <BsClipboardCheck />,
    },
    {
      name: "Scans",
      path: "/scans",
      icon: <HiOutlineDocumentReport />,
    },
    {
      name: "Schedule",
      path: "/schedule",
      icon: <MdOutlineDateRange />,
    },
  ];
  return (
    <div className="w-65 flex flex-col shrink-0">
      <div className="head-section p-4 pb-2">
        <img src="/Logo.png" alt="" className="" />
      </div>
      <div className="flex flex-col gap-1 border-b-2 border-[#e8edf2] dark:border-[#2f363d] p-4">
        {sidebarOptions.map(({ name, icon, path }) => (
          <div
            className={`flex items-center gap-2  py-2.5 px-4.5 rounded-full cursor-pointer text-lg ${pathname.toLowerCase().includes(path.toLowerCase()) ? "text-btn-primary bg-[#dbf0f0] dark:bg-[#0a2427]" : "dark:text-[#697282]"}`}
            key={name}
            onClick={() => navigate(path)}
          >
            {icon}
            <span className="text-[16px]">{name}</span>
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-1 border-b-2 border-[#e8edf2] dark:border-[#2f363d] p-4 grow">
        <div
          className={`flex items-center gap-2  py-2.5 px-4.5 rounded-full cursor-pointer dark:text-[#697282] text-lg `}
        >
          <CiBellOn />
          <span className="text-[16px]">Notifications</span>
        </div>
        <div
          className={`flex items-center gap-2  py-2.5 px-4.5 rounded-full cursor-pointer dark:text-[#697282] text-lg `}
        >
          <IoSettingsOutline />
          <span className="text-[16px]">Settings</span>
        </div>
        <div
          className={`flex items-center gap-2  py-2.5 px-4.5 rounded-full cursor-pointer dark:text-[#697282] text-lg `}
        >
          <CiCircleInfo />
          <span className="text-[16px]">Support</span>
        </div>
      </div>
      <div className="p-4 flex gap-3">
        <img
          src="/user.png"
          alt=""
          className="h-10 w-10 rounded-full bg-amber-300"
        />
        <div className="">
          <p className="text-[13px] leading-normal text-[#9e9e9e]">admin</p>
          <span className="text-sm leading-normal text-[#685d5d]">
            Security Lead
          </span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

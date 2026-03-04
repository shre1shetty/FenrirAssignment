import { LuRefreshCcw, LuSearchSlash } from "react-icons/lu";
import "./index.css";
import { MdBlockFlipped } from "react-icons/md";
import { CiWarning } from "react-icons/ci";
import ScanGrid from "../../components/ScanGrid";
const DashboardPage = () => {
  return (
    <div>
      <div className="bg-white dark:bg-[#161a21] border border-[#e3e8ef] dark:border-[#2c333a] p-8 rounded-md">
        <div className="flex items-center text-xs ">
          <div className="flex divide-x divide-[#dddddd] dark:divide-white grow">
            <div className="detail-tab text-start!">
              <span className="">Org:</span>
              Project X
            </div>
            <div className="detail-tab">
              <span className="">Owner:</span>
              Nammagiri
            </div>
            <div className="detail-tab">
              <span className="">Total Scans:</span>
              100
            </div>
            <div className="detail-tab">
              <span className="">Scheduled:</span>1000
            </div>
            <div className="detail-tab">
              <span className="">Rescans:</span>100
            </div>
            <div className="detail-tab">
              <span className="">Failed Scans:</span>100
            </div>
          </div>
          <div className="flex items-center">
            <LuRefreshCcw className="text-primary mr-2" />
            10 mins ago
          </div>
        </div>
        <div className="flex justify-between mt-10">
          <div className="severity-tab">
            <div className="flex">
              <div className="severity-label">Critical Severity</div>
              <div className="severity-icon bg-[#fbe6f2] text-[#cb186a]">
                <MdBlockFlipped />
              </div>
            </div>
            <div className="flex gap-2 items-baseline">
              <div className="text-2xl">86</div>
              <div className="text-xs text-[#c6005b]">
                ↑ +2% increase than yesterday
              </div>
            </div>
          </div>
          <div className="severity-tab">
            <div className="flex">
              <div className="severity-label">High Severity</div>
              <div className="severity-icon bg-[#fee3ce] text-[#bd560d]">
                <CiWarning />
              </div>
            </div>
            <div className="flex gap-2 items-baseline">
              <div className="text-2xl">16</div>
              <div className="text-xs text-[#c6005b]">
                ↑ +0.9% increase than yesterday
              </div>
            </div>
          </div>
          <div className="severity-tab">
            <div className="flex">
              <div className="severity-label"> Medium Severity</div>
              <div className="severity-icon bg-[#fdf9e8] text-[#bd990b]">
                <CiWarning />
              </div>
            </div>
            <div className="flex gap-2 items-baseline">
              <div className="text-2xl">26</div>
              <div className="text-sm text-[#176f41]">
                ↓ +0.9% decrease than yesterday
              </div>
            </div>
          </div>
          <div className="severity-tab">
            <div className="flex">
              <div className="severity-label">Low Severity</div>
              <div className="severity-icon bg-[#e9f1fe] text-[#3869fb]">
                <LuSearchSlash />
              </div>
            </div>
            <div className="flex gap-2 items-baseline">
              <div className="text-2xl">16</div>
              <div className="text-xs text-[#c6005b]">
                ↑ +0.9% increase than yesterday
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white dark:bg-[#161a21] border border-[#e3e8ef] dark:border-[#2c333a]  rounded-md mt-4">
        <ScanGrid />
      </div>
    </div>
  );
};

export default DashboardPage;

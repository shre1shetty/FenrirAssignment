import Steps from "antd/es/steps";
import { FaMoneyCheck, FaNetworkWired } from "react-icons/fa";
import { GrTest } from "react-icons/gr";
import { TbReportAnalytics, TbWorldSearch } from "react-icons/tb";
import { useParams } from "react-router-dom";
import Data from "../../scandata.json";
import type { ScanData } from "../../utils/types";
import { Collapse, Tabs } from "antd";

const ScanPage = () => {
  const { id } = useParams();
  const data = Data.find((scan) => scan.id === id) as ScanData;
  return (
    <div className="">
      <div className="bg-white dark:bg-[#161a21] border border-[#e3e8ef] dark:border-[#2c333a] p-8 rounded-md mb-4">
        <div className="flex items-center divide-x divide-[#ecf0f4] dark:divide-[#2f363d]">
          <div className="pr-4">
            <div className="bg-[#f8f9fb] dark:bg-[#11161f] rounded-full font-bold text-primary text-2xl flex flex-col items-center text-center justify-center w-26 h-26">
              {data.progress}%
              <div className="text-black dark:text-white text-xs font-medium">
                {data.status}
              </div>
            </div>
          </div>
          <div className="ml-8 grow">
            <div className="divide-y divide-[#ecf0f4] dark:divide-[#2f363d]">
              <div className="pb-4">
                <Steps
                  className="text-white -ml-20!"
                  titlePlacement="vertical"
                  items={[
                    {
                      title: "Login",
                      icon: (
                        <div
                          className={`p-4 border dark:border-[#2f363d] rounded-full ${data.steps.find(({ name }) => name === "Login")?.status === "completed" ? "bg-primary shadow-[0px_0px_18px_-2px_green] text-white" : "dark:bg-[#0a0f13] bg-white text-[#93a3b8] dark:text-white"}`}
                        >
                          <TbWorldSearch />
                        </div>
                      ),
                    },
                    {
                      title: "Mapping",
                      icon: (
                        <div
                          className={`p-4 border dark:border-[#2f363d] rounded-full ${data.steps.find(({ name }) => name === "Mapping")?.status === "completed" ? "bg-primary shadow-[0px_0px_18px_-2px_green] text-white" : "dark:bg-[#0a0f13] bg-white text-[#93a3b8] dark:text-white"}`}
                        >
                          <FaNetworkWired />
                        </div>
                      ),
                    },
                    {
                      title: "Testing",
                      icon: (
                        <div
                          className={`p-4 border dark:border-[#2f363d] rounded-full ${data.steps.find(({ name }) => name === "Testing")?.status === "completed" ? "bg-primary shadow-[0px_0px_18px_-2px_green] text-white" : "dark:bg-[#0a0f13] bg-white text-[#93a3b8] dark:text-white"}`}
                        >
                          <GrTest />
                        </div>
                      ),
                    },

                    {
                      title: "Validating",
                      icon: (
                        <div
                          className={`p-4 border dark:border-[#2f363d] rounded-full ${data.steps.find(({ name }) => name === "Validating")?.status === "completed" ? "bg-primary shadow-[0px_0px_18px_-2px_green] text-white" : "dark:bg-[#0a0f13] bg-white text-[#93a3b8] dark:text-white"}`}
                        >
                          <FaMoneyCheck />
                        </div>
                      ),
                    },
                    {
                      title: "Reporting",
                      icon: (
                        <div
                          className={`p-4 border dark:border-[#2f363d] rounded-full ${data.steps.find(({ name }) => name === "Reporting")?.status === "completed" ? "bg-primary shadow-[0px_0px_18px_-2px_green] text-white" : "dark:bg-[#0a0f13] bg-white text-[#93a3b8] dark:text-white"}`}
                        >
                          <TbReportAnalytics />
                        </div>
                      ),
                    },
                  ]}
                />
              </div>
              <div className="flex gap-4 mt-4">
                <div className="flex-1 text-sm font-bold">
                  <div className="text-[#88898a] text-xs font-normal">
                    Scan Type
                  </div>
                  {data.type}
                </div>
                <div className="flex-1 text-sm font-bold">
                  <div className="text-[#88898a] text-xs font-normal">
                    Targets
                  </div>
                  {data.target}
                </div>
                <div className="flex-1 text-sm font-bold">
                  <div className="text-[#88898a] text-xs font-normal">
                    Started At
                  </div>
                  {data.started_at}
                </div>
                <div className="flex-1 text-sm font-bold">
                  <div className="text-[#88898a] text-xs font-normal">
                    Credentials
                  </div>
                  2 Active
                </div>
                <div className="flex-1 text-sm font-bold">
                  <div className="text-[#88898a] text-xs font-normal">
                    Files
                  </div>
                  Control.pdf
                </div>
                <div className="flex-1 text-sm font-bold">
                  <div className="text-[#88898a] text-xs font-normal">
                    Checklists
                  </div>
                  <span className="text-primary">40/350</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Collapse
        className="border border-[#e3e8ef]! dark:border-[#2c333a]!"
        items={[
          {
            key: "1",
            label: <div className="dark:text-white">Live Scan Code</div>,
            children: (
              <div className="grid grid-cols-5 gap-4 dark:text-white">
                <div className="col-span-3 border-r border-[#ecf0f4] dark:border-[#2f363d]">
                  <Tabs
                    items={[
                      {
                        key: "1",
                        label: "Activity Log",
                        children: (
                          <div className="space-y-3">
                            {data.activity_logs.map(
                              ({ time, message }, index) => (
                                <div
                                  className="flex gap-2 dark:text-white"
                                  key={index}
                                >
                                  <div className=" text-[#494c50]">
                                    {"[" + time + "]"}
                                  </div>
                                  <div>{message}</div>
                                </div>
                              ),
                            )}
                          </div>
                        ),
                      },
                      {
                        key: "2",
                        label: "Verification Loop",
                        children: (
                          <div className="p-4 dark:text-white">
                            Verification Loop Content
                          </div>
                        ),
                      },
                    ]}
                  />
                </div>
                <div className="col-span-2">
                  <div className="p-2 pb-4 border-b border-[#ecf0f4] dark:border-[#2f363d]">
                    Finding log
                  </div>
                  <div className="space-y-3 pt-4">
                    {data.vulnerability_list.map(
                      ({
                        id,
                        endpoint,
                        title,
                        severity,
                        description,
                        detected_at,
                      }) => (
                        <div
                          className="relative border border-[#ecf0f4] dark:bg-[#161a21] dark:border-[#272e34] p-4 rounded-2xl space-y-1"
                          key={id}
                        >
                          <div
                            className={`text-white ${severity === "high" ? "bg-[#f97216]" : severity === "critical" ? "bg-[#ef4444]" : "bg-[#f49e0a]"} px-3 py-1 rounded-full w-fit`}
                          >
                            {severity}
                          </div>
                          <div className="text-[#383131] dark:text-white font-bold">
                            {title}
                          </div>
                          <div className="text-primary">{endpoint}</div>
                          <div className="text-xs text-[#c2c2c2] dark:text-[#494c50]">
                            {description}
                          </div>
                          <div className="absolute right-4 top-3 text-[#494c50] text-xs">
                            {detected_at}
                          </div>
                        </div>
                      ),
                    )}
                  </div>
                </div>
              </div>
            ),
            style: {
              backgroundColor: "#0a0f13",
            },
          },
        ]}
        defaultActiveKey={["1"]}
      />
    </div>
  );
};

export default ScanPage;

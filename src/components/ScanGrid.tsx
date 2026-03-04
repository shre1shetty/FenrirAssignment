import { useState } from "react";
import Data from "../scandata.json";
import { RxCaretLeft, RxCaretRight } from "react-icons/rx";
import { IoFilterOutline } from "react-icons/io5";
import { CiViewColumn } from "react-icons/ci";
import { useNavigate } from "react-router-dom";

interface Vulnerabilities {
  critical: number;
  high: number;
  medium: number;
  low: number;
}

type ScanStatus = "Completed" | "Scheduled" | "Failed" | "In Progress";

interface ScanData {
  id: String;
  scan_name: string;
  type: string;
  status: ScanStatus;
  progress: number;
  vulnerabilities: Vulnerabilities;
  last_scan: string;
}

interface Column {
  field: keyof ScanData;
  headerName: string;
  align: "start" | "end" | "center";
  render?: (value: any) => React.ReactNode;
}
const ScanGrid = () => {
  const navigate = useNavigate();
  const [page, setpage] = useState<number>(1);
  const [searchTerms, setsearchTerms] = useState<string>("");
  const [showColumnFilter, setshowColumnFilter] = useState<boolean>(false);
  const [showFilter, setshowFilter] = useState<boolean>(false);
  const [columnSearchTerms, setcolumnSearchTerms] = useState<
    Record<string, string>
  >({});
  const pageSize = 10;
  const rows = Data.map((scan) => ({
    id: scan.id,
    scan_name: scan.scan_name,
    type: scan.type,
    status: scan.status,
    progress: scan.progress,
    vulnerabilities: scan.vulnerabilities_summary,
    last_scan: scan.last_scan,
  })) as ScanData[];

  const paginatedData = rows
    .filter((row) => {
      const hasGlobal = searchTerms.trim() !== "";
      const columnKeys = Object.keys(columnSearchTerms).filter(
        (k) => columnSearchTerms[k].trim() !== "",
      );
      if (!hasGlobal && columnKeys.length === 0) return true;

      const globalMatch = !hasGlobal
        ? true
        : row.scan_name.toLowerCase().includes(searchTerms.toLowerCase()) ||
          row.type.toLowerCase().includes(searchTerms.toLowerCase());

      const columnMatch =
        columnKeys.length === 0
          ? true
          : columnKeys.every((key) => {
              const search = columnSearchTerms[key].toLowerCase();
              const value = String((row as any)[key] ?? "").toLowerCase();
              return value.includes(search);
            });
      return globalMatch && columnMatch;
    })
    .slice((page - 1) * pageSize, page * pageSize);
  const columns: Column[] = [
    { field: "scan_name", headerName: "Scan Name", align: "start" },
    { field: "type", headerName: "Type", align: "start" },
    {
      field: "status",
      headerName: "Status",
      align: "start",
      render: (value) => (
        <span
          className={`px-2 py-1 rounded text-sm font-bold border ${value === "Completed" ? "bg-[#e9f9ef] text-[#24c55f] dark:bg-[#172a26] dark:text-green-800" : value === "In Progress" ? "bg-amber-100 text-amber-400 dark:bg-[#fff424ad] dark:text-yellow-800" : value === "Failed" ? "bg-[#fdecec] text-[#f26a6a] dark:bg-[#2b1e24] dark:text-red-800" : "bg-[#eef2f7] darkbg-transparent text-[#576579] "}`}
        >
          {value}
        </span>
      ),
    },
    {
      field: "progress",
      headerName: "Progress",
      align: "start",
      render: (value) => (
        <div className="flex gap-4 items-center w-full">
          <div className="bg-gray-200 rounded-full h-4 w-25">
            <div
              className={`${value > 20 ? "bg-primary" : "bg-[#f05252]"} h-4 rounded-full`}
              style={{ width: `${value}%` }}
            ></div>
          </div>
          {value}%
        </div>
      ),
    },
    {
      field: "vulnerabilities",
      headerName: "Vulnerabilities",
      align: "center",
      render: (value) => (
        <div className="flex justify-center space-x-2">
          <span className="bg-red-500 text-white text-sm h-7 w-7 flex justify-center items-center rounded">
            {value.critical}
          </span>
          <span className="bg-orange-500 text-white text-sm h-7 w-7 flex justify-center items-center rounded">
            {value.high}
          </span>
          <span className="bg-yellow-500 text-white text-sm h-7 w-7 flex justify-center items-center rounded">
            {value.medium}
          </span>
          <span className="bg-green-500 text-white text-sm h-7 w-7 flex justify-center items-center rounded">
            {value.low}
          </span>
        </div>
      ),
    },
    { field: "last_scan", headerName: "Last Scan", align: "end" },
  ];
  const [selectedColumns, setselectedColumns] = useState<string[]>(
    columns.map(({ field }) => field),
  );
  const filteredColumns = columns.filter(({ field }) =>
    selectedColumns.includes(field),
  );

  return (
    <table className="w-full">
      <caption>
        <div className="flex p-4 gap-2">
          <input
            type="text"
            className="border border-[#ededed] rounded-md p-2 grow outline-0"
            placeholder="Search scans by name and type"
            value={searchTerms}
            onChange={(e) => setsearchTerms(e.target.value)}
          />

          <button
            className="flex gap-2 border border-[#ededed] rounded-md p-2 items-center"
            onClick={() => setshowFilter((prev) => !prev)}
          >
            <IoFilterOutline />
            Filter
          </button>
          <div className="relative">
            <button
              className="flex gap-2 border border-[#ededed] rounded-md p-2 items-center"
              onClick={() => setshowColumnFilter((prev) => !prev)}
            >
              <CiViewColumn />
              Column
            </button>
            <div
              className={`absolute top-full right-0 mt-2 w-48 bg-white dark:bg-[#161a21] border border-[#e3e8ef] dark:border-[#2c333a] rounded-md p-4 z-10 space-y-1 ${!showColumnFilter ? "hidden" : ""}`}
            >
              {columns.map(({ field, headerName }) => (
                <div
                  className="w-full flex items-center text-start gap-2"
                  key={field}
                >
                  <input
                    type="checkbox"
                    name={field}
                    id={field}
                    checked={selectedColumns.includes(field)}
                    onChange={() =>
                      setselectedColumns((prev) =>
                        prev.includes(field)
                          ? prev.filter((col) => col !== field)
                          : [...prev, field],
                      )
                    }
                  />
                  <label htmlFor={field}>{headerName}</label>
                </div>
              ))}
            </div>
          </div>
          <button className="bg-primary text-white rounded-md p-2 items-center">
            + New Scan
          </button>
        </div>
      </caption>
      <thead className="">
        <tr className="border-b border-[#dedede] dark:border-[#272d34]">
          {filteredColumns.map(({ headerName, align }) => (
            <th
              className=" p-4 text-[#838485]"
              style={{ textAlign: align }}
              key={headerName}
            >
              {headerName}
            </th>
          ))}
        </tr>
        <tr>
          {showFilter &&
            filteredColumns.map(({ headerName, field, align }) => (
              <th
                className=" p-4 text-[#838485]"
                style={{ textAlign: align }}
                key={headerName}
              >
                <input
                  type="text"
                  className="w-full outline-0 border border-[#838485] rounded-md py-1 px-2"
                  placeholder="search.."
                  onChange={(event) =>
                    setcolumnSearchTerms((prev) => ({
                      ...prev,
                      [field]: event.target.value,
                    }))
                  }
                />
              </th>
            ))}
        </tr>
      </thead>
      <tbody>
        {paginatedData.map((row, index) => (
          <tr
            className="text-sm cursor-pointer"
            key={index}
            onClick={() => navigate("/scans/" + row.id)}
          >
            {filteredColumns.map(({ field, render, align }) => (
              <td className="p-4" key={field} style={{ textAlign: align }}>
                {render ? render(row[field]) : String(row[field])}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
      <tfoot>
        <tr className="border-t border-[#272d34]">
          <td className="p-4 text-sm">
            Showing {page * pageSize - pageSize + 1} to{" "}
            {Math.min(page * pageSize, Data.length)} of {Data.length} scans
          </td>
          <td className="p-4" colSpan={columns.length - 1}>
            <div className="flex justify-end">
              <button
                className="p-1 rounded-md  mr-2"
                onClick={() => setpage((prev) => prev - 1)}
                disabled={page === 1}
              >
                <RxCaretLeft />
              </button>
              <button
                className="p-1 rounded-md "
                onClick={() => setpage((prev) => prev + 1)}
                disabled={page * pageSize >= Data.length}
              >
                <RxCaretRight />
              </button>
            </div>
          </td>
        </tr>
      </tfoot>
    </table>
  );
};

export default ScanGrid;

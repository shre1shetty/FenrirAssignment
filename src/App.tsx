import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import LoginPage from "./Pages/Login/LoginPage";
import { lazy } from "react";
import SidebarLayout from "./Layout/SidebarLayout";
const DashboardPage = lazy(() => import("./Pages/Dashboard/DashboardPage"));
const ScanPage = lazy(() => import("./Pages/Scan/ScanPage"));

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SidebarLayout />}>
            <Route index element={<LoginPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/Scans/:id" element={<ScanPage />} />
            <Route path="*" element={<div>Page Not Found</div>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

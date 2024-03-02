import { Outlet } from "react-router-dom";
import DashHeader from "./DashHeader";
import SideBar from "./SideBar";

export default function Dashboard() {
  return (
    <div className="Dash-con">
      <DashHeader />
      <SideBar />
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Outlet />
      </div>
    </div>
  );
}

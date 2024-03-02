import React from "react";
import { Outlet } from "react-router-dom";
import Cookies from "universal-cookie";
const Role = () => {
  const cooki = new Cookies();
  const role = cooki.get("role");

  return <>{role === 100 ? <Outlet /> : <h1>Cant Access</h1>}</>;
};

export default Role;

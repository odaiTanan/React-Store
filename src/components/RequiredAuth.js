import { useContext } from "react";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import { User } from "./context/context";

export default function RequierdAuth() {
  let nav = useNavigate();
  let location = useLocation();
  const user = useContext(User);

  return user.User1 ? (
    <Outlet />
  ) : (
    <Navigate to="./login" state={{ from: location }} replace />
  );
}

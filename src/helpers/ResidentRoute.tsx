import { Navigate, Outlet } from "react-router-dom";
import { LoginPayload } from "./AdminRoute";

export default function ResidentRoute() {
  const auth = JSON.parse(
    localStorage.getItem("userInfo") as string
  ) as LoginPayload;

  if (!auth) return <Navigate to="/login" />;

  if (auth.user.ownerToken) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
}

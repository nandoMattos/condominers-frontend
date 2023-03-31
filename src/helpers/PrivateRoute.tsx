import { Navigate, Outlet } from "react-router-dom";

interface userInfo {
  id: number;
  name: string;
  email: string;
  type: "OWNER" | "RESIDENT";
}

interface LoginPayload {
  user: userInfo;
  JWToken: string;
}

export default function PrivateRoute() {
  const auth = JSON.parse(
    localStorage.getItem("userInfo") as string
  ) as LoginPayload;

  return auth ? <Outlet /> : <Navigate to="/login" />;
}

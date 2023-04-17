import { Navigate, Outlet } from "react-router-dom";
interface userInfo {
  id: number;
  name: string;
  email: string;
  ownerToken?: string;
}

export interface LoginPayload {
  user: userInfo;
  JWToken: string;
}

export default function ProtectedRoute() {
  const auth = JSON.parse(
    localStorage.getItem("userInfo") as string
  ) as LoginPayload;

  if (!auth) return <Navigate to="/login" />;

  return <Outlet />;
}

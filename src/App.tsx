import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import GlobalStyle from "./assets/styles/GlobalStyle";
import ResetCss from "./assets/styles/ResetCss";
import UserProvider from "./contexts/UserContext";
import AuthPage from "./pages/authentication/AuthPage";
import HomePage from "./pages/home/HomePage";
import ApartamentInvite from "./pages/apartaments/ApartamentInvite";
import Apartaments from "./pages/apartaments/Apartaments";
import MaintenancePage from "./pages/maintenance/MaintenancePage";
import RentSpacePage from "./pages/rent-space/RentSpacePage";
import ReportPage from "./pages/report/ReportPage";
import MyRequestsPage from "./pages/requests/MyRequestsPage";
import AllRequestsPage from "./pages/requests/AllRequestsPage";
import SpacesPage from "./pages/leisure-spaces/SpacesPage";
import ResidentRoute from "./helpers/ResidentRoute";
import AdminRoute from "./helpers/AdminRoute";
import ProtectedRoute from "./helpers/ProtectedRoute";
import SignUpPage from "./pages/authentication/SignUpPage";

function App() {
  return (
    <>
      <ToastContainer />
      <GlobalStyle />
      <ResetCss />
      <UserProvider>
        <BrowserRouter>
          <Routes>
            <Route path={"/login"} element={<AuthPage />} />
            <Route path={"/sign-up"} element={<SignUpPage />} />

            <Route element={<ProtectedRoute />}>
              <Route path="/" element={<HomePage />} />
              <Route
                path="/apartaments/invitation/:jwToken"
                element={<ApartamentInvite />}
              />
            </Route>

            <Route element={<ResidentRoute />}>
              <Route path="/maintenance" element={<MaintenancePage />} />
              <Route path="/rent-space" element={<RentSpacePage />} />
              <Route path="/my-requests" element={<MyRequestsPage />} />
              <Route path="/report" element={<ReportPage />} />
            </Route>

            <Route element={<AdminRoute />}>
              <Route path={"/requests"} element={<AllRequestsPage />} />
              <Route path="/apartaments" element={<Apartaments />} />
              <Route path={"/spaces"} element={<SpacesPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </UserProvider>
    </>
  );
}

export default App;

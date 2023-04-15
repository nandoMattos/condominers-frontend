import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import GlobalStyle from "./assets/styles/GlobalStyle";
import ResetCss from "./assets/styles/ResetCss";
import UserProvider from "./contexts/UserContext";
import PrivateRoute from "./helpers/PrivateRoute";
import AuthPage from "./pages/authentication/AuthPage";
import HomePage from "./pages/home/HomePage";
import ApartamentInvite from "./pages/apartaments/ApartamentInvite";
import Apartaments from "./pages/apartaments/Apartaments";
import MaintenancePage from "./pages/maintenance/MaintenancePage";
import RentSpacePage from "./pages/rent-space/RentSpacePage";
import ReportPage from "./pages/report/ReportPage";
import MyRequestsPage from "./pages/requests/MyRequestsPage";
import AllRequestsPage from "./pages/requests/AllRequestsPage";

function App() {
  return (
    <>
      <ToastContainer />
      <GlobalStyle />
      <ResetCss />
      <UserProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<PrivateRoute />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/maintenance" element={<MaintenancePage />} />
              <Route path="/rent-space" element={<RentSpacePage />} />
              <Route path="/apartaments" element={<Apartaments />} />
              <Route
                path="/apartaments/invitation/:jwToken"
                element={<ApartamentInvite />}
              />
              <Route path="/report" element={<ReportPage />} />
              <Route path="/my-requests" element={<MyRequestsPage />} />
            </Route>
            <Route path={"/login"} element={<AuthPage />} />
            <Route path={"/requests"} element={<AllRequestsPage />} />
          </Routes>
        </BrowserRouter>
      </UserProvider>
    </>
  );
}

export default App;

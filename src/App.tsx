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
              <Route
                path="/apartaments/invitation/:jwToken"
                element={<ApartamentInvite />}
              />
              <Route path="/apartaments" element={<Apartaments />} />
            </Route>
            <Route path={"/login"} element={<AuthPage />} />
          </Routes>
        </BrowserRouter>
      </UserProvider>
    </>
  );
}

export default App;

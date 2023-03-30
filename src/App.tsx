import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import GlobalStyle from "./assets/styles/GlobalStyle";
import ResetCss from "./assets/styles/ResetCss";
import UserProvider from "./contexts/UserContext";
import PrivateRoute from "./helpers/PrivateRoute";
import AuthPage from "./pages/authentication/AuthPage";
import HomePage from "./pages/home/HomePage";

function App() {
  const [userData, setUserData] = useState(null);

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
            </Route>
            <Route path="/login" element={<AuthPage />} />
          </Routes>
        </BrowserRouter>
      </UserProvider>
    </>
  );
}

export default App;

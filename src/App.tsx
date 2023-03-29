import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import GlobalStyle from "./assets/styles/GlobalStyle";
import ResetCss from "./assets/styles/ResetCss";
import UserContext from "./contexts/UserContext";
import PrivateRoute from "./helpers/PrivateRoute";
import AuthPage from "./pages/authentication/AuthPage";
import HomePage from "./pages/home/HomePage";

function App() {
  const [userData, setUserData] = useState(undefined);

  return (
    <>
      <ToastContainer />
      <UserContext.Provider value={{ userData, setUserData }}>
        <GlobalStyle />
        <ResetCss />
        <BrowserRouter>
          <Routes>
            <Route element={<PrivateRoute />}>
              <Route path="/" element={<HomePage />} />
            </Route>
            <Route path="/login" element={<AuthPage />} />
          </Routes>
        </BrowserRouter>
      </UserContext.Provider>
    </>
  );
}

export default App;

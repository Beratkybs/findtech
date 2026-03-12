import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/home/HomePage.jsx";
import AddResourcePage from "./pages/resource/AddResourcePage.jsx";
import AuthPage from "./pages/auth/AuthPage.jsx";
import { useAuthentication } from "../backend/store/useAuthentication.js";
import { useEffect } from "react";
import AuthLoading from "./components/AuthLoading.jsx";

function App() {
  const { isAuthenticated, authControl, authChecked } = useAuthentication();

  useEffect(() => {
    authControl();
  }, []);

  if (!authChecked) {
    return <AuthLoading />;
  }

  return (
    <>
      <Routes>
        <Route
          path="/login"
          element={isAuthenticated ? <Navigate to={"/home"} /> : <AuthPage />}
        />

        <Route
          path="/home"
          element={isAuthenticated ? <HomePage /> : <Navigate to={"/login"} />}
        />

        <Route
          path="/"
          element={isAuthenticated ? <HomePage /> : <Navigate to={"/login"} />}
        />

        <Route
          path="/add"
          element={
            isAuthenticated ? <AddResourcePage /> : <Navigate to={"/login"} />
          }
        />
      </Routes>
    </>
  );
}

export default App;

import "./App.css";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AddResourcePage from "./pages/AddResourcePage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/add" element={<AddResourcePage />} />
      </Routes>
    </>
  );
}

export default App;

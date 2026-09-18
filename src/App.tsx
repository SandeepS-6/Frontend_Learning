import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./features/Auth-System/pages/Login";
import Profile from "./features/Auth-System/pages/Profile";
import Projects from "./features/Auth-System/pages/Projects";
import Registrer from "./features/Auth-System/pages/Registrer";
import "./global.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Registrer />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/projects" element={<Projects />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

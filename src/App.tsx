import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./features/Auth-System/pages/Login";
import Profile from "./features/Auth-System/pages/Profile";
import Registrer from "./features/Auth-System/pages/Registrer";
import "./global.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Registrer />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

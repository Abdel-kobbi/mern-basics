import { useCookies } from "react-cookie"
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Register from "./Pages/Register";


function App() {

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  )
}

export default App
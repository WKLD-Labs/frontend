import { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation, Navigate } from "react-router-dom";
import './app.css'

import Mainlayout from "./layouts/Main";
import Homepage from "./pages/Home/Homepage";
import Login from "./pages/Login/Login.jsx";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export function App() {
  const isLogin = () => {
    const token = sessionStorage.getItem('token');
    return !!token;
  };
  return (
    <BrowserRouter>
      <ScrollToTop/>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Mainlayout/>}>
          <Route index element={<Homepage />} />
          <Route path="/agenda" element={isLogin() ? <Agenda /> : <Navigate to="/login" />} />
          <Route path="/inventory" element={isLogin() ? <Inventory /> : <Navigate to="/login" />} />
          <Route path="/roomschedule" element={isLogin() ? <JadwalRuangan /> : <Navigate to="/login" />} />
          <Route path="/schedule" element={isLogin() ? <Jadwal /> : <Navigate to="/login" />} />
          <Route path="/memberdata" element={isLogin() ? <Anggota /> : <Navigate to="/login" />} />
          <Route path="/documents" element={isLogin() ? <Document /> : <Navigate to="/login" />} />
          <Route path="*" element={<h1 class="w-full text-center text-3xl my-auto">404</h1>} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

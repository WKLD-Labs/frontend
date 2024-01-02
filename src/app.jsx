import { useEffect } from "react";
import {AuthProvider, useAuth} from "./context/AuthContext.jsx";
import { BrowserRouter, Routes, Route, useLocation, Navigate } from "react-router-dom";
import './app.css'

import Mainlayout from "./layouts/Main";
import Homepage from "./pages/Home/Homepage";
import Agenda from "./pages/Agenda/Agenda";
import Login from "./pages/Login/Login.jsx";

import Jadwal from "./pages/Jadwal/Jadwal";
import Inventory from "./pages/Inventory/Inventory.jsx";
import JadwalRuangan from "./pages/JadwalRuangan/JadwalRuangan";
import Pertemuan from "./pages/DaftarPertemuan/DaftarPertemuan";
import Document from "./pages/Dokumen/Dokumen";
import Anggota from "./pages/DataAnggota/Anggota"


function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

const ProtectedRoute = ({ component }) => {
  const { isLogin } = useAuth();
  return isLogin() ? component : <Navigate to="/login" />;
};

export function App() {
  return (
    <BrowserRouter>
      <ScrollToTop/>
      <AuthProvider>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Mainlayout/>}>
          <Route index element={<Homepage />} />
          <Route path="/agenda" element={<ProtectedRoute component={<Agenda />} />} />
          <Route path="/inventory" element={<ProtectedRoute component={<Inventory />} />} />
          <Route path="/roomschedule" element={<ProtectedRoute component={<JadwalRuangan />} />} />
          <Route path="/schedule" element={<ProtectedRoute component={<Jadwal />} />} />
          <Route path="/memberdata" element={<ProtectedRoute component={<Anggota />} />} />
          <Route path="/documents" element={<ProtectedRoute component={<Document />} />} />
          <Route path="/meetingschedule" element={<ProtectedRoute component={<Pertemuan />} />} />

          <Route path="*" element={<h1 class="w-full text-center text-3xl my-auto">404</h1>} />
        </Route>
      </Routes>
    </AuthProvider>
    </BrowserRouter>
  )
}

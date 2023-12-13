import { MdMenu } from "react-icons/md";
import { Link, NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import { useNavigate } from "react-router-dom";


import dummyprofile from "../assets/dummy-profile.jpg";
import logoasetext from "../assets/LogoASE-Text.png";

function Sidebar({open, onChange}) {
    const isLogin = () => {
        const token = sessionStorage.getItem('token');
        return !!token;
    };
    const navigate = useNavigate();
    const handleLogOut = () => {
        sessionStorage.clear();
        navigate("/");
    };
    return (
        <>
            <div class={`fixed top-0 left-0 w-64 h-full z-20 bg-aseorange transform transition-transform duration-300 ease-in-out ${open ? 'translate-x-0' : '-translate-x-full'}`}>
                <div class="flex flex-col gap-4">
                    <div class="flex justify-center w-full h-32 bg-white ">
                        <img class="w-5/6 object-cover" src={logoasetext} />
                    </div>
                    <nav class="flex flex-col gap-4 p-4 text-white text-lg font-medium">
                        {isLogin() ? (
                            <>
                                <NavLink className="navlink" to="/">Home</NavLink>
                                <NavLink className="navlink" to="/documents">Dokumen</NavLink>
                                <NavLink className="navlink" to="/schedule">Jadwal</NavLink>
                                <NavLink className="navlink" to="/agenda">Agenda</NavLink>
                                <NavLink className="navlink" to="/roomschedule">Jadwal Ruangan</NavLink>
                                <NavLink className="navlink" to="/memberdata">Data Anggota</NavLink>
                                <NavLink className="navlink" to="/inventory">Inventaris</NavLink>
                                <NavLink className="navlink" to="/meetingschedule">Daftar Pertemuan</NavLink>
                                <NavLink className="navlink" to="/" onClick={handleLogOut}>Logout</NavLink>
                            </>
                        ) : (
                            <>
                                <NavLink className="navlink" to="/">Home</NavLink>
                                <NavLink className="navlink" to="/login">Login</NavLink>
                            </>
                        )}
                    </nav>
                </div>
            </div>
            <div class={`absolute top-0 left-0 w-full h-full bg-black z-10 transition-opacity duration-300 ease-in-out ${open ? 'opacity-25' : 'opacity-0 pointer-events-none'}`} onClick={() => onChange(false)}></div>
        </>
        
        
    )
}

export default function NavigationBar() {
  const [openSidebar, setOpenSidebar] = useState(false);
  const location = useLocation();
  const name = sessionStorage.getItem('name');
  useEffect(() => {
    setOpenSidebar(false)
  }, [location])
  return (
    <>
        <Sidebar open={openSidebar} onChange={setOpenSidebar}/>
        <div class="flex flex-row items-center px-4 py-2 text-white bg-aseorange" >
            
            <span class="flex-1">
                <MdMenu class="cursor-pointer"  onClick={() => setOpenSidebar(true)} size="32px"/>
            </span>
            
            
            <Link to="/" class="flex flex-row gap-4 items-center">
                <span>{sessionStorage.getItem('name')?name:"User"}</span>
                <img class="w-10 rounded-full aspect-square" src={dummyprofile}/>
            </Link>
        </div>
    </>
    
  );
}

import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
import logo from '/src/assets/LogoASE-Text.png'

export default function Login(){
    const { login } = useAuth();
    const [formData, setFormData] = useState({
        username: "", password: ""
    });
    const navigate = useNavigate()
    function handleLogin(e){
        e.preventDefault();

        login(formData.username, formData.password)
            .then(data => {
                sessionStorage.setItem('name', data.name);
                sessionStorage.setItem('token', data.accessToken);
                navigate("/");
            })
            .catch(error => {
                console.log('Login failed:', error);
            })
    }
    const submitAvailable = formData.username&&formData.password;
    function updateFormData(e){
        setFormData({
            ...formData,
            [e.target.name]:e.target.value
        });
    }
    return (
        <div class="flex flex-col justify-center items-center">
            <img src={logo} alt="LogoASE" className="w-96" />
            <div class="login">
                <form className="flex flex-col gap-5 items-center" onSubmit={handleLogin}>
                    <input type="text" onChange={updateFormData} name="username" placeholder="Username" className="p-2 border rounded-xl border-black drop-shadow-lg shadow-black lg:w-96 md:w-96 sm:w-56"/>
                    <input type="password" onChange={updateFormData} name="password" placeholder="Password" className="p-2 border rounded-xl border-black drop-shadow-lg shadow-black lg:w-96 md:w-96 sm:w-56"/>
                    <input type="submit" value="Login" disabled={!submitAvailable} className={" h-12 w-36 rounded-xl " + (submitAvailable ? "bg-aseorange  text-white cursor-pointer": "bg-white text-black border border-asegrey")}/>
                </form>
            </div>
        </div>
    );
}
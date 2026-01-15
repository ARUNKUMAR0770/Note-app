import React, { useEffect, useState } from 'react'
import { User } from 'lucide-react';
import { CheckCheck } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";



const Navbar = () => {
    const [username, setUsername] = useState("");
    const location = useLocation();
    const navigate = useNavigate();


    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) return;

        try {
            const decoded = jwtDecode(token);
            setUsername(decoded.username || "");
        } catch {
            localStorage.removeItem("token");
        }
    }, []);

    const isDashboard = location.pathname === "/dashboard";

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    }



    return (
        <div className='w-full px-5 py-4 shadow-xl flex justify-between items-center font-semibold'>
            <div className="flex items-center justify-center cursor-pointer gap-1 underline-effect">
            <Link to="/">
            <h1 className='bg-none text-2xl  cursor-pointer '>Note</h1></Link>
            <CheckCheck />
            </div>
            <div className="flex gap-2 justify-center items-center">
            </div>
            {isDashboard ? (
                <div className="flex items-center gap-3">
                    <p>{username}</p>
                    <button onClick={handleLogout} className="bg-blue-600 text-white px-3 py-1 rounded-xl hover:bg-blue-800 cursor-pointer">
                        Logout
                    </button>
                </div>
            ) : (
                <Link to="/login" className='flex gap-5 items-center justify-center'>
                    <User width={35} height={35} className="border rounded-[50%] cursor-pointer hover:border-blue-400 hover:shadow-2xl hover:shadow-blue-400" />
                    <button className="cursor-pointer bg-blue-600 text-white px-3 py-2 rounded-xl hover:bg-blue-800">Login</button>
                </Link>
            )}

        </div>
    )
}

export default Navbar
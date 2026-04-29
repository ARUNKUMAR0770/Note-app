import { User } from 'lucide-react';
import { CheckCheck } from 'lucide-react';
import { Link} from 'react-router-dom';
import API from '../api/axios';
import { useEffect, useState } from 'react';
import { toast } from "react-hot-toast";




const Navbar = ({ name, setAuthUser,setIsLoading}) => {
    
   
    const handleLogout = async () => {
        setIsLoading(true)
        try {
            await API.post("/auth/logout");
            setAuthUser(null);
            window.location.href = "/login";
            toast.success("Logged out successfully!");

        } catch (error) {
            console.error(error);
            setIsLoading(false);
        }
        setIsLoading(false)
    };

    return (
        <div className='w-full px-5 py-4 shadow-xl flex justify-between items-center font-semibold'>
            <div className="flex items-center justify-center cursor-pointer gap-1 underline-effect">
            <Link to="/">
            <h1 className='bg-none text-2xl  cursor-pointer ' onClick={handleLogout} >Note</h1></Link>
            <CheckCheck />
            </div>
            <div className="flex gap-2 justify-center items-center">
            </div>
            {name ? (
                <div className="flex items-center gap-3">
                    <p>{name}</p>
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
import React from 'react'
import { useState } from 'react'
import { Navigate ,Link, useNavigate} from 'react-router-dom'
import API from '../api/axios'

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async(e) =>{
    e.preventDefault();
    try{
      const res = await API.post("/auth/login",{
        email,
        password,
      });
      localStorage.setItem("token",res.data.token);
      navigate("/dashboard");
    }catch(err){
      console.log(err);
    }
  }
  return (
    <div className='text-white w-full h-[calc(100vh-70px)] flex items-center justify-center'>
      <form onSubmit={handleLogin} className=" w-[75%] max-w-[500px] shadow-2xl shadow-blue-500 text-black flex flex-col rounded-lg p-6 gap-3  ">
        <h1 className='text-center text-2xl font-bold'> Login..</h1>
        <div className="flex flex-col gap-1">
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" className='border input-field' value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" className='border input-field' value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button  type="submit" className='border py-2 mt-3 bg-blue-500 text-white rounded-lg cursor-pointer hover:bg-blue-700'>Login</button>
        <p className='text-center text-sm'>Don't have an account? <Link to="/newaccount" className='text-blue-500 underline-effect'>create account</Link></p>
      </form>
    </div>
  )
}

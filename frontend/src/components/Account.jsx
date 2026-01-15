import React from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import API from '../api/axios.js';

const Account = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async(e) =>{
    e.preventDefault();

    try{
      await API.post("/auth/newaccount", {
        username,
        email,
        password,
      });
      navigate("/login");
    }catch(err){
      console.log(err);
    }
  }
  return (
    <div className='text-white w-full h-[calc(100vh-70px)] flex items-center justify-center'>
      <form onSubmit={handleRegister} className=" w-[75%] max-w-[500px] shadow-2xl shadow-blue-500 text-black flex flex-col rounded-lg p-6 gap-3  ">
        <h1 className='text-center text-2xl font-bold'>Create Account</h1>
        <div className="flex flex-col gap-1">
          <label htmlFor="username">Username:</label>
          <input type="text" id="username" className='border input-field' value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" className='border input-field' value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" className='border input-field' value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type='submit' className='border py-2 mt-3 bg-blue-500 text-white rounded-lg cursor-pointer hover:bg-blue-700'>Create account</button>
        <p className='text-center'>already have an account? <Link to="/login" className='text-blue-500 underline-effect'>login</Link></p>
      </form>
    </div>
  )
}

export default Account

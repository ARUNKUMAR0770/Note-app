import React, { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './pages/Navbar'
import { Home } from './pages/Home'
import { Login } from './pages/Login'
import Account from './pages/Account'
import Dashboard from './pages/Dashboard'
import API from './api/axios'
import PageLoader from './components/PageLoader'
import { Toaster,toast } from 'react-hot-toast'

const App = () => {

  const [AuthUser, setAuthUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        setIsLoading(true)
        const res = await API.get("/auth/check");
        setAuthUser(res.data)
        toast.success("logged in successfully!....")
        setIsLoading(false)
        
      } catch (error) {
        console.log("Error:", error.response?.data || error.message);
        setAuthUser(null);
        setIsLoading(false)
      }
    };

    checkAuth();
  }, []);

  useEffect(() => {
  }, [AuthUser]);

  if(isLoading){
    return <PageLoader/>
  }

  return (
    <BrowserRouter>
      <Navbar name={AuthUser?.username} setAuthUser={setAuthUser} setIsLoading={setIsLoading}/>
      <Routes>
        <Route path="/" element={!AuthUser? <Home />:<Dashboard/>} />
        <Route path="/login" element={!AuthUser? <Login setAuthUser={setAuthUser} setIsLoading={setIsLoading}/>: <Dashboard/>} />
        <Route path="/newaccount" element={!AuthUser? <Account setIsLoading={setIsLoading}/>:<Dashboard/> } />
        <Route path="/dashboard" element={AuthUser ? <Dashboard setIsLoading={setIsLoading}/> : <Login setAuthUser={setAuthUser} />} />
      </Routes>
        <Toaster/>
    </BrowserRouter>
  )
}

export default App

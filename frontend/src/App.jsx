import React, { useEffect, useState } from 'react'
import { HashRouter, Routes, Route } from 'react-router-dom'
import Navbar from './pages/Navbar'
import { Home } from './pages/Home'
import { Login } from './pages/Login'
import Account from './pages/Account'
import API from './api/axios'
import PageLoader from './components/PageLoader'
import { Toaster, toast } from 'react-hot-toast'
import Dashboard from './pages/Dashboard';

const App = () => {

  const [AuthUser, setAuthUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      setIsLoading(true)
      try {
        const res = await API.get("/auth/check", { withCredentials: true });
        setAuthUser(res.data);
      } catch (error) {
        console.log("Error:", error.response?.data || error.message);
        setAuthUser(null);
        setIsLoading(false)
      }
      setIsLoading(false)
    };

    checkAuth();
  }, []);

  useEffect(() => {
  }, [AuthUser]);

  if (isLoading) {
    return <PageLoader />
  }

  return (
    <HashRouter>
      <Navbar name={AuthUser?.username} setAuthUser={setAuthUser} setIsLoading={setIsLoading} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={AuthUser ? <Dashboard /> : <Login setAuthUser={setAuthUser} setIsLoading={setIsLoading} />} />
        <Route path="/newaccount" element={AuthUser ? <Dashboard /> : <Account setIsLoading={setIsLoading} />} />
        <Route path="/dashboard" element={AuthUser ? <Dashboard setIsLoading={setIsLoading} /> : <Login setAuthUser={setAuthUser} />} />
      </Routes>
      <Toaster />
    </HashRouter>
  )
}

export default App

import React, { useEffect, useState} from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './pages/Navbar';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import Account from './pages/Account';
import Dashboard from './pages/Dashboard';
import API from './api/axios';
import PageLoader from './components/PageLoader';
import { Toaster } from 'react-hot-toast';

const App = () => {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
};

const AppContent = () => {
  const [AuthUser, setAuthUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await API.get("/auth/check", { withCredentials: true });
        setAuthUser(res.data);
        Navigate("/dashboard")
      } catch (error) {
        setAuthUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (isLoading) return <PageLoader />;

  return (
    <>
      <Navbar name={AuthUser?.username} setAuthUser={setAuthUser} setIsLoading={setIsLoading} />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/login" element={AuthUser ?<Navigate to="/dashboard" /> : <Login setAuthUser={setAuthUser} setIsLoading={setIsLoading} />} />

        <Route path="/newaccount" element={AuthUser ? <Navigate to="/dashboard" /> : <Account setIsLoading={setIsLoading} />} />

        <Route path="/dashboard" element={AuthUser ? <Dashboard setIsLoading={setIsLoading} /> : <Navigate to="/login" /> } />
      </Routes>

      <Toaster />
    </>
  );
};

export default App;
import { useState, useContext } from 'react';
import img from '../images/Off White Gold Modern Minimal Floral Zoom Virtual Background (1).png';
import Input from '../components/Input';
import { Button, CircularProgress } from '@mui/material';

import { useState, useContext, useEffect } from 'react'
import landingInit from '../images/landing_page_image.png'
import Input from '../components/Input'
import api from '../api/axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../auth/AuthContext';

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const signin = async () => {
    setLoading(true);
    try {
      const res = await api.post(`auth/login`, {
        email: email,
        password: password,
      });

      // Navigate based on role (assuming role exists in res)
      const role = res?.data?.user?.roles[0]?.toLowerCase() || 'dashboard';
      login(res.data.user, res.data.accessToken);
      navigate(`/${role}`);
    } catch (error) {
      console.error("Login error:", error);
      alert(error.response?.data?.message || "Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    signin();
  };

  return (
    <div className='flex w-screen h-screen items-center'>
      <div className='flex flex-col items-center justify-center absolute z-10'>
        <div className='ml-18 w-[60%]'>
          <h1 className='font-bold text-3xl text-slate-500'>Welcome Back</h1>
          <p className='text-lg pt-3 text-slate-400'>
            Sign in to our website and start storing your important tasks to complete them later.
          </p>
          
          <form 
            onSubmit={handleSubmit} 
            className='flex flex-col justify-center items-center p-3 mt-10 bg-slate-50 rounded-2xl py-8 gap-3'
          >
            <Input
              type='email'
              placeholder='Email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required={true}
              name="username"
              autoComplete="username"
            />
            <Input
              type={showPassword ? "text" : "password"}
              placeholder='Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              visible={() => setShowPassword(!showPassword)}
              hidePassword={showPassword}
              passwordToggleButton={true}
              required={true}
              name="password"
              autoComplete="current-password"
            />

            <div className='flex gap-x-6 w-full justify-center'>
              <div className='pt-4'>
                <Button 
                  variant='contained' 
                  type='submit' 
                  size='large'
                  disabled={loading}
                >
                  {loading ? <CircularProgress size={24} color="inherit" /> : "Login"}
                </Button>
              </div>
              <div className='pt-4'>
                <Button 
                  variant='outlined' 
                  type='button' 
                  onClick={() => navigate('/signup')}
                  disabled={loading}
                >
                  Register
                </Button>
  const { login, user } = useContext(AuthContext);
  const navigate = useNavigate();

  const signin = async () => {
    try { 
      const res = await api.post(`auth/login`, {
        email: email,
        password,
      })
      login(res.data.user, res.data.accessToken);
      navigate(`/${res.data.user.roles[0].name.toLowerCase()}`);
    } catch (error) {
      console.error("Login failed", error);
      alert("Login failed. Please check your credentials.");
    }
  }

  useEffect(() => {
    if (user) {
      navigate(`/${user.roles[0].name.toLowerCase()}`);
    }
  }, [user]);

  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-50 font-sans selection:bg-blue-500/30 flex items-center justify-center relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-7xl opacity-30 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/40 rounded-full blur-[100px] mix-blend-screen animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-600/40 rounded-full blur-[100px] mix-blend-screen animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 w-full max-w-6xl flex flex-col md:flex-row items-center justify-center gap-12 p-6">

        {/* Form Section */}
        <div className="w-full md:w-1/2 max-w-md">
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-6">
              <div className="flex h-8 w-8 items-center justify-center rounded bg-blue-600 text-xs font-bold text-white">
                CS
              </div>
              <span className="text-lg font-bold tracking-tight text-white">
                College Sync
              </span>
            </div>
            <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-b from-white to-zinc-400 bg-clip-text text-transparent">
              Welcome Back
            </h1>
            <p className="mt-2 text-zinc-400">
              Sign in to manage your tasks and continue your progress.
            </p>
          </div>

          <div className="bg-zinc-900/50 backdrop-blur-xl border border-zinc-800 rounded-2xl p-8 shadow-2xl">
            <div className="flex flex-col gap-5">
              <Input
                type='email'
                placeholder='Email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required={true}
                className="!bg-zinc-800/50 !border-zinc-700 !text-zinc-100 focus:!border-blue-500 placeholder:!text-zinc-500"
                labelClassName="!bg-[#09090b] !text-zinc-400 peer-focus:!text-blue-500 peer-focus:!bg-[#09090b]"
                containerClassName="!w-full"
              />
              <Input
                type={showPassword ? "text" : "password"}
                placeholder='Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                visible={() => setShowPassword(!showPassword)}
                hidePassword={showPassword}
                passwordToggleButton={true}
                required={true}
                className="!bg-zinc-800/50 !border-zinc-700 !text-zinc-100 focus:!border-blue-500 placeholder:!text-zinc-500"
                labelClassName="!bg-[#09090b] !text-zinc-400 peer-focus:!text-blue-500 peer-focus:!bg-[#09090b]"
                containerClassName="!w-full"
              />

              <div className="flex flex-col gap-4 mt-4">
                <button
                  onClick={() => signin()}
                  className="w-full py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-500 transition-all shadow-[0_0_20px_-5px_rgba(37,99,235,0.5)]"
                >
                  Sign In
                </button>
                <div className="text-center text-sm text-zinc-500">
                  Don't have an account?{' '}
                  <button
                    onClick={() => navigate('/signup')}
                    className="text-blue-400 hover:text-blue-300 font-medium transition-colors"
                  >
                    Sign Up
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className="h-screen flex justify-center items-center ml-18 w-full">
        <img src={img} className='h-full w-full object-cover' alt="Background" />

        {/* Visual Section */}
        <div className="hidden md:block w-1/2 relative">
          <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 to-purple-500/10 rounded-2xl backdrop-blur-3xl -z-10"></div>
          <img
            src={landingInit}
            alt="Signin Background"
            className='w-full object-cover rounded-2xl shadow-2xl border border-zinc-800/50 opacity-90 block'
          >
          </img>
          <div className="absolute -bottom-6 -right-6 bg-[#18181b] border border-zinc-800 p-4 rounded-xl shadow-xl backdrop-blur-md">
            <div className="flex items-center gap-3">
              <div className="h-2 w-2 rounded-full bg-blue-500 animate-pulse"></div>
              <span className="text-sm font-medium text-zinc-300">Secure Login</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signin;
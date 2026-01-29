import { useState, useContext } from 'react';
import img from '../images/Off White Gold Modern Minimal Floral Zoom Virtual Background (1).png';
import Input from '../components/Input';
import { Button, CircularProgress } from '@mui/material';
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
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className="h-screen flex justify-center items-center ml-18 w-full">
        <img src={img} className='h-full w-full object-cover' alt="Background" />
      </div>
    </div>
  );
}

export default Signin;
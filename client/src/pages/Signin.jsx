import { useState, useContext, useEffect } from 'react';
import landingInit from '../images/landing_page_image.png';
import Input from '../components/Input';
import api from '../api/axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../auth/AuthContext';
import { CircularProgress } from '@mui/material';

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const { login, user } = useContext(AuthContext);
  const navigate = useNavigate();

  const signin = async () => {
    if (!email || !password) {
      alert("Please fill in all fields");
      return;
    }

    setLoading(true);
    try {
      const res = await api.post(`/auth/login`, {
        email: email,
        password: password,
      });
      console.log(res.data);
      const userData = res.data.user;
      login(userData, res.data.accessToken);
      navigate(`/${userData.roles[0].name.toLowerCase()}`);
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

  useEffect(() => {
    if (user) {
      const role = user?.roles[0]?.name;
      navigate(`/${role.toLowerCase()}`);
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-50 font-sans selection:bg-blue-500/30 flex items-center justify-center relative overflow-hidden">

      {/* Background Decorative Blobs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-7xl opacity-30 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/40 rounded-full blur-[100px] mix-blend-screen animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-600/40 rounded-full blur-[100px] mix-blend-screen animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 w-full max-w-6xl flex flex-col md:flex-row items-center justify-center gap-12 p-6">

        {/* Header and Form Section */}
        <div className="w-full md:w-1/2 max-w-md">
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-6">
              <div className="flex h-8 w-8 items-center justify-center rounded bg-blue-600 text-xs font-bold text-white shadow-lg shadow-blue-600/20">
                CS
              </div>
              <span className="text-lg font-bold tracking-tight text-zinc-100">
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

          {/* Form Card: Updated to Dark Glass to match Signup */}
          <div className="bg-zinc-900/40 backdrop-blur-xl border border-zinc-800 rounded-2xl p-8 shadow-2xl">
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <Input
                type='email'
                placeholder='Email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required={true}
                className="!bg-zinc-950/50 !border-zinc-800 !text-white focus:!border-blue-500 placeholder:!text-zinc-600"
                labelClassName="!bg-transparent !text-zinc-500 peer-focus:!text-blue-500"
                containerClassName="!w-full"
                name="email"
                autoComplete="email"
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
                className="!bg-zinc-950/50 !border-zinc-800 !text-white focus:!border-blue-500 placeholder:!text-zinc-600"
                labelClassName="!bg-transparent !text-zinc-500 peer-focus:!text-blue-500"
                containerClassName="!w-full"
                name="password"
                autoComplete="current-password"
              />

              <div className="flex flex-col gap-4 mt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-500 transition-all hover:shadow-[0_0_25px_-5px_rgba(37,99,235,0.5)] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center"
                >
                  {loading ? <CircularProgress size={24} color="inherit" /> : "Sign In"}
                </button>
                <div className="text-center text-sm text-zinc-500">
                  {/* Don't have an account?{' '} */}
                  {/* <button
                    type="button"
                    onClick={() => navigate('/signup')}
                    className="text-blue-400 hover:text-blue-300 font-medium transition-colors underline-offset-4 hover:underline"
                  >
                    Sign Up
                  </button> */}
                </div>
              </div>
            </form>
          </div>
        </div>

        {/* Visual Section */}
        <div className="hidden md:block w-1/2 relative">
          <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 to-purple-500/20 rounded-2xl backdrop-blur-3xl -z-10"></div>
          <img
            src={landingInit}
            alt="Signin Background"
            className='w-full object-cover rounded-2xl shadow-2xl border border-zinc-800/50 opacity-80 block'
          />
          <div className="absolute -bottom-6 -right-6 bg-zinc-900/90 border border-zinc-800 p-4 rounded-xl shadow-xl backdrop-blur-md">
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
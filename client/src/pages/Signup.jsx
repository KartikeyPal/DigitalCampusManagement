import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../components/Input';
import api from '../api/axios';
import landingInit from '../images/landing_page_image.png';
const Signup = () => {
  const [Username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const signup = async () => {
    try {
      await api.post(`auth/register`, {
        name: Username,
        password,
        confirmPassword,
        email,
        role,
      });
      alert("Signup Successfully");
      navigate('/login');

    } catch (error) {
      console.error("Signup failed", error);
      alert("Signup failed. Please try again.");
    }
  }

  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-50 font-sans selection:bg-blue-500/30 flex items-center justify-center relative overflow-hidden">

      {/* Decorative Background Blobs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-7xl opacity-30 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/40 rounded-full blur-[100px] mix-blend-screen animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-600/40 rounded-full blur-[100px] mix-blend-screen animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 w-full max-w-6xl flex flex-col md:flex-row items-center justify-center gap-12 p-6">

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
              Start your journey
            </h1>
            <p className="mt-2 text-zinc-400">
              Create an account to manage tasks and campus activities.
            </p>
          </div>

          {/* Form Card: Switched to Dark Glass for better visual flow */}
          <div className="bg-zinc-900/40 backdrop-blur-xl border border-zinc-800 rounded-2xl p-8 shadow-2xl">
            <div className="flex flex-col gap-5">
              <Input
                type='text'
                placeholder='Username'
                value={Username}
                onChange={(e) => setUsername(e.target.value)}
                required={true}
                className="!bg-zinc-950/50 !border-zinc-800 !text-white focus:!border-blue-500 placeholder:!text-zinc-600"
                labelClassName="!bg-transparent !text-zinc-500 peer-focus:!text-blue-500"
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
                className="!bg-zinc-950/50 !border-zinc-800 !text-white focus:!border-blue-500 placeholder:!text-zinc-600"
                labelClassName="!bg-transparent !text-zinc-500 peer-focus:!text-blue-500"
                containerClassName="!w-full"
              />
              <Input
                type={showConfirmPassword ? "text" : "password"}
                placeholder='Confirm Password'
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                visible={() => setShowConfirmPassword(!showConfirmPassword)}
                hidePassword={showConfirmPassword}
                passwordToggleButton={true}
                required={true}
                className="!bg-zinc-950/50 !border-zinc-800 !text-white focus:!border-blue-500 placeholder:!text-zinc-600"
                labelClassName="!bg-transparent !text-zinc-500 peer-focus:!text-blue-500"
                containerClassName="!w-full"
              />
              <Input
                type='email'
                placeholder='Email Address'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required={true}
                className="!bg-zinc-950/50 !border-zinc-800 !text-white focus:!border-blue-500 placeholder:!text-zinc-600"
                labelClassName="!bg-transparent !text-zinc-500 peer-focus:!text-blue-500"
                containerClassName="!w-full"
              />

              <div className="relative w-full">
                <label className="absolute -top-2 left-3 bg-[#111113] px-2 text-[10px] uppercase font-bold tracking-widest text-zinc-500 z-10">
                  Role
                </label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  required
                  className="w-full h-[46px] rounded-lg bg-zinc-950/50 border border-zinc-800 px-3 text-zinc-300 focus:outline-none focus:border-blue-500 appearance-none transition-all cursor-pointer"
                >
                  <option value="" disabled className="bg-zinc-900">Select role</option>
                  <option value="STUDENT" className="bg-zinc-900">Student</option>
                  <option value="FACULTY" className="bg-zinc-900">Faculty</option>
                  <option value="HOD" className="bg-zinc-900">HOD</option>
                  <option value="ADMIN" className="bg-zinc-900">Admin</option>
                </select>
                <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-zinc-500">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </div>
              </div>

              <div className="flex flex-col gap-4 mt-4">
                <button
                  onClick={() => signup()}
                  className="w-full py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-500 transition-all hover:shadow-[0_0_25px_-5px_rgba(37,99,235,0.5)] active:scale-[0.98]"
                >
                  Create Account
                </button>
                <div className="text-center text-sm text-zinc-500">
                  Already have an account?{' '}
                  <button
                    onClick={() => navigate('/login')}
                    className="text-blue-400 hover:text-blue-300 font-medium transition-colors underline-offset-4 hover:underline"
                  >
                    Sign In
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="hidden md:block w-1/2 relative">
          <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 to-purple-500/20 rounded-2xl backdrop-blur-3xl -z-10"></div>
          <img
            src={landingInit}
            alt="Campus Life"
            className="w-full object-cover rounded-2xl shadow-2xl border border-zinc-800/50 opacity-80"
          />
          <div className="absolute -bottom-6 -right-6 bg-zinc-900/90 border border-zinc-800 p-4 rounded-xl shadow-xl backdrop-blur-md">
            <div className="flex items-center gap-3">
              <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
              <span className="text-sm font-medium text-zinc-300">System Operational</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Signup;
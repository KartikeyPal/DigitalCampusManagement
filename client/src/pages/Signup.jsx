
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../components/Input';
import api from '../api/axios';
import landingInit from '../images/landing_page_image.png'; // Reusing landing page image which likely fits dark theme better

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
      // navigate('/login');
    } catch (error) {
      console.error("Signup failed", error);
      alert("Signup failed. Please try again.");
    }
  }

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
              Start your journey
            </h1>
            <p className="mt-2 text-zinc-400">
              Create an account to manage tasks and campus activities.
            </p>
          </div>

          <div className="bg-zinc-900/50 backdrop-blur-xl border border-zinc-800 rounded-2xl p-8 shadow-2xl">
            <div className="flex flex-col gap-5">
              <Input
                type='text'
                placeholder='Username'
                value={Username}
                onChange={(e) => setUsername(e.target.value)}
                required={true}
                className="bg-zinc-800/50 border-zinc-700 text-zinc-100 focus:!border-blue-500 placeholder:!text-zinc-500"
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
              <Input
                type={showConfirmPassword ? "text" : "password"}
                placeholder='Confirm Password'
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                visible={() => setShowConfirmPassword(!showConfirmPassword)}
                hidePassword={showConfirmPassword}
                passwordToggleButton={true}
                required={true}
                className="!bg-zinc-800/50 !border-zinc-700 !text-zinc-100 focus:!border-blue-500 placeholder:!text-zinc-500"
                labelClassName="!bg-[#09090b] !text-zinc-400 peer-focus:!text-blue-500 peer-focus:!bg-[#09090b]"
                containerClassName="!w-full"
              />
              <Input
                type='email'
                placeholder='Email Address'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required={true}
                className="!bg-zinc-800/50 !border-zinc-700 !text-zinc-100 focus:!border-blue-500 placeholder:!text-zinc-500"
                labelClassName="!bg-[#09090b] !text-zinc-400 peer-focus:!text-blue-500 peer-focus:!bg-[#09090b]"
                containerClassName="!w-full"
              />
              <Input
                type="text"
                placeholder='Role'
                value={role}
                onChange={(e) => setRole(e.target.value)}
                required={true}
                className="!bg-zinc-800/50 !border-zinc-700 !text-zinc-100 focus:!border-blue-500 placeholder:!text-zinc-500"
                labelClassName="!bg-[#09090b] !text-zinc-400 peer-focus:!text-blue-500 peer-focus:!bg-[#09090b]"
                containerClassName="!w-full"
              />

              <div className="flex flex-col gap-4 mt-4">
                <button
                  onClick={() => signup()}
                  className="w-full py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-500 transition-all shadow-[0_0_20px_-5px_rgba(37,99,235,0.5)]"
                >
                  Create Account
                </button>
                <div className="text-center text-sm text-zinc-500">
                  Already have an account?{' '}
                  <button
                    onClick={() => navigate('/login')}
                    className="text-blue-400 hover:text-blue-300 font-medium transition-colors"
                  >
                    Sign In
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Visual Section (Hidden on mobile) */}
        <div className="hidden md:block w-1/2 relative">
          <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 to-purple-500/10 rounded-2xl backdrop-blur-3xl -z-10"></div>
          <img
            src={landingInit}
            alt="Campus Life"
            className="w-full object-cover rounded-2xl shadow-2xl border border-zinc-800/50 opacity-90 block"
          />
          <div className="absolute -bottom-6 -right-6 bg-[#18181b] border border-zinc-800 p-4 rounded-xl shadow-xl backdrop-blur-md">
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

export default Signup

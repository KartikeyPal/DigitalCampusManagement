
import { useState } from 'react'
import img from '../images/Off White Gold Modern Minimal Floral Zoom Virtual Background (1).png'
import Input from '../components/Input'
import { Button } from '@mui/material';
import api from '../api/axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../auth/AuthContext';
const Signin = () => {
  const [Username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const signin = async () => {
    const res = await api.post(`auth/login`, {
      userName: Username,
      password,

    })
    //   const jwt = res.data.token;
    //   localStorage.setItem("token",jwt);
    //   navigate('/dashboard');
    // }
    login(res.data.user, res.data.token);
    navigate(`/${res.data.user.role.toLowerCase()}`);
  }



  return (
    <div className='flex w-screen h-screen items-center'>
      <div className='flex flex-col  items-center justify-center absolute'>
        <div className=' ml-18 w-[60%]'>
          <h1 className='font-bold text-3xl text-slate-500'>Welcome Back</h1>
          <p className='text-lg pt-3 text-slate-400' >Signin in our website and start storing you important task to complete it later</p>
          <div className=' flex flex-col justify-center items-center p-3   mt-10 bg-slate-50 rounded-2xl py-8 gap-3'>
            <Input
              type='text'
              placeholder='Username'
              value={Username}
              onChange={(e) => setUsername(e.target.value)}
              required={true}
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
            />

            <div className='flex gap-x-6'>

              <div className='pt-4'>
                <Button varient='Primary' size='md' text='Sign In' onClick={() => { signin() }} />
              </div>
              <div className='pt-4'>
                <Button varient='Secondary' size='md' text='Sign Up' onClick={() => { navigate('/signup') }} />
              </div>
            </div>

          </div>
        </div>
      </div>
      <div className="h-screen  flex justify-center items-center ml-18">
        <img src={img} className='h-full w-full' >
        </img>
      </div>
    </div>
  )
}

export default Signin

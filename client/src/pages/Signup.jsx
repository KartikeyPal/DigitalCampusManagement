
import { useState } from 'react'
import img from '../images/Off White Gold Modern Minimal Floral Zoom Virtual Background (1).png'
import Input from '../components/Input'
import { Button } from '@mui/material'
// import {backendUrl} from '../../config.tsx'
import api from '../api/axios';
import { useNavigate } from 'react-router-dom';
const Signup = () => {
    const [Username,setUsername] = useState("");
    const [password,setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [email,setEmail] = useState("");
    const [role,setRole] = useState("");
    const [showPassword,setShowPassword] = useState(false);
    const navigate = useNavigate();
    const signup =async ()=>{
      await api.post(`auth/register`,{
          userName: Username,
          password,
          confirmPassword,
          email,
          role,
      })
      alert("signup Successfully");
      navigate('/login');
    }
  return (
    <div className='flex w-screen h-screen items-center'>
        <div className='flex flex-col  items-center justify-center absolute'>
          <div className=' ml-18 w-[60%]'>
            <h1 className='font-bold text-3xl text-slate-500'>Ready To start storing important tasks</h1>
            <p className='text-lg pt-3 text-slate-400' >Signup in our website and start storing you important task to complete it later</p>
            <div className=' flex flex-col justify-center items-center p-3   mt-10 bg-slate-50 rounded-2xl py-8 gap-3'>
               <Input 
                    type='text' 
                    placeholder='Username' 
                    value={Username}
                    onChange={(e)=>setUsername(e.target.value)}
                    required={true}
               />
               <Input 
                    type={showPassword? "text" : "password"} 
                    placeholder='Password' 
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                    visible={()=>setShowPassword(!showPassword)}
                    hidePassword = {showPassword}
                    passwordToggleButton={true}
                    required={true}
               />    
               <Input 
                    type={showConfirmPassword? "text" : "password"} 
                    placeholder='Confirm Password' 
                    value={confirmPassword}
                    onChange={(e)=>setConfirmPassword(e.target.value)}
                    visible={()=>setShowConfirmPassword(!showConfirmPassword)}
                    hidePassword = {showConfirmPassword}
                    passwordToggleButton={true}
                    required={true}
               />  
               <Input 
                   type='email'
                    placeholder='enter email' 
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                    required={true}
               />
               <Input 
                    type="text" 
                    placeholder='role' 
                    value={role}
                    onChange={(e)=>setRole(e.target.value)}
                    required={true}
               />
              <div className='flex gap-x-6'>
                    <div className='pt-4'>
                      <button onClick={()=>{signup()}}>Sign Up</button>
                        {/* <Button varient='Primary' size='md' text='Sign Up' onClick={()=>{signup()}} />   */}
                    </div> 
                    <div className='pt-4'>
                        <button onClick={()=>{navigate('/login')}}>Sign In</button>
                        {/* <Button varient='Secondary' size='md' text='Sign In' onClick={()=>{navigate('/signin')}} />  */}
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

export default Signup

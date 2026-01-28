import React, {useEffect,useState} from 'react'
import api from '../api/axios'
const Notification = () => {
    const [notification,setNotification] = useState([]);
    const [loading,setLoading] = useState(true);
    const user = JSON.parse(localStorage.getItem("user"));
    console.log(user)
    console.log(user.id)
    useEffect(()=>{
        api.get(`/notifications/user/${user.id}`)
        .then((response)=>{
            console.log(response);
            setNotification(response.data);
        })
        .catch((error)=>{
            console.log(error);
        }).finally(()=>{
            setLoading(false);
        })
    },[])
    setInterval(()=>{
        api.get(`/notifications/user/${user.id}`)
        .then((response)=>{
            console.log(response);
            setNotification(response.data);
        })
        .catch((error)=>{
            console.log(error);
        })
    },30000)

    if(loading){
        return <div>Loading...</div>
    }
    if(notification.length===0){
        return (
            <div className='flex flex-col items-center justify-center h-screen'>
                <h1 className="text-2xl mb-4">Notification</h1>
                <p>No notification found</p>
            </div>
        )
    }

  return (
    <div className='flex flex-col items-center justify-center h-screen'>
      <h1 className="text-2xl mb-4">Notification</h1>
    </div>
  )
}

export default Notification
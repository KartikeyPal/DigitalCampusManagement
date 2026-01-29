import React, { useEffect, useState } from 'react'
import api from '../api/axios'
const Notification = () => {
    const [notification, setNotification] = useState([]);
    const [loading, setLoading] = useState(true);
    // const user = JSON.parse(localStorage.getItem("user"));
    useEffect(() => {
        // api.get(`/notifications/user/${user.id}`)
        api.get(`/notifications`)
            .then((response) => {

                setNotification(response.data);
            })
            .catch((error) => {
                console.log(error);
            }).finally(() => {
                setLoading(false);
            })
    }, [])


    if (loading) {
        return <div>Loading...</div>
    }
    if (notification.length === 0) {
        return (
            <div className='flex flex-col items-center justify-center h-screen'>
                <h1 className="text-2xl mb-4">Notification</h1>
                <p>No notification found</p>
            </div>
        )
    }

    return (
        <div className='flex flex-col items-center justify-start min-h-screen pt-10 px-4'>
            <h1 className="text-2xl mb-6 font-bold text-white">Notifications</h1>
            <div className="w-full max-w-4xl space-y-4">
                {notification.map((notif) => (
                    <div key={notif.id} className="bg-zinc-900/50 p-4 rounded-lg border border-zinc-800 hover:border-zinc-700 transition-colors">
                        <div className="flex justify-between items-start mb-2">
                            <h3 className="font-medium text-white text-lg">{notif.title}</h3>
                            <span className="text-xs text-zinc-500 bg-zinc-800 px-2 py-1 rounded">
                                {notif.targetRole || "ALL"}
                            </span>
                        </div>
                        <p className="text-zinc-400 mb-3 whitespace-pre-wrap">{notif.message}</p>
                        <div className="text-xs text-zinc-600 border-t border-zinc-800/50 pt-2">
                            {new Date(notif.createdAt).toLocaleDateString()} {new Date(notif.createdAt).toLocaleTimeString()}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Notification 
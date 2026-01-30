import React from 'react'
import { useEffect, useState } from 'react'
import api from '../../api/axios'
const Notes = () => {
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        api.get('/notes')
            .then((response) => {
                setNotes(response.data);
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
    if(notes.length===0){
        return (
            <div className='flex flex-col items-center justify-center h-screen'>
                <h1 className="text-2xl mb-4">Notes</h1>
                <p>No notes found</p>
            </div>
        )
    }
    return (
        <div className="flex-1 bg-[#1a1c1e] border border-slate-800 rounded-[2.5rem] p-8 min-h-[500px] shadow-xl">
          <h2 className="text-2xl font-semibold text-white mb-8 capitalize">your uploaded notes</h2>
          
          <div className="space-y-4 overflow-y-auto max-h-[65vh] pr-4 scrollbar-hide">
            {loading ? (
              <p className="text-slate-500 text-center animate-pulse">Syncing with server...</p>
            ) : notes.length === 0 ? (
              <p className="text-slate-600 text-center mt-20 italic">No notes uploaded yet.</p>
            ) : (
              notes.map((note) => (
                <div key={note.id} className="bg-white/5 border border-slate-700 p-5 rounded-3xl flex justify-between items-center group hover:bg-white/10 transition-all">
                  <div className="flex flex-col">
                    <span className="text-white font-medium">{note.fileName}</span>
                    <span className="text-slate-500 text-xs uppercase tracking-widest mt-1 font-semibold">
                      Faculty: {note.uploadedBy}
                    </span>
                  </div>
                  
                  <div className="flex gap-4">
                    <a 
                      href={note.fileUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-indigo-400 hover:text-indigo-300 text-sm font-bold uppercase tracking-widest"
                    >
                      View
                    </a>
                    
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
    )
}

export default Notes
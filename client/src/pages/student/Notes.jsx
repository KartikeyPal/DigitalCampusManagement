import React from 'react'
import { useEffect, useState } from 'react'
const Notes = () => {
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        api.get('/student/notes')
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
    return (
        <div>
            <h1 className="text-2xl mb-4">Notes</h1>

            {notes.map(n => (
                <div key={n.id} className="bg-gray-800 p-4 mb-3 rounded">
                    <h2>{n.subject}</h2>
                    <a
                        href={n.fileUrl}
                        className="text-blue-400"
                        target="_blank"
                    >
                        Download
                    </a>
                </div>
            ))}
        </div>
    )
}

export default Notes
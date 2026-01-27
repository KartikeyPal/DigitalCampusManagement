import React, { useEffect } from 'react'
import api from '../../api/axios'
const Assignments = () => {
    const [assignment,setAssignments] = useState([]);
    const [loading,setLoading] = useState(true);
    
    useEffect(()=>{
        api.get('/student/assignment')
        .then((response)=>{
            setAssignments(response.data);
        })
        .catch((error)=>{
            console.log(error);
        }).finally(()=>{
            setLoading(false);
        })
    },[])

    if(loading){
        return <div>Loading...</div>
    }
  return (
    <div>
      <h1 className="text-2xl mb-4">Assignments</h1>

      <div className="grid gap-4">
        {assignment.map(a => (
          <div key={a.id} className="bg-gray-800 p-4 rounded">
            <h2 className="font-semibold">{a.title}</h2>
            <p className="text-sm text-gray-400">{a.description}</p>
            <p className="text-sm mt-2">Due: {a.dueDate}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Assignments
import React, { useEffect, useState } from 'react'
import api from '../../api/axios'
const Assignments = () => {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/assignments')
      .then((response) => {
        console.log(response);
        setAssignments(response.data);
      })
      .catch((error) => {
        console.error("Failed to fetch assignments", error);
      })
      .finally(() => {
        setLoading(false);
      })
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-[#020617] text-white flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-4 w-4 bg-indigo-500 rounded-full mb-2 animate-bounce"></div>
          <p className="text-indigo-400 font-medium">Loading Assignments...</p>
        </div>
      </div>
    )
  }

  if (assignments.length === 0) {
    return (
      <div className="min-h-screen bg-[#020617] text-white flex flex-col items-center justify-center p-6">
        <div className="bg-[#111827] border border-gray-800 p-8 rounded-2xl shadow-xl max-w-md w-full text-center">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent mb-4">
            Assignments
          </h1>
          <p className="text-gray-400 mb-6">No assignments found at the moment.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#020617] text-white p-8">
      <div className="max-w-4xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
            My Assignments
          </h1>
          <p className="text-gray-400 mt-2">Manage and submit your coursework.</p>
        </header>

        <div className="grid gap-6 md:grid-cols-1">
          {assignments.map(a => (
            <div
              key={a.id}
              className="group relative bg-[#111827] border border-gray-800 p-6 rounded-xl shadow-lg hover:shadow-indigo-500/10 hover:border-indigo-500/30 transition-all duration-300"
            >
              <div className="flex flex-col md:flex-row justify-between md:items-start gap-4">
                <div className="flex-1">
                  <h2 className="text-xl font-semibold text-white group-hover:text-indigo-400 transition-colors">
                    {a.title}
                  </h2>
                  <p className="text-gray-400 mt-2 leading-relaxed">
                    {a.description || "No description provided."}
                  </p>
                </div>
                <div className="flex flex-col items-start md:items-end gap-2 min-w-[140px]">
                  <div className="bg-indigo-500/10 text-indigo-400 px-3 py-1 rounded-full text-xs font-medium border border-indigo-500/20">
                    Active
                  </div>
                  <div className="text-sm text-gray-500 pt-1">
                    <span className="block text-xs uppercase tracking-wider text-gray-600 font-bold mb-1">Due Date</span>
                    <span className="text-gray-300">
                      {a.deadline ? new Date(a.deadline).toLocaleString() : "No deadline"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Area - Could be expanded for submission */}
              <div className="mt-6 pt-4 border-t border-gray-800 flex justify-end">
                <button className="text-sm font-medium text-indigo-400 hover:text-indigo-300 transition-colors flex items-center gap-1">
                  View Details <span aria-hidden="true">&rarr;</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Assignments
import React, { useEffect, useState } from 'react'
import api from '../../api/axios'
import AssignmentSubmissionModal from './AssignmentSubmissionModal'; // Import the new modal
import toast from 'react-hot-toast';

const Assignments = () => {
  const [assignments, setAssignments] = useState([]);
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedAssignment, setSelectedAssignment] = useState(null); // State for selected assignment
  const [currentStudentId, setCurrentStudentId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        if (!user) {
          toast.error("User not found, please login");
          setLoading(false);
          return;
        }

        const [assignmentsRes, submissionsRes, studentsRes] = await Promise.all([
          api.get('/assignments'),
          api.get('/submissions'),
          api.get('/students')
        ]);

        setAssignments(assignmentsRes.data);
        setSubmissions(submissionsRes.data);

        // Find the current student ID based on the logged-in user ID
        const student = studentsRes.data.find(s => s.userId === user.id);
        if (student) {
          setCurrentStudentId(student.id);
        } else {
          // If user is a student role but not in students table, handle gracefully or log
          console.warn("Current user not found in students list");
        }

      } catch (error) {
        console.error("Failed to fetch data", error);
        toast.error("Failed to load assignments data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [])

  const handleSubmissionSuccess = () => {
    // Refresh submissions to update the UI immediately after submission
    api.get('/submissions').then(res => setSubmissions(res.data)).catch(err => console.error(err));
    setSelectedAssignment(null);
  }

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
          {assignments.map(a => {
            // Check if this assignment is already submitted by the current student
            const isSubmitted = submissions.some(sub =>
              sub.assignmentId === a.id && sub.studentId === currentStudentId
            );

            return (
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
                    <div className={`px-3 py-1 rounded-full text-xs font-medium border ${isSubmitted ? 'bg-green-500/10 text-green-400 border-green-500/20' : 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20'}`}>
                      {isSubmitted ? 'Submitted' : 'Active'}
                    </div>
                    <div className="text-sm text-gray-500 pt-1">
                      <span className="block text-xs uppercase tracking-wider text-gray-600 font-bold mb-1">Due Date</span>
                      <span className="text-gray-300">
                        {a.deadline ? new Date(a.deadline).toLocaleString() : "No deadline"}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-gray-800 flex justify-end">
                  {isSubmitted ? (
                    <button
                      disabled
                      className="px-4 py-2 bg-green-600/20 text-green-400 text-sm font-medium rounded-lg cursor-not-allowed flex items-center gap-2 border border-green-600/30"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      Submitted
                    </button>
                  ) : (
                    <button
                      onClick={() => setSelectedAssignment(a)}
                      className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg transition-colors flex items-center gap-2 shadow-lg shadow-indigo-500/20"
                    >
                      Submit Assignment <span aria-hidden="true">&rarr;</span>
                    </button>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Submission Modal */}
      {selectedAssignment && (
        <AssignmentSubmissionModal
          assignmentId={selectedAssignment.id}
          onClose={() => setSelectedAssignment(null)}
          onSubmitted={handleSubmissionSuccess}
        />
      )}
    </div>
  )
}

export default Assignments
import { useState } from "react";
import RegisterStudentModal from "./componenets/RegisterStudentModal";

const AdminStudents = () => {
  const [showModal, setShowModal] = useState(false);

  const refreshStudentList = () => {
    // Logic to re-fetch the list of students after registration
    console.log("Refreshing student list...");
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-white">Students Management</h1>
        <button
          onClick={() => setShowModal(true)}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg"
        >
          + Add New Student
        </button>
      </div>

      {/* Student List Table would go here */}

      {showModal && (
        <RegisterStudentModal
          onClose={() => setShowModal(false)}
          onCreated={refreshStudentList}
        />
      )}
    </div>
  );
};

export default AdminStudents;
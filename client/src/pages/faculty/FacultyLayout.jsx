import React from "react";
import FacultySidebar from "./components/FacultySidebar";

const FacultyLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex bg-[#0B0F1A] text-white">
      <FacultySidebar />

      <main className="flex-1 p-6">
        {children}
      </main>
    </div>
  );
};

export default FacultyLayout;

import { useEffect, useMemo, useState } from "react";
import api from "../../api/axios";
import { toast } from "react-hot-toast";

const AdminFaculty = () => {
  const [data, setData] = useState({
    faculties: [],
    classes: [],
    subjects: [],
  });

  const [loading, setLoading] = useState(true);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState({
    facultyId: "",
    userId: "",
    userName: "",
    designation: "",
  });
  const [updateLoading, setUpdateLoading] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);

      const [facultyRes, classRes, subjectRes] = await Promise.all([
        api.get("/faculties"),
        api.get("/classes"),
        api.get("/subjects"),
      ]);

      setData({
        faculties: facultyRes.data || [],
        classes: classRes.data || [],
        subjects: subjectRes.data || [],
      });
    } catch (err) {
      console.error(err);
      toast.error("Failed to load faculty data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const enrichedFaculties = useMemo(() => {
    return data.faculties.map((faculty) => {
      const assignedClass = data.classes.find(
        (cls) => cls.userId === faculty.userId
      );

      const teachingSubjects = data.subjects
        .filter((sub) => sub.facultyId === faculty.userId)
        .map((sub) => sub.name);

      return {
        ...faculty,
        className: assignedClass ? assignedClass.name : "—",
        subjects: teachingSubjects.length > 0 ? teachingSubjects : ["—"],
      };
    });
  }, [data]);

  const handleEditClick = (faculty) => {
    setSelectedTeacher({
      facultyId: faculty.id,
      userId: faculty.userId,
      userName: faculty.userName,
      designation: faculty.designation || "",
    });
    setIsEditModalOpen(true);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setUpdateLoading(true);

    try {
      await Promise.all([
        api.put(`/users/${selectedTeacher.userId}`, {
          name: selectedTeacher.userName,
        }),
        api.put(`/faculties/${selectedTeacher.facultyId}`, {
          designation: selectedTeacher.designation,
        }),
      ]);

      toast.success("Faculty updated successfully");
      setIsEditModalOpen(false);
      fetchData();
    } catch (err) {
      console.error(err);
      toast.error("Update failed");
    } finally {
      setUpdateLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] p-6 text-white">
      <div className="max-w-7xl mx-auto mb-6">
        <h1 className="text-2xl font-bold">Faculty Directory</h1>
        <p className="text-sm text-zinc-400">
          Complete overview of registered faculty members
        </p>
      </div>

      <div className="max-w-7xl mx-auto bg-[#111827] border border-zinc-800 rounded-xl overflow-hidden">
        <table className="w-full border-collapse">
          <thead className="bg-[#1f2937] text-zinc-400 text-xs uppercase">
            <tr>
              <th className="p-4 text-left">Faculty</th>
              <th className="p-4 text-left">Designation / Dept</th>
              <th className="p-4 text-left">Class Teacher</th>
              <th className="p-4 text-left">Subjects</th>
              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-zinc-800">
            {loading ? (
              <tr>
                <td colSpan="5" className="p-10 text-center text-zinc-500">
                  Loading faculty records...
                </td>
              </tr>
            ) : (
              enrichedFaculties.map((f) => (
                <tr key={f.id} className="hover:bg-white/5">
                  <td className="p-4">
                    <div className="font-semibold">{f.userName}</div>
                    <div className="text-[10px] text-zinc-600 font-mono">
                      {f.userId.slice(0, 8)}...
                    </div>
                  </td>

                  <td className="p-4">
                    <div className="text-indigo-300 text-sm">
                      {f.designation || "Lecturer"}
                    </div>
                    <div className="text-xs text-zinc-500">
                      {f.departmentName}
                    </div>
                  </td>

                  <td className="p-4">
                    {f.className !== "—" ? (
                      <span className="px-2 py-1 bg-green-500/10 text-green-400 text-xs rounded">
                        {f.className}
                      </span>
                    ) : (
                      <span className="text-zinc-600 text-xs">—</span>
                    )}
                  </td>

                  <td className="p-4">
                    <div className="flex flex-wrap gap-1">
                      {f.subjects.map((sub, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 text-[10px] bg-zinc-800 border border-zinc-700 rounded"
                        >
                          {sub}
                        </span>
                      ))}
                    </div>
                  </td>

                  <td className="p-4 text-center">
                    <button
                      onClick={() => handleEditClick(f)}
                      className="text-indigo-400 hover:text-indigo-300 text-sm font-semibold"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-[#111827] border border-zinc-800 rounded-xl p-6 w-full max-w-md">
            <h2 className="text-lg font-bold mb-4">Edit Faculty</h2>

            <form onSubmit={handleUpdate} className="space-y-4">
              <div>
                <label className="text-xs text-zinc-400">Name</label>
                <input
                  className="w-full mt-1 p-3 rounded bg-[#020617] border border-zinc-800"
                  value={selectedTeacher.userName}
                  onChange={(e) =>
                    setSelectedTeacher({
                      ...selectedTeacher,
                      userName: e.target.value,
                    })
                  }
                />
              </div>

              <div>
                <label className="text-xs text-zinc-400">Designation</label>
                <input
                  className="w-full mt-1 p-3 rounded bg-[#020617] border border-zinc-800"
                  value={selectedTeacher.designation}
                  onChange={(e) =>
                    setSelectedTeacher({
                      ...selectedTeacher,
                      designation: e.target.value,
                    })
                  }
                />
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="text-zinc-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={updateLoading}
                  className="bg-indigo-600 px-5 py-2 rounded font-semibold"
                >
                  {updateLoading ? "Saving..." : "Save"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminFaculty;

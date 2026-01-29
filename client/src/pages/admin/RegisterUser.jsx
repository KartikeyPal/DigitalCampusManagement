import { useEffect, useState } from "react"
import api from "../../api/axios";
const RegisterUser = () => {
  const [allUser, setAllUser] = useState([]);
  const [notRegisteredUser, setNotRegisteredUser] = useState([]);
  const [faculty, setFaculty] = useState([]);
  const [student, setStudent] = useState([]);

  useEffect(() => {
    api.get("/students").then((res) => {
      console.log(res);
      setStudent(res.data);
      console.log(student);
    });
    api.get("/faculties").then((res) => {
      console.log(res);
      setFaculty(res.data);
      console.log(faculty);
    });
    api.get("/users").then((res) => {
      console.log(res);
      console.log(res.data);
      setAllUser(res.data);
    });
  }, []);

  useEffect(() => {
    student.forEach(s => {
      if (s?.id != allUser.find(u => u.id === s.id)?.id) {
        setNotRegisteredUser(prev => [...prev, s]);
      }
    });
    faculty.forEach(f => {
      if (f?.id != allUser.find(u => u.id === f.id)?.id) {
        setNotRegisteredUser(prev => [...prev, f]);
      }
    });
    console.log(allUser);
    console.log(allUser[0]?.roles[0])
    console.log(notRegisteredUser);
  }, [allUser, faculty, student])


  return (
    <div className="max-w-xl">
      <h1 className="text-2xl font-semibold text-white mb-6">
        Register User
      </h1>

      <div className="bg-[#18181b]/40 border border-zinc-800 rounded-xl p-6 space-y-4">
        <input
          className="w-full bg-zinc-900 p-3 rounded"
          placeholder="Full Name"
        />
        <input
          className="w-full bg-zinc-900 p-3 rounded"
          placeholder="Email"
        />
        <input
          className="w-full bg-zinc-900 p-3 rounded"
          placeholder="Password"
        />

        <select className="w-full bg-zinc-900 p-3 rounded">
          <option value="ROLE_STUDENT">Student</option>
          <option value="ROLE_FACULTY">Faculty</option>
        </select>

        <button className="w-full bg-blue-600 hover:bg-blue-700 p-3 rounded font-medium">
          Register
        </button>
      </div>
    </div>
  )
}

export default RegisterUser

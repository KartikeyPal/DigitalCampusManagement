const RegisterUser = () => {
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
          <option value="ROLE_TEACHER">Teacher</option>
        </select>

        <button className="w-full bg-blue-600 hover:bg-blue-700 p-3 rounded font-medium">
          Register
        </button>
      </div>
    </div>
  )
}

export default RegisterUser

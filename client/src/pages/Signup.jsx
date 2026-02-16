import { useState } from "react";

function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Signup:", formData);
  };

  return (
    <div className="grid grid-cols-2 h-screen max-md:grid-cols-1">
      <div className="flex items-center justify-center p-12 bg-emerald-100 max-md:hidden">
        <img
          src="https://illustrations.popsy.co/gray/student-with-laptop.svg"
          alt="Join us"
          className="w-3/4 max-w-[400px]"
        />
      </div>

      <div className="bg-slate-50 flex items-center justify-center p-12">
        <div className="w-full max-w-[400px]">
          <h2 className="text-2xl font-semibold text-slate-700 mb-6">
            Create Account
          </h2>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col">
              <label className="text-sm text-slate-600 mb-1">Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="John Doe"
                required
                className="py-2 px-3 border border-slate-300 rounded-md outline-none transition-shadow focus:ring-3 focus:ring-emerald-300/30"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-sm text-slate-600 mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                required
                className="py-2 px-3 border border-slate-300 rounded-md outline-none transition-shadow focus:ring-3 focus:ring-emerald-300/30"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-sm text-slate-600 mb-1">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                required
                className="py-2 px-3 border border-slate-300 rounded-md outline-none transition-shadow focus:ring-3 focus:ring-emerald-300/30"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-sm text-slate-600 mb-1">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="••••••••"
                required
                className="py-2 px-3 border border-slate-300 rounded-md outline-none transition-shadow focus:ring-3 focus:ring-emerald-300/30"
              />
            </div>

            <button
              type="submit"
              className="py-2 px-4 rounded-md bg-emerald-500 text-white font-medium text-sm hover:bg-emerald-600 transition-colors mt-2 cursor-pointer"
            >
              Sign Up
            </button>
          </form>

          <p className="text-center text-sm text-slate-500 mt-4">
            Already have an account?{" "}
            <a href="/login" className="text-emerald-500 no-underline hover:underline">
              Sign In
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;

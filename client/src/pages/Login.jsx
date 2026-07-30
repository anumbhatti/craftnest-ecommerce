import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await API.post("/auth/login", formData);

      // Save Token
      localStorage.setItem("token", data.token);

      // Save Logged-in User
      localStorage.setItem("user", JSON.stringify(data.user));

      alert(data.message);

      navigate("/");

      // Refresh Navbar
      window.location.reload();

    } catch (error) {
      alert(error.response?.data?.message || "Login Failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-md">

        <h1 className="text-3xl font-bold text-center mb-6">
          Login
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">

          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full border rounded-lg p-3"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full border rounded-lg p-3"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <button
            type="submit"
            className="w-full bg-emerald-600 text-white py-3 rounded-lg hover:bg-emerald-700"
          >
            Login
          </button>

        </form>

        <p className="text-center mt-5">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-emerald-600 font-semibold"
          >
            Register
          </Link>
        </p>

      </div>
    </div>
  );
}

export default Login;
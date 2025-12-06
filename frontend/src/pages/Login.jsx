import { useState } from "react";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Replace with your backend login endpoint
      const response = await axios.post("http://localhost:5000/api/users/login", {
        email,
        password,
      });

      const { token } = response.data;

      // Save token in localStorage
      localStorage.setItem("authToken", token);

      // Redirect or show success
      alert("Login successful!");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
      <form
        className="bg-gray-800 p-8 rounded-lg shadow-md w-96"
        onSubmit={handleSubmit}
      >
<h2 className="text-2xl font-bold mb-6 text-center text-blue-500">Login</h2>

        {error && (
          <p className="bg-red-600 text-white p-2 rounded mb-4">{error}</p>
        )}

        <div className="mb-4">
          <label className="block mb-1" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="w-full p-2 rounded text-black"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-6">
          <label className="block mb-1" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="w-full p-2 rounded text-black"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-500 py-2 rounded font-medium transition"
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;

import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Navbar from "@/components/Navbar";

const Login = () => {
  // Logic Written

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors

    try {
      // Step 1: Login and get token
      const response = await axios.post("http://127.0.0.1:5000/auth/login", {
        user_email: email,
        password: password,
      });

      // Store token & user data in localStorage
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user)); // Save user details

      console.log("Login Successful:", response.data);
      // Step 2: Redirect to Dashboard
      router.push("/dashboard"); // Navigate to dashboard page
    } catch (error) {
      console.error("Login Error:", error.response?.data || error);
    }
  };

  return (
    <div>
      <Navbar />
      <motion.div
        className="d-flex justify-content-center align-items-center min-vh-100"
        style={{ backgroundColor: "#F5F2DC" }}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div
          className="p-4 shadow-lg"
          style={{
            width: "320px",
            backgroundColor: "#F4D9C5",
            borderRadius: "10px",
            border: "3px solid #D7A184",
            boxShadow: "5px 5px 10px rgba(0,0,0,0.2)",
            fontFamily: "Arial, sans-serif",
          }}
        >
          {/* Window Header */}
          <div
            className="d-flex justify-content-between align-items-center px-3 py-2"
            style={{
              backgroundColor: "#E2B599",
              borderRadius: "7px 7px 0 0",
              borderBottom: "2px solid #D7A184",
            }}
          >
            <span style={{ fontWeight: "bold" }}>Login</span>
            <div className="d-flex">
              <div
                style={{
                  width: "8px",
                  height: "8px",
                  backgroundColor: "#F15A5A",
                  borderRadius: "50%",
                  marginRight: "5px",
                }}
              ></div>
              <div
                style={{
                  width: "8px",
                  height: "8px",
                  backgroundColor: "#F8CA55",
                  borderRadius: "50%",
                  marginRight: "5px",
                }}
              ></div>
              <div
                style={{
                  width: "8px",
                  height: "8px",
                  backgroundColor: "#62C554",
                  borderRadius: "50%",
                }}
              ></div>
            </div>
          </div>

          {/* Login Form */}
          <div className="p-3">
            <h2 className="text-center mb-3" style={{ fontWeight: "bold" }}>
              Login
            </h2>
            {/* Error */}
            {error && <p style={{ color: "red" }}>{error}</p>}
            <form onSubmit={handleLogin}>
              <div className="mb-3">
                <label className="form-label" style={{ fontWeight: "bold" }}>
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-control"
                  required
                  style={{
                    borderRadius: "8px",
                    border: "2px solid #D7A184",
                    padding: "8px",
                  }}
                />
              </div>

              <div className="mb-3">
                <label className="form-label" style={{ fontWeight: "bold" }}>
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="form-control"
                  style={{
                    borderRadius: "8px",
                    border: "2px solid #D7A184",
                    padding: "8px",
                  }}
                />
              </div>

              <div className="d-flex justify-content-between">
                <button
                  className="btn"
                  style={{
                    backgroundColor: "#E0995E",
                    color: "white",
                    borderRadius: "8px",
                    padding: "8px 20px",
                    fontWeight: "bold",
                  }}
                >
                  Login
                </button>
                <Link
                  href="/register"
                  className="btn"
                  style={{
                    backgroundColor: "#6BA4B8",
                    color: "white",
                    borderRadius: "8px",
                    padding: "8px 20px",
                    fontWeight: "bold",
                  }}
                >
                  Register
                </Link>
              </div>
            </form>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;

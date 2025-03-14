import Navbar from "@/components/Navbar";
import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";

const Register = () => {
  // Register Data
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("http://127.0.0.1:5000/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_name: name,
          user_email: email,
          password: password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("User registered successfully!");
        // Clear input fields
        setName("");
        setEmail("");
        setPassword("");

        // Redirect to login page after 1 second (optional)
        setTimeout(() => {
          router.push("/login");
        }, 1000);
      } else {
        setError(data.message || "Registration failed!");
      }
    } catch (error) {
      console.error("Error:", error);
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div>
      <Navbar />
      <div
        className="d-flex justify-content-center align-items-center min-vh-100"
        style={{ backgroundColor: "#F5F2DC" }}
      >
        <motion.div
          className="p-4 shadow-lg"
          style={{
            width: "320px",
            backgroundColor: "#F4D9C5",
            borderRadius: "10px",
            border: "3px solid #D7A184",
            boxShadow: "5px 5px 10px rgba(0,0,0,0.2)",
            fontFamily: "Arial, sans-serif",
          }}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
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
            <span style={{ fontWeight: "bold" }}>Signup</span>
            <div className="d-flex">
              <div
                style={{
                  width: "10px",
                  height: "10px",
                  backgroundColor: "#F15A5A",
                  borderRadius: "50%",
                  marginRight: "5px",
                }}
              ></div>
              <div
                style={{
                  width: "10px",
                  height: "10px",
                  backgroundColor: "#F8CA55",
                  borderRadius: "50%",
                  marginRight: "5px",
                }}
              ></div>
              <div
                style={{
                  width: "10px",
                  height: "10px",
                  backgroundColor: "#62C554",
                  borderRadius: "50%",
                }}
              ></div>
            </div>
          </div>

          {/* Signup Form */}
          <div className="p-3">
            <h2 className="text-center mb-3" style={{ fontWeight: "bold" }}>
              Sign up
            </h2>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <form onSubmit={handleRegister}>
              <div className="mb-2">
                <label className="form-label" style={{ fontWeight: "bold" }}>
                  Username
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  style={{
                    borderRadius: "8px",
                    border: "2px solid #D7A184",
                    padding: "8px",
                  }}
                />
              </div>

              <div className="mb-2">
                <label className="form-label" style={{ fontWeight: "bold" }}>
                  Email
                </label>
                <input
                  type="email"
                  className="form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{
                    borderRadius: "8px",
                    border: "2px solid #D7A184",
                    padding: "8px",
                  }}
                />
              </div>

              <div className="mb-2">
                <label className="form-label" style={{ fontWeight: "bold" }}>
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{
                    borderRadius: "8px",
                    border: "2px solid #D7A184",
                    padding: "8px",
                  }}
                />
              </div>

              <div className="mb-3">
                <label className="form-label" style={{ fontWeight: "bold" }}>
                  Confirm Password
                </label>
                <input
                  type="password"
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
                    backgroundColor: "#62C554",
                    color: "white",
                    borderRadius: "8px",
                    padding: "8px 20px",
                    fontWeight: "bold",
                  }}
                >
                  Register
                </button>
                <Link
                  href="/login"
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
                </Link>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Register;

import { useState } from "react";
import "./Login.css"; // We'll create this next
import loginImage from "../assets/login.jpg"; 

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    if (!formData.email || !formData.password) {
      setError("Please fill in all fields.");
      return;
    }

    setError("");
    console.log("Logging in with:", formData);
    // TODO: Send to backend for authentication
  };

  return (
    <div className="login-container">
      {/* Left Side */}
      <div className="login-left">
        <img src={loginImage} alt="Login Banner" />
      </div>

      {/* Right Side */}
      <div className="login-right">
        <div className="form-wrapper">
          <h2>Welcome Back</h2>
          <p>Login to manage your account and events.</p>

          {error && <p className="error-text">{error}</p>}

          <form onSubmit={handleSubmit}>
            {/* Email */}
            <div className="form-group">
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            {/* Password */}
            <div className="form-group">
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <div className="forgot-password">
              <a href="/forgot-password">Forgot Password?</a>
            </div>

            {/* Submit */}
            <button type="submit" className="login-btn">
              Login
            </button>
          </form>

          <p className="register-link">
            Don’t have an account? <a href="/register">Sign Up</a>
          </p>
        </div>
      </div>
    </div>
  );
}

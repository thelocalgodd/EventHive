import { useState } from "react";
import "./Register.css";
import signupImage from "../assets/signup.jpg";

export default function Register() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
    organizationType: "",
  });

  const [passwordError, setPasswordError] = useState("");
  const [strength, setStrength] = useState(0);

  // ✅ Handle Input Changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "role" && value === "attendee" ? { organizationType: "" } : {}),
    }));

    // Check password strength live
    if (name === "password") {
      checkPasswordStrength(value);
    }

    if (name === "confirmPassword") {
      validatePasswordMatch(formData.password, value);
    }
  };

  // ✅ Password Strength Checker
  const checkPasswordStrength = (password) => {
    let score = 0;
    if (password.length >= 8) score += 20;
    if (/[A-Z]/.test(password)) score += 20;
    if (/[a-z]/.test(password)) score += 20;
    if (/[0-9]/.test(password)) score += 20;
    if (/[^A-Za-z0-9]/.test(password)) score += 20;
    setStrength(score);
  };

  // ✅ Match Passwords Live
  const validatePasswordMatch = (password, confirmPassword) => {
    if (confirmPassword && password !== confirmPassword) {
      setPasswordError("Passwords do not match");
    } else {
      setPasswordError("");
    }
  };

  // ✅ Handle Submit
  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setPasswordError("Passwords do not match");
      return;
    }

    if (strength < 100) {
      alert("Password is not strong enough. Please follow the rules.");
      return;
    }

    const payload = {
      fullName: formData.fullName,
      email: formData.email,
      password: formData.password,
      role: formData.role,
    };

    if (formData.role === "organizer") {
      payload.organizationType = formData.organizationType;
    }

    console.log("Submitting user:", payload);
    // TODO: send to backend
  };

  return (
    <div className="register-container">
      {/* Left Side */}
      <div className="register-left">
        <img src={signupImage} alt="Registration Banner" />
      </div>

      {/* Right Side */}
      <div className="register-right">
        <div className="form-wrapper">
          <h2>Sign Up</h2>
          <p>Sign up for a new account and start managing your events.</p>

          <form onSubmit={handleSubmit}>
            {/* Full Name */}
            <div className="form-group">
              <input
                type="text"
                name="fullName"
                placeholder="Full Name"
                value={formData.fullName}
                onChange={handleChange}
                required
              />
            </div>

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

            {/* Confirm Password */}
            <div className="form-group">
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
              {passwordError && <small className="error-text">{passwordError}</small>}
            </div>

            {/* Role */}
            <div className="form-group">
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                required
              >
                <option value="">I am an</option>
                <option value="attendee">Attendee</option>
                <option value="organizer">Organizer</option>
                
              </select>
            </div>

            {/* Organization Type */}
            {formData.role === "organizer" && (
              <div className="form-group">
                <select
                  name="organizationType"
                  value={formData.organizationType}
                  onChange={handleChange}
                  required
                >
                  <option value="">Organization Type</option>
                  <option value="non-profit">Individual</option>
                  <option value="corporate">Corporate</option>
                </select>
              </div>
            )}

            {/* Terms */}
            <div className="terms">
              <input type="checkbox" required />
              <span>
                I agree to the <a href="#">Terms and Conditions</a>
              </span>
            </div>

            {/* Submit */}
            <button type="submit" className="signup-btn">Sign Up</button>
          </form>

          <p className="login-link">
            Already have an account? <a href="/login">Login Now</a>
          </p>
        </div>
      </div>
    </div>
  );
}

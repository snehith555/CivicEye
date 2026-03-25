import { useState } from "react";
import api from "../services/api";
import { Link, useNavigate } from "react-router-dom";
import "../styles/login.css";
import { Eye, EyeOff } from "lucide-react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await api.post("/api/user/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);

      if (res.data.role === "ADMIN") {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }
    } catch (error) {
      console.error(error);
      alert("Login failed");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Welcome Back</h2>

        <div className="login-form">
          {/* Email */}
          <div className="input-group">
            <input
              type="email"
              required
              placeholder=" "
              onChange={(e) => setEmail(e.target.value)}
            />
            <label>Email</label>
          </div>

          {/* Password */}
          <div className="input-group password-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              required
              placeholder=" "
              onChange={(e) => setPassword(e.target.value)}
            />
            <label>Password</label>

            <span
              className="toggle-password"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </span>
          </div>

          <button className="login-btn" onClick={handleLogin}>
            Login
          </button>

          <p className="register-link">
            Don't have an account? <Link to="/register">Register</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;

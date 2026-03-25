import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import "../styles/register.css";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [role] = useState("CITIZEN"); 

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      await api.post("/api/user/register", {
        name,
        email,
        password,
        role,
      });

      alert("Registration successful!");
      navigate("/login");
    } catch (error) {
      if (error.response?.data?.message === "Email already exists") {
        setErrorMsg("Email already exists. please login.");
      }else{
        setErrorMsg("Registration failed. try again.");
      }
    }
};

  return (
    <div className="register-container">
      <div className="register-card">
        <h2>Create Account</h2>

        <form className="register-form" onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit" className="register-btn">
            Register
          </button>

          {errorMsg && (
            <p className="error-text">
              {errorMsg}{" "}
              <span onClick={() => navigate("/login")} className="login-link">
                Login here
              </span>
            </p>
          )}
        </form>
      </div>
    </div>
  );
}

export default Register;

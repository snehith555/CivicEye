import { Link, useNavigate } from "react-router-dom";
import "../styles/global.css";
import "../styles/navbar.css";

function Navbar() {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="nav-left">
        {/* <h2 className="logo" onClick={() => navigate("/")}>
          
        </h2> */}
      </div>

      <div className="nav-right">
        {/* CITIZEN */}
        {role === "CITIZEN" && (
          <>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/create">Create</Link>
          </>
        )}

        {/* ADMIN */}
        {role === "ADMIN" && (
          <>
            <Link to="/admin">Admin Panel</Link>
          </>
        )}

        <button className="logout-btn" onClick={logout}>
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;

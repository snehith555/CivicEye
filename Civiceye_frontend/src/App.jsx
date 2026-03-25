import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import CreateComplaint from "./pages/CreateComplaint";
import Register from "./pages/Register";
import CitizenDashboard from "./pages/CitizenDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <div>
      <div className="app-header" >
        <h1 className="logo-text" onClick={() => Navigate("/")}>
          CivicEye
        </h1>
        <p className="logo-sub">-Smart Civic Complaint System</p>
      </div>

      <Routes>
        <Route path="/" element={<Login />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route
          path="/create"
          element={
            <ProtectedRoute>
              <CreateComplaint />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <CitizenDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;

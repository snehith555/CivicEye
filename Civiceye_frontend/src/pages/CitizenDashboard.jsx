import { useEffect, useState } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";
import "../styles/dashboard.css";
import { MapPin } from "lucide-react";

function CitizenDashboard() {
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    fetchComplaints();
  }, []);

  const fetchComplaints = async () => {
    try {
      const response = await api.get("/api/report/my");
      setComplaints(response.data);
    } catch (error) {
      console.error("Error fetching complaints:", error);
    }
  };

  const stats = {
    total: complaints.length,
    open: complaints.filter((c) => c.status === "OPEN").length,
    resolved: complaints.filter((c) => c.status === "RESOLVED").length,
  };
 

  return (
    <div className="dashboard-container">
      <Navbar />

      <main className="dashboard-content">
        <header className="content-header">
          <h2>My Complaints</h2>
          <p className="subtitle">Track and manage your submitted reports</p>
        </header>

        {/* Statistics Section */}
        <section className="stats-grid">
          <div className="stat-card total">
            <span className="stat-label">Total Reports</span>
            <h3 className="stat-value">{stats.total}</h3>
          </div>
          <div className="stat-card open">
            <span className="stat-label">Active / Open</span>
            <h3 className="stat-value">{stats.open}</h3>
          </div>
          <div className="stat-card resolved">
            <span className="stat-label">Resolved</span>
            <h3 className="stat-value">{stats.resolved}</h3>
          </div>
        </section>

        {/* Complaints Section */}
        {complaints.length === 0 ? (
          <div className="empty-state">
            <p>No complaints submitted yet.</p>
          </div>
        ) : (
          <div className="complaints-list">
            {complaints.map((complaint) => (
              <div key={complaint.id} className="complaint-card-modern">
                <div className="card-header">
                  <h3>{complaint.title}</h3>
                  <span
                    className={`priority-tag ${complaint.priority.toLowerCase()}`}
                  >
                    Priority: {complaint.priority}
                  </span>
                </div>

                <div className="card-body">
                  <p className="description">{complaint.description}</p>
                  <p className="location-wrapper">
                    <MapPin size={15} className="location-icon" />
                    <span>{complaint.location}</span>
                  </p>

                  <div className="details-grid">
                    <div>
                      <small>Assigned department</small>
                      <p
                        style={{
                          color: "var(--text-main)",
                          fontSize: "0.9rem",
                          marginTop: "2px",
                        }}
                      >
                        {complaint.department}
                      </p>
                    </div>
                  </div>

                  {complaint.imagePath && (
                    <div className="image-wrapper">
                      <img
                        src={`http://localhost:8080/${complaint.imagePath}`}
                        alt="Evidence"
                      />
                    </div>
                  )}

                  <div className="status-container">
                    <span
                      className={`status-badge ${complaint.status.toLowerCase()}`}
                    >
                      Status: {complaint.status}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default CitizenDashboard;

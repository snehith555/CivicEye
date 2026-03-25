import { useEffect, useState } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";
import "../styles/adminDashboard.css";

function AdminDashboard() {
  const [reports, setReports] = useState([]);
  const [statusFilter, setStatusFilter] = useState("ALL");

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const response = await api.get("/api/report/all");
      setReports(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await api.put(`/api/report/${id}/status`, JSON.stringify(status), {
        headers: { "Content-Type": "application/json" },
      });
      fetchReports();
    } catch (error) {
      console.error(error);
    }
  };

  const filteredReports =
    statusFilter === "ALL"
      ? reports
      : reports.filter((r) => r.status === statusFilter);

  return (
    <>
      <Navbar />

      <div className="admin-container">
        <h2 className="admin-title">Admin Dashboard</h2>

        {/* Filter */}
        <div className="filter-box">
          <label>Filter by Status: </label>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="ALL">ALL</option>
            <option value="OPEN">OPEN</option>
            <option value="IN_PROGRESS">IN_PROGRESS</option>
            <option value="RESOLVED">RESOLVED</option>
          </select>
        </div>

        {/* Table */}
        <div className="table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Category</th>
                <th>Priority</th>
                <th>Department</th>
                <th>Location</th>
                <th>Summary</th>
                <th>Status</th>
                <th>Update</th>
              </tr>
            </thead>

            <tbody>
              {filteredReports.map((report) => (
                <tr key={report.id}>
                  <td>{report.title}</td>
                  <td>{report.category}</td>
                  <td>{report.priority}</td>
                  <td>{report.department}</td>
                  <td>{report.location}</td>
                  <td>{report.summary}</td>

                  <td>
                    <span className={`status ${report.status.toLowerCase()}`}>
                      {report.status}
                    </span>
                  </td>

                  <td>
                    <select
                      className="status-select"
                      value={report.status}
                      onChange={(e) => updateStatus(report.id, e.target.value)}
                    >
                      <option value="OPEN">OPEN</option>
                      <option value="IN_PROGRESS">IN_PROGRESS</option>
                      <option value="RESOLVED">RESOLVED</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default AdminDashboard;

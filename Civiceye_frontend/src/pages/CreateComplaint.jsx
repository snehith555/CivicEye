import { useState } from "react";
import api from "../services/api";
import "../styles/createComplaint.css";
import { useNavigate } from "react-router-dom";

function CreateComplaint() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("location", location);
    formData.append("image", image);

    try {
      await api.post("/api/report", formData);
      alert("Complaint submitted successfully!");

      // 🔥 Redirect after success
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
      alert("Error submitting complaint");
    }
  };

  return (
    <div className="create-container">
      <div className="create-card">
        {/* 🔥 Back Button */}
        <button className="back-btn" onClick={() => navigate("/dashboard")}>
          ← Back to Dashboard
        </button>

        <form className="create-form" onSubmit={handleSubmit}>
          <h2>Create Complaint</h2>

          <div className="input-group">
            <input
              type="text"
              required
              placeholder=" "
              onChange={(e) => setTitle(e.target.value)}
            />
            <label>Title</label>
          </div>

          <div className="input-group">
            <textarea
              required
              placeholder=" "
              onChange={(e) => setDescription(e.target.value)}
            />
            <label>Description</label>
          </div>

          <div className="input-group">
            <input
              type="text"
              required
              placeholder=" "
              onChange={(e) => setLocation(e.target.value)}
            />
            <label>Location</label>
          </div>

          <div className="form-group">
            <label>Upload Image</label>
            <input
              type="file"
              className="file-input"
              onChange={(e) => {
                const file = e.target.files[0];
                setImage(file);
                setPreview(URL.createObjectURL(file));
              }}
            />
          </div>

          {preview && (
            <img src={preview} alt="preview" className="preview-img" />
          )}

          <button type="submit" className="submit-btn">
            Submit Complaint
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateComplaint;

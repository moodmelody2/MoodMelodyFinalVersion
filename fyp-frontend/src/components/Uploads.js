import "./uploads.css";
import "./main.css";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";

function Upload() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [emotionRings, setEmotionRings] = useState([]);
  const navigate = useNavigate();

  const BACKEND_URL = "http://localhost:10000";

  // ✅ Emotion Rings Animation
  useEffect(() => {
    const updateRings = () => {
      const rings = Array.from({ length: 5 }, (_, i) => ({
        id: i,
        radius: 40 + i * 30,
        emotion: ["Joy", "Calm", "Excited", "Peaceful", "Energetic"][i],
        intensity: Math.sin(Date.now() / 900 + i) * 30 + 60,
        color: ["#a8b2c1", "#8a95a5", "#6d7a8c", "#556070", "#3d4654"][i],
      }));
      setEmotionRings(rings);
    };

    updateRings();
    const interval = setInterval(updateRings, 60);
    return () => clearInterval(interval);
  }, []);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      return Swal.fire({
        toast: true,
        position: "top",
        icon: "warning",
        title: "No File Selected",
        text: "Please select a video first!",
        confirmButtonColor: "#3b8e75",
        timer: 3000,
      });
    }

    const formData = new FormData();
    formData.append("video", selectedFile);

    try {
      const res = await fetch(`${BACKEND_URL}/upload`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error(await res.text());

      const data = await res.json();
      const videoURL = data.video_url || URL.createObjectURL(selectedFile);
      localStorage.setItem("uploaded_video_url", videoURL);

      Swal.fire({
        toast: true,
        position: "top",
        icon: "success",
        title: "Upload Started 🎬",
        confirmButtonColor: "#3b8e75",
      }).then(() => navigate("/keyword"));

    } catch (err) {
      Swal.fire({
        toast: true,
        position: "top",
        icon: "error",
        title: "Upload Failed",
        text: err.message,
      });
    }
  };
  return (
    <div className="upload-page">
      <h1 className="top-heading">MoodMelody</h1>
      <h2 className="sub-heading">Share Your Moment</h2>
      <h4 className="description">
        Upload a video and let our AI create a personalized story and suggest music for you...
      </h4>

      <div className="upload-container">
        <h4 className="upload-instructions">Drag your video here or click to browse</h4>

        <div className="upload-flex">
          <img
            src={`${process.env.PUBLIC_URL}/fyp-images/Video-512.webp`}
            alt="Upload Video Icon"
            className="upload-icon"
          />
          <label htmlFor="videoInput" className="custom-file-upload">
            {selectedFile ? selectedFile.name : "Choose Video"}
          </label>
          <input
            id="videoInput"
            type="file"
            accept="video/*"
            onChange={handleFileChange}
          />
        </div>

        {selectedFile && (
          <div className="video-preview">
            <video width="300" height="250" controls>
              <source src={URL.createObjectURL(selectedFile)} type="video/mp4" />
            </video>
          </div>
        )}

        <div className="file-info-container">
          <div className="file-info-row">
            <div>MP4</div>
            <div>MOV</div>
            <div>AVI</div>
            <div>Max 100MB</div>
          </div>
        </div>

        <button className="upload-btn" onClick={handleUpload}>
          Upload
        </button>
      </div>

      {/* Emotional Pulse Analysis */}
<div className="emotion-container">
  <h3 className="emotion-title">
    🎭 Echoes of Emotion
  </h3>

  <div className="pulse-wrapper">
    <div className="pulse-center" />

    {emotionRings.map((ring, index) => (
      <div key={ring.id}>
        <div
          className="pulse-ring"
          style={{
            width: ring.radius * 2,
            height: ring.radius * 2,
            borderColor: ring.color,
            opacity: ring.intensity / 100,
            boxShadow: `0 0 ${ring.intensity / 2}px ${ring.color}`,
          }}
        />
        <div
          className="pulse-label"
          style={{
            transform: `rotate(${index * 72}deg) translateY(-${ring.radius + 20}px) rotate(-${index * 72}deg)`,
            color: ring.color,
          }}
        >
          {ring.emotion}
        </div>
      </div>
    ))}
  </div>

 

  <div className="features-grid-uploads">
    <div className="feature-card-uploads">🎭<span>Facia Expression Detection</span></div>
    <div className="feature-card-uploads">🎵<span>Music Recommendation</span></div>
    <div className="feature-card-uploads">📖<span> Generate AI Story</span></div>
    <div className="feature-card-uploads">⚡<span>Real-time</span></div>
  </div>
</div>


      <nav aria-label="Page navigation" className="page-nav">
        <ul className="pagination-nav">
          <li className="page-item">
            <Link to="/" className="page-link">
              <img
                src={`${process.env.PUBLIC_URL}/fyp-images/previous.png`}
                width="40"
                height="45"
                alt="Previous"
                className="previous"
              />
            </Link>
          </li>
          <li className="page-item next-link">
            <Link to="/keyword" className="page-link">
              <img
                src={`${process.env.PUBLIC_URL}/fyp-images/next.png`}
                width="40"
                height="45"
                alt="Next"
                className="next"
              />
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Upload;

import React, { useState, useEffect } from "react";
import "./main.css";
import "./keywords.css";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
function Keyword() {
const [keyword, setKeyword] = useState("");
const [activeExample, setActiveExample] = useState(0);
const navigate = useNavigate();
// Handle input change
const handleChange = (e) => {
  const value = e.target.value.trim().split(" ")[0]; // take only first word
  setKeyword(value);
};
// Handle keyword submission
const handleSubmit = (e) => {
  e.preventDefault();

  if (!keyword.trim()) {
    return Swal.fire({
      toast: true,
      position: 'top',
      icon: 'warning',
      title: 'No Keyword',
      text: 'Please enter a keyword!',
      showConfirmButton: true,
      confirmButtonColor: '#3b8e75ff',
      width: '300px',
      padding: '0.8rem',
      background: '#ffffffff'
    });
  }

 // Save only first word
  const singleWordKeyword = keyword.trim().split(" ")[0];

  localStorage.setItem("selectedKeyword", singleWordKeyword);

  Swal.fire({
    toast: true,
    position: 'top',
    icon: 'success',
    title: 'Keyword Saved!',
    text: `Your inspiration keyword "${singleWordKeyword}" is saved 🎵`,
    showConfirmButton: true,
    confirmButtonColor: '#3b8e75ff',
    width: '300px',
    padding: '0.8rem',
    background: '#ffffffff'
  }).then(() => {
    navigate("/processing");
  });
};
// Handle suggested keyword selection
const handleSelect = (value) => setKeyword(value);
// Auto-rotate examples
useEffect(() => {
const interval = setInterval(() => {
setActiveExample((prev) => (prev + 1) % exampleStories.length);
}, 5000);
return () => clearInterval(interval);
}, []);
// Example stories data
const exampleStories = [
{
keyword: "Adventure",
story: "Mountain peaks conquered, rivers crossed, horizons expanded...",
stats: { views: 12500, likes: 2340, shares: 890 },
color: "#FF6B35",
icon: "adventure.jpg"
},
{
keyword: "Love",
story: "Two hearts intertwined, moments cherished, forever remembered...",
stats: { views: 18900, likes: 3567, shares: 1245 },
color: "#FF1744",
icon: "love.jpg"
},
{
keyword: "Freedom",
story: "Winds of change, breaking boundaries, soaring limitless...",
stats: { views: 9800, likes: 1876, shares: 654 },
color: "#00BCD4",
icon: "freedom.png"
},
{
keyword: "Joy",
story: "Laughter echoed, smiles captured, happiness multiplied...",
stats: { views: 15600, likes: 2987, shares: 1034 },
color: "#FFC107",
icon: "joy.webp"
},
{
keyword: "Mystery",
story: "Shadows danced, secrets unveiled, curiosity awakened...",
stats: { views: 11200, likes: 2156, shares: 743 },
color: "#9C27B0",
icon: "mystery.png"
}
];
// Keyword popularity data
const keywordStats = [
{ keyword: "Adventure", percentage: 85, count: 12500 },
{ keyword: "Love", percentage: 95, count: 18900 },
{ keyword: "Freedom", percentage: 70, count: 9800 },
{ keyword: "Joy", percentage: 88, count: 15600 },
{ keyword: "Mystery", percentage: 75, count: 11200 },
{ keyword: "Peace", percentage: 80, count: 13400 },
{ keyword: "Memories", percentage: 92, count: 17200 }
];
return (
<div className="keyword-page">
{/* EXISTING TOP SECTION - UNCHANGED */}
<h1 className="top-heading">
<img
src={`${process.env.PUBLIC_URL}/fyp-images/iconmusic.webp`}
width="50"
height="55"
alt="MoodMelody Logo"
/>{" "}
MoodMelody
</h1>
  <blockquote className="styled-quote">
    <p>
      <img
        src={`${process.env.PUBLIC_URL}/fyp-images/movie.webp`}
        width="35"
        height="30"
        alt="Mood Icon"
        className="movie"
      />
      From Moments to Melodies — Create Stories from Your Videos...
    </p>
  </blockquote>

  <h2 className="main-heading">Add Your Inspiration Keyword</h2>

  <form className="keyword-form" onSubmit={handleSubmit}>
    <input
      type="text"
      className="keyword-input"
      placeholder="Enter a word that captures your video (e.g., adventure, peace...)"
      value={keyword}
      onChange={handleChange}
    />

    <div className="keyword-suggestions">
      <div className="row">
        <div className="col" onClick={() => handleSelect("Adventure")}>
          <img
            src={`${process.env.PUBLIC_URL}/fyp-images/adventure.jpg`}
            width="30"
            height="30"
            className="keyword-icons"
            alt="Adventure"
          />
          Adventure
        </div>
        <div className="col" onClick={() => handleSelect("Love")}>
          <img
            src={`${process.env.PUBLIC_URL}/fyp-images/love.jpg`}
            width="30"
            height="30"
            className="keyword-icons"
            alt="Love"
          />
          Love
        </div>
        <div className="col" onClick={() => handleSelect("Freedom")}>
          <img
            src={`${process.env.PUBLIC_URL}/fyp-images/freedom.png`}
            width="30"
            height="30"
            className="keyword-icons"
            alt="Freedom"
          />
          Freedom
        </div>
        <div className="col" onClick={() => handleSelect("Mystery")}>
          <img
            src={`${process.env.PUBLIC_URL}/fyp-images/mystery.png`}
            width="30"
            height="30"
            className="keyword-icons"
            alt="Mystery"
          />
          Mystery
        </div>
      </div>
      <div className="row-2">
        <div className="col" onClick={() => handleSelect("Joy")}>
          <img
            src={`${process.env.PUBLIC_URL}/fyp-images/joy.webp`}
            width="30"
            height="30"
            className="keyword-icons"
            alt="Joy"
          />
          Joy
        </div>
        <div className="col" onClick={() => handleSelect("Peace")}>
          <img
            src={`${process.env.PUBLIC_URL}/fyp-images/peace.jpeg`}
            width="30"
            height="30"
            className="keyword-icons"
            alt="Peace"
          />
          Peace
        </div>
        <div className="col" onClick={() => handleSelect("Memories")}>
          <img
            src={`${process.env.PUBLIC_URL}/fyp-images/dreams.jpeg`}
            width="30"
            height="30"
            className="keyword-icons"
            alt="Memories"
          />
          Memories
        </div>
      </div>
    </div>

    <button type="submit" className="keyword-btn">Next</button>
  </form>

  {/* NEW INNOVATIVE SECTION STARTS HERE */}
  
  {/* Section 2: Example Story Showcase */}
  <div className="example-section">
    <h3 className="section-title">
      <span className="title-icon">✨</span>
      See How Keywords Create Magic
    </h3>

    <div className="example-carousel">
      {exampleStories.map((example, index) => (
        <div
          key={index}
          className={`example-card ${index === activeExample ? 'active' : ''} ${index === activeExample - 1 || (index === exampleStories.length - 1 && activeExample === 0) ? 'prev' : ''} ${index === activeExample + 1 || (index === 0 && activeExample === exampleStories.length - 1) ? 'next' : ''}`}
          style={{ borderColor: example.color }}
        >
          <div className="example-header">
            <img
              src={`${process.env.PUBLIC_URL}/fyp-images/${example.icon}`}
              alt={example.keyword}
              className="example-icon"
            />
            <h4 style={{ color: example.color }}>{example.keyword}</h4>
          </div>
          
          <div className="example-story">
            <p>{example.story}</p>
          </div>

          <div className="example-stats">
            <div className="stat-item">
              <span className="stat-icon">👁️</span>
              <span className="stat-value">{(example.stats.views / 1000).toFixed(1)}k</span>
              <span className="stat-label">views</span>
            </div>
            <div className="stat-item">
              <span className="stat-icon">❤️</span>
              <span className="stat-value">{(example.stats.likes / 1000).toFixed(1)}k</span>
              <span className="stat-label">likes</span>
            </div>
            <div className="stat-item">
              <span className="stat-icon">🔄</span>
              <span className="stat-value">{example.stats.shares}</span>
              <span className="stat-label">shares</span>
            </div>
          </div>

          <button 
            className="try-keyword-btn"
            onClick={() => handleSelect(example.keyword)}
            style={{ backgroundColor: example.color }}
          >
            Try "{example.keyword}"
          </button>
        </div>
      ))}
    </div>

   
  </div>

  {/* Section 3: Keyword Cloud Visualization */}
  <div className="keyword-cloud-section">
    <h3 className="section-title">
      <span className="title-icon">☁️</span>
      Popular Keyword Cloud
    </h3>
    
    <div className="keyword-cloud">
      <span className="cloud-word size-xl" onClick={() => handleSelect("Love")}>Love</span>
      <span className="cloud-word size-lg" onClick={() => handleSelect("Adventure")}>Adventure</span>
      <span className="cloud-word size-md" onClick={() => handleSelect("Joy")}>Joy</span>
      <span className="cloud-word size-sm" onClick={() => handleSelect("Peace")}>Peace</span>
      <span className="cloud-word size-lg" onClick={() => handleSelect("Memories")}>Memories</span>
      <span className="cloud-word size-md" onClick={() => handleSelect("Freedom")}>Freedom</span>
      <span className="cloud-word size-xl" onClick={() => handleSelect("Dream")}>Dream</span>
      <span className="cloud-word size-sm" onClick={() => handleSelect("Hope")}>Hope</span>
      <span className="cloud-word size-md" onClick={() => handleSelect("Mystery")}>Mystery</span>
      <span className="cloud-word size-lg" onClick={() => handleSelect("Courage")}>Courage</span>
      <span className="cloud-word size-sm" onClick={() => handleSelect("Passion")}>Passion</span>
      <span className="cloud-word size-md" onClick={() => handleSelect("Wonder")}>Wonder</span>
      <span className="cloud-word size-lg" onClick={() => handleSelect("Serenity")}>Serenity</span>
      <span className="cloud-word size-sm" onClick={() => handleSelect("Bliss")}>Bliss</span>
      <span className="cloud-word size-md" onClick={() => handleSelect("Triumph")}>Triumph</span>
    </div>

    <p className="cloud-hint">💡 Click any word to use it as your keyword</p>
  </div>

  {/* Section 4: Quick Tips */}
  <div className="tips-section">
    <h3 className="section-title">
      <span className="title-icon">💡</span>
      Pro Tips for Choosing Keywords
    </h3>
    
    <div className="tips-grid">
      <div className="tip-card">
        <div className="tip-icon">🎯</div>
        <h4>Be Specific</h4>
        <p>Choose words that capture the core emotion or theme of your video</p>
      </div>
      <div className="tip-card">
        <div className="tip-icon">🌟</div>
        <h4>Think Emotion</h4>
        <p>Emotional keywords create more engaging and memorable stories</p>
      </div>
      <div className="tip-card">
        <div className="tip-icon">🎬</div>
        <h4>Match Your Vibe</h4>
        <p>Pick keywords that align with your video's mood and atmosphere</p>
      </div>
      <div className="tip-card">
        <div className="tip-icon">✨</div>
        <h4>Get Creative</h4>
        <p>Don't be afraid to use unique or unexpected words</p>
      </div>
    </div>
  </div>

  {/* ORIGINAL NAVIGATION - UNCHANGED */}
  <nav aria-label="Page navigation" className="page-nav">
    <ul className="pagination-nav">
      <li className="page-item">
        <Link to="/upload" className="page-link">
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
        <Link to="/processing" className="page-link">
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
export default Keyword;

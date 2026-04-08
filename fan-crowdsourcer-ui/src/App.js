import React, { useState, useEffect, useMemo } from 'react';
import './App.css';
import FundraisingProgress from './components/FundraisingProgress';
import PledgeManager from './components/PledgeManager';
import Analytics from './components/Analytics';

function App() {
  const [page, setPage] = useState('home');
  const [theme, setTheme] = useState('light');
  const [artists, setArtists] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Modal & Form State
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    city: '',
    genre: '',
    bio: '',
    goal: 500,
    eco: 96,
  });

  // Sync Theme with Body
  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
  }, [theme]);

  // Fetch Artist Data
  const fetchArtists = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/artists');
      const data = await response.json();
      setArtists(data);
    } catch (e) {
      console.error('Network Error:', e);
    }
  };

  useEffect(() => {
    fetchArtists();
  }, []);

  const toggleTheme = () =>
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));

  // Logic for adding a new artist
  const handlePropose = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:8080/api/artists', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...formData, pledges: 0 }),
    });
    if (response.ok) {
      fetchArtists();
      setShowModal(false);
      setFormData({
        name: '',
        city: '',
        genre: '',
        bio: '',
        goal: 500,
        eco: 96,
      });
    }
  };

  const globalTotal = artists.reduce((s, a) => s + (a.pledges || 0), 0);
  const filteredArtists = useMemo(() => {
    return artists.filter(
      (a) =>
        a.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        a.city.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [artists, searchTerm]);

  return (
    <div className="App">
      {/* 1. TOP TICKER */}
      <div className="stats-ticker">
        <div className="ticker-content">
          <span>NETWORK TOTAL: {globalTotal} PLEDGES</span>
          <span>
            STATUS:{' '}
            <span className="status-pill">
              <span className="live-dot"></span> OPERATIONAL
            </span>
          </span>
          {/* Duplicate for seamless loop */}
          <span>NETWORK TOTAL: {globalTotal} PLEDGES</span>
          <span>
            STATUS:{' '}
            <span className="status-pill">
              <span className="live-dot"></span> OPERATIONAL
            </span>
          </span>
        </div>
      </div>

      {/* 2. NAVIGATION PILL */}
      <nav className="premium-nav">
        <div className="nav-container">
          <div className="brand" onClick={() => setPage('home')}>
            Vibe<span>Check</span>
          </div>
          <div className="menu">
            <button
              className={page === 'home' ? 'active' : ''}
              onClick={() => setPage('home')}
            >
              Home
            </button>
            <button
              className={page === 'explore' ? 'active' : ''}
              onClick={() => setPage('explore')}
            >
              Explore
            </button>
            <button
              className={page === 'analytics' ? 'active' : ''}
              onClick={() => setPage('analytics')}
            >
              Analytics
            </button>

            <div className={`theme-slider ${theme}`} onClick={toggleTheme}>
              <div className="slider-knob"></div>
            </div>

            <button className="propose-btn" onClick={() => setShowModal(true)}>
              + Propose
            </button>
          </div>
        </div>
      </nav>

      {/* 3. MAIN CONTENT VIEW */}
      <main className="view-content">
        {page === 'home' && (
          <div className="home-hero fade-in">
            <span className="hero-tag">V2.4 LOGISTICS PROTOCOL</span>
            <h1>
              Confirm the Crowd.
              <br />
              Eliminate the Risk.
            </h1>
            <p>
              Sustainable fan-led logistics protocol for live entertainment.
            </p>
            <div className="hero-btns">
              <button
                className="btn-primary-large"
                onClick={() => setPage('explore')}
              >
                Enter Network
              </button>
              <button
                className="btn-secondary-large"
                onClick={() => setPage('analytics')}
              >
                View Analytics
              </button>
            </div>
          </div>
        )}

        {page === 'explore' && (
          <div className="page-wrapper fade-in">
            <div className="search-container">
              <input
                type="text"
                placeholder="Search artist or city..."
                onChange={(e) => setSearchTerm(e.target.value)}
                className="main-search"
              />
            </div>
            <div className="artist-grid">
              {filteredArtists.map((artist) => (
                <div key={artist.id} className="card">
                  {artist.pledges >= artist.goal && (
                    <div className="status-badge">GIG CONFIRMED</div>
                  )}
                  <div className="card-head">
                    <span className="tag">{artist.genre}</span>
                    <span className="eco-score">🌱 {artist.eco}%</span>
                  </div>
                  <h3>{artist.name}</h3>
                  <p className="bio">{artist.bio}</p>
                  <p className="loc">📍 {artist.city}</p>
                  <FundraisingProgress
                    current={artist.pledges}
                    goal={artist.goal}
                  />
                  <PledgeManager artistId={artist.id} onUpdate={fetchArtists} />
                </div>
              ))}
            </div>
          </div>
        )}
        {page === 'analytics' && <Analytics artists={artists} theme={theme} />}
      </main>

      {/* 4. MODAL OVERLAY (THE PROPOSE POPUP) */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div
            className="modal-content fade-in"
            onClick={(e) => e.stopPropagation()}
          >
            <h3>Propose New Artist</h3>
            <form onSubmit={handlePropose}>
              <input
                type="text"
                placeholder="Artist Name"
                required
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
              <div className="input-row">
                <input
                  type="text"
                  placeholder="Target City"
                  required
                  value={formData.city}
                  onChange={(e) =>
                    setFormData({ ...formData, city: e.target.value })
                  }
                />
                <input
                  type="text"
                  placeholder="Genre"
                  required
                  value={formData.genre}
                  onChange={(e) =>
                    setFormData({ ...formData, genre: e.target.value })
                  }
                />
              </div>
              {/* NEW BIO / DESCRIPTION FIELD */}
              <textarea
                placeholder="Artist Bio / Description (e.g., Soulful acoustic harmonies)"
                required
                rows="3"
                value={formData.bio}
                onChange={(e) =>
                  setFormData({ ...formData, bio: e.target.value })
                }
              />
              <div className="modal-btns">
                <button
                  type="button"
                  className="btn-cancel"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn-submit">
                  Submit Proposal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 5. FOOTER */}
      <footer className="pro-footer">
        <div className="footer-container">
          <div className="footer-brand-sec">
            <div className="brand">
              Vibe<span>Check</span>
            </div>
            <p>Direct-to-fan touring protocol.</p>
            <div className="footer-status">
              <span className="live-dot"></span> Systems Operational
            </div>
          </div>
          <div className="footer-links">
            <div className="footer-col">
              <h4>Platform</h4>
              <a href="#">Status</a>
              <a href="#">API Docs</a>
            </div>
            <div className="footer-col">
              <h4>Legal</h4>
              <a href="#">Privacy</a>
              <a href="#">Terms</a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          © 2026 VibeCheck Labs. v2.4.0-stable
        </div>
      </footer>
    </div>
  );
}

export default App;

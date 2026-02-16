import { useState, useEffect } from 'react';
import HeroBanner from './components/HeroBanner';
import CoderBoard from './components/CoderBoard';
import AddCoderForm from './components/AddCoderForm';
import Footer from './components/Footer';
import './App.css';

function App() {
  const [coders, setCoders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [apiStatus, setApiStatus] = useState(null);

  const fetchCoders = async () => {
    try {
      const res = await fetch('/api/coders');
      const data = await res.json();
      setCoders(data);
    } catch {
      console.log('API not available yet — showing demo mode');
      setCoders([]);
    } finally {
      setLoading(false);
    }
  };

  const checkHealth = async () => {
    try {
      const res = await fetch('/api/health');
      const data = await res.json();
      setApiStatus(data.status);
    } catch {
      setApiStatus('offline');
    }
  };

  useEffect(() => {
    checkHealth();
    fetchCoders();
  }, []);

  const handleAddCoder = async (name, message) => {
    try {
      const res = await fetch('/api/coders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, message }),
      });
      if (res.ok) {
        fetchCoders();
      }
    } catch (err) {
      console.error('Failed to add coder:', err);
    }
  };

  const handleDeleteCoder = async (id) => {
    try {
      await fetch(`/api/coders/${id}`, { method: 'DELETE' });
      fetchCoders();
    } catch (err) {
      console.error('Failed to delete coder:', err);
    }
  };

  return (
    <div className="app">
      <HeroBanner apiStatus={apiStatus} />
      <main className="main-content">
        <section className="challenge-card">
          <div className="challenge-badge">Challenge 5</div>
          <h2 className="challenge-title">📊 Live Polling & Survey System</h2>
          <p className="challenge-description">
            Build a real-time polling system where an admin creates a poll with a question and multiple choice options. Users vote by selecting an option — each user can vote only once. Results update in real-time with a bar chart showing vote counts and percentage per option. The dashboard displays total votes, the leading option, and a participation timeline. Includes the ability to close a poll and declare the result.
          </p>
          <div className="challenge-footer">
            <div className="challenge-timer">
              <span className="timer-icon">⏱️</span>
              <span>5 Minute Challenge</span>
            </div>
            <div className="challenge-stack">
              <span className="stack-tag">React</span>
              <span className="stack-tag">Node.js</span>
              <span className="stack-tag">PostgreSQL</span>
            </div>
          </div>
        </section>

        <section className="rules-card">
          <h3 className="rules-title">📜 Common Rules</h3>
          <div className="rules-grid">
            <div className="rule-item">
              <span className="rule-icon">🛠️</span>
              <div><strong>Tech Stack</strong><p>React + Node.js + PostgreSQL</p></div>
            </div>
            <div className="rule-item">
              <span className="rule-icon">⏱️</span>
              <div><strong>Time Limit</strong><p>5 minutes with GitHub Copilot</p></div>
            </div>
            <div className="rule-item">
              <span className="rule-icon">✅</span>
              <div><strong>Must Include</strong><p>Full-stack CRUD, a styled UI, and a working database</p></div>
            </div>
            <div className="rule-item">
              <span className="rule-icon">⭐</span>
              <div><strong>Bonus</strong><p>Responsive design, animations, or real-time updates</p></div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default App;

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
          <div className="challenge-badge">Challenge</div>
          <h2 className="challenge-title">💰 Expense Tracker & Budget Manager</h2>
          <p className="challenge-description">
            Build a personal finance tracker where users log daily income and expenses with a category (Food, Rent, Transport, Shopping, Bills, etc.) and amount. The dashboard displays total income, total expenses, and current balance. A breakdown chart shows spending per category. Users can set a monthly budget limit — the system alerts when spending exceeds the budget. Includes a transaction history with date filters.
          </p>
          <div className="challenge-footer">
            <div className="challenge-timer">
              <span className="timer-icon">⏱️</span>
              <span>10 Minute Challenge</span>
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
              <div>
                <strong>Tech Stack</strong>
                <p>React + Node.js + PostgreSQL</p>
              </div>
            </div>
            <div className="rule-item">
              <span className="rule-icon">⏱️</span>
              <div>
                <strong>Time Limit</strong>
                <p>10 minutes with GitHub Copilot</p>
              </div>
            </div>
            <div className="rule-item">
              <span className="rule-icon">✅</span>
              <div>
                <strong>Must Include</strong>
                <p>Full-stack CRUD, a styled UI, and a working database</p>
              </div>
            </div>
            <div className="rule-item">
              <span className="rule-icon">⭐</span>
              <div>
                <strong>Bonus</strong>
                <p>Responsive design, animations, or real-time updates</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default App;

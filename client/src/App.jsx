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
          <div className="challenge-badge">Challenge 4</div>
          <h2 className="challenge-title">📋 Project Task Board (Kanban)</h2>
          <p className="challenge-description">
            Build a drag-and-drop Kanban board for project management. Users create task cards with a title, description, and assignee. Tasks move across four columns: To Do → In Progress → Review → Done. Each card shows its current status with color-coded labels. The board displays a project completion percentage bar. Users can add, edit, and delete tasks. Includes a filter to view tasks by assignee.
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
      </main>
      <Footer />
    </div>
  );
}

export default App;

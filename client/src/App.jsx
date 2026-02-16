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
      <Footer />
    </div>
  );
}

export default App;

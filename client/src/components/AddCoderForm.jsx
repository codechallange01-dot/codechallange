import { useState } from 'react';
import './AddCoderForm.css';

function AddCoderForm({ onAdd }) {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    setSubmitting(true);
    await onAdd(name.trim(), message.trim());
    setName('');
    setMessage('');
    setSubmitting(false);
  };

  return (
    <section className="add-coder-section">
      <h2 className="section-title">🖊️ Sign the Wall</h2>
      <form className="add-coder-form" onSubmit={handleSubmit}>
        <div className="form-row">
          <input
            className="form-input"
            type="text"
            placeholder="Your name..."
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            className="form-input"
            type="text"
            placeholder="Leave a message... (optional)"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button
            className="form-button"
            type="submit"
            disabled={submitting || !name.trim()}
          >
            {submitting ? '...' : '🚀 Add Me!'}
          </button>
        </div>
      </form>
    </section>
  );
}

export default AddCoderForm;

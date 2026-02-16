import './CoderBoard.css';

function CoderBoard({ coders, loading, onDelete }) {
  if (loading) {
    return (
      <section className="coder-board">
        <h2 className="section-title">⚡ Coder Wall of Fame</h2>
        <div className="loading-spinner">
          <div className="spinner" />
          <p>Loading coders...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="coder-board">
      <h2 className="section-title">⚡ Coder Wall of Fame</h2>
      <p className="section-desc">
        These legendary coders have left their mark. Add yourself below!
      </p>

      {coders.length === 0 ? (
        <div className="empty-state">
          <span className="empty-icon">🫥</span>
          <p>No coders yet! Be the first to sign the wall.</p>
          <p className="empty-hint">
            (Make sure the API server and database are running)
          </p>
        </div>
      ) : (
        <div className="coder-grid">
          {coders.map((coder) => (
            <div key={coder.id} className="coder-card">
              <div className="coder-avatar">
                {coder.name.charAt(0).toUpperCase()}
              </div>
              <div className="coder-info">
                <h3 className="coder-name">{coder.name}</h3>
                <p className="coder-message">{coder.message}</p>
                <span className="coder-date">
                  {new Date(coder.created_at).toLocaleDateString()}
                </span>
              </div>
              <button
                className="coder-delete"
                onClick={() => onDelete(coder.id)}
                title="Remove"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default CoderBoard;

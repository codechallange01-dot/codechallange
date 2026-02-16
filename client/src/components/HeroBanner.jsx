import './HeroBanner.css';

function HeroBanner({ apiStatus }) {
  return (
    <header className="hero">
      <div className="hero-bg-effects">
        <div className="hero-orb hero-orb-1" />
        <div className="hero-orb hero-orb-2" />
      </div>

      <div className="hero-content">
        <h1 className="hero-title">
          Welcome to the <span className="hero-title-accent">Code Challenge!</span>
        </h1>
        <p className="hero-subtitle">
          Where creativity meets code. Build, learn, and showcase your skills.
        </p>

        <div className="hero-stats">
          <div className="stat-badge">
            <span className="stat-icon">⚛️</span>
            <span>React</span>
          </div>
          <div className="stat-badge">
            <span className="stat-icon">🟢</span>
            <span>Node.js</span>
          </div>
          <div className="stat-badge">
            <span className="stat-icon">🐘</span>
            <span>PostgreSQL</span>
          </div>
          <div className={`stat-badge status-badge ${apiStatus === 'ok' ? 'online' : 'offline'}`}>
            <span className="status-dot" />
            <span>API {apiStatus === 'ok' ? 'Online' : 'Offline'}</span>
          </div>
        </div>

      </div>
    </header>
  );
}

export default HeroBanner;

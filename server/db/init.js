const pool = require('./pool');

async function initDB() {
  try {
    // Create the coders table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS coders (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        message VARCHAR(500),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Seed with some sample data
    const { rows } = await pool.query('SELECT COUNT(*) FROM coders');
    if (parseInt(rows[0].count) === 0) {
      await pool.query(`
        INSERT INTO coders (name, message) VALUES
          ('Ada Lovelace', 'First programmer ever! 🚀'),
          ('Alan Turing', 'Breaking codes since 1939 🔓'),
          ('Grace Hopper', 'Found the first bug 🐛'),
          ('Linus Torvalds', 'Talk is cheap, show me the code 💻');
      `);
      console.log('✅ Database seeded with sample data');
    }

    console.log('✅ Database initialized successfully');
    process.exit(0);
  } catch (err) {
    console.error('❌ Database initialization failed:', err.message);
    process.exit(1);
  }
}

initDB();

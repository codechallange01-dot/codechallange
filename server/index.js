const express = require('express');
const cors = require('cors');
require('dotenv').config();

const codersRoutes = require('./routes/coders');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    message: '🚀 Code Challenge API is running!',
    timestamp: new Date().toISOString(),
  });
});

// Routes
app.use('/api/coders', codersRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`\n🚀 Server running at http://localhost:${PORT}`);
  console.log(`📡 API Health: http://localhost:${PORT}/api/health`);
  console.log(`👥 Coders API: http://localhost:${PORT}/api/coders\n`);
});

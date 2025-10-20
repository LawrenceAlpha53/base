// index.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { sequelize } = require('./models'); // Sequelize setup
const workerRoutes = require('./routes/workers');

const app = express();

// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/api', workerRoutes);

// Health check route
app.get('/', (req, res) => res.send({ message: 'API is live' }));

// Global error handler
app.use((err, req, res, next) => {
  console.error('Global Error:', err);
  res.status(500).json({ message: 'Internal server error', error: err.message });
});

// Start server
const port = process.env.PORT || 5000;
app.listen(port, async () => {
  console.log(`Server is running on port ${port}`);
  try {
    await sequelize.authenticate();
    console.log('Database connected successfully!');
  } catch (err) {
    console.error('Database connection failed:', err);
  }
});

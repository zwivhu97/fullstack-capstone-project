/*jshint esversion: 8 */
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const pinoHttp = require('pino-http');
const logger = require('./logger');

const connectToDatabase = require('./models/db');
const { loadData } = require("./util/import-mongo/index");

// Initialize app
const app = express();
const port = 3060;

// Middleware
app.use(cors());
app.use(express.json());
app.use(pinoHttp({ logger }));

// Connect to MongoDB
connectToDatabase()
  .then(() => {
    logger.info('Connected to DB');
  })
  .catch((e) => {
    console.error('Failed to connect to DB', e);
  });

// Routes
const giftRoutes = require('./routes/giftRoutes');
const searchRoutes = require('./routes/searchRoutes');

// Use Routes
app.use('/api/gifts', giftRoutes);
app.use('/api/search', searchRoutes);

// Root route
app.get("/", (req, res) => {
  res.send("Inside the server");
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send('Internal Server Error');
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
1️⃣ server.js — Entry point: Connect DB and start server
js
Copy
Edit
require('dotenv').config();
const mongoose = require('mongoose');
const app = require('./app');

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// Connect to MongoDB
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('✅ MongoDB connected');
  // Start Express server only after DB connection
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
})
.catch((err) => {
  console.error('❌ MongoDB connection error:', err);
  process.exit(1);
});
2️⃣ app.js — Express app, middleware, routes, error handling
js
Copy
Edit
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');

// Import Routes
const authRoutes = require('./routes/authRoutes');
const applicantRoutes = require('./routes/applicantRoutes');
const guardRoutes = require('./routes/guardRoutes');
const feedbackRoutes = require('./routes/feedbackRoutes');
const replacementRoutes = require('./routes/replacementRoutes');

const app = express();

// Middleware
app.use(helmet()); // Security headers
app.use(cors());   // Enable CORS (adjust options as needed)
app.use(morgan('dev')); // Logger
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(cookieParser());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/applicants', applicantRoutes);
app.use('/api/guards', guardRoutes);
app.use('/api/feedback', feedbackRoutes);
app.use('/api/replacement', replacementRoutes);

// 404 handler
app.use((req, res, next) => {
  res.status(404).json({ message: 'Route not found' });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    message: err.message || 'Internal Server Error',
  });
});

module.exports = app;
3️⃣ Folder structure example
bash
Copy
Edit
/project-root
  /controllers
    authController.js
    applicantController.js
    guardController.js
    feedbackController.js
    replacementController.js
  /middlewares
    authMiddleware.js
  /models
    User.js
    Applicant.js
    Guard.js
    Feedback.js
    ReplacementRequest.js
  /routes
    authRoutes.js
    applicantRoutes.js
    guardRoutes.js
    feedbackRoutes.js
    replacementRoutes.js
  app.js
  server.js
  .env
  package.json
4️⃣ .env example
ini
Copy
Edit
PORT=5000
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/mither3db?retryWrites=true&w=majority
JWT_SECRET=your_jwt_secret_here
EMAIL_SERVICE=gmail
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_password_or_app_password
EMAIL_FROM=your_email@gmail.com

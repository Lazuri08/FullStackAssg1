const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON data
app.use(bodyParser.json());

// MongoDB connection settings (use your own MongoDB URI)
const mongoURI = 'mongodb://localhost:27017/admin';

mongoose.connect('mongodb://gorkemSari:Zxcvb123@127.0.0.1:27017/admin', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
    process.exit(1); // Terminate the application on connection error
  });

// Define your routes for user signup, login, and employee endpoints
app.use('/api/v1/user', require('./routes/userRoutes'));
app.use('/api/v1/emp', require('./routes/employeeRoutes'));

// Define a default route for the root path
app.get('/', (req, res) => {
  res.send('Welcome to the root path!');
});

// Error handling middleware for unhandled routes
app.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});

// Error response for unhandled routes
app.use((error, req, res, next) => {
  res.status(error.status || 500).json({
    status: false,
    message: error.message || 'Internal Server Error',
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

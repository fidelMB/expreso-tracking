const express = require('express');
const morgan = require('morgan');

// Import routes
const testRouter = require('./routes/test.route');

// Set routes
app.use(testRouter);

// App
const app = express();

// Middlewares
app.use(morgan('dev'));

app.listen(3000, function() {
  console.log('Server is running on port http://localhost:3000');
});
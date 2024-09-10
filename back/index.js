const express = require('express');
const morgan = require('morgan');
const app = express();

// Import routes
const testRouter = require('./routes/test.route');

// Set routes
app.use(testRouter);

// Middlewares
app.use(morgan('dev'));

// Server
app.listen(3000, () => {
    console.log('Server is running on port http://localhost:3000');
});
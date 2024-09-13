const express = require('express');
const morgan = require('morgan');

// Import routes
const usersRouter = require('./routes/users.routes')

const app = express();
app.use(express.json());

// Set routes

// post: localhost:3000/users agregar un usuario con un json en formato:
// {
//   "email": "",
//   "latitude": 0,
//   "longitude": 0,
//   "role": ""
// }

// get: localhost:3000/users/user-by-email/:email regresa la información del usuario con el email en el parámetro del URL
app.use(usersRouter);

// Middlewares
app.use(morgan('dev'));

app.listen(3000, function() {
  console.log('Server is running on port http://localhost:3000');
});
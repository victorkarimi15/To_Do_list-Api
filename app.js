const express = require('express');
require('dotenv').config();
const connectDB = require('./config/db.js');
const cookieParser = require('cookie-parser');
const verifyJWT = require('./middleware/verifyJWT.js');

const app = express();
const PORT = process.env.PORT;

// handle db connections
connectDB();

// app middleware
app.use(express.json());
app.use(cookieParser());

// route for signup
app.use('/signup', require('./router/signup.js'));

// route for Login
app.use('/auth', require('./router/auth.js'));

// route for tasks
app.use('/task', verifyJWT, require('./router/task.js'));



app.listen(PORT, () => console.log('Server running on port: '+ PORT));

require('dotenv').config();
const express = require('express');
const app = express();

//	packages
const mongoose = require('mongoose');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
// const cors = require('cors');
// const proxy = require('http-proxy-middleware');

//	routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const postRoutes = require('./routes/posts');
const testRoutes = require('./routes/test');

//	db
const connectDB = async () => {
  try {
    mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to mongoDB.');
  } catch (error) {
    throw error;
  }
};
mongoose.connection.on('disconnected', () => {
  console.log('mongoDB disconnected!');
});

//	middleware
app.use(morgan('tiny'));
app.use(cookieParser());
app.use(express.json());

//	routes
app.get('/', (req, res) => {
  res.send('Hello World');
});
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/test', testRoutes);
app.use('/api/v1/posts', postRoutes);

//	error handler
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || 'Something went wrong!';
  return res.status(status).json({
    success: false,
    status,
    message,
  });
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  connectDB();
  console.log(`Server listening on port ${PORT}`);
});

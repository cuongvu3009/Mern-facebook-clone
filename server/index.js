require('dotenv').config();
const express = require('express');
const app = express();

//	packages
const mongoose = require('mongoose');
const morgan = require('morgan');

//	routes
const authRoutes = require('./routes/auth');

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
app.use(express.json());
app.use(morgan('tiny'));

//	routes
app.get('/', (req, res) => {
  res.send('Hello World');
});
app.use('/api/v1/auth', authRoutes);

//	error handler
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || 'Something went wrong';
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

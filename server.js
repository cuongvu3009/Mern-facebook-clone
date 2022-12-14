require('dotenv').config();
const express = require('express');
const app = express();

//	packages
const mongoose = require('mongoose');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const cors = require('cors');

//	security packages
const helmet = require('helmet');
const xss = require('xss-clean');

//	routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const postRoutes = require('./routes/posts');
const testRoutes = require('./routes/test');
const commentRoutes = require('./routes/comments');

// Accessing the path module (deploy)
const path = require('path');

// Step 1 deploy:
app.use(express.static(path.resolve(__dirname, './client/build')));
// Step 2 deploy:
app.get('*', function (request, response) {
  response.sendFile(path.resolve(__dirname, './client/build', 'index.html'));
});

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

//	security
app.use(helmet());
app.use(xss());

//	middleware
app.use(express.json());
app.use(morgan('tiny'));
app.use(cookieParser());
app.use(cors());

//	routes
app.get('/', (req, res) => {
  res.send('Hello World');
});
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/test', testRoutes);
app.use('/api/v1/posts', postRoutes);
app.use('/api/v1/comments', commentRoutes);

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

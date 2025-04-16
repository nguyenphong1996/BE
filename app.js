const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const authRouter = require("./routes/auth");
const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

// Routes
app.use('/auth', authRouter); // Thêm route cho auth

// Catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// Error handler
app.use(function (req, res, next) {
  res.status(404).json({ message: 'Not Found' });
});


// Kết nối MongoDB
const mongoose = require('mongoose');
mongoose.connect('mongodb://178.128.210.43:27017/BE', {})

  .then(() => console.log('Kết nối MongoDB thành công'))
  .catch(err => console.error('Lỗi kết nối MongoDB:', err));

module.exports = app;

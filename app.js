var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
<<<<<<< HEAD
var cors = require('cors');
var createError = require('http-errors');
var authRouter = require('./routes/auth');
var createError = require('http-errors');

=======
var cors = require('cors'); // Thêm cors để frontend kết nối
var app = express();

var authRouter = require('./routes/auth'); // Thêm route cho auth
>>>>>>> 3452b9766b751314d055cb676ebcce121f6ea082



app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

// Routes
<<<<<<< HEAD
app.use('/auth', authRouter);
=======
app.use('/auth', authRouter); // Thêm route cho auth
>>>>>>> 3452b9766b751314d055cb676ebcce121f6ea082

// Catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// Error handler
app.use(function (req, res, next) {
  res.status(404).json({ message: 'Not Found' });
});


<<<<<<< HEAD

// Kết nối MongoDB
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/DaNenTang2')
=======
// Kết nối MongoDB
const mongoose = require('mongoose');
mongoose.connect('mongodb://178.128.210.43:27017/BE', {})
>>>>>>> 3452b9766b751314d055cb676ebcce121f6ea082
  .then(() => console.log('Kết nối MongoDB thành công'))
  .catch(err => console.error('Lỗi kết nối MongoDB:', err));

module.exports = app;

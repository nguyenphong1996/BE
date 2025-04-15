const express = require('express');
const router = express.Router();
const User = require('../models/user.model');

// API Đăng ký
router.post("/register", async (req, res) => {
    console.log("Dữ liệu frontend gửi lên:", req.body); // <-- Đặt lên đầu
  
    const { name, email, phone, password } = req.body;
  
    if (!name || !email || !phone || !password) {
      return res.status(400).json({ message: "Vui lòng nhập đầy đủ thông tin" });
    }
  
    // kiểm tra trùng
    const existingUser = await User.findOne({
      $or: [{ email }, { phone }]
    });
  
    if (existingUser) {
      return res.status(400).json({ message: "Email hoặc số điện thoại đã tồn tại" });
    }
  
    const user = new User({ name, email, phone, password });
    await user.save();
  
    return res.status(201).json({ message: "Đăng ký thành công" });
  });
  
  

// API Đăng nhập
router.post('/login', async (req, res) => {
    const { emailOrPhone, password } = req.body;

    try {
        const user = await User.findOne({ $or: [{ email: emailOrPhone }, { phone: emailOrPhone }] });
        if (!user || password !== user.password) {
            return res.status(400).json({ message: 'Email/Số điện thoại hoặc mật khẩu không đúng' });
        }

        res.json({ message: 'Đăng nhập thành công' });
    } catch (err) {
        res.status(500).json({ message: 'Lỗi server', error: err.message });
    }
});

module.exports = router;
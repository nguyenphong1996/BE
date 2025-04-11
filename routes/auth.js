const express = require('express');
const router = express.Router();
const User = require('../models/User');
const authController = require('../controllers/authController');

// API Đăng ký
router.post('/register', authController.register);

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
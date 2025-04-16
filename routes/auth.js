const express = require('express');
const router = express.Router();
const User = require('../models/User');

// API Đăng ký
router.post('/register', async (req, res) => {

    const { name, email, phone, password } = req.body;

    // Kiểm tra thông tin nhập vào
    if (!name || !email || !phone || !password) {
        return res.status(400).json({ message: 'Vui lòng điền đầy đủ thông tin' });
    }

    try {
        // Kiểm tra người dùng đã tồn tại chưa
        let existingUser = await User.findOne({ $or: [{ email }, { phone }] });
        if (existingUser) {
            return res.status(400).json({
                message: 'Email hoặc số điện thoại đã được sử dụng'
            });
        }

        // Tạo người dùng mới
        const newUser = new User({ name, email, phone, password });
        await newUser.save();

        res.status(201).json({
            message: 'Đăng ký thành công',
            user: {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                phone: newUser.phone
            }
        });
    } catch (err) {

        console.error('Lỗi đăng ký:', err);
        res.status(500).json({
            message: 'Lỗi server',
            error: err.message,
            stack: err.stack
        });
    }
});

// API Đăng nhập
router.post('/login', async (req, res) => {
    const { emailOrPhone, password } = req.body;

    // Kiểm tra thông tin nhập vào
    if (!emailOrPhone || !password) {
        return res.status(400).json({ message: 'Vui lòng nhập email/SĐT và mật khẩu' });
    }

    try {
        // Tìm người dùng
        const user = await User.findOne({
            $or: [{ email: emailOrPhone }, { phone: emailOrPhone }]
        });

        // Kiểm tra người dùng tồn tại
        if (!user) {
            return res.status(400).json({
                message: 'Tài khoản không tồn tại'
            });
        }

        // Kiểm tra mật khẩu
        if (user.password !== password) {
            return res.status(400).json({
                message: 'Mật khẩu không đúng'
            });
        }

        res.json({
            message: 'Đăng nhập thành công',
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone
            }
        });
    } catch (err) {
        console.error('Lỗi đăng nhập:', err);
        res.status(500).json({
            message: 'Lỗi server',
            error: err.message
        });
    }
});

// API lấy danh sách người dùng 
// router.get('/users', async (req, res) => {
//     try {
//         const users = await User.find().select('-password'); // Không trả về mật khẩu
//         res.json(users);
//     } catch (err) {
//         res.status(500).json({ message: 'Lỗi server', error: err.message });
//     }
// });

// API: GET /auth/users => Trả danh sách tất cả user
router.get('/users', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: 'Lỗi server' });
    }
});


module.exports = router;
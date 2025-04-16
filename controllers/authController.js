const User = require('../models/User');


exports.register = async (req, res) => {
    try {
        const { name, email, phone, password } = req.body;

        // Validation cơ bản
        if (!username || !email || !password || !fullName || !phoneNumber) {
            Alert.alert("Thiếu thông tin", "Vui lòng điền đầy đủ tất cả các trường");
            return res.status(400).json({ message: 'Vui lòng điền đầy đủ thông tin' });
        }

        // Kiểm tra định dạng email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: 'Email không hợp lệ' });
        }

        // Kiểm tra độ dài mật khẩu
        if (password.length < 6) {
            return res.status(400).json({ message: 'Mật khẩu phải có ít nhất 6 ký tự' });
        }

        // Kiểm tra email đã tồn tại chưa
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email đã tồn tại' });
        }


        // Tạo user mới
        const user = new User({
            name,
            email,
            phone,
            password
        });

        await user.save();

        res.status(201).json({
            message: 'Đăng ký thành công',
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone
            }
        });

    } catch (error) {
        console.error('Lỗi đăng ký:', error);
        res.status(500).json({ message: 'Lỗi server' });
    }
}; 
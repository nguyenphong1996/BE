const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Danh sách tên người Việt Nam
const firstNames = ['Nguyễn', 'Trần', 'Lê', 'Phạm', 'Hoàng', 'Huỳnh', 'Phan', 'Vũ', 'Võ', 'Đặng'];
const middleNames = ['Văn', 'Thị', 'Hữu', 'Đức', 'Minh', 'Thanh', 'Quốc', 'Hoàng', 'Bảo', 'Anh'];
const lastNames = ['An', 'Bình', 'Cường', 'Dũng', 'Hải', 'Hùng', 'Khánh', 'Long', 'Mạnh', 'Nam', 'Phong', 'Quân', 'Sơn', 'Thắng', 'Tuấn'];

// Hàm tạo tên ngẫu nhiên
const generateRandomName = () => {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const middleName = middleNames[Math.floor(Math.random() * middleNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    return `${firstName} ${middleName} ${lastName}`;
};

// Hàm tạo số điện thoại ngẫu nhiên theo định dạng Việt Nam
const generateRandomPhone = () => {
    const prefixes = ['03', '05', '07', '08', '09'];
    const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
    const number = Math.floor(10000000 + Math.random() * 90000000);
    return `${prefix}${number}`;
};

// Hàm chuyển đổi có dấu sang không dấu
const removeAccents = (str) => {
    return str.normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/đ/g, 'd')
        .replace(/Đ/g, 'D');
};

// Hàm tạo email từ tên
const generateEmail = (name) => {
    const nameParts = name.toLowerCase().split(' ');
    const lastName = removeAccents(nameParts[nameParts.length - 1]);
    const randomNum = Math.floor(Math.random() * 1000);
    return `${lastName}${randomNum}@gmail.com`;
};

// Kết nối MongoDB
mongoose.connect('mongodb://localhost:27017/DaNenTang2')
    .then(async () => {
        console.log('Đã kết nối MongoDB');

        // Lấy reference đến collection users
        const usersCollection = mongoose.connection.db.collection('users');

        try {
            // Xóa index username nếu tồn tại
            await usersCollection.dropIndex('username_1');
            console.log('Đã xóa index username cũ');
        } catch (error) {
            // Bỏ qua lỗi nếu index không tồn tại
            console.log('Không có index username cũ');
        }

        // Tạo 10 user
        for (let i = 0; i < 10; i++) {
            const name = generateRandomName();
            const phone = generateRandomPhone();
            const email = generateEmail(name);
            const password = '123456'; // Mật khẩu mặc định

            const user = {
                name,
                email,
                phone,
                password
            };

            await usersCollection.insertOne(user);
            console.log(`Đã tạo user: ${name} - ${phone} - ${email}`);
        }

        console.log('Đã tạo xong 10 user');
        process.exit();
    })
    .catch(err => {
        console.error('Lỗi kết nối MongoDB:', err);
        process.exit(1);
    }); 
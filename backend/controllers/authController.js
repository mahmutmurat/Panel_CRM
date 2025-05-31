// backend/controllers/authController.js
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d', // Token geçerlilik süresi
    });
};

// @desc    Yeni kullanıcı kaydı
// @route   POST /api/auth/signup
// @access  Public
exports.signup = async (req, res) => {
    const { name, email, password, role } = req.body;

    try {
        // E-posta daha önce alınmış mı kontrol et
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'Bu e-posta adresi zaten kayıtlı.' });
        }

        // Yeni kullanıcı oluştur
        const user = await User.create({
            name,
            email,
            password,
            role, // Eğer rol gönderilmezse, modeldeki varsayılan değer kullanılır
        });

        if (user) {
            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                token: generateToken(user._id),
            });
        } else {
            res.status(400).json({ message: 'Geçersiz kullanıcı verisi.' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Sunucu hatası: ' + error.message });
    }
};

// @desc    Kullanıcı girişi ve token oluşturma
// @route   POST /api/auth/login
// @access  Public
exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        if (!email || !password) {
            return res.status(400).json({ message: 'Lütfen e-posta ve şifrenizi girin.' });
        }
        // Kullanıcıyı e-posta ile bul ve şifreyi de getir (+password)
        const user = await User.findOne({ email }).select('+password');

        if (user && (await user.matchPassword(password))) {
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                token: generateToken(user._id),
            });
        } else {
            res.status(401).json({ message: 'Geçersiz e-posta veya şifre.' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Sunucu hatası: ' + error.message });
    }
};
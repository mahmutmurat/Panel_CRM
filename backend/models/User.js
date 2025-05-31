// backend/models/User.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Lütfen bir isim giriniz.'],
        trim: true,
    },
    email: {
        type: String,
        required: [true, 'Lütfen bir e-posta adresi giriniz.'],
        unique: true,
        lowercase: true,
        match: [
            /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
            'Lütfen geçerli bir e-posta adresi giriniz.',
        ],
    },
    password: {
        type: String,
        required: [true, 'Lütfen bir şifre giriniz.'],
        minlength: [6, 'Şifre en az 6 karakter olmalıdır.'],
        select: false, // Sorgularda varsayılan olarak şifreyi getirme
    },
    role: {
        type: String,
        enum: ['Admin', 'Sales', 'Accounting', 'Viewer'], // İzin verilen roller
        default: 'Sales', // Varsayılan rol
    },
    // createdAt ve updatedAt alanları için timestamps: true kullanılabilir
    // Ancak şimdilik basit tutalım.
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

// Şifreyi kaydetmeden önce hash'leme (mongoose middleware)
userSchema.pre('save', async function (next) {
    // Sadece şifre alanı değiştirildiyse veya yeni kullanıcıysa hash'le
    if (!this.isModified('password')) {
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Girilen şifre ile veritabanındaki hash'lenmiş şifreyi karşılaştırma metodu
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
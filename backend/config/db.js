// backend/config/db.js
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config(); // .env dosyasındaki değişkenleri yükler

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            // Mongoose 6 ve sonrası için useCreateIndex ve useFindAndModify artık gerekli değil
        });
        console.log('MongoDB bağlantısı başarılı.');
    } catch (error) {
        console.error('MongoDB bağlantı hatası:', error.message);
        process.exit(1); // Hata durumunda uygulamayı sonlandır
    }
};

module.exports = connectDB;
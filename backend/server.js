// backend/server.js
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors'); // Cross-Origin Resource Sharing için
const connectDB = require('./config/db'); // Veritabanı bağlantı fonksiyonumuzu import ediyoruz

// Rota dosyalarımızı import ediyoruz
const authRoutes = require('./routes/auth');
// Gelecekte eklenecek diğer rota dosyaları için yer tutucu:
// const crmRoutes = require('./routes/crmRoutes'); 
// const stockRoutes = require('./routes/stockRoutes');

// .env dosyasındaki ortam değişkenlerini yükle
dotenv.config();

// Veritabanına bağlan
connectDB();

const app = express(); // Express uygulamasını oluştur

// CORS middleware'ini kullan
// Bu, frontend'den (farklı bir porttan veya domainden) gelen isteklere izin verir.
// Geliştirme aşamasında genellikle tüm kaynaklara izin verilir.
// Production (canlı) ortamda bunu daha kısıtlı hale getirmek güvenlik açısından önemlidir.
app.use(cors()); 

// JSON verilerini işlemek için Express middleware'i
// Bu, req.body üzerinden gelen JSON verilerini okuyabilmemizi sağlar.
app.use(express.json());

// Basit bir ana rota (API'nin çalışıp çalışmadığını test etmek için)
app.get('/api', (req, res) => {
    res.json({ message: 'KolayPanel API Çalışıyor...' });
});

// API Rotalarını Kullan
// /api/auth altındaki tüm istekler authRoutes tarafından yönetilecek
app.use('/api/auth', authRoutes);
// Gelecekte eklenecek diğer modüller için rotalar:
// app.use('/api/crm', crmRoutes);
// app.use('/api/stock', stockRoutes);


// Hata Yönetimi Middleware'i (Basit bir örnek, daha sonra geliştirilebilir)
// Tanımlanmamış rotalar için 404 hatası
app.use((req, res, next) => {
    const error = new Error(`Bulunamadı - ${req.originalUrl}`);
    res.status(404);
    next(error); // Hata işleyiciye yönlendir
});

// Genel hata işleyici (yukarıdaki next(error) ile buraya gelir)
app.use((err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode; // Eğer status code 200 ise genel bir sunucu hatasıdır
    res.status(statusCode);
    res.json({
        message: err.message,
        // Geliştirme modunda stack trace'i de gönderebiliriz
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    });
});


const PORT = process.env.PORT || 5001; // .env dosyasından portu al, yoksa 5001 kullan

app.listen(PORT, () => {
    console.log(`Sunucu ${process.env.NODE_ENV || 'development'} modunda ${PORT} portunda çalışıyor.`);
});
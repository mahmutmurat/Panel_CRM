// backend/routes/auth.js
const express = require('express');
const { signup, login } = require('../controllers/authController'); // authController'dan fonksiyonları import ediyoruz
const router = express.Router();

// Yeni kullanıcı kaydı için rota
// POST isteği /api/auth/signup adresine geldiğinde signup fonksiyonu çalışacak
router.post('/signup', signup);

// Kullanıcı girişi için rota
// POST isteği /api/auth/login adresine geldiğinde login fonksiyonu çalışacak
router.post('/login', login);

module.exports = router; // Router'ı dışa aktarıyoruz
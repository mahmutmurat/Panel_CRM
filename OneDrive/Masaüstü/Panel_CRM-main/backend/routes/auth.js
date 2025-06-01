const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');

// Kayıt ol
router.post('/register', register);

// Giriş yap
router.post('/login', login);

module.exports = router;

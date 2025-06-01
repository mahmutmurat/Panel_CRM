const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
  let token;

  // Token'ı header'dan al
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Token'ı ayır
      token = req.headers.authorization.split(' ')[1];

      // Token'ı doğrula
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Kullanıcıyı bul ve request'e ekle (password hariç)
      req.user = await User.findById(decoded.id).select('-password');

      if (!req.user) {
        res.status(401);
        throw new Error('Kullanıcı bulunamadı');
      }

      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error('Yetkilendirme başarısız');
    }
  }

  if (!token) {
    res.status(401);
    throw new Error('Yetkilendirme token\'ı bulunamadı');
  }
};

module.exports = { protect };

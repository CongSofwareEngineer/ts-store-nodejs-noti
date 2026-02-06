const express = require('express');
const { encryptData, decryptData } = require('../utils/crypto');

const router = express.Router();

router.post('/encrypt', (req, res) => {
  const { password, data } = req.body ?? {};

  if (!password || !data) {
    return res.status(400).json({
      success: false,
      message: 'Both password and data are required for encryption.'
    });
  }

  const encrypted = encryptData(data, password);

  res.status(200).json({
    success: true,
    data: { encrypted }
  });
});

router.post('/decrypt', (req, res) => {
  const { password, data } = req.body ?? {};

  if (!password || !data) {
    return res.status(400).json({
      success: false,
      message: 'Both password and data are required for decryption.'
    });
  }

  const decrypted = decryptData(data, password);

  res.status(200).json({
    success: true,
    data: { decrypted }
  });
});

module.exports = router;

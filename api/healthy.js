const express = require('express')

const router = express.Router()

router.get('/ping', (_req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server is alive',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  })
})

module.exports = router

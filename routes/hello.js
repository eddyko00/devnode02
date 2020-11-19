'use strict'
const express = require('express')
const router = express.Router()

router.get('/', (req, res, next) => {
  const { name = 'world'} = req.query
  res.send({ hello: name })
})

router.get('/test', (req, res, next) => {
  const { name = 'world'} = req.query
  res.send({ hello: name })
})
module.exports = router
'use strict'
const express = require('express')
const router = express.Router()
var nn = require('./nntest')

router.get('/', (req, res, next) => {
    const {name = 'world'} = req.query
    res.send({hello: name})
})

router.get('/test', (req, res, next) => {
    const {name = 'world'} = req.query
    var output = 'hello ' + name
    var nntest = nn();
    output = {'nnReturn':nntest}
    res.send(output)
})
module.exports = router
'use strict'
const express = require('express')
const router = express.Router()
const { ObjectId } = require('mongodb')

router.get('/', (req, res, next) => {
  const todos = req.db.collection('todos')
  todos.find().toArray((err, items) => {
    if (err) {
      next(err)
      return
    }
    res.send({ items })
  })
})

router.post('/', (req, res, next) => {
  const todos = req.db.collection('todos')
  todos.insertOne(req.body, (err, data) => {
    if (err) {
      next(err)
      return
    }
    const _id = data.insertedId
    res.status(201)
    res.set('location', `${req.baseUrl}/${_id}`)
    res.send({_id, ...req.body})
  })
})

router.get('/:id', (req, res, next) => {
  const todos = req.db.collection('todos')
  todos.findOne({ _id: new ObjectId(req.params.id) }, (err, item) => {
    if (err) {
      next(err)
    } else if (item === null) {
      res.status(404)
      res.send()
    } else { res.send(item) }
  })
})

module.exports = router
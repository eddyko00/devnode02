'use strict'
const { MongoClient } = require('mongodb')
const { connect } = MongoClient
module.exports = (uri) => {
  const tokens = /\w\/([^?]*)/g.exec(uri)
  const name = tokens && tokens[1]
  let db = null
  return (req, res, next) => {
    if (db) {
      req.app.db = req.db = db
      next()
      return
    }
    connect(uri, { useNewUrlParser: true }, (err, client) => {
      if (err) {
        next(err)
        return
      }
      db = req.app.db = req.db = client.db(name)
      db.close = (...args) => {
        db = null
        return client.close(...args)
      }
      next()
    })
  }
}
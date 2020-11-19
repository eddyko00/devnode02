'use strict'
const { promisify } = require('util')
const { beforeEach, afterEach, test } = require('tap')
const clean = require('mongo-clean')
const http = require('http')
const supertest = require('supertest')
process.env.LOG_LEVEL = 'silent'
const server = require('../server')

beforeEach(async (_, { context }) => {
  const app = http.createServer(server)
  const listen = promisify(app.listen.bind(app))
  await listen()
  const { port } = app.address()
  context.host = `http://localhost:${port}`
  context.app = app
})

afterEach(async (_, { context }) => {
  const { app } = context
  await clean(server.db)
  const close = promisify(app.close.bind(app))
  await server.db.close()
  await close()
})

test('empty todos', async ({same, context}) => {
  const { host } = context
  const res = await supertest(host).get('/todo')
//  console.log(res)
  same(res.body, { items: [] })
})

test('add a todo, list todos', async ({is, same, context})  => {
  const { host } = context
  const add = await supertest(host).post('/todo').send({
    name: 'do a thing'
  })
  const { _id } = add.body
  is(add.statusCode, 201)
  is(add.headers.location, `/todo/${_id}`)
  
  const res = await supertest(host).get('/todo')
  same(res.body, {
    items: [{
      name: 'do a thing',
      _id
    }]
  })
})

test('add a todo, get a todo', async ({is, same, context}) => {
  const { host } = context
  const add = await supertest(host).post('/todo').send({
    name: 'do a thing'
  })
  const { _id } = add.body
  is(add.statusCode, 201)
  is(add.headers.location, `/todo/${_id}`)

  const res =  await supertest(host).get(`/todo/${_id}`)

  same(res.body, {
    name: 'do a thing',
    _id
  })
 
})

test('404 todo', async ({ is, context }) => {
  const { host } = context
  const notAnItem = '5d4b090cba1afa7471cebe50'
  const res = await supertest(host).get(`/todo/${notAnItem}`)
  is(res.statusCode, 404)
})

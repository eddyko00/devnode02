'use strict'
const { promisify } = require('util')
const { beforeEach, afterEach, test } = require('tap')
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
  const close = promisify(app.close.bind(app))
  await server.db.close()
  await close()
})

test('hello world', async ({ same, context }) => {
  const { host, app } = context
  const res = await supertest(host).get('/')
  same(res.body, { hello: 'world'})
})

test('hello querystring', async ({ same, context }) => {
  const { host } = context
  const res = await supertest(host).get('/?name=Dave')
  same(res.body, { hello: 'Dave' })
})

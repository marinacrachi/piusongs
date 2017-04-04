import request from 'supertest-as-promised'
import { masterKey } from '../../config'
import express from '../../services/express'
import routes, { Version } from '.'

const app = () => express(routes)

let version

beforeEach(async () => {
  version = await Version.create({})
})

test('POST /versions 201 (master)', async () => {
  const { status, body } = await request(app())
    .post('/')
    .send({ access_token: masterKey, name: 'test', releaseDate: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.name).toEqual('test')
  expect(body.releaseDate).toEqual('test')
})

test('POST /versions 401', async () => {
  const { status } = await request(app())
    .post('/')
  expect(status).toBe(401)
})

test('GET /versions 200 (master)', async () => {
  const { status, body } = await request(app())
    .get('/')
    .query({ access_token: masterKey })
  expect(status).toBe(200)
  expect(Array.isArray(body)).toBe(true)
})

test('GET /versions 401', async () => {
  const { status } = await request(app())
    .get('/')
  expect(status).toBe(401)
})

test('GET /versions/:id 200 (master)', async () => {
  const { status, body } = await request(app())
    .get(`/${version.id}`)
    .query({ access_token: masterKey })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(version.id)
})

test('GET /versions/:id 401', async () => {
  const { status } = await request(app())
    .get(`/${version.id}`)
  expect(status).toBe(401)
})

test('GET /versions/:id 404 (master)', async () => {
  const { status } = await request(app())
    .get('/123456789098765432123456')
    .query({ access_token: masterKey })
  expect(status).toBe(404)
})

test('PUT /versions/:id 200 (master)', async () => {
  const { status, body } = await request(app())
    .put(`/${version.id}`)
    .send({ access_token: masterKey, name: 'test', releaseDate: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(version.id)
  expect(body.name).toEqual('test')
  expect(body.releaseDate).toEqual('test')
})

test('PUT /versions/:id 401', async () => {
  const { status } = await request(app())
    .put(`/${version.id}`)
  expect(status).toBe(401)
})

test('PUT /versions/:id 404 (master)', async () => {
  const { status } = await request(app())
    .put('/123456789098765432123456')
    .send({ access_token: masterKey, name: 'test', releaseDate: 'test' })
  expect(status).toBe(404)
})

test('DELETE /versions/:id 204 (master)', async () => {
  const { status } = await request(app())
    .delete(`/${version.id}`)
    .query({ access_token: masterKey })
  expect(status).toBe(204)
})

test('DELETE /versions/:id 401', async () => {
  const { status } = await request(app())
    .delete(`/${version.id}`)
  expect(status).toBe(401)
})

test('DELETE /versions/:id 404 (master)', async () => {
  const { status } = await request(app())
    .delete('/123456789098765432123456')
    .query({ access_token: masterKey })
  expect(status).toBe(404)
})

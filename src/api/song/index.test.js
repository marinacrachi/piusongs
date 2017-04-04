import request from 'supertest-as-promised'
import { masterKey } from '../../config'
import express from '../../services/express'
import routes, { Song } from '.'

const app = () => express(routes)

let song

beforeEach(async () => {
  song = await Song.create({})
})

test('POST /songs 201 (master)', async () => {
  const { status, body } = await request(app())
    .post('/')
    .send({ access_token: masterKey, level: 'test', releaseVersion: 'test', presentIn: 'test', disc: 'test', stepCount: 'test', patterns: 'test', Id: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.level).toEqual('test')
  expect(body.releaseVersion).toEqual('test')
  expect(body.presentIn).toEqual('test')
  expect(body.disc).toEqual('test')
  expect(body.stepCount).toEqual('test')
  expect(body.patterns).toEqual('test')
  expect(body.Id).toEqual('test')
})

test('POST /songs 401', async () => {
  const { status } = await request(app())
    .post('/')
  expect(status).toBe(401)
})

test('GET /songs 200', async () => {
  const { status, body } = await request(app())
    .get('/')
  expect(status).toBe(200)
  expect(Array.isArray(body)).toBe(true)
})

test('GET /songs/:id 200', async () => {
  const { status, body } = await request(app())
    .get(`/${song.id}`)
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(song.id)
})

test('GET /songs/:id 404', async () => {
  const { status } = await request(app())
    .get('/123456789098765432123456')
  expect(status).toBe(404)
})

test('PUT /songs/:id 200 (master)', async () => {
  const { status, body } = await request(app())
    .put(`/${song.id}`)
    .send({ access_token: masterKey, level: 'test', releaseVersion: 'test', presentIn: 'test', disc: 'test', stepCount: 'test', patterns: 'test', Id: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(song.id)
  expect(body.level).toEqual('test')
  expect(body.releaseVersion).toEqual('test')
  expect(body.presentIn).toEqual('test')
  expect(body.disc).toEqual('test')
  expect(body.stepCount).toEqual('test')
  expect(body.patterns).toEqual('test')
  expect(body.Id).toEqual('test')
})

test('PUT /songs/:id 401', async () => {
  const { status } = await request(app())
    .put(`/${song.id}`)
  expect(status).toBe(401)
})

test('PUT /songs/:id 404 (master)', async () => {
  const { status } = await request(app())
    .put('/123456789098765432123456')
    .send({ access_token: masterKey, level: 'test', releaseVersion: 'test', presentIn: 'test', disc: 'test', stepCount: 'test', patterns: 'test', Id: 'test' })
  expect(status).toBe(404)
})

test('DELETE /songs/:id 204 (master)', async () => {
  const { status } = await request(app())
    .delete(`/${song.id}`)
    .query({ access_token: masterKey })
  expect(status).toBe(204)
})

test('DELETE /songs/:id 401', async () => {
  const { status } = await request(app())
    .delete(`/${song.id}`)
  expect(status).toBe(401)
})

test('DELETE /songs/:id 404 (master)', async () => {
  const { status } = await request(app())
    .delete('/123456789098765432123456')
    .query({ access_token: masterKey })
  expect(status).toBe(404)
})

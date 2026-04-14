//npm test -- --test-only : for single test execution

const { test, after } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')


const api = supertest(app)


test.only('only test : notes are returned as json', async () => {
    await api
        .get('/api/notes')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test.only('only test : all notes are returned', async () => {
    const response = await api.get('/api/notes')

    assert.strictEqual(response.body.length, 2)
})
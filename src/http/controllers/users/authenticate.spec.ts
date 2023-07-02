import { app } from '@/app'
import { expect, it, describe, beforeAll, afterAll } from 'vitest'

import request from 'supertest'

describe('Authenticate (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to authenticate', async () => {
    const userCredentials = {
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    }

    await request(app.server).post('/users').send(userCredentials)

    const response = await request(app.server).post('/sessions').send({
      email: userCredentials.email,
      password: userCredentials.password,
    })

    expect(response.statusCode).toEqual(200)
    expect(response.body).toEqual({
      token: expect.any(String),
    })
  })
})

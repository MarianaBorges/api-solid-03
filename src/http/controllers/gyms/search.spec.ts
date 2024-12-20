import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'
import { app } from '@/app'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'

const FIRST_GYM = {
  title: 'JavaScript Gym',
  description: 'Some description.',
  phone: '1199999999',
  latitude: -27.2092052,
  longitude: -49.6401091,
}

const SECOND_GYM = {
  title: 'TypeScript Gym',
  description: 'Some description.',
  phone: '1199999999',
  latitude: -27.2092052,
  longitude: -49.6401091,
}

describe('Search Gyms (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to search gyms by title', async () => {
    const { token } = await createAndAuthenticateUser(app, true)
    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send(FIRST_GYM)

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send(SECOND_GYM)

    const response = await request(app.server)
      .get('/gyms/search')
      .query({
        q: 'JavaScript',
      })
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body.gyms).toHaveLength(1)
    expect(response.body.gyms).toEqual([
      expect.objectContaining({
        title: FIRST_GYM.title,
      }),
    ])
  })
})

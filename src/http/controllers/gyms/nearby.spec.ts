import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'

import { app } from '@/app'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'

const NEARBY_GYM = {
  title: 'JavaScript Gym',
  description: 'Some description.',
  phone: '1199999999',
  latitude: -27.2092052,
  longitude: -49.6401091,
}

const DISTANT_GYM = {
  title: 'TypeScript Gym',
  description: 'Some description.',
  phone: '1199999999',
  latitude: -27.0610928,
  longitude: -49.5229501,
}

describe('Nearby Gyms (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able list nearby gyms', async () => {
    const { token } = await createAndAuthenticateUser(app, true)

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send(NEARBY_GYM)

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send(DISTANT_GYM)

    const response = await request(app.server)
      .get('/gyms/nearby')
      .query({
        latitude: NEARBY_GYM.latitude,
        longitude: NEARBY_GYM.longitude,
      })
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body.gyms).toHaveLength(1)
    expect(response.body.gyms).toEqual([
      expect.objectContaining({
        title: NEARBY_GYM.title,
      }),
    ])
  })
})

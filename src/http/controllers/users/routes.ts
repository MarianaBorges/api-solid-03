import { FastifyInstance } from 'fastify'

import { verifyJwt } from '../../middlewares/verify-jw'

import { register } from './register'
import { authenticate } from './authenticate'
import { profile } from './profile'

export async function userRoutes(app: FastifyInstance) {
  app.post('/users', register)
  app.post('/sessions', authenticate)

  /** Authenticated */
  app.get('/me', { onRequest: [verifyJwt] }, profile)
}

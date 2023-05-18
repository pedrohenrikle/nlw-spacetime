import 'dotenv/config'

import fastify from 'fastify'
import cors from '@fastify/cors'
import jwt from '@fastify/jwt'

import { memoriesRoutes } from './routes/memories'
import { authRoutes } from './routes/auth'

const app = fastify()

app.register(cors, {
  origin: true, // todas URLs de front-end poderão acessar nosso back-end
})

app.register(jwt, {
  secret: 'c58926de-f58a-11ed-b67e-0242ac120002', // o secret é o que diferencia o JWT gerado pelo nosso back-end dos outros JWT
})

app.register(memoriesRoutes)
app.register(authRoutes)

app
  .listen({
    port: 3333,
    host: '0.0.0.0',
  })
  .then(() => {})
 
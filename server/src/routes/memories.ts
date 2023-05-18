import { FastifyInstance } from "fastify";
import { z } from 'zod'
import { prisma } from "../lib/prisma";

export async function memoriesRoutes(app: FastifyInstance) {
  app.addHook('preHandler', async (request) => {  // Basicamente antes de todas as funções ele vai executar esse função antes
    await request.jwtVerify() // Essa função verifica se está vindo o token na autenticação, se não tiver não deixa seguir
  })

  /* Rota para buscar as memórias - GET */

  app.get('/memories', async (request) => {
    /* O objetivo é verificar o JWT e buscar as memórias apenas do usuário logado pelo JWT */

    const memories = await prisma.memory.findMany({
      where: {
        userId: request.user.sub,
      },
      orderBy: {
        createdAt: 'asc'
      }
    })

    return memories.map(memory => {
      return {
        id: memory.id,
        coverUrl: memory.coverUrl,
        excerpt: memory.content.substring(0, 115).concat('...')
      }
    })
  })

  /* Rota para buscar dados específicos de uma memória em específico - GET */
  
  app.get('/memories/:id', async (request, reply) => {
    const paramsSchema = z.object({
      id: z.string().uuid(),
    })

    const { id } = paramsSchema.parse(request.params)

    const memory = await prisma.memory.findUniqueOrThrow({
      where: {
        id,
      },
    })

    if (!memory.isPublic && memory.userId !== request.user.sub) {
      return reply.status(401).send()
    }

    return memory
  })

  /* Rota para criar uma memória - POST */
  
  app.post('/memories', async (request) => {
    const bodySchema = z.object({
      content: z.string(),
      coverUrl: z.string(),
      isPublic: z.coerce.boolean().default(false)
    })

    const { content, coverUrl, isPublic } = bodySchema.parse(request.params)
    
    const memory = await prisma.memory.create({
      data: {
        content,
        coverUrl,
        isPublic,
        userId: request.user.sub
      }
    })

    return memory
  })

  /* Rota para atualizar informações de uma memória - PUT */

  app.put('/memories/:id', async (request, reply) => {
    const paramsSchema = z.object({
      id: z.string().uuid(),
    })

    const { id } = paramsSchema.parse(request.params)

    const bodySchema = z.object({
      content: z.string(),
      coverUrl: z.string(),
      isPublic: z.coerce.boolean().default(false)
    })

    const { content, coverUrl, isPublic } = bodySchema.parse(request.params)

    // Primeiro vamos buscar a memória e ver se é da pessoa logada, se não for, não vai editar

    let memory = await prisma.memory.findUniqueOrThrow({
      where:{
        id
      }
    })

    if (memory.userId !== request.user.sub) {
      return reply.status(401).send()
    }

    memory = await prisma.memory.update({
      where: {
        id,
      },
      data: {
        content,
        coverUrl,
        isPublic
      }
    })

   return memory
  })

  /* Rota para deletar uma memória específica - DELETE */
  
  app.delete('/memories/:id', async (request, reply) => {
    const paramsSchema = z.object({
      id: z.string().uuid(),
    })

    const { id } = paramsSchema.parse(request.params)

    const memory = await prisma.memory.findUniqueOrThrow({
      where:{
        id
      }
    })

    if (memory.userId !== request.user.sub) {
      return reply.status(401).send()
    }

    await prisma.memory.delete({
      where: {
        id,
      },
    })
  })
}
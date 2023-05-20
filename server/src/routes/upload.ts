import { FastifyInstance } from "fastify";
import { randomUUID } from "node:crypto";
import { createWriteStream } from "node:fs";
import { extname, resolve } from "node:path";
import { pipeline } from "node:stream";
import { promisify } from "node:util";

const pump = promisify(pipeline)

export async function uploadRoutes(app: FastifyInstance) {

  // Aqui estamos recebendo o arquivo na rota '/upload'
  app.post('/upload', async (request, reply) => {
    const upload = await request.file({
      limits: {
        fileSize: 10485760, // 10mb
      }
    })

    // Se entrou na rota e não teve upload
    if (!upload) {
      return reply.status(400).send()
    }

    // Verificação se é imagem ou vídeo apenas
    const mimeTypeRegex = /^(image|video)\/[a-zA-Z]+/
    const isValidFileFormat = mimeTypeRegex.test(upload.mimetype)
  
    // Se não for vídeo ou imagem recebe um bad request error
    if (!isValidFileFormat) {
      return reply.status(400).send()
    }
  
    // Criamos um ID random para servir de nome único concatenado com o nome original
    const fileId = randomUUID()
    const extension = extname(upload.filename)
    const fileName = fileId.concat(extension)

    // 
    const writeStream = createWriteStream(
      resolve(__dirname, '../../uploads/', fileName)
    )

    // É o que de fato faz acontecer
    await pump(upload.file, writeStream)


    // Gerar URL da imagem
    const fullUrl = request.protocol.concat('://').concat(request.hostname)
    const fileUrl = new URL(`/uploads/${fileName}`, fullUrl).toString()


    return { fileUrl }
  })
}
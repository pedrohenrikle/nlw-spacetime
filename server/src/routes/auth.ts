import { FastifyInstance } from "fastify";
import axios from 'axios'
import { z } from "zod";
import { prisma } from "../lib/prisma";

export async function authRoutes(app: FastifyInstance) {

  // Coleta do code da url 
  app.post('/register', async (request) => {
    const bodySchema = z.object({
      code: z.string(),
    })

    const { code } = bodySchema.parse(request.body)

    // Requisição do access_token em troca do code
    const accessTokenResponse = await axios.post(
      'https://github.com/login/oauth/access_token',
      null,
      {
        params: {
          client_id: process.env.GITHUB_CLIENT_ID,
          client_secret: process.env.GITHUB_CLIENT_SECRET,
          code,
        },
        headers: {
          Accept: 'application/json',
        },
      },
    )

    // Extraindo o access_token da response do Github
    const { access_token } = accessTokenResponse.data

    // Mandando uma requisição pro Github utilizando o access_token e pegando os dados do usuário
    const userResponse = await axios.get('https://api.github.com/user', {
      headers: {
        Authorization: `Bearer ${access_token}`
      }
    })

    // Schema padrão esperado de cada resposta do Github
    const userSchema = z.object({
      id: z.number(),
      login: z.string(),
      name: z.string(),
      avatar_url: z.string().url(),
    })

    const userInfo = userSchema.parse(userResponse.data)

    // Verificação se o usuário já existe
    let user = await prisma.user.findUnique({
      where: {
        githubId: userInfo.id,
      }
    })

    // Se não existe, aqui criamos o usuário no banco de dados
    if (!user) {
      user = await prisma.user.create({
        data: {
          githubId: userInfo.id,
          login: userInfo.login,
          name: userInfo.name,
          avatarUrl: userInfo.avatar_url,
        }
      })
    }

    // Criação do token JWT, passando 2 objetos, um com o data e o outro com a identificação com validade
    const token = app.jwt.sign({
      name: user.name,
      avatarUrl: user.avatarUrl,
    }, {
      sub: user.id, // Identificador que diferencia os users (algo único)
      expiresIn: '30 days',
    })

    return {
      token
    }
  })
}
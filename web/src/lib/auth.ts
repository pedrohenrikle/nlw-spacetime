import { cookies } from 'next/headers'
import decode from 'jwt-decode'

interface User {
  sub: string
  name: string
  avatarUrl: string
}

export function getUser(): User {
  // Pega o valor do cookie
  const token = cookies().get('token')?.value

  if (!token) {
    throw new Error('Unauthenticated')
  }

  // Traduz o conteúdo do cookie para um JSON
  const user: User = decode(token)

  return user
}

import { NextRequest, NextResponse } from 'next/server'

const signInURL = `https://github.com/login/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID}`

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value // Procura um token de login nos cookies

  if (!token) {
    // Não existe token? Logo não está logado, então vou te levar até o login
    return NextResponse.redirect(signInURL, {
      headers: {
        'Set-Cookie': `redirectTo=${request.url}; Path=/; HttpOnly; max-age=20;`,
      },
    })
  }

  // Se chegou aqui é porque ta logado, então pode seguir
  return NextResponse.next()
}

// Configurações com quais rotas ele deve ficar cuidando, no caso é qualquer uma depois de memories

export const config = {
  matcher: '/memories/:path*',
}

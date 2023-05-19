import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const redirectUrl = new URL('/', request.url)

  // Basciamente colocamos cookies sem valor sobre o nosso anterior, apagando o anterior

  return NextResponse.redirect(redirectUrl, {
    headers: {
      'Set-Cookie': `token=; Path=/; max-age=0;`,
    },
  })
}

import { api } from '@/lib/api'
import dayjs from 'dayjs'
import ptBR from 'dayjs/locale/pt-br'
import { ChevronLeft, Edit } from 'lucide-react'
import { cookies } from 'next/headers'
import Image from 'next/image'
import Link from 'next/link'

dayjs.locale(ptBR)

interface Memory {
  id: string
  coverUrl: string
  content: string
  createdAt: string
}

export default async function FullMemory(request: any) {
  const isAuthenticated = cookies().has('token')

  if (!isAuthenticated) {
    return <h1>Ops! Parece que não tem nada pra ver aqui...</h1>
  }

  const id = request.params.id

  const token = cookies().get('token')?.value

  const response = await api.get(`/memories/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  const memory: Memory = response.data

  return (
    <div className="flex flex-1 flex-col gap-4 p-16">
      <div className="flex gap-8">
        <Link
          href="/"
          className="flex items-center gap-1 text-sm text-gray-200 hover:text-gray-100"
        >
          <ChevronLeft className="h-4 w-4" />
          voltar à timeline
        </Link>
        <Link
          href="/"
          className="flex items-center gap-1.5 rounded-full bg-green-500 px-4 py-2 font-alt text-xs uppercase leading-none text-black hover:bg-green-600"
        >
          Editar
          <Edit className="h-4 w-4" />
        </Link>
      </div>

      <div className="flex flex-col gap-10 p-8">
        <div className="space-y-4">
          <time className="-ml-8 flex items-center gap-2 text-sm text-gray-100 before:h-px before:w-5 before:bg-gray-50">
            {dayjs(memory.createdAt).format('D[ de ]MMMM[, ]YYYY')}
          </time>
          <Image
            src={memory.coverUrl}
            alt=""
            width={592}
            height={280}
            className="w-full rounded-lg object-cover"
          />
          <p className="text-lg leading-relaxed text-gray-100">
            {memory.content}
          </p>
        </div>
      </div>
    </div>
  )
}

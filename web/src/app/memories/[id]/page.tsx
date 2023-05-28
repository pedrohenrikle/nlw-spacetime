import { DeleteHeader } from '@/components/DeleteHeader'
import { ViewMemoryForm } from '@/components/ViewMemoryForm'
import { api } from '@/lib/api'
import dayjs from 'dayjs'
import ptBR from 'dayjs/locale/pt-br'
import { cookies } from 'next/headers'
import Image from 'next/image'

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
      <DeleteHeader userToken={token} memoryId={id} />

      <ViewMemoryForm memory={memory} />
      <div className="flex flex-col gap-10 p-8"></div>
    </div>
  )
}

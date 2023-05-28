'use client'

import { api } from '@/lib/api'
import { ChevronLeft, Edit, Trash2 } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

interface DeleteHeaderProps {
  memoryId: string
  userToken: string | undefined
}

export function DeleteHeader({ memoryId, userToken }: DeleteHeaderProps) {
  const router = useRouter()

  async function deleteMemory() {
    await api.delete(`/memories/${memoryId}`, {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    })

    await router.push('/')
  }

  return (
    <div className="flex w-full justify-between">
      <div className="flex gap-8">
        <Link
          href="/"
          className="flex items-center gap-1 text-sm text-gray-200 hover:text-gray-100"
        >
          <ChevronLeft className="h-4 w-4" />
          voltar à timeline
        </Link>
        <button className="flex items-center gap-1.5 rounded-full bg-green-500 px-4 py-2 font-alt text-xs uppercase leading-none text-black hover:bg-green-600">
          Editar
          <Edit className="h-4 w-4" />
        </button>
      </div>
      <button
        onClick={deleteMemory}
        className="flex items-center gap-1.5 rounded-full bg-red-500 px-4 py-2 font-alt text-xs uppercase leading-none text-black hover:bg-red-600"
      >
        Apagar
        <Trash2 className="h-4 w-4" />
      </button>
    </div>
  )
}

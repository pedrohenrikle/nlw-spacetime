import dayjs from 'dayjs'
import Image from 'next/image'

interface Memory {
  id: string
  coverUrl: string
  content: string
  createdAt: string
}
export function ViewMemoryForm(memory: Memory) {
  return (
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
      <p className="break-words text-lg leading-relaxed text-gray-100">
        {memory.content}
      </p>
    </div>
  )
}

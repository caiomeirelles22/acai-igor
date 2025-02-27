'use client'
import { useRouter } from 'next/navigation'
import { FaArrowLeft } from 'react-icons/fa'

export function BackButton() {
  const router = useRouter()
  return (
    <button
      className=" gap-2 text-purple-600 hover:text-purple-700 bg-purple-50 hover:bg-purple-100 transition-all duration-300 hover:scale-105 flex items-center text-sm w-fit p-2 rounded-md"
      onClick={() => router.back()}
    >
      <FaArrowLeft className="h-4 w-4" />
      Voltar
    </button>
  )
}

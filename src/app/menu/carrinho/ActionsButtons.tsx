'use client'
import { useRouter } from 'next/navigation'
import { FaCartShopping } from 'react-icons/fa6'

export function ActionsButtons() {
  const router = useRouter()
  return (
    <>
      <button
        className="w-full bg-purple-100 text-purple-600 hover:bg-purple-200 flex items-center py-3 px-2 justify-center gap-2"
        onClick={() => router.push('/menu')}
      >
        Adicionar açai ao carrinho <FaCartShopping />
      </button>
      <button
        className="w-full bg-purple-500 text-white py-3 px-2 rounded-lg font-semibold hover:bg-purple-600 transition text-sm"
        onClick={() => router.push('/menu/adicionais/endereco')}
      >
        Avançar para entrega
      </button>
      <div className="mt-6 text-center">
        <p className="text-sm text-gray-500">
          Precisa de ajuda?{' '}
          <button className="text-purple-600 hover:underline">
            Fale conosco
          </button>
        </p>
      </div>
    </>
  )
}

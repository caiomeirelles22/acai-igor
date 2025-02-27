'use client'

import { FaCartShopping } from 'react-icons/fa6'
import acaiCartJson from '@/moks/acaiCart.json'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

type AcaiCartProps = typeof acaiCartJson

export function Cart() {
  const router = useRouter()

  const [acaiCart, setAcaiCart] = useState<AcaiCartProps>([])
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const storedCart = sessionStorage.getItem('acaiCart')
        setAcaiCart(storedCart ? JSON.parse(storedCart) : [])
      } catch (error) {
        console.error('Erro ao acessar o sessionStorage:', error)
        setAcaiCart([]) // Fallback para array vazio caso ocorra erro
      }
    }
  }, [])
  console.log('açai item', acaiCart)

  return (
    <div
      onClick={() => router.push('/menu/carrinho')}
      className="flex items-center justify-center gap-2 p-4 bg-purple-100 rounded-lg hover:bg-purple-200 hover:cursor-pointer"
    >
      <FaCartShopping className="size-5" />
      <span className="ml-2 text-lg font-semibold">
        {acaiCart.length === 0 ? (
          <p>Nenhum item</p>
        ) : acaiCart.length === 1 ? (
          <p>{acaiCart.length} Item no carrinho</p>
        ) : (
          <p>{acaiCart.length} Items no carrinho</p>
        )}
      </span>
    </div>
  )
}

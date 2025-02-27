'use client'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import imageMok from '@/../public/logoAcai.png'
import acaiCartJson from '@/moks/acaiCart.json'

type AcaiCartProps = typeof acaiCartJson

export function EmptyCart() {
  const [acaiCart, setAcaiCart] = useState<AcaiCartProps>([])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedCart = sessionStorage.getItem('acaiCart')
      setAcaiCart(storedCart ? JSON.parse(storedCart) : [])
    }
  }, [])

  return (
    <>
      {acaiCart.length === 0 && (
        <div className="flex flex-col items-center text-center">
          <div className="mb-6  w-48 h-48">
            <Image
              src={imageMok}
              alt="Carrinho vazio ilustração"
              width={300}
              height={300}
              className="object"
            />
          </div>
          <h2 className="text-xl font-semibold text-purple-800 mb-2">
            Seu carrinho está esperando por algo delicioso!
          </h2>
          <p className="text-gray-600 mb-2">
            Que tal experimentar nosso açaí? Temos diversas opções incríveis
            para você.
          </p>
        </div>
      )}
    </>
  )
}

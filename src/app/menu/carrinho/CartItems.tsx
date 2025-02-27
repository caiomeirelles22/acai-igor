'use client'

import { useEffect, useState } from 'react'
import acaiCartJson from '@/moks/acaiCart.json'

type AcaiCartProps = typeof acaiCartJson

export function CartItems() {
  const [acaiCart, setAcaiCart] = useState<AcaiCartProps>([])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedCart = sessionStorage.getItem('acaiCart')
      if (storedCart) {
        setAcaiCart(JSON.parse(storedCart))
      }
    }
  }, [])

  return (
    <>
      {acaiCart.length >= 1 && (
        <div className="flex flex-col gap-4 max-h-[70vh] overflow-y-scroll">
          {acaiCart.map((item, index) => (
            <div
              key={index}
              className="border-b flex flex-col gap-2 bg-white py-4 rounded-md border border-solid border-gray-300"
            >
              <div className="flex gap-4 justify-between px-3 py-1 items-center">
                <p className="text-gray-700 font-bold">Tamanho:</p>
                <p className="text-gray-600 text-right">{item.size.size}</p>
              </div>

              <div className="flex gap-4 justify-between px-3 py-1 items-center bg-purple-100">
                <p className="text-gray-700 font-bold">Fruta:</p>
                <p className="text-gray-600 text-right">
                  {item.fruit ? item.fruit.name : 'Nenhum escolhido'}
                </p>
              </div>

              <div className="flex gap-4 justify-between px-3 py-1 items-center">
                <p className="text-gray-700 font-bold">Coberturas:</p>
                <p className="text-gray-600 text-right">
                  {item.toppings.length
                    ? item.toppings.map((topping) => topping.name).join(', ')
                    : 'Nenhum escolhido'}
                </p>
              </div>

              <div className="flex gap-4 justify-between px-3 py-1 items-center bg-purple-100">
                <p className="text-gray-700 font-bold">Adicionais Gratuitos:</p>
                <p className="text-gray-600 text-right">
                  {item.freeAdditionals.length
                    ? item.freeAdditionals
                        .map((additional) => additional.name)
                        .join(', ')
                    : 'Nenhum escolhido'}
                </p>
              </div>

              <div className="flex gap-4 justify-between px-3 py-1 items-center">
                <p className="text-gray-700 font-bold">Adicionais Pagos:</p>
                <p className="text-gray-600 text-right">
                  {item.paidAdditionals.length
                    ? item.paidAdditionals
                        .map((paidAdditional) => paidAdditional.name)
                        .join(', ')
                    : 'Nenhum escolhido'}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  )
}

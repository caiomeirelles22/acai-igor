'use client'

import React, { useState } from 'react'
import { Header } from './Header'
import Form from 'next/form'
import * as RadioGroup from '@radix-ui/react-radio-group'
import acaiSizes from '@/moks/acaiSizes.json'
import { Cart } from '@/components/Cart'

interface AcaiInfosProps {
  size: string
  price: number
  id: string
}

const acaiInfos: AcaiInfosProps[] = acaiSizes

export default function Menu() {
  const [selectedSize, setSelectedSize] = useState<string | null>(null)

  return (
    <div>
      <Header />
      <div className="max-w-5xl w-screen mx-auto p-2 bg-white rounded-xl shadow-md space-y-2">
        <h2 className="text-xl font-semibold text-gray-900">
          Escolha o tamanho do seu Açaí
        </h2>
        <Form
          action="menu/adicionais"
          className="flex flex-col px-2 py-4 rounded-md gap-2 w-full bg-purple-50"
        >
          <RadioGroup.Root
            className="flex flex-col space-y-3 w-full"
            onValueChange={setSelectedSize}
          >
            {acaiInfos.map((acaiInfo) => (
              <RadioGroup.Item
                key={acaiInfo.id}
                value={acaiInfo.size}
                className="flex items-center justify-between p-4 border border-purple-300 rounded-lg cursor-pointer hover:border-purple-400 hover:bg-purple-100 bg-white"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-5 h-5 border border-gray-400 rounded-full flex items-center justify-center">
                    <RadioGroup.Indicator className="w-3 h-3 bg-purple-700 rounded-full" />
                  </div>
                  <span className="text-gray-900 font-medium">
                    {acaiInfo.size}
                  </span>
                </div>
                <span className="text-red-600 font-semibold">
                  R${acaiInfo.price.toFixed(2)}
                </span>
              </RadioGroup.Item>
            ))}
          </RadioGroup.Root>

          <input type="hidden" name="size" value={selectedSize || ''} />

          <button
            type="submit"
            className="w-full bg-purple-500 text-white py-3 px-2 rounded-lg font-semibold hover:bg-purple-600 transition text-sm hover:cursor-pointer"
            disabled={!selectedSize}
          >
            Avançar
          </button>

          <Cart />
        </Form>
      </div>
    </div>
  )
}

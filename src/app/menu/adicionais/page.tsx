'use client'

import React, { useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

import Form from 'next/form'
import freeAdditionalJson from '@/moks/freeAdditional.json'
import fruitsJson from '@/moks/fruits.json'
import paidAdditionalJson from '@/moks/paidAdditional.json'
import toppingsJson from '@/moks/toppings.json'
import businessRulesJson from '@/moks/businessRules.json'

import { CompletedAcai } from '@/types/acai'
import acaiSizes from '@/moks/acaiSizes.json'
import { BackButton } from '@/components/BackButton'
import { CheckboxComponent } from '@/components/Checkbox'
import { Button } from '@/components/Button'

type businessRulesProps = typeof businessRulesJson
const businessRules: businessRulesProps = businessRulesJson

type FreeAdditionalProps = typeof freeAdditionalJson

type PaidAdditionalProps = typeof paidAdditionalJson

type ToppingsProps = typeof toppingsJson

type FruitsProps = typeof fruitsJson

const freeAdditionalInfos: FreeAdditionalProps = freeAdditionalJson
const fruits: FruitsProps = fruitsJson

const paidAdditional: PaidAdditionalProps = paidAdditionalJson

const toppings: ToppingsProps = toppingsJson

function AdicionaisFormContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const size = searchParams.get('size') || 'Desconhecido'

  const [selectedToppings, setSelectedToppings] = useState<string[]>([])
  const [selectedFruit, setSelectedFruit] = useState<string | null>(null)
  const [selectedFreeAdditional, setSelectedFreeAdditional] = useState<
    string[]
  >([])
  const [selectedPaidAdditional, setSelectedPaidAdditional] = useState<
    string[]
  >([])

  const [isLoading, setIsLoading] = useState(false)

  const maxToppings = businessRules.maxToppings
  const maxFreeAdditional = businessRules.maxFreeAdditional

  function handleSelectedToppings(id: string) {
    setSelectedToppings((prev) => {
      if (prev.includes(id)) {
        return prev.filter((topping) => topping !== id)
      } else if (prev.length < maxToppings) {
        return [...prev, id]
      } else {
        return prev
      }
    })
  }

  function handleFruitSelection(id: string) {
    setSelectedFruit((prev) => (prev === id ? null : id))
  }

  function handleFreeAdditional(id: string) {
    setSelectedFreeAdditional((prev) => {
      if (prev.includes(id)) {
        return prev.filter((additional) => additional !== id)
      } else if (prev.length < maxFreeAdditional) {
        return [...prev, id]
      } else {
        return prev
      }
    })
  }

  function handlePaidAdditional(id: string) {
    setSelectedPaidAdditional((prev) =>
      prev.includes(id)
        ? prev.filter((additional) => additional !== id)
        : [...prev, id],
    )
  }

  const handleAddToCart = () => {
    setIsLoading(true)
    const selectedSize = acaiSizes.find((s) => s.size === size)
    const acaiItem: CompletedAcai = {
      size: {
        size,
        price: selectedSize ? selectedSize.price : 10,
        id: selectedSize ? selectedSize.id : '',
      },
      toppings: selectedToppings.map(
        (id) => toppings.find((topping) => topping.id === id)!,
      ),
      freeAdditionals: selectedFreeAdditional.map(
        (id) => freeAdditionalInfos.find((additional) => additional.id === id)!,
      ),
      fruit: fruits.find((fruit) => fruit.id === selectedFruit)!,
      paidAdditionals: selectedPaidAdditional.map(
        (id) =>
          paidAdditional.find((paidAdditional) => paidAdditional.id === id)!,
      ),
    }

    const storedAcaiList = JSON.parse(
      sessionStorage.getItem('acaiCart') || '[]',
    )

    storedAcaiList.push(acaiItem)

    sessionStorage.setItem('acaiCart', JSON.stringify(storedAcaiList))
    setIsLoading(false)

    router.push('/menu/')
  }

  const handleAdvance = () => {
    setIsLoading(true)
    const selectedSize = acaiSizes.find((s) => s.size === size)
    const acaiItem: CompletedAcai = {
      size: {
        size,
        price: selectedSize ? selectedSize.price : 10,
        id: selectedSize ? selectedSize.id : '',
      },
      toppings: selectedToppings.map(
        (id) => toppings.find((topping) => topping.id === id)!,
      ),
      freeAdditionals: selectedFreeAdditional.map(
        (id) => freeAdditionalInfos.find((additional) => additional.id === id)!,
      ),
      fruit: fruits.find((fruit) => fruit.id === selectedFruit)!,
      paidAdditionals: selectedPaidAdditional.map(
        (id) =>
          paidAdditional.find((paidAdditional) => paidAdditional.id === id)!,
      ),
    }

    const storedAcaiList = JSON.parse(
      sessionStorage.getItem('acaiCart') || '[]',
    )

    storedAcaiList.push(acaiItem)

    sessionStorage.setItem('acaiCart', JSON.stringify(storedAcaiList))
    setIsLoading(false)
  }

  return (
    <div className="max-w-2xl w-full mx-auto p-2 bg-white rounded-xl shadow-md space-y-2">
      <BackButton />

      <h2 className="text-xl font-semibold text-purple-700 text-center">
        Escolha seus adicionais
      </h2>
      <p className=" text-purple-500">
        Tamanho escolhido: <span className="font-bold">{size}</span>
      </p>

      <Form
        action="/menu/adicionais/endereco"
        className="flex flex-col p-2 bg-purple-50 rounded-md gap-2"
      >
        <div className="space-y-3 border-b-2 border-purple-600 pb-3 ">
          <div>
            <h3 className="text-lg font-bold text-purple-500">Coberturas</h3>
            <h4
              className={`text-sm font-semibold ${selectedToppings.length >= businessRules.maxToppings ? 'text-red-400' : 'text-purple-400'}`}
            >
              Máximo: {businessRules.maxToppings} itens
            </h4>
          </div>
          {toppings.map((topping, i) => (
            <CheckboxComponent
              id={topping.id}
              checked={selectedToppings.includes(topping.id)}
              key={i}
              label={topping.name}
              onCheckedChange={() => handleSelectedToppings(topping.id)}
            />
          ))}
        </div>

        <div className="space-y-3 border-b-2 border-purple-600 pb-3">
          <h3 className="text-lg font-bold text-purple-500">
            Escolha sua fruta
          </h3>
          {fruits.map((fruit, i) => (
            <CheckboxComponent
              checked={selectedFruit === fruit.id}
              onCheckedChange={() => handleFruitSelection(fruit.id)}
              label={fruit.name}
              id={fruit.id}
              key={i}
            />
          ))}
        </div>

        <div className="space-y-3 border-b-2 border-purple-600 pb-3">
          <div>
            <h3 className="text-lg font-bold text-purple-500">
              Adicionais Gratuitos
            </h3>
            <h4
              className={`text-sm font-semibold ${selectedFreeAdditional.length >= businessRules.maxFreeAdditional ? 'text-red-400' : 'text-purple-400'}`}
            >
              Máximo: {businessRules.maxFreeAdditional} itens
            </h4>
          </div>
          {freeAdditionalInfos.map((additional, i) => (
            <CheckboxComponent
              checked={selectedFreeAdditional.includes(additional.id)}
              onCheckedChange={() => handleFreeAdditional(additional.id)}
              id={additional.id}
              label={additional.name}
              key={i}
            />
          ))}
        </div>

        <div className="space-y-3 ">
          <h3 className="text-lg font-bold text-purple-500">
            Adicionais Pagos
          </h3>
          {paidAdditional.map((additional, i) => (
            <CheckboxComponent
              checked={selectedPaidAdditional.includes(additional.id)}
              onCheckedChange={() => handlePaidAdditional(additional.id)}
              id={additional.id}
              label={additional.name}
              key={i}
              price={additional.price}
            />
          ))}
        </div>

        <Button type="button" onClick={handleAddToCart}>
          Adicionar ao carrinho
        </button>
        <button
          type="submit"
          onClick={handleAdvance}
          className="w-full bg-green-500 text-purple-50 hover:bg-green-600 rounded-lg flex items-center py-3 px-2 justify-center gap-2"
        >
          Avançar para entrega
        </Button>
      </Form>
    </div>
  )
}

export default function AdicionaisForm() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AdicionaisFormContent />
    </Suspense>
  )
}

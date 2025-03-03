'use client'
import { useState, useEffect } from 'react'
import Form from 'next/form'
import { BackButton } from '@/components/BackButton'

type AcaiCartItem = {
  size: { size: string; price: number }
  paidAdditionals?: { name: string; price: string }[]
}

export default function PaymentForm() {
  const [paymentMethod, setPaymentMethod] = useState('')
  const [total, setTotal] = useState(0)
  const [needsChange, setNeedsChange] = useState(false)
  const [changeFor, setChangeFor] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    const cartData = sessionStorage.getItem('acaiCart')
    if (cartData) {
      const acaiCart: AcaiCartItem[] = JSON.parse(cartData)

      const totalPrice = acaiCart.reduce((acc, item) => {
        const sizePrice = item.size.price
        const additionalsPrice =
          item.paidAdditionals?.reduce(
            (sum, add) =>
              sum + parseFloat(add.price.replace('R$', '').replace(',', '.')),
            0,
          ) || 0

        return acc + sizePrice + additionalsPrice
      }, 0)

      setTotal(totalPrice)
    }
  }, [])

  // Função para formatar o valor no formato R$10,00
  const formatCurrency = (value: string) => {
    if (!value) return ''

    // Remove todos os caracteres que não são números
    value = value.replace(/\D/g, '')

    // Adiciona a formatação de moeda
    value = (Number(value) / 100).toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    })

    return value
  }

  const handleChangeForChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = formatCurrency(e.target.value)
    setChangeFor(formattedValue)

    // Verificar se o valor inserido para "Troco para" é maior que o total
    const numericValue = parseFloat(e.target.value.replace(/\D/g, '')) / 100
    if (numericValue < total) {
      setError(
        'O valor informado para o troco deve ser maior que o valor do produto.',
      )
    } else {
      setError('')
    }
  }

  return (
    <div className="max-w-2xl w-full mx-auto p-4 bg-white rounded-xl shadow-md space-y-2">
      <BackButton />
      <div>
        <h1>Meios de Pagamento</h1>
        <h2>Total: R$ {total.toFixed(2).replace('.', ',')}</h2>
      </div>

      <h2 className="text-xl font-semibold text-gray-900">
        Selecione o Meio de Pagamento
      </h2>

      <Form
        action="/menu/adicionais/endereco/pagamento/conferir"
        className="flex flex-col gap-2 p-3 flex-1 w-full"
      >
        <input type="hidden" name="paymentMethod" value={paymentMethod} />
        <input type="hidden" name="changeFor" value={changeFor} />

        <div>
          <label className="block text-gray-700 font-semibold">
            Escolha o Meio de Pagamento
          </label>
          <select
            value={paymentMethod}
            onChange={(e) => {
              setPaymentMethod(e.target.value)
              setNeedsChange(false)
              setChangeFor('')
              setError('')
            }}
            className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 outline-none"
            required
          >
            <option value="">Selecione...</option>
            <option value="Cartão de crédito">Cartão de Crédito</option>
            <option value="Cartão de débito">Cartão de Débito</option>
            <option value="pix">Pix</option>
            <option value="Dinheiro">Dinheiro</option>
          </select>
        </div>

        {paymentMethod === 'Dinheiro' && (
          <div>
            <label className="block text-gray-700 font-semibold">
              Precisa de troco?
            </label>
            <div className="mt-1">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="needsChange"
                  checked={!needsChange}
                  onChange={() => setNeedsChange(false)}
                  className="form-radio"
                />
                <span className="ml-2">Não</span>
              </label>
              <label className="inline-flex items-center ml-6">
                <input
                  type="radio"
                  name="needsChange"
                  checked={needsChange}
                  onChange={() => setNeedsChange(true)}
                  className="form-radio"
                />
                <span className="ml-2">Sim</span>
              </label>
            </div>

            {needsChange && (
              <div className="mt-2">
                <label className="block text-gray-700 font-semibold">
                  Troco para:
                </label>
                <input
                  type="tel"
                  value={changeFor}
                  onChange={handleChangeForChange}
                  className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 outline-none"
                  placeholder="R$0,00"
                  required
                />
                {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
              </div>
            )}
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-green-500 text-purple-50 hover:bg-green-600 rounded-lg flex items-center py-3 px-2 justify-center gap-2 font-bold"
        >
          Conferir Pedido
        </button>
      </Form>
    </div>
  )
}

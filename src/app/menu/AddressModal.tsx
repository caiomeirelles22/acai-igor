'use client'

import * as Dialog from '@radix-ui/react-dialog'

import { useEffect, useState } from 'react'
import { BiEdit } from 'react-icons/bi'
import { LuMapPin } from 'react-icons/lu'
export function AddresModal() {
  const [open, setOpen] = useState(false)

  const [name, setName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [cep, setCep] = useState('')
  const [address, setAddress] = useState({
    street: '',
    neighborhood: '',
    number: '',
    complement: '',
  })

  useEffect(() => {
    const savedData = localStorage.getItem('userAddress')
    if (savedData) {
      const parsedData = JSON.parse(savedData)
      setName(parsedData.name || '')
      setPhoneNumber(parsedData.phoneNumber || '')
      setCep(parsedData.cep || '')
      setAddress(
        parsedData.address || {
          street: '',
          neighborhood: '',
          number: '',
          complement: '',
        },
      )
    }
  }, [])
  const handleCepChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const newCep = e.target.value.replace(/\D/g, '') // Remove caracteres não numéricos
    setCep(newCep)

    if (newCep.length === 8) {
      try {
        const response = await fetch(`https://viacep.com.br/ws/${newCep}/json/`)
        const data = await response.json()

        if (!data.erro) {
          setAddress((prev) => ({
            ...prev,
            street: data.logradouro,
            neighborhood: data.bairro,
          }))
        }
      } catch (error) {
        console.error('Erro ao buscar CEP', error)
      }
    }
  }

  const handleStreetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddress({ ...address, street: e.target.value })
  }

  const handleNeighborhoodChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddress({ ...address, neighborhood: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = {
      name,
      phoneNumber,
      cep,
      address,
    }

    localStorage.setItem('userAddress', JSON.stringify(formData))
    setOpen(false)
  }

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger
        className="flex items-center py-2 bg-purple-100 w-full justify-center border border-solid border-purple-300 rounded-md gap-2 hover:bg-purple-200 text-sm"
        asChild
      >
        <button>
          {address.street && address.number ? (
            <>
              <p>{`${address.street}, ${address.number}`}</p>
              <BiEdit size={24} />
            </>
          ) : (
            <>
              <LuMapPin />
              <p>Selecione um endereço para entrega</p>
            </>
          )}
        </button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-50" />
        <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
          <Dialog.Title className="text-xl font-bold mb-4">
            Adicionar endereço de entrega
          </Dialog.Title>
          <Dialog.Description className="text-gray-600 mb-6">
            Informe os detalhes do seu endereço para entrega.
          </Dialog.Description>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold">Nome</label>
              <input
                required
                minLength={3}
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
                placeholder="Igor Donida"
              />
            </div>

            <label className="block text-gray-700 font-semibold">Celular</label>
            <input
              type="tel"
              required
              minLength={9}
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
              placeholder="22998021430"
              maxLength={11}
            />

            <div>
              <label className="block text-gray-700 font-semibold">CEP</label>
              <input
                type="text"
                required
                minLength={8}
                value={cep}
                onChange={handleCepChange}
                maxLength={8}
                className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
                placeholder="28030350"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold">Rua</label>
              <input
                type="text"
                required
                minLength={4}
                value={address.street}
                onChange={handleStreetChange}
                className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
                placeholder="Rua das flores"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold">
                Bairro
              </label>
              <input
                type="text"
                value={address.neighborhood}
                required
                minLength={4}
                onChange={handleNeighborhoodChange}
                className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
                placeholder="Bairro"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold">
                Número
              </label>
              <input
                type="text"
                required
                value={address.number}
                onChange={(e) =>
                  setAddress({ ...address, number: e.target.value })
                }
                className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
                placeholder="Número da residência"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold">
                Complemento
              </label>
              <input
                type="text"
                value={address.complement}
                onChange={(e) =>
                  setAddress({ ...address, complement: e.target.value })
                }
                className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
                placeholder="Apartamento, casa, bloco, etc."
              />
            </div>

            <div className="flex justify-end gap-4 mt-2">
              <Dialog.Close asChild>
                <button
                  type="button"
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
                >
                  Cancelar
                </button>
              </Dialog.Close>
              <button
                type="submit"
                className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
              >
                Salvar
              </button>
            </div>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

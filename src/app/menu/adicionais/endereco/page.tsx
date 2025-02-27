'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Form from 'next/form'
import acaiCartJson from '@/moks/acaiCart.json'
import { FaCartShopping } from 'react-icons/fa6'
import { BiEdit } from 'react-icons/bi'
import { BackButton } from '@/components/BackButton'

type AcaiCartProps = typeof acaiCartJson

export default function AddressForm() {
  const [acaiCart, setAcaiCart] = useState<AcaiCartProps>([])
  const router = useRouter()
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
    // Ensure this runs only on the client side
    if (typeof window !== 'undefined') {
      const savedCart = sessionStorage.getItem('acaiCart')
      if (savedCart) {
        setAcaiCart(JSON.parse(savedCart))
      }
    }
  }, [])

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

  const handleSaveAddress = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault() // Previne o comportamento padrão do botão dentro do formulário

    const userAddress = {
      name,
      phoneNumber,
      cep,
      address,
    }

    localStorage.setItem('userAddress', JSON.stringify(userAddress))

    router.push('/menu/adicionais/endereco/pagamento')
  }

  return (
    <div className="max-w-2xl w-full mx-auto p-2 bg-white rounded-xl shadow-md space-y-2">
      <BackButton />
      <div className="flex items-center gap-2 pr-2 p-4 text-purple-500 bg-purple-100 rounded-md">
        <p>
          Quantidade de açaís: <strong>{acaiCart.length}</strong>
        </p>
        <FaCartShopping />
        <BiEdit
          onClick={() => router.push('/menu/carrinho')}
          className="ml-auto cursor-pointer"
          size={24}
        />
      </div>

      <h2 className="text-xl font-semibold text-gray-900 text-center">
        Dados de Entrega
      </h2>

      <Form
        action="/menu/adicionais/endereco/pagamento"
        className="flex flex-col gap-2 p-3 flex-1 w-full bg-purple-50"
      >
        <input type="hidden" name="name" value={name} />
        <input type="hidden" name="phoneNumber" value={phoneNumber} />

        {/* Inputs hidden para o endereço */}
        <input type="hidden" name="street" value={address.street} />
        <input type="hidden" name="neighborhood" value={address.neighborhood} />
        <input type="hidden" name="number" value={address.number} />
        <input type="hidden" name="complement" value={address.complement} />

        <div>
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
          <label className="block text-gray-700 font-semibold">Bairro</label>
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
          <label className="block text-gray-700 font-semibold">Número</label>
          <input
            type="text"
            required
            value={address.number}
            onChange={(e) => setAddress({ ...address, number: e.target.value })}
            className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
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
            className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
            placeholder="Apartamento, casa, bloco, etc."
          />
        </div>

        <button
          className="w-full bg-green-500 text-purple-50 hover:bg-green-600 rounded-lg flex items-center py-3 px-2 justify-center gap-2 font-bold"
          onClick={handleSaveAddress}
        >
          Avançar para pagamento
        </button>
      </Form>
    </div>
  )
}

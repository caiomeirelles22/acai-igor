'use client'
import { useEffect, useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import acaiCartJson from '@/moks/acaiCart.json'
import userInfosJson from '@/moks/userInfos.json'
import { BackButton } from '@/components/BackButton'

type AcaiCartProps = typeof acaiCartJson
type UserInfosProps = typeof userInfosJson

function ReviewOrderContent() {
  const [acaiCart, setAcaiCart] = useState<AcaiCartProps>([])
  const [userInfos, setUserInfos] = useState<UserInfosProps | null>(null)

  const searchParams = useSearchParams()
  const paymentMethod = searchParams.get('paymentMethod')
  const changeFor = searchParams.get('changeFor')

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const sessionData = sessionStorage.getItem('acaiCart')
      const localData = localStorage.getItem('userAddress')

      if (sessionData) setAcaiCart(JSON.parse(sessionData))
      if (localData) setUserInfos(JSON.parse(localData))
    }
  }, [])

  const calculateTotal = () => {
    return acaiCart.reduce((total, order) => {
      const sizePrice = order.size.price
      const paidAdditionalsPrice =
        order.paidAdditionals?.reduce((sum, additional) => {
          return (
            sum +
            parseFloat(additional.price.replace('R$', '').replace(',', '.'))
          )
        }, 0) || 0
      return total + sizePrice + paidAdditionalsPrice
    }, 0)
  }

  const total = calculateTotal()

  const sendOrderToWhatsApp = () => {
    if (!userInfos || acaiCart.length === 0) return

    const orderText = acaiCart
      .map(
        (order, index) =>
          `Pedido ${index + 1}:\nAçaí ${order.size.size} - R$${order.size.price}\nFruta: ${order.fruit?.name || 'Nenhuma'}\nToppings: ${order.toppings?.map((t) => t.name).join(', ') || 'Nenhum'}\nAdicionais grátis: ${order.freeAdditionals?.map((a) => a.name).join(', ') || 'Nenhum'}\nAdicionais pagos: ${order.paidAdditionals?.length > 0 ? order.paidAdditionals.map((a) => `${a.name} (${a.price})`).join(', ') : 'Nenhum'}`,
      )
      .join('\n\n')

    const deliveryInfo = `\n\n*Dados para entrega:*\nNome: ${userInfos.name}\nTelefone: ${userInfos.phoneNumber}\nEndereço: ${userInfos.address.street}, ${userInfos.address.number}\nBairro: ${userInfos.address.neighborhood}\nComplemento: ${userInfos.address.complement || 'Nenhum'}\nCEP: ${userInfos.cep}`

    const paymentInfo = paymentMethod
      ? `\n\n*Método de Pagamento:* ${paymentMethod}`
      : ''

    const changeInfo = changeFor ? `\n\n*Troco para:* ${changeFor}` : ''

    const message = encodeURIComponent(
      `Olá, gostaria de fazer um pedido:\n\n${orderText}${deliveryInfo}${paymentInfo}${changeInfo}\n\n*Total: R$ ${total.toFixed(2)}*`,
    )
    const whatsappUrl = `https://wa.me/5522998021430?text=${message}`
    window.open(whatsappUrl, '_blank')
  }

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white shadow-md rounded-lg space-y-2">
      <BackButton />
      <h2 className="text-xl font-bold mb-4">Confira seu Pedido</h2>

      {acaiCart.length > 0 ? (
        acaiCart.map((order, index) => (
          <div key={index} className="border p-4 mb-4 rounded-md">
            <h3 className="font-bold">Pedido {index + 1}</h3>
            <p>
              Açaí {order.size.size} - R${order.size.price}
            </p>
            <p>Fruta: {order.fruit?.name || 'Nenhuma'}</p>
            <p>
              Toppings:{' '}
              {order.toppings?.map((t) => t.name).join(', ') || 'Nenhum'}
            </p>
            <p>
              Adicionais grátis:{' '}
              {order.freeAdditionals?.map((a) => a.name).join(', ') || 'Nenhum'}
            </p>
            <p>
              Adicionais pagos:{' '}
              {order.paidAdditionals
                ?.map((a) => `${a.name} (${a.price})`)
                .join(', ') || 'Nenhum'}
            </p>
          </div>
        ))
      ) : (
        <p>Você ainda não fez nenhum pedido.</p>
      )}

      {userInfos && (
        <div>
          <p>
            <strong>Dados para entrega:</strong>
          </p>
          <p>{userInfos.name}</p>
          <p>{userInfos.phoneNumber}</p>
          <p>
            {userInfos.address.street}, {userInfos.address.number} -{' '}
            {userInfos.address.neighborhood}
          </p>
          <p>{userInfos.address.complement}</p>
          <p>{userInfos.cep}</p>
        </div>
      )}

      <div>
        <p>
          <strong>Total: R$ {total.toFixed(2)}</strong>
        </p>
        <p>
          <strong>Troco para: {changeFor}</strong>
        </p>
        <button
          onClick={sendOrderToWhatsApp}
          className="w-full bg-green-500 text-white rounded-lg py-2 mt-4"
        >
          Confirmar e Enviar para o WhatsApp
        </button>
      </div>
    </div>
  )
}

export default function ReviewOrderPage() {
  return (
    <Suspense fallback={<p>Carregando...</p>}>
      <ReviewOrderContent />
    </Suspense>
  )
}

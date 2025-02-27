import { EmptyCart } from './EmptyCart'
import { CartItems } from './CartItems'
import { ActionsButtons } from './ActionsButtons'
import { BackButton } from '@/components/BackButton'
import { FaCartShopping } from 'react-icons/fa6'

export default function CarrinhoPage() {
  return (
    <div className="p-4 bg-white flex flex-col gap-4 w-full max-w-2xl">
      <BackButton />
      <div className="flex items-center gap-2 text-purple-600 bg-white px-4 py-2 rounded-md w-full ">
        <FaCartShopping className="size-6" />
        <h1 className="flex items-center font-bold gap-2 text-2xl ">
          Seu Carrinho
        </h1>
      </div>
      <EmptyCart />
      <CartItems />
      <ActionsButtons />
    </div>
  )
}

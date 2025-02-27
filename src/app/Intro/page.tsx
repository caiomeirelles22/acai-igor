import { Avatar } from '@/components/Avatar'
import { PiIceCream } from 'react-icons/pi'

export default function Intro() {
  return (
    <div className="w-full max-w-md p-6 space-y-6 rounded-lg bg-white/95 backdrop-blur-sm shadow-xl border-purple-200 flex flex-col items-center justify-center">
      <Avatar />
      <h1 className="text-3xl font-bold text-purple-900 text-center">
        Casa do Açaí
      </h1>
      <div className="flex items-center gap-2 text-green-600 text-sm font-medium">
        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
        Aberta
      </div>
      <div className="flex items-center gap-2 text-purple-700">
        <PiIceCream className="w-5 h-5" />
        <span className="font-medium">Sorvetes & açaí</span>
      </div>
      <p className="text-center text-gray-600 text-sm px-4">
        CASA DO AÇAÍ - DELIVERY / FAÇA SEU PEDIDO E CONSULTE SEU BAIRRO PARA
        ENTREGA
      </p>
      <a
        href="menu"
        className="w-full flex items-center justify-center hover:cursor-pointer bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-md text-lg font-medium transition-all duration-300 hover:scale-[1.02] shadow-lg"
      >
        Ver Cardápio
      </a>
      <span className="text-center text-sm text-gray-600">
        Deliciosas opções de açaí e sorvetes esperando por você!
      </span>
    </div>
  )
}

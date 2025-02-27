import { Avatar } from '@/components/Avatar'
import { ChipOpenOrClose } from '@/components/ChipOpenOrClose'
// import { CiForkAndKnife } from 'react-icons/ci'
import { AddresModal } from './AddressModal'

export function Header() {
  return (
    <div className="flex flex-col gap-4 mb-6 mt-4 px-3 bg-white py-2">
      <div className="flex gap-4 items-center mb-4">
        <div className="relative w-fit">
          <Avatar />
          <ChipOpenOrClose isOpen={true} />
        </div>
        <div className="flex flex-col gap-1">
          <h1 className="text-xl font-bold">Açaí do Igor</h1>
          <p className="text-sm text-muted-foreground flex items-center gap-2">
            🍨 Sorvetes & açaí
          </p>
        </div>
      </div>
      <AddresModal />
    </div>
  )
}

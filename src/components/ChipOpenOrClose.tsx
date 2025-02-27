interface ChipOpenOrCloseProps {
  isOpen: boolean
}

export function ChipOpenOrClose({ isOpen }: ChipOpenOrCloseProps) {
  const statusClasses = isOpen
    ? 'border-green-500 bg-green-400 '
    : 'border-red-400  bg-red-400'

  return (
    <div
      className={`flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold text-white border border-solid p-1 absolute -top-2 -right-2 ${statusClasses} `}
    >
      <span className={statusClasses}>{isOpen ? 'Aberto' : 'Fechado'}</span>
    </div>
  )
}

import { ReactNode } from 'react'

interface ButtonProps {
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  variant?: 'primary' | 'success'
  children: ReactNode
  onClick?: () => void
}

export function Button({
  type = 'button',
  disabled = false,
  variant = 'primary',
  children,
  onClick,
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`w-full rounded-lg flex items-center py-3 px-2 justify-center gap-2 font-semibold transition text-sm 
        ${variant === 'success' ? 'bg-green-500 text-purple-50 hover:bg-green-600' : 'bg-purple-500 text-white hover:bg-purple-600'} 
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:cursor-pointer'}`}
      disabled={disabled}
    >
      {children}
    </button>
  )
}

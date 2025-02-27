import { ReactNode } from 'react'

interface LinkButtonProps {
  link: string
  children: ReactNode
  blank?: boolean
}

export function LinkButton({ link, blank, children }: LinkButtonProps) {
  return (
    <a
      href={link}
      target={blank ? '_blank' : ''}
      // target="_blank"
      className="w-full bg-white bg-opacity-20 hover:bg-opacity-30 text-white font-semibold py-3 px-4 rounded-lg transition duration-300 ease-in-out flex items-center justify-center gap-2"
    >
      {children}
    </a>
  )
}

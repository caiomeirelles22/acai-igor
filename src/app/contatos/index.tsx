import { Avatar } from '@/components/Avatar'
import React from 'react'
import { LinkButton } from './LinkButton'
import {
  FaFacebook,
  FaGlobe,
  FaInstagram,
  FaPhoneAlt,
  FaWhatsapp,
} from 'react-icons/fa'

export function Contatos() {
  return (
    <main className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-b from-purple-600 to-indigo-900 p-2">
      <div className="w-full max-w-md flex items-center justify-center flex-col gap-4">
        <div className="flex flex-col items-center justify-center gap-2">
          <Avatar />
          <h1 className="text-2xl font-bold text-white mb-2">Açai do Igor</h1>
          <p className="text-sm text-gray-200 text-center">
            Descubra o mundo delicioso e nutritivo do açaí!
          </p>
        </div>
        <div className="w-full flex flex-col gap-2">
          <LinkButton link="https://www.netvasco.com.br" blank>
            <FaFacebook />
            <p>Facebook</p>
          </LinkButton>
          <LinkButton link="https://www.netvasco.com.br" blank>
            <FaInstagram />
            <p>Instagram</p>
          </LinkButton>
          <LinkButton link="Intro">
            <FaGlobe />
            <p>Monte seu pedido</p>
          </LinkButton>
          <LinkButton link="https://www.netvasco.com.br" blank>
            <FaWhatsapp />
            <p>Whatsapp</p>
          </LinkButton>
          <LinkButton link="https://www.netvasco.com.br" blank>
            <FaPhoneAlt />
            <p>Ligação</p>
          </LinkButton>
        </div>
      </div>
    </main>
  )
}

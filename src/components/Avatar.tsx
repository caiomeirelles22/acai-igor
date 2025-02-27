import * as React from 'react'

import * as RadixAvatar from '@radix-ui/react-avatar'

export function Avatar() {
  return (
    <RadixAvatar.Root className="inline-flex size-16 select-none items-center justify-center overflow-hidden rounded-full bg-black/5 align-middle border-purple-200">
      <RadixAvatar.Image
        className="size-full rounded-[inherit] object-cover"
        src="https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=80"
        alt="Colm Tuite"
      />
      <RadixAvatar.Fallback
        className="leading-1 flex size-full items-center justify-center bg-white text-[15px] font-medium text-violet11"
        delayMs={600}
      >
        CT
      </RadixAvatar.Fallback>
    </RadixAvatar.Root>
  )
}

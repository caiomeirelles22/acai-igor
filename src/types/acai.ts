interface Size {
  size: string
  price: number
  id: string
}

interface FreeAdditional {
  name: string
  id: string
}

interface Fruit {
  name: string
  id: string
}

interface PaidAdditional {
  name: string
  price: string
  id: string
}

interface Toppings {
  name: string
  id: string
}

export interface CompletedAcai {
  size: Size
  freeAdditionals: FreeAdditional[]
  fruit: Fruit
  paidAdditionals: PaidAdditional[]
  toppings: Toppings[]
}

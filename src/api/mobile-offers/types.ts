export type MobileOffer = {
  active: boolean
  id: string
  description: string
  description_parts: string[]
  amount: number
  name: string
  metadata: {
    colored: string
  }
  colored_parts: string[]
  marketing_features: {
    name: string
  }[]
  default_price: {
    id: string
    active: boolean
    unit_amount: number
  }
}

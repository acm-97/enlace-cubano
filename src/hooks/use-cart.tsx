import {create} from 'zustand'

import {createSelectors} from '@/core'

interface CartState {
  items: any[]
  total: number
  totals: {
    // totalPrice: number
    // totalDiscount: number
    totalEstimated: number
    totalCountSelected: number
  }
  hasUpadtes: boolean
  setHasUpdates: (hasUpadtes: boolean) => void
  setItems: (items: any) => void
  setItem: (item: any) => void
  addItem: (ietm: any) => void
  removeItem: (id: any) => void
  setTotal: (items: any[]) => void
  resetItems: () => void
  calculateTotals: (items: any[]) => void
}

const initialTotals = {
  totalPrice: 0,
  totalDiscount: 0,
  totalEstimated: 0,
  totalCountSelected: 0,
}

const _useCart = create<CartState>((set, get) => ({
  items: [],
  total: 0,
  totals: initialTotals,
  hasUpadtes: false,
  setHasUpdates: (hasUpadtes: boolean) => set({hasUpadtes}),
  setItems: items => {
    set({items})
    get().setTotal(items)
    get().calculateTotals(items)
  },
  setItem: item => {
    const _items = get().items
    let currentItem = _items.find(f => f.id === item.id)
    currentItem = item
    set({items: _items})
    get().setTotal(_items)
    get().calculateTotals(_items)
  },
  addItem: item => {
    let _items = get().items
    _items = [..._items, item]
    set({items: _items})
    get().setTotal(_items)
    get().calculateTotals(_items)
  },
  removeItem: idx => {
    const _items = [...get().items]
    _items.splice(idx, 1)
    set({items: _items})
    get().setTotal(_items)
    get().calculateTotals(_items)
  },
  resetItems: () => {
    get().setItems([])
    get().setTotal([])
  },
  setTotal: items => {
    // if (items.length > 0) {
    //   const total = items.reduce((acc, curr) => acc + Number(curr.count), 0)
    //   set({total})
    // } else set({ total: 0 })
    set({total: items.length})
  },
  calculateTotals: items => {
    if (items.length === 0) {
      set({totals: initialTotals})
    } else {
      // const totalPrice = items.reduce(
      //   (acc, curr) => acc + Number(curr.originalPrice) * Number(curr.count),
      //   0,
      // )
      // const totalDiscount = items.reduce(
      //   (acc, curr) =>
      //     acc + (Number(curr.originalPrice) - Number(curr.originalOffer)) * Number(curr.count),
      //   0,
      // )
      // const totalEstimated = items.reduce(
      //   (acc, curr) => acc + Number(curr.originalOffer) * Number(curr.count),
      //   0,
      // )
      const totalEstimated = items.reduce((acc, curr) => acc + Number(curr.amount), 0)
      const totalCountSelected = items.length
      set({
        totals: {
          // @ts-ignore
          // totalPrice: totalPrice.toFixed(2),
          // @ts-ignore
          // totalDiscount: totalDiscount.toFixed(2),
          // @ts-ignore
          totalEstimated: totalEstimated.toFixed(2),
          totalCountSelected,
        },
      })
    }
  },
}))

export const useCart = createSelectors(_useCart)
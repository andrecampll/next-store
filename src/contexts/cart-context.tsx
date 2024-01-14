'use client'

import { createContext, useCallback, useContext, useState } from 'react'

type CartItem = {
  productId: number
  quantity: number
}

type CartContextType = {
  items: CartItem[]
  addToCart: (productId: number) => void
}

const CartContext = createContext({} as CartContextType)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])

  const addToCart = useCallback(
    (productId: number) =>
      setItems((state) => {
        const productInCart = state.some((item) => item.productId === productId)

        if (productInCart) {
          return state.map((item) => {
            if (item.productId === productId) {
              return { ...item, quantity: item.quantity + 1 }
            } else {
              return item
            }
          })
        } else {
          return [...state, { productId, quantity: 1 }]
        }
      }),
    [],
  )

  return (
    <CartContext.Provider value={{ items, addToCart }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)

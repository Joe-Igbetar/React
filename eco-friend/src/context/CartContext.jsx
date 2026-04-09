import { createContext, useEffect, useState } from "react";

export const CartContext = createContext();

function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem("ecoCart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem("ecoCart", JSON.stringify(cartItems));
  }, [cartItems]);

  const clearCart = () => {
    setCartItems([]);
  }

  return (
    <CartContext.Provider value={{ cartItems, setCartItems, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

export default CartProvider;
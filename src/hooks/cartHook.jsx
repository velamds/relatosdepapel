import { useEffect, useState, useRef } from "react";

const CART_KEY = "cart_relatos";

export default function useCart() {
  const [cart, setCart] = useState([]);
  const isInitialMount = useRef(true);
  //UseRef Persiste entre renderizados, Usualmente se utiliza para validar el primer render
  //UseRef tiene un valor .current

  useEffect(() => {
    const storedCart = localStorage.getItem(CART_KEY);
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }, [cart]);

  const addToCart = (book) => {
    const currentCart = [...cart];
    const existing = currentCart.find((item) => item.id === book.id);
    let updatedCart;

    if (existing) {
      updatedCart = currentCart.map((item) =>
        item.id === book.id
          ? { ...item, cantidad: item.cantidad + 1 }
          : item
      );
    } else {
      updatedCart = [...currentCart, { ...book, cantidad: 1 }];
    }
    setCart(updatedCart);
  }

  const clearCart = () => {
    localStorage.removeItem(CART_KEY);
    setCart([]);
  };

  const removeFromCart = (bookId) => {
    setCart((prev) => prev.filter((item) => item.id !== bookId));;
  };

  return { cart, addToCart, clearCart, removeFromCart };
}
import { createContext, useContext, useEffect, useState } from "react";
import API from "../services/api";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartCount, setCartCount] = useState(0);

  const fetchCartCount = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setCartCount(0);
      return;
    }

    try {
      const { data } = await API.get("/cart", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const total = data.cart.reduce(
        (sum, item) => sum + item.quantity,
        0
      );

      setCartCount(total);

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCartCount();
  }, []);

  return (
    <CartContext.Provider
      value={{
        cartCount,
        fetchCartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
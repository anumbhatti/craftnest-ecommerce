import { createContext, useContext, useEffect, useState } from "react";
import API from "../services/api";

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlistCount, setWishlistCount] = useState(0);

  const fetchWishlistCount = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setWishlistCount(0);
      return;
    }

    try {
      const { data } = await API.get("/wishlist", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setWishlistCount(data.count);

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchWishlistCount();
  }, []);

  return (
    <WishlistContext.Provider
      value={{
        wishlistCount,
        fetchWishlistCount,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);
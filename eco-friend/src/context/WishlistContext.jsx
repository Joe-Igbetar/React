import { createContext, useEffect, useState } from "react";

export const WishlistContext = createContext();

function WishlistProvider({ children }) {
  const [currentUserId, setCurrentUserId] = useState(() => {
    const currentUser = JSON.parse(localStorage.getItem("ecoCurrentUser"));
    return currentUser?.id || null;
  });

  const [wishlistItems, setWishlistItems] = useState([]);

  function syncWishlistUser() {
    const currentUser = JSON.parse(localStorage.getItem("ecoCurrentUser"));
    const userId = currentUser?.id || null;

    setCurrentUserId(userId);

    if (!userId) {
      setWishlistItems([]);
      return;
    }

    const savedWishlist = localStorage.getItem(`ecoWishlist_${userId}`);
    setWishlistItems(savedWishlist ? JSON.parse(savedWishlist) : []);
  }

  useEffect(() => {
    syncWishlistUser();
  }, []);

  useEffect(() => {
    window.addEventListener("focus", syncWishlistUser);
    window.addEventListener("storage", syncWishlistUser);
    window.addEventListener("eco-auth-changed", syncWishlistUser);

    return () => {
      window.removeEventListener("focus", syncWishlistUser);
      window.removeEventListener("storage", syncWishlistUser);
      window.removeEventListener("eco-auth-changed", syncWishlistUser);
    };
  }, []);

  useEffect(() => {
    if (!currentUserId) return;

    localStorage.setItem(
      `ecoWishlist_${currentUserId}`,
      JSON.stringify(wishlistItems)
    );
  }, [wishlistItems, currentUserId]);

  function addToWishlist(product) {
    if (!currentUserId) return;

    setWishlistItems((prev) => {
      const exists = prev.some((item) => item.id === product.id);
      if (exists) return prev;
      return [...prev, product];
    });
  }

  function removeFromWishlist(productId) {
    if (!currentUserId) return;

    setWishlistItems((prev) => prev.filter((item) => item.id !== productId));
  }

  function isInWishlist(productId) {
    return wishlistItems.some((item) => item.id === productId);
  }

  function clearWishlist() {
    setWishlistItems([]);
  }

  return (
    <WishlistContext.Provider
      value={{
        wishlistItems,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
        clearWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export default WishlistProvider;
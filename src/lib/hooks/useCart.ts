"use client";

import { useState, useEffect } from 'react';

export type CartItem = {
  id: number;
  name: string;
  srcUrl: string;
  price: number;
  color?: { name: string; code: string };
  size?: string;
  quantity: number;
  addedAt: string;
};

export type Cart = {
  items: CartItem[];
  totalQuantities: number;
  totalPrice: number;
};

const CART_STORAGE_KEY = 'cart';

const getInitialCart = (): Cart => ({
  items: [],
  totalQuantities: 0,
  totalPrice: 0
});

export const useCart = () => {
  const [cart, setCart] = useState<Cart>(getInitialCart());
  const [isLoading, setIsLoading] = useState(true);
  const [isClient, setIsClient] = useState(false);

  // Vérifier si nous sommes côté client
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Charger le panier depuis localStorage
  useEffect(() => {
    if (!isClient) return;

    try {
      const savedCart = localStorage.getItem(CART_STORAGE_KEY);
      if (savedCart) {
        const parsedCart = JSON.parse(savedCart);
        // Valider la structure du panier
        if (parsedCart && typeof parsedCart === 'object' && Array.isArray(parsedCart.items)) {
          setCart(parsedCart);
        } else {
          // Réinitialiser si la structure est invalide
          localStorage.removeItem(CART_STORAGE_KEY);
        }
      }
    } catch (error) {
      console.warn('Error loading cart from localStorage:', error);
      localStorage.removeItem(CART_STORAGE_KEY);
    } finally {
      setIsLoading(false);
    }
  }, [isClient]);

  // Sauvegarder le panier dans localStorage
  const saveCart = (newCart: Cart) => {
    if (!isClient) return;

    try {
      // Vérifier que l'objet est sérialisable
      const serialized = JSON.stringify(newCart);
      localStorage.setItem(CART_STORAGE_KEY, serialized);
      setCart(newCart);
    } catch (error) {
      console.error('Error saving cart to localStorage:', error);
      // En cas d'erreur, réinitialiser le panier
      const emptyCart = getInitialCart();
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(emptyCart));
      setCart(emptyCart);
    }
  };

  // Ajouter un article au panier
  const addToCart = (item: Omit<CartItem, 'addedAt'>) => {
    if (!isClient) return;

    try {
      const newItem: CartItem = {
        ...item,
        addedAt: new Date().toISOString()
      };

      const existingItemIndex = cart.items.findIndex(
        (cartItem) =>
          cartItem.id === newItem.id &&
          cartItem.color?.name === newItem.color?.name &&
          cartItem.size === newItem.size
      );

      let newCart: Cart;

      if (existingItemIndex >= 0) {
        // Mettre à jour la quantité de l'article existant
        const updatedItems = [...cart.items];
        updatedItems[existingItemIndex].quantity += newItem.quantity;
        
        newCart = {
          items: updatedItems,
          totalQuantities: updatedItems.reduce((sum, item) => sum + item.quantity, 0),
          totalPrice: updatedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
        };
      } else {
        // Ajouter un nouvel article
        const newItems = [...cart.items, newItem];
        newCart = {
          items: newItems,
          totalQuantities: newItems.reduce((sum, item) => sum + item.quantity, 0),
          totalPrice: newItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
        };
      }

      saveCart(newCart);
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  // Mettre à jour la quantité d'un article
  const updateQuantity = (itemId: number, newQuantity: number) => {
    if (!isClient || newQuantity < 1) return;

    try {
      const updatedItems = cart.items.map(item =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      );

      const newCart: Cart = {
        items: updatedItems,
        totalQuantities: updatedItems.reduce((sum, item) => sum + item.quantity, 0),
        totalPrice: updatedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
      };

      saveCart(newCart);
    } catch (error) {
      console.error('Error updating quantity:', error);
    }
  };

  // Supprimer un article du panier
  const removeFromCart = (itemId: number) => {
    if (!isClient) return;

    try {
      const updatedItems = cart.items.filter(item => item.id !== itemId);
      
      const newCart: Cart = {
        items: updatedItems,
        totalQuantities: updatedItems.reduce((sum, item) => sum + item.quantity, 0),
        totalPrice: updatedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
      };

      saveCart(newCart);
    } catch (error) {
      console.error('Error removing from cart:', error);
    }
  };

  // Vider le panier
  const clearCart = () => {
    if (!isClient) return;

    try {
      const emptyCart = getInitialCart();
      saveCart(emptyCart);
    } catch (error) {
      console.error('Error clearing cart:', error);
    }
  };

  return {
    cart: isClient ? cart : getInitialCart(),
    isLoading: !isClient || isLoading,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart
  };
}; 
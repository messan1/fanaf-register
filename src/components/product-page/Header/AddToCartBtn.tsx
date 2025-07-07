"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { FaShoppingCart } from "react-icons/fa";
import { useCart } from "@/lib/hooks/useCart";
import { usePreferences } from "@/lib/hooks/usePreferences";

type AddToCartBtnProps = {
  product: {
    id: number;
    name: string;
    price: number;
    srcUrl: string;
  };
  quantity?: number;
};

const AddToCartBtn = ({ product, quantity = 1 }: AddToCartBtnProps) => {
  const [isAdding, setIsAdding] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const { addToCart } = useCart();
  const { selectedColor, selectedSize } = usePreferences();

  const handleAddToCart = () => {
    setIsAdding(true);
    
    // Simuler un délai d'ajout
    setTimeout(() => {
      try {
        addToCart({
          id: product.id,
          name: product.name,
          price: product.price,
          srcUrl: product.srcUrl,
          color: selectedColor,
          size: selectedSize,
          quantity: quantity
        });
        
        setIsAdded(true);
        setIsAdding(false);
        
        // Réinitialiser après 2 secondes
        setTimeout(() => setIsAdded(false), 2000);
        
      } catch (error) {
        console.error('Error adding to cart:', error);
        setIsAdding(false);
      }
    }, 500);
  };

  return (
    <Button
      onClick={handleAddToCart}
      disabled={isAdding}
      className="w-full bg-black text-white hover:bg-gray-800 transition-colors"
    >
      {isAdding ? (
        "Ajout en cours..."
      ) : isAdded ? (
        "Ajouté au panier !"
      ) : (
        <>
          <FaShoppingCart className="mr-2" />
          Ajouter au panier
        </>
      )}
    </Button>
  );
};

export default AddToCartBtn;

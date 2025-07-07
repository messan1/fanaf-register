"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { FaTrash, FaMinus, FaPlus } from "react-icons/fa6";
import { cn } from "@/lib/utils";
import { useCart, CartItem } from "@/lib/hooks/useCart";

type ProductCardProps = {
  item: CartItem;
};

const ProductCard = ({ item }: ProductCardProps) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const { updateQuantity, removeFromCart } = useCart();

  const handleQuantityChange = async (newQuantity: number) => {
    if (newQuantity < 1) return;
    
    setIsUpdating(true);
    try {
      updateQuantity(item.id, newQuantity);
    } catch (error) {
      console.error('Error updating quantity:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleRemove = async () => {
    setIsUpdating(true);
    try {
      removeFromCart(item.id);
    } catch (error) {
      console.error('Error removing item:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="flex items-center gap-4 p-4 border rounded-lg">
      <div className="relative w-20 h-20 flex-shrink-0">
        <Image
          src={item.srcUrl}
          alt={item.name}
          fill
          className="object-cover rounded-md"
        />
      </div>
      
      <div className="flex-1 min-w-0">
        <h3 className="font-medium text-sm truncate">{item.name}</h3>
        <p className="text-gray-600 text-sm">
          {item.color && <span>Couleur: {item.color.name}</span>}
          {item.size && <span className="ml-2">Taille: {item.size}</span>}
        </p>
        <p className="font-medium text-sm mt-1">{item.price.toFixed(2)} €</p>
      </div>
      
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleQuantityChange(item.quantity - 1)}
          disabled={isUpdating || item.quantity <= 1}
          className="w-8 h-8 p-0"
        >
          <FaMinus className="w-3 h-3" />
        </Button>
        
        <span className="w-8 text-center text-sm font-medium">
          {item.quantity}
        </span>
        
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleQuantityChange(item.quantity + 1)}
          disabled={isUpdating}
          className="w-8 h-8 p-0"
        >
          <FaPlus className="w-3 h-3" />
        </Button>
      </div>
      
      <Button
        variant="ghost"
        size="sm"
        onClick={handleRemove}
        disabled={isUpdating}
        className="text-red-500 hover:text-red-700 hover:bg-red-50"
      >
        <FaTrash className="w-4 h-4" />
      </Button>
    </div>
  );
};

export default ProductCard;

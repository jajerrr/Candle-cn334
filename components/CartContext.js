import React, { createContext, useState } from 'react';

// สร้าง Context
export const CartContext = createContext();

// สร้าง Provider Component
export const CartProvider = ({ children }) => {
  // สร้าง state สำหรับเก็บข้อมูลสินค้าในตะกร้า
  const [cartItems, setCartItems] = useState([{}]);

  // ฟังก์ชันสำหรับอัพเดตจำนวนสินค้าในตะกร้า
  const updateQuantity = (index, newQuantity) => {
    // ทำการคัดลอกข้อมูลสินค้าในตะกร้า
    const updatedItems = [...cartItems];
    // อัพเดตจำนวนสินค้าในตะกร้าตาม index ที่กำหนด
    updatedItems[index].quantity = newQuantity;
    // อัพเดต state ของตะกร้า
    setCartItems(updatedItems);
  };

  // สร้าง value สำหรับ Context
  const value = {
    cartItems,
    updateQuantity,
    setCartItems,
  }; 

  // ส่งค่า value เข้าไปยัง Provider
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router'; 
import Navbar from "@/components/Navbar"; 
import Footer from "@/components/Footer"; 
import Head from "next/head"; 
import styles from '../styles/cart.module.css';




const CartPage = () => {
  const router = useRouter();
  const { items } = router.query;
  const initialProductItems = items ? JSON.parse(items) : [];

  const [cartItems, setCartItems] = useState(initialProductItems);
  const [quantities, setQuantities] = useState(initialProductItems.map(() => 1));
  const [subtotal, setSubtotal] = useState(0);

  const calculateSubtotal = () => {
      return cartItems.reduce((total, item, index) => {
          return total + item.price * quantities[index];
      }, 0);
  };

  const updateQuantity = (index, newQuantity) => {
      if (newQuantity <= 0) {
          return;
      }
      const updatedQuantities = [...quantities];
      updatedQuantities[index] = newQuantity;
      setQuantities(updatedQuantities);
  };

  const removeItem = (index) => {
      const updatedCartItems = [...cartItems];
      updatedCartItems.splice(index, 1);
      setCartItems(updatedCartItems);

      const updatedQuantities = [...quantities];
      updatedQuantities.splice(index, 1);
      setQuantities(updatedQuantities);
  };

  useEffect(() => {
      setSubtotal(calculateSubtotal());
  }, [cartItems, quantities]);

  const handleCheckout = () => {
      const cartData = cartItems.map((item, index) => ({
          productImg: item.image,
          productName: item.name,
          productQuantity: quantities[index],
          productPrice: item.price.toFixed(2),
      }));

      const query = {
          products: JSON.stringify(cartData),
          total: subtotal.toFixed(2),
      };

      // Navigate to the shipping page with cart data and total
      router.push({ pathname: '/shipping', query: query });
  };


return ( 

<> 

<Head> 

<title>Cart</title> 

</Head> 

<Navbar /> 

 

<div className={`${styles.container} mx-auto mt-10 px-4 md:px-0`}> 

<div className={styles.flexContainer}> 

<div className={styles.productListContainer}> 

<div className={styles.header}> 

<h1 className={styles.title}>Your cart items</h1> 

<a href="/productTest"> 

<h3 className={styles.back}>Back to shopping</h3> 

</a> 

</div> 

 

<div className={styles.productTable}> 

<table className={styles.table}> 

<thead> 

<tr className={styles.headTable}> 

<th className={styles.headProduct}>Product</th> 

<th className={styles.headPrice}>Price</th> 

<th className={styles.headQuantity}>Quantity</th> 

<th className={styles.headTotal}>Total</th> 

</tr> 

</thead> 

<tbody> 

{cartItems.map((item, index) => ( 

<tr key={index}> 

<td className={styles.product}> 

<div className={styles.productInfo}> 

<img src={item.image} className={styles.productImage} alt={item.name} /> 

<div className={styles.productDetails}> 

<h2 className={styles.productName}>{item.name}</h2> 

<a> 

<h3 className={styles.removeProduct} onClick={() => removeItem(index)}>Remove</h3> 

</a> 

</div> 

</div> 

</td> 

<td className={styles.priceValue}>THB {item.price.toFixed(2)}</td> 

<td> 

<div className={styles.quantity}> 

<button className={styles.quantityButtonMinus} onClick={() => updateQuantity(index, quantities[index] - 1)}>-</button> 

<span className={styles.quantityValue}>{quantities[index]}</span> 

<button className={styles.quantityButtonPlus} onClick={() => updateQuantity(index, quantities[index] + 1)}>+</button> 

</div> 

</td> 

<td className={styles.totalValue}>THB {(item.price * quantities[index]).toFixed(2)}</td> 

</tr> 

))} 

</tbody> 

</table> 

</div> 

</div> 

 

<div className={styles.summaryContainer}> 

<div className={styles.summaryBox}> 

<div className={styles.sammaryPrice}> 

<h4> 

<span className={styles.summaryLabel}>Total</span> 

<span className={styles.summaryValue}>THB {subtotal.toFixed(2)}</span> 

</h4> 

</div> 

<button className={styles.checkoutButton} onClick={handleCheckout}>Check Out</button> 

</div> 

</div> 

</div> 

</div> 

 

<Footer /> 

</> 

); 

}; 

 

export default CartPage; 
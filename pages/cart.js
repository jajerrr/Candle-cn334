import { useState, useEffect } from 'react'; 
import { useRouter } from 'next/router'; 
import Navbar from "@/components/Navbar"; 
import Footer from "@/components/Footer"; 
import Head from "next/head"; 
import styles from "../styles/cart.module.css"; 

 
const CartPage = () => { 
const router = useRouter(); 

// ตั้งค่าข้อมูลเริ่มต้นของสินค้าจาก router.query.items 
const { items } = router.query; 
const initialProductItems = items ? JSON.parse(items) : []; 


// ตั้งค่าค่าเริ่มต้นของ cartItems และ quantities ตาม initialProductItems 
const [cartItems, setCartItems] = useState(initialProductItems); 
const [quantities, setQuantities] = useState(initialProductItems.map(() => 1)); 

 
// ตั้งค่าค่าเริ่มต้นของ subtotal เป็น 0 
const [subtotal, setSubtotal] = useState(0); 


// ฟังก์ชันคำนวณค่า subtotal 
const calculateSubtotal = () => { 
return cartItems.reduce((total, item, index) => { 
return total + item.price * quantities[index]; 

}, 0); 

}; 

 

// ฟังก์ชันอัปเดตปริมาณของสินค้าในตำแหน่งที่กำหนด 

const updateQuantity = (index, newQuantity) => { 
    if (newQuantity <= 0) { 
    return; 

    } 
    const updatedQuantities = [...quantities]; 
    updatedQuantities[index] = newQuantity; 
    setQuantities(updatedQuantities); 

}; 

 

// ฟังก์ชันลบสินค้าออกจาก cartItems และ quantities 

const removeItem = (index) => { 
const updatedCartItems = [...cartItems]; 
updatedCartItems.splice(index, 1); 
setCartItems(updatedCartItems); 

 

const updatedQuantities = [...quantities]; 
updatedQuantities.splice(index, 1); 
setQuantities(updatedQuantities); 

}; 

 

// อัปเดตค่า subtotal เมื่อมีการเปลี่ยนแปลงใน cartItems หรือ quantities 
useEffect(() => { 
setSubtotal(calculateSubtotal()); 
}, [cartItems, quantities]); 

 

// ฟังก์ชันนำผู้ใช้ไปที่หน้า shipping พร้อมข้อมูล 

const handleCheckout = () => { 
const cartData = cartItems.map((item, index) => ({ 
  productImg: item.image, 
  productName: item.name, 
  productQuantity: quantities[index], 
  productPrice: item.price.toFixed(2), 

})); 

// รวมค่า total สำหรับการนำไปแสดงใน payment.js 

const total = subtotal; 

// สร้าง query parameters ที่ประกอบไปด้วยข้อมูลทั้งหมด 

const query = { 
products: JSON.stringify(cartData), 
total: total.toFixed(2), 

}; 

// ส่งข้อมูลผ่าน router ไปยังหน้า payment.js 

router.push({ 
pathname: '/shipping', 
query: query, 

}); 

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
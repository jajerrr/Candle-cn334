import React, { useState, useEffect } from 'react'; 

import { useRouter } from 'next/router'; 

import Head from 'next/head'; 

import Navbar from '@/components/Navbar'; 

import Footer from '@/components/Footer'; 

import styles from '../styles/payment.module.css'; 

 

 

 

const PageNav = () => (  

 

<nav className={styles.navBar}>  

<div className={styles.bar}>  

<a href="/cart" className={styles.linkCart}>  

<p>Cart</p>  

</a>  

<svg className={styles.svgIcon} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 8 14">  

<path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 13 5.7-5.326a.909.909 0 0 0 0-1.348L1 1" />  

</svg>  

<a href="/shipping" className={styles.linkShipping}>  

<p>Shipping</p>  

</a>  

<svg className={styles.svgIcon} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 8 14">  

<path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 13 5.7-5.326a.909.909 0 0 0 0-1.348L1 1" />  

</svg>  

<a href="/payment" className={styles.linkPayment}>  

<p>Payment</p>  

</a>  

</div>  

</nav>  

);  

 

 

// คอมโพเนนต์ PaymentMethod สำหรับเลือกวิธีการชำระเงิน  

 

const PaymentMethod = ({ selectedMethod, handleMethodChange }) => (  

 

<div>  

<label className={`${styles.paymentOption} ${selectedMethod === 'Cash' ? styles.selected : ''}`}>  

<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={styles.icon}>  

<path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z" />  

</svg>  

<span>Cash</span>  

<input  

type="radio"  

name="paymentMethod"  

id="cash"  

value="Cash"  

className={styles.radio}  

onChange={handleMethodChange}  

checked={selectedMethod === 'Cash'}  

/>  

</label>  

<label className={`${styles.paymentOption} ${selectedMethod === 'Mobile Banking' ? styles.selected : ''}`}>  

<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={styles.icon}>  

<path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />  

</svg>  

<span>Mobile Banking</span>  

<input  

type="radio"  

name="paymentMethod"  

id="mobileBanking"  

value="Mobile Banking"  

className={styles.radio}  

onChange={handleMethodChange}  

checked={selectedMethod === 'Mobile Banking'}  

/>  

</label>  

<label className={`${styles.paymentOption} ${selectedMethod === 'E-Wallet' ? styles.selected : ''}`}>  

<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={styles.icon}>  

<path strokeLinecap="round" strokeLinejoin="round" d="M21 12a2.25 2.25 0 0 0-2.25-2.25H15a3 3 0 1 1-6 0H5.25A2.25 2.25 0 0 0 3 12m18 0v6a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 9m18 0V6a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 6v3" />  

</svg>  

<span>E-Wallet</span>  

<input  

type="radio"  

name="paymentMethod"  

id="eWallet"  

value="E-Wallet"  

className={styles.radio}  

onChange={handleMethodChange}  

checked={selectedMethod === 'E-Wallet'}  

/>  

</label>  

</div>  

);  

 

const PaymentPage = () => { 

const router = useRouter(); 

 

// รับข้อมูลจาก query parameters 

const { products: productsJSON, total: queryTotal } = router.query; 

// ตั้งค่าข้อมูลเริ่มต้นสำหรับ `products` โดยการแปลงจาก JSON 

const [products, setProducts] = useState([]); 

 

const [sender, setSender] = useState({ 

contact: '', 

name: '', 

surname: '', 

address: '', 

city: '', 

province: '', 

country: '', 

postalCode: '', 

selectedMethod: '', 

}); 

 

const [total, setTotal] = useState(0); 

const [shippingCost, setShippingCost] = useState(0); 

const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(''); 

 

// ใช้ useEffect เพื่ออ่านข้อมูลจาก router.query เมื่อ router.isReady เป็นจริง 

useEffect(() => { 

if (router.isReady) { 

const query = router.query; 

console.log('query:', query); // ตรวจสอบข้อมูล query 

 

// ตั้งค่ารวม 

const queryTotal = parseFloat(query.total) || 0; 

setTotal(queryTotal); 

 

// ตั้งค่าข้อมูลผู้ส่ง 

setSender({ 

contact: query.contact || '', 

name: query.name || '', 

surname: query.surname || '', 

address: query.address || '', 

city: query.city || '', 

province: query.province || '', 

country: query.country || '', 

postalCode: query.postalCode || '', 

selectedMethod: query.selectedMethod || '', 

}); 

 

// ตั้งค่าผลิตภัณฑ์จาก query 

const productsFromQuery = query.products ? JSON.parse(query.products) : []; 

setProducts(productsFromQuery); 

 

// ตั้งค่าค่าใช้จ่ายในการจัดส่ง 

setShippingCost(parseFloat(query.shippingCost) || 0); 

 

// ตั้งค่าวิธีการชำระเงินที่เลือก 

setSelectedPaymentMethod(query.paymentMethod || ''); 

} 

}, [router.isReady, router.query]); 

 

// ฟังก์ชันจัดการการเปลี่ยนแปลงวิธีการชำระเงิน 

const handleMethodChange = (event) => { 

setSelectedPaymentMethod(event.target.value); 

}; 

 

// ฟังก์ชันจัดการการใช้คูปอง (สามารถปรับปรุงตามความต้องการ) 

const handleCouponCode = (event) => { 

event.preventDefault(); 

// ตรวจสอบและใช้คูปองที่นี่ 

}; 

 

return ( 

<> 

<Head> 

<title>Payment</title> 

</Head> 

 

<Navbar /> 

<PageNav /> 

 

<div className={`${styles.container} mx-auto mt-10 px-4 md:px-0`}> 

<div className={styles.flexContainer}> 

{/* Payment Box */} 

<div className={styles.paymentBox}> 

{/* ข้อมูลติดต่อ */} 

<div style={{ display: 'flex', justifyContent: 'space-between' }}> 

<p> 

<span className={styles.infoLabel}>Contact:</span> {sender.contact} 

</p> 

<a href={`/edit/contact?contact=${sender.contact}`}> 

<p className={styles.edit}>Edit</p> 

</a> 

</div> 

 

<hr style={{ width: '95%', border: '1px solid rgba(86, 178, 128, 0.5)' }} /> 

 

{/* ข้อมูลการจัดส่ง */} 

<div style={{ display: 'flex', justifyContent: 'space-between' }}> 

<p> 

<span className={styles.infoLabel}>Ship to:</span> {`${sender.name} ${sender.surname}`}<br /> 

{sender.address}<br /> 

{sender.city}<br /> 

{`${sender.province}, ${sender.country}`}<br /> 

{sender.postalCode} 

</p> 

<a href={`/edit/shipto?name=${sender.name}&surname=${sender.surname}&address=${sender.address}&city=${sender.city}&province=${sender.province}&country=${sender.country}&postalCode=${sender.postalCode}`}> 

<p className={styles.edit}>Edit</p> 

</a> 

</div> 

 

<hr style={{ width: '95%', border: '1px solid rgba(86, 178, 128, 0.5)' }} /> 

 

{/* วิธีการขนส่ง */} 

<div style={{ display: 'flex', justifyContent: 'space-between' }}> 

<span className={styles.infoLabel}> 

Method <span className={styles.inputShipping}>{sender.selectedMethod}</span> 

</span> 

<a href={`/edit/method?method=${sender.selectedMethod}`}> 

<p className={styles.edit}>Edit</p> 

</a> 

</div> 

</div> 

 

{/* คูปอง */} 

<div className={styles.couponContainer}> 

<form className={styles.couponBox} onSubmit={handleCouponCode}> 

<input 

type="text" 

placeholder="Coupon Code" 

className={styles.textCoupon} 

required 

/> 

<button type="submit" className={styles.couponButton}>Add Code</button> 

</form> 

</div> 

 

{/* วิธีการชำระเงิน */} 

<h2 className={styles.paymentMethod}>Payment Method</h2> 

<PaymentMethod selectedMethod={selectedPaymentMethod} handleMethodChange={handleMethodChange} /> 

 

{/* ผลิตภัณฑ์ */} 

<h2 className={styles.product}>Product</h2> 

{products.map((product, index) => ( 

<React.Fragment key={index}> 

<div className={styles.productBox}> 

<span className={styles.imgProduct}> 

<img src={product.productImg} alt={product.productName} /> 

</span> 

<div> 

<h2><span className={styles.infoLabels}></span>{product.productName}</h2> 

<h3><span classname={styles.infoQuantity}>Quantity: </span>{product.productQuantity}</h3> 

</div> 

<h3 className={styles.productPrice}> 

THB {parseFloat(product.productPrice).toFixed(2)} 

</h3> 

</div> 

 

{index !== products.length - 1 && ( 

<hr style={{ width: '95%', border: '1px solid lightgray' }} /> 

)} 

</React.Fragment> 

))} 

 

<hr style={{ width: '95%', border: '1px solid lightgray' }} />  

 

{/* รายละเอียดราคา */} 

<div className={styles.priceDetail}> 

<p className={styles.priceRow}> 

<span className={styles.label}>Subtotal</span> 

<span className={styles.value}>THB {total.toFixed(2)}</span> 

</p> 

<p className={styles.priceRow}> 

<span className={styles.label}>Shipping</span> 

<span className={styles.value}>THB {shippingCost.toFixed(2)}</span> 

</p> 

<h2 className={styles.totalRow}> 

<span className={styles.labelTotal}>Total</span> 

<span className={styles.valueTotal}>THB {(total + shippingCost).toFixed(2)}</span> 

</h2> 

</div> 

 

{/* ปุ่ม */} 

<div className={styles.backAndPayButtons}> 

<a href="/shipping" className={styles.backButton}> 

<h3 className={styles.back}>Back to detail</h3> 

</a> 

<a href="/confirm"> 

<button className={styles.payButton}>Pay Now</button> 

</a> 

</div> 

</div> 

</div> 

 

<Footer /> 

</> 

); 

}; 

 

export default PaymentPage; 
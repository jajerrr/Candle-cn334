import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router'; 
import Navbar from "@/components/Navbar"; 
import Footer from "@/components/Footer"; 
import Head from "next/head"; 
import styles from '../styles/cart.module.css';



const CartPage = () => {
    const [initialCartItems, setInitialCartItems] = useState([]);

    useEffect(() => {
        const storedItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        setInitialCartItems(storedItems);
    }, []);

    const router = useRouter();

    // กำหนดค่าเริ่มต้นให้กับตัวแปร products เป็นอาร์เรย์ว่าง
    const [products, setProducts] = useState([]);

    const { items } = router.query;
    const initialProductItems = items ? JSON.parse(items) : [];

    const [quantities, setQuantities] = useState(initialProductItems.map(() => 1));
    const [subtotal, setSubtotal] = useState(0);

    const calculateSubtotal = () => {
        return initialCartItems.reduce((total, item, index) => {
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
        const updatedCartItems = [...initialCartItems];
        updatedCartItems.splice(index, 1);
        setInitialCartItems(updatedCartItems);
    
        const updatedQuantities = [...quantities];
        updatedQuantities.splice(index, 1);
        setQuantities(updatedQuantities);
    
        // อัพเดตข้อมูลใน localStorage ด้วยข้อมูลใหม่
        localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
    };
    

    useEffect(() => {
        setSubtotal(calculateSubtotal());
    }, [initialCartItems, quantities]);

    const handleCheckout = () => {
        const cartData = initialCartItems.map((item, index) => ({
            
            productImg: item.image,
            productName: item.name,
            productQuantity: quantities[index],
            productPrice: item.price.toFixed(2),
        }));

        const query = {
            products: JSON.stringify(cartData),
            total: subtotal.toFixed(2),
        };

        // นำทางไปที่ /shipping ด้วยข้อมูล query
        router.push({
            pathname: '/shipping',
            query: query,
        });

        // เคลียร์ข้อมูลใน localStorage
        localStorage.removeItem('cartItems');

    };

    useEffect(() => {
        // ตรวจสอบว่ามีข้อมูลสินค้าใน localStorage หรือไม่
        const storedItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        
        // กรองข้อมูลสินค้าเฉพาะที่เพิ่มจากการกดปุ่ม "Add to Cart"
        const filteredItems = storedItems.filter(item => item.addedFromButton === true);
        
        // ตั้งค่าสินค้าใน state เฉพาะสินค้าที่เพิ่มจากการกดปุ่ม "Add to Cart"
        setInitialCartItems(filteredItems);
    }, []);
    


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
                    <a href="/products"> 
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

        {initialCartItems.map((item, index) => (
        <tr key={index}> 
            <td className={styles.product}> 
                <div className={styles.productInfo}> 
                    <img src={item.image} className={styles.productImage} alt={item.name} /> 
                        <div className={styles.productDetails}> 

                        <h2 className={styles.productName}>{item.name}</h2> 
                
                        <a> <h3 className={styles.removeProduct} onClick={() => removeItem(index)}>Remove</h3>  </a> 
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
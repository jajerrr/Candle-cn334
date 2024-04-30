// pages/detail/[id].js

import Head from "next/head";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useRouter } from 'next/router';
import styles from '@/styles/[id].module.css';

import React, { useState, useEffect} from 'react';

// import axios from "axios";




const Detail = () => {

    const router = useRouter();
    const { id } = router.query;
    const [product, setProduct] = useState(null);



    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:8000/api/products/products/${id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch product');
                }
                const data = await response.json();
                setProduct(data);
                {console.log("data",data)}
            } catch (error) {
                console.error('Error fetching product:', error);
            }
        };

        if (id) {
            fetchProduct();
        }
    }, [id]);

    const handleAddToCart = (item) => {
        // ตรวจสอบว่ามีข้อมูลใน localStorage อยู่แล้วหรือไม่
        const existingItems = localStorage.getItem('cartItems');
        let cartItems = [];
        if (existingItems) {
            // ถ้ามีให้แปลง JSON string เป็น array
            cartItems = JSON.parse(existingItems);
        }
    
        // ตรวจสอบว่าสินค้าที่เพิ่มอยู่แล้วหรือไม่โดยใช้ ID เป็นตัวเปรียบเทียบ
        const isItemInCart = cartItems.some(cartItem => cartItem._id === item._id);
    
        if (isItemInCart) {
            // ถ้าสินค้ามีอยู่ในตะกร้าแล้ว ให้แจ้งเตือนและไม่เพิ่มสินค้าเข้าไปอีก
            alert('สินค้านี้มีอยู่ในตะกร้าแล้ว');
        } else {
            // ถ้ายังไม่มีให้เพิ่มสินค้าใหม่เข้าไป
            cartItems.push(item);
            // บันทึกข้อมูลใหม่ลงใน localStorage
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
    
            // ส่งข้อมูลสินค้าไปยังหน้า cart.js ผ่าน query parameters
            router.push({
                pathname: '/cart',
                query: {
                    items: JSON.stringify(cartItems), // ส่งสินค้าเป็น JSON string
                },
            });
        }
    };

    const play = async () => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/create_sound/get_sound/${id}`, {
                method: 'GET',
            });
    
            if (response.ok) {
                const blob = await response.blob();
                const url = window.URL.createObjectURL(blob);
                const audio = new Audio(url);
                audio.play();
            } else {
                console.error('Failed to get sound:', response.statusText);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };
    



    


    return (
        <div>
            <Head>
                <title>Product Detail</title>
            </Head>
            <Navbar />
            
            {product && (
            <div className={styles.detailContainer}>
                <img className={styles.image}src={`http://127.0.0.1:8000${product.image_url}`} alt={product.candle_name} />
                <div>
                <h1>{product.candle_name}</h1>
                    <p className={styles.price}>THB {product.candle_price.toFixed(2)}</p>
                    <p className={styles.description}>{product.candle_scent}</p>

                    <div className={styles.java}>
                    <button onClick={() => play(product.candle_name, product.productId)} className={styles.audiobutton}>
                    <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className={styles.volume}>
                    <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.114 5.636a9 9 0 0 1 0 12.728M16.463 8.288a5.25 5.25 0 0 1 0 7.424M6.75 8.25l4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z"
                    />
                    </svg>
                    </button>


                   
  
                        <p className={styles.description}>{selectedProduct.description}</p> 


                        </div>



                    <div className={styles.detailBox}>
                        <p>
                        <span className={styles.label}>Wax:</span> Top grade Soy wax that delivers a smoke less, consistent burn<br />
                                <span className={styles.label}>Fragrance:</span> Premium quality ingredients with natural essential oils<br />
                                <span className={styles.label}>Burning Time:</span>{product.time} 
                                <span className={styles.label}>Dimension:</span>{product.dimension}
                                <span className={styles.label}>Weight:</span>{product.weight}
                        </p>
                    </div>

                    <button className={styles.cartButton} onClick={() => handleAddToCart(product)}>Add Cart</button>



                </div>
            </div>

            )}
             <Footer />
        </div>
    );
};

export default Detail;

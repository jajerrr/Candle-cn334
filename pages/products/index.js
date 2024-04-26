import Head from "next/head";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useRouter } from 'next/router';
import React from 'react';
import styles from '@/styles/index.module.css';
import Link from "next/link";
import { useEffect } from 'react';


const ProductList = ({ products }) => {
    const router = useRouter();

    // ข้อมูลสินค้า
    const productData = [
        {
            id: 1,
            name: 'Berry Bliss',
            image: '/index/BerryBliss.jpg',
            price: 59.00,
        },
        {
            id: 2,
            name: 'Vanilla Serenity',
            image: '/index/VanillaSerenity.jpg',
            price: 59.00,
        },
        {
            id: 3,
            name: 'Ember Glow',
            image: '/index/EmberGlow.jpg',
            price: 59.00,
        },
        {
            id: 4,
            name: 'Meadow Breeze',
            image: '/index/MeadowBreeze.jpg',
            price: 59.00,
        },
        {
            id: 5,
            name: 'Earthy Elegance',
            image: '/index/EarthyElegance.jpg',
            price: 59.00,
        },
        {
            id: 6,
            name: 'Zesty Citrus Deligh',
            image: '/index/ZestyCitrusDeligh.jpg',
            price: 59.00,
        },
        {
            id: 7,
            name: 'Nordic Forest',
            image: '/index/NordicForest.jpg',
            price: 59.00,
        },
        {
            id: 8,
            name: 'Enchanting Jasmine',
            image: '/index/EnchantingJasmine .jpg',
            price: 59.00,
        },
        
    ];

    useEffect(() => {
        // บันทึกข้อมูลสินค้าใน localStorage เมื่อหน้า index โหลดขึ้นมา
        localStorage.setItem('products', JSON.stringify(products));
    }, [products]);


    return (
        <div>
            <Head>
                <title>Products</title>
            </Head>
            <Navbar />
            
            <h1 className={styles.title}>Products</h1>
            <p className={styles.subtitle}>Order it for you or for your beloved ones</p>
    
            <div className={styles.productFlexContainer}>

                {productData.map((item, index) => (
                    <Link href={`/detail/${item.id}`} key={index}>
                    <div key={index} className={styles.productItem}>
                        <img src={item.image} alt={item.name} style={{ width: '300px', height: '300px' }} />
                        <div className={styles.textProduct}>
                            <h2 className={styles.productName}>{item.name}</h2>
                            <p className={styles.productPrice}>THB {item.price.toFixed(2)}</p>
                        </div>
                    </div>
                </Link>
                ))}
                 
            </div>
            <Footer />
        </div>
       
    );
};

export default ProductList;
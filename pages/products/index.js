import Navbar from "@/components/Navbar";
import styles from '@/styles/index.module.css';
import Head from "next/head";
import Link from "next/link";
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const ProductList = () => {
    const router = useRouter();
    const [products, setProducts] = useState([]);
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/api/products/products');
                if (!response.ok) {
                    throw new Error('Failed to fetch products');
                }
                const data = await response.json();
                setProducts(data.candle);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);

    // ฟังก์ชันสำหรับจัดการเหตุการณ์การคลิก Add to Cart
    const handleAddToCart = (item) => {
        // สร้าง array สำหรับข้อมูลสินค้า
        const cartItems = [item];
        
        // ส่งข้อมูลสินค้าไปยังหน้า cart.js ผ่าน query parameters
        router.push({
            pathname: '/cart',
            query: {
                items: JSON.stringify(cartItems), // ส่งสินค้าเป็น JSON string
            },
        });
    };

    return (
        <div>
            <Head>
                <title>Products</title>
            </Head>
            <Navbar />
            
            <h1 className={styles.title}>Products</h1>
            <p className={styles.subtitle}>Order it for you or for your beloved ones</p>

            <div className={styles.productFlexContainer}>
                {products.map((item, index) => (
                    <Link href={`/detail/${item._id.$oid}`} as={`/detail/${item._id.$oid}`} key={index}>
                    <div key={index} className={styles.productItem}>
                        <img src={item.image_url} alt={item.candle_name} style={{ width: '300px', height: '300px' }} />
                        {console.log("item",item._id)}
                        <div className={styles.textProduct}>
                            <h2 className={styles.productName}>{item.candle_name}</h2>
                            <p className={styles.productPrice}>THB {item.candle_price}</p>
                        </div>
                    </div>
                </Link>
                
                
                ))}
            </div>
        </div>
    );
};

export default ProductList;

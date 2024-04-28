import Navbar from "@/components/Navbar";
import styles from '@/styles/[id].module.css';
import Head from "next/head";
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

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
                console.log("data",data)
            } catch (error) {
                console.error('Error fetching product:', error);
            }
        };

        if (id) {
            fetchProduct();
        }
    }, [id]);

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
                <title>Product Detail</title>
            </Head>
            <Navbar />
            
            {product && (
                <div className={styles.detailContainer}>
                    <img className={styles.image} src={product.image_url} alt={product.candle_name} />
                    <div>
                        <h1>{product.candle_name}</h1>
                        <p className={styles.price}>THB {product.candle_price}</p>
                        <p className={styles.description}>{product.candle_scent}</p>

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
        </div>
    );
};

export default Detail;

// pages/detail/[id].js

import Head from "next/head";
import Navbar from "@/components/Navbar";
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import styles from '@/styles/[id].module.css';


const Detail = () => {
    const router = useRouter();
    const { id } = router.query;

    // ข้อมูลสินค้า
    const productData = [
        {
            id: 1,
            name: 'Berry Bliss',
            image: '/index/BerryBliss.jpg',
            price: 59.00,
            description: 'A joyful scent of berries, leafy greens and violets.',
        },
        {
            id: 2,
            name: 'Vanilla Serenity',
            image: '/index/VanillaSerenity.jpg',
            price: 59.00,
            description: 'A sweet scent of vanilla and warm milk with hints of coconut.',
        },
        {
            id: 3,
            name: 'Ember Glow',
            image: '/index/EmberGlow.jpg',
            price: 59.00,
            description: 'An earthy and smoky scent with sweet notes.',
        },
        {
            id: 4,
            name: 'Meadow Breeze',
            image: '/index/MeadowBreeze.jpg',
            price: 59.00,
            description: 'A refreshing scent of newly cut grass and spicy herbs.',
        },
        {
            id: 5,
            name: 'Earthy Elegance',
            image: '/index/EarthyElegance.jpg',
            price: 59.00,
            description: 'A rustic scent of forests and flowing streams.',
        },
        {
            id: 6,
            name: 'Zesty Citrus Deligh',
            image: '/index/ZestyCitrusDeligh.jpg',
            price: 59.00,
            description: 'A fresh and lush scent of lemon and lemongrass.',
        },
        {
            id: 7,
            name: 'Nordic Forest',
            image: '/index/NordicForest.jpg',
            price: 59.00,
            description:'A comforting scent of forest and amber with hints of citrus and cypress.',
        },
        {
            id: 8,
            name: 'Enchanting Jasmine',
            image: '/index/EnchantingJasmine .jpg',
            price: 59.00,
            description:'A scent of jasmine, pear, ginger and lily of the valley.',
        },
    ];

    // ใช้ state เพื่อเก็บข้อมูลสินค้าที่ถูกเลือก
    const [selectedProduct, setSelectedProduct] = useState(null);

    useEffect(() => {
        if (id) { // ตรวจสอบว่า id ไม่เป็น undefined
            const foundProduct = productData.find(product => product.id === parseInt(id));
            if (foundProduct) {
                setSelectedProduct(foundProduct);
            } else {
                console.error(`Product with id ${id} not found`);
            }
        }
    }, [id]); // เรียกใช้ฟังก์ชันเมื่อ id เปลี่ยนแปลง

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
                <title>Product Detail</title>
            </Head>
            <Navbar />
            
            {selectedProduct && (
            <div className={styles.detailContainer}>
                <img className={styles.image}src={selectedProduct.image} alt={selectedProduct.name} />
                <div>
                    <h1>{selectedProduct.name}</h1>
                    <p className={styles.price}>THB {selectedProduct.price.toFixed(2)}</p>
                    <p className={styles.description}>{selectedProduct.description}</p>

                    <div className={styles.detailBox}>
                        <p>
                            <span className={styles.label}>Wax:</span> Top grade Soy wax that delivers a smoke less, consistent burn<br />
                            <span className={styles.label}>Fragrance:</span> Premium quality ingredients with natural essential oils<br />
                            <span className={styles.label}>Burning Time:</span> 70-75 hours <span className={styles.label}>Dimension:</span> 10cm x 5cm <span className={styles.label}>Weight:</span> 400g
                        </p>
                    </div>

                    <button className={styles.cartButton} onClick={() => handleAddToCart(selectedProduct)}>Add Cart</button>



                </div>
            </div>

            )}
        </div>
    );
};

export default Detail;

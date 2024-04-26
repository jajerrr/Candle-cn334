import React from 'react';
import { useRouter } from 'next/router';

const ProductList = () => {
    const router = useRouter();

    // ข้อมูลสินค้า
    const productData = [
        {
            name: 'Berry Bliss',
            image: '/index/BerryBliss.jpg',
            price: 59.00,
        },
        {
            name: 'Earthy Elegance',
            image: '/index/EarthyElegance.jpg',
            price: 59.00,
        },
        {
            name: 'Ember Glow',
            image: '/index/EmberGlow.jpg',
            price: 59.00,
        },
        {
            name: 'Enchanting Jasmine',
            image: '/index/EnchantingJasmine .jpg',
            price: 59.00,
        },
        {
            name: 'Meadow Breeze',
            image: '/index/MeadowBreeze.jpg',
            price: 59.00,
        },
        {
            name: 'Nordic Forest',
            image: '/index/NordicForest.jpg',
            price: 59.00,
        },
        {
            name: 'Vanilla Serenity',
            image: '/index/VanillaSerenity.jpg',
            price: 59.00,
        },
        {
            name: 'Zesty Citrus Deligh',
            image: '/index/ZestyCitrusDeligh.jpg',
            price: 59.00,
        },
        
    ];

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
            <h1>Candle</h1>
            {productData.map((item, index) => (
                <div key={index}>
                    <h2>{item.name}</h2>
                    <img src={item.image} alt={item.name} style={{ width: '200px', height: '200px' }} />
                    <p>Price: THB {item.price.toFixed(2)}</p>
                    {/* ปุ่ม Add to Cart */}
                    <button onClick={() => handleAddToCart(item)}>Add to Cart</button>
                </div>
            ))}
        </div>
    );
};

export default ProductList;

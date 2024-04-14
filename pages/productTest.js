import React from 'react';
import { useRouter } from 'next/router';

const ProductList = () => {
    const router = useRouter();

    // ข้อมูลสินค้า
    const productData = [
        {
            name: 'Jasmine (Pink)',
            image: '/cart/jasmine.jpg',
            price: 59.00,
        },
        {
            name: 'Berries (Red)',
            image: '/cart/berrie.jpg',
            price: 59.00,
        },
        {
            name: 'Fresh Grass (Light Green)',
            image: '/cart/grass.jpg',
            price: 59.00,
        },
        {
            name: 'Vanilla (Light Beige)',
            image: '/cart/vanilla.jpg',
            price: 59.00,
        },
        {
            name: 'Scandinavian Woods (White)',
            image: '/cart/scandinavian.jpg',
            price: 59.00,
        },
        {
            name: 'Bonfire (Grey)',
            image: '/cart/bonfire.jpg',
            price: 59.00,
        },
        {
            name: 'Lemon (Yellow)',
            image: '/cart/lemon.jpg',
            price: 59.00,
        },
        {
            name: 'Vetiver & Geranium (Black-turquoise)',
            image: '/cart/vetiver.jpg',
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

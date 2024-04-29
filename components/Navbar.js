import React, { useContext } from 'react';
import { CartContext } from '../components/CartContext';
import Link from "next/link";
import Image from "next/image";
import { useRouter } from 'next/router';

const Navbar = () => {
    const { cartItems} = useContext(CartContext);
    const router = useRouter();

    const handleCartClick = () => {
        // ดึงข้อมูลจาก Local Storage
        const storedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    
        // ตรวจสอบว่ามีสินค้าในตะกร้าหรือไม่
        if (storedCartItems.length > 0) {
            // ส่งไปยังหน้า cart พร้อมกับข้อมูลใน Local Storage
            router.push({
                pathname: '/cart',
                query: {
                    items: JSON.stringify(storedCartItems),
                },
            });
        } else {
            // แสดงแจ้งเตือนถ้าตะกร้าว่าง
            alert('Your cart is empty.');
        }
    };
    

    

    return (
        <nav>
            <div className="logo">
                <Link href="/">
                    <img src="/logo.jpg" alt="Logo" width="175" height="100"/>
                </Link>
            </div>
            
            <div className="middle">
                <Link href="/products">Discovery</Link>
                <Link href="/about">About</Link>
                <Link href="/contact">Contact us</Link>
            </div>

            <div className="cart">
                <Link href="/cart">
                    <div>
                        <img 
                            src="/cart.png" 
                            alt="cart" 
                            width="30" 
                            height="30" 
                            onClick={handleCartClick} 
                        />
                        <span>{cartItems.length}</span> {/* แสดงจำนวนสินค้าในตะกร้า */}
                    </div>
                </Link>
            </div>
        </nav>
    );
};

export default Navbar;



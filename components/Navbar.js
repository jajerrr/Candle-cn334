import React, { useContext } from 'react';
import { CartContext } from '../components/CartContext';
import Link from "next/link";
import Image from "next/image";

const Navbar = () => {
    const { cartItems, setCartItems } = useContext(CartContext);

    const handleCartClick = () => {
        if (cartItems) {
            const updatedItems = cartItems.map(item => ({
                ...item,
                quantity: Math.max(item.quantity || 1, 1)
            }));
            setCartItems(updatedItems);
            localStorage.setItem('cartItems', JSON.stringify(updatedItems));
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



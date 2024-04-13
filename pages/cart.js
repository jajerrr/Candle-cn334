import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Head from "next/head";
import styles from "../styles/cart.module.css";

const CartPage = () => {
    const router = useRouter();
    const { items, subtotal } = router.query;

    // Initialize cart items and subtotal from query if they exist
    const initialCartItems = items ? JSON.parse(items) : [];
    const initialSubtotal = subtotal ? parseFloat(subtotal) : 0;

    const [cartItems, setCartItems] = useState(initialCartItems);
    const [cartSubtotal, setCartSubtotal] = useState(initialSubtotal);

    // Function to calculate subtotal
    const calculateSubtotal = () => {
        return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    // Update quantity of an item
    const updateQuantity = (index, newQuantity) => {
        const updatedCartItems = [...cartItems];
        if (newQuantity > 0) {
            updatedCartItems[index].quantity = newQuantity;
            setCartItems(updatedCartItems);
        }
    };

    // Remove an item
    const removeItem = (index) => {
        const updatedCartItems = [...cartItems];
        updatedCartItems.splice(index, 1);
        setCartItems(updatedCartItems);
    };

    useEffect(() => {
        setCartSubtotal(calculateSubtotal());
    }, [cartItems]);

    const handleCheckout = () => {
        // Send cart data to the shipping page
        const shippingQuery = {
            subtotal: cartSubtotal.toFixed(2),
            items: JSON.stringify(cartItems),
        };

        router.push({
            pathname: '/shipping',
            query: shippingQuery,
        });
    };

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
                                <p className={styles.back}>Back to shopping</p>
                            </a>
                        </div>

                        <div className={styles.productTable}>
                            <table className={styles.table}>
                                <thead>
                                    <tr>
                                        <th className={styles.headProduct}>Product</th>
                                        <th>Price</th>
                                        <th>Quantity</th>
                                        <th>Total</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {cartItems.map((item, index) => (
                                        <tr key={index}>
                                            <td className={styles.product}>
                                                <div className={styles.productInfo}>
                                                    <img src={item.image} className={styles.productImage} alt={item.name} />
                                                    <div className={styles.productDetails}>
                                                        <h2 className={styles.productName}>{item.name}</h2>
                                                        <p className={styles.removeProduct} onClick={() => removeItem(index)}>Remove</p>
                                                    </div>
                                                </div>
                                            </td>

                                            <td className={styles.centerAlign}>THB {item.price.toFixed(2)}</td>

                                            <td>
                                                <div className={styles.quantity}>
                                                    <button className={styles.quantityButtonMinus} onClick={() => updateQuantity(index, item.quantity - 1)}>-</button>
                                                    <span className={styles.quantityValue}>{item.quantity}</span>
                                                    <button className={styles.quantityButtonPlus} onClick={() => updateQuantity(index, item.quantity + 1)}>+</button>
                                                </div>
                                            </td>

                                            <td className={styles.centerAlign}>THB {(item.price * item.quantity).toFixed(2)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className={styles.summaryContainer}>
                        <div className={styles.summaryBox}>
                            <div className={styles.summaryItem}>
                                <h2><span className={styles.summaryLabel}>Total </span>
                                    <span className={styles.summaryValue}>THB {cartSubtotal.toFixed(2)}</span>
                                </h2>
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

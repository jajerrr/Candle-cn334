import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Head from 'next/head';
import styles from '../styles/payment.module.css';

const PageNav = () => {
    return (
        <nav className={styles.navBar}>
            <div className={styles.bar}>
                <a href="/cart" className={styles.linkCart}>
                    <p>Cart</p>
                </a>
                <svg className={styles.svgIcon} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 8 14">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 13 5.7-5.326a.909.909 0 0 0 0-1.348L1 1"/>
                </svg>
                <a href="/shipping" className={styles.linkShipping}>
                    <p>Shipping</p>
                </a>
                <svg className={styles.svgIcon} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 8 14">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 13 5.7-5.326a.909.909 0 0 0 0-1.348L1 1"/>
                </svg>
                <a href="/payment" className={styles.linkPayment}>
                    <p>Payment</p>
                </a>
            </div>
        </nav>
    );
}; 

const PaymentPage = () => {
    const router = useRouter();
    const { query } = router;
    
    const [sender, setSender] = useState({});

    // รับข้อมูลที่ส่งมาจาก `ShippingPage` และจัดเก็บในสถานะ `sender`
    useEffect(() => {
        if (query) {
            setSender(query);
        }
    }, [query]);

    return (
        <>
            <Head>
                <title>Payment</title>
            </Head>

            <Navbar/>
            <PageNav/>
            
            <div className={styles.paymentInformation}>
                <h2>Payment Information</h2>
                {/* แสดงข้อมูลจาก sender */}
                <p>Name: {sender.name} {sender.surname}</p>
                <p>Address: {sender.address}, {sender.city}, {sender.province}, {sender.postalCode}, {sender.country}</p>
                <p>Contact: {sender.contact}</p>
                <p>Shipping Method: {sender.selectedMethod}</p>
                {/* คุณสามารถเพิ่มส่วนประกอบเพิ่มเติมเพื่อแสดงข้อมูลอื่น ๆ */}
            </div>

            <Footer/>
        </>
    );
};

export default PaymentPage;


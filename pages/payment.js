import React, { useState, useEffect } from 'react'; 
import { useRouter } from 'next/router'; 
import Head from 'next/head'; 
import Navbar from '@/components/Navbar'; 
import Footer from '@/components/Footer'; 
import styles from '../styles/payment.module.css'; 
import cartItems from '../pages/shipping';
import ProductList from './productTest';


const PageNav = () => (  
    <nav className={styles.navBar}>  
        <div className={styles.bar}>  
            <a href="/cart" className={styles.linkCart}>  
                <p>Cart</p>  
            </a>  
            <svg className={styles.svgIcon} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 8 14">  
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 13 5.7-5.326a.909.909 0 0 0 0-1.348L1 1" />  
            </svg>  
                
            <a href="/shipping" className={styles.linkShipping}>  
                <p>Shipping</p>  
            </a>  
            <svg className={styles.svgIcon} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 8 14">  
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 13 5.7-5.326a.909.909 0 0 0 0-1.348L1 1" />  
            </svg>  

            <a href="/payment" className={styles.linkPayment}>  
                <p>Payment</p>  
            </a>  
        </div>  
    </nav>  

);  

 
// คอมโพเนนต์ PaymentMethod สำหรับเลือกวิธีการชำระเงิน  
const PaymentMethod = ({ selectedMethod, handleMethodChange }) => (  
    <div>  
        <label className={`${styles.paymentOption} ${selectedMethod === 'Cash' ? styles.selected : ''}`}>  
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={styles.icon}>  
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z" />  
            </svg>  
            <span>Cash</span>  
            <input  
                type="radio"  
                name="paymentMethod"  
                id="cash"  
                value="Cash"  
                className={styles.radio}  
                onChange={handleMethodChange}  
                checked={selectedMethod === 'Cash'}  
            />  
        </label>  

        <label className={`${styles.paymentOption} ${selectedMethod === 'Mobile Banking' ? styles.selected : ''}`}>  
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={styles.icon}>  
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />  
            </svg>  
            <span>Mobile Banking</span>  
            <input  
                type="radio"  
                name="paymentMethod"  
                id="mobileBanking"  
                value="Mobile Banking"  
                className={styles.radio}  
                onChange={handleMethodChange}  
                checked={selectedMethod === 'Mobile Banking'}  
                />  
        </label> 

        <label className={`${styles.paymentOption} ${selectedMethod === 'E-Wallet' ? styles.selected : ''}`}>  
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={styles.icon}>  
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a2.25 2.25 0 0 0-2.25-2.25H15a3 3 0 1 1-6 0H5.25A2.25 2.25 0 0 0 3 12m18 0v6a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 9m18 0V6a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 6v3" />  
        </svg>  

        <span>E-Wallet</span>  
        <input  
            type="radio"  
            name="paymentMethod"  
            id="eWallet"  
            value="E-Wallet"  
            className={styles.radio}  
            onChange={handleMethodChange}  
            checked={selectedMethod === 'E-Wallet'}  
        />  
        </label>  

    </div>  

); 


 

// ฟังก์ชันหลักของ PaymentPage
const PaymentPage = () => {
    const router = useRouter();
    // ประกาศและกำหนดค่า query จาก router.query
    const query = router.query;

    const [cartItems, setCartItems] = useState([]);
    const [quantities, setQuantities] = useState([]);
    const [sender, setSender] = useState({
        contact: '',
        name: '',
        surname: '',
        address: '',
        city: '',
        province: '',
        country: '',
        postalCode: '',
        selectedMethod: '',
    });
    const [total, setTotal] = useState(0);
    const [shippingCost, setShippingCost] = useState(0);
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');

    // ใช้ useEffect เพื่อตั้งค่าจาก query เมื่อ router พร้อม
    useEffect(() => {
        if (router.isReady) {
            console.log('Query:', query);
            const productsFromQuery = query.products ? JSON.parse(query.products) : [];
            console.log('Products from query:', productsFromQuery);
            setCartItems(productsFromQuery);
            setQuantities(productsFromQuery.map(item => item.productQuantity || 1)); // ดึง quantity จาก productQuantity หรือใช้ค่าเริ่มต้น 1
            
            // ตั้งค่า sender
            setSender({
                contact: query.contact || '',
                name: query.name || '',
                surname: query.surname || '',
                address: query.address || '',
                city: query.city || '',
                province: query.province || '',
                country: query.country || '',
                postalCode: query.postalCode || '',
                selectedMethod: query.selectedMethod || '',
            });
            
            // ตั้งค่า total และ shippingCost
            setTotal(parseFloat(query.total) || 0);
            setShippingCost(parseFloat(query.shippingCost) || 0);
            setSelectedPaymentMethod(query.paymentMethod || '');
        }
    }, [router.isReady, query]);


    // การจัดรูปแบบข้อมูล cartData สำหรับการแสดงใน PaymentPage
    const cartData = cartItems.map((item, index) => {
        // ตรวจสอบและแปลง item.price เป็นตัวเลข
        let productPrice = parseFloat(item.price);
        if (isNaN(productPrice)) {
            productPrice = 0.00; // ตั้งค่าเริ่มต้นเป็น 0.00 หาก item.price เป็น NaN
        }
        
        return {
            productImg: item.image || '', // จัดการกรณีที่ item.image เป็นค่า undefined หรือ null
            productName: item.name || '', // จัดการกรณีที่ item.name เป็นค่า undefined หรือ null
            productQuantity: quantities[index], // ใช้ quantities[index] โดยไม่ต้องปรับเปลี่ยน
            productPrice: productPrice.toFixed(2), // แปลง productPrice เป็นทศนิยม 2 ตำแหน่ง
        };
    });
    // จัดการการเปลี่ยนแปลงของ sender
    const handleSenderChange = (event) => {
        const { name, value } = event.target;
        setSender((prevSender) => ({
            ...prevSender,
            [name]: value,
        }));
    };
    return (
        <>
            <Head>
                <title>Payment</title>
            </Head>
            <Navbar />
            <PageNav />

            <div className={`${styles.container} mx-auto mt-10 px-4 md:px-0`}>
                <div className={styles.flexContainer}>
                    {/* Payment Box */}
                    <div className={styles.paymentBox}>
                        {/* Contact Information */}
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            
                            <span className={styles.infoLabel}>Contact: <span className={styles.email}>{sender.contact}</span></span>

                            <a href={`/edit/contact?contact=${sender.contact}`}>
                                <p className={styles.edit}>Edit</p>
                            </a>
                        </div>

                        <hr className={styles.separator} />

                        {/* Shipping Information */}
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
    
                                <div>
                                <span className={styles.infoLabel}>Ship to:</span> 
                                <span className={styles.nameAndSurname}>{`${sender.name} ${sender.surname}`}</span><br />

                                    <div className={styles.inputAdd}>
                                        {sender.address}<br />
                                        {sender.city}<br />
                                        {`${sender.province}, ${sender.postalCode}`}<br />
                                        
                                    </div>
                                </div>
                                <a href={`/edit/shipto?name=${sender.name}&surname=${sender.surname}&address=${sender.address}&city=${sender.city}&province=${sender.province}&country=${sender.country}&postalCode=${sender.postalCode}`}>
                                    <p className={styles.edit}>Edit</p>
                                </a>
                            
                        </div>

                        <hr className={styles.separator} />

                        {/* Shipping Method */}
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span className={styles.infoLabel}>
                                Method: <span className={styles.inputShipping}>{sender.selectedMethod}</span>
                            </span>
                            <a href={`/edit/method?method=${sender.selectedMethod}`}>
                                <p className={styles.edit}>Edit</p>
                            </a>
                        </div>
                    </div>

                    {/* Coupon Container */}
                    <div className={styles.couponContainer}>
                        <form className={styles.couponBox}>
                            <input
                                type="text"
                                placeholder=" Coupon Code"
                                className={styles.textCoupon}
                                required
                            />
                            <button type="submit" className={styles.couponButton}>Add Code</button>
                        </form>
                    </div>

                    {/* Payment Method */}
                    <h2 className={styles.paymentMethod}>Payment Method</h2>
                  
                    <div className={styles.paymentMethodBox} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        <div className={styles.headBox}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={styles.iconCredit}>
                                <path d="M4.5 3.75a3 3 0 0 0-3 3v.75h21v-.75a3 3 0 0 0-3-3h-15Z" />
                                <path fillRule="evenodd" d="M22.5 9.75h-21v7.5a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3v-7.5Zm-18 3.75a.75.75 0 0 1 .75-.75h6a.75.75 0 0 1 0 1.5h-6a.75.75 0 0 1-.75-.75Zm.75 2.25a.75.75 0 0 0 0 1.5h3a.75.75 0 0 0 0-1.5h-3Z" clipRule="evenodd" />
                            </svg>
                            <h3 className="text-lg font-bold">Credit Card</h3>
                        </div>




                        {/* กล่องสำหรับการกรอกข้อมูล Card Number */}
                        <form className={styles.cardNumBox}>
                            <div className={styles.inputWrapper}> {/* กล่องห่อ */}
                                <input
                                    name="cardnumber"
                                    value={sender.cardnumber}
                                    onChange={handleSenderChange}
                                    placeholder=" Card Number"
                                    className={styles.textName}
                                    required
                                />
                                {/* ไอคอนที่ขวาของ input */}
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={styles.iconcardnum}>
                                    <path fillRule="evenodd" d="M12 1.5a5.25 5.25 0 0 0-5.25 5.25v3a3 3 0 0 0-3 3v6.75a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3v-6.75a3 3 0 0 0-3-3v-3c0-2.9-2.35-5.25-5.25-5.25Zm3.75 8.25v-3a3.75 3.75 0 1 0-7.5 0v3h7.5Z" clipRule="evenodd" />
                                </svg>
                            </div>
                        </form>



                        {/* กล่องสำหรับการกรอกข้อมูล Holder Name */}
                        <form className={styles.holderNameBox}>
                            <input
                                name="holdername"
                                value={sender.holdername}
                                onChange={handleSenderChange}
                                placeholder=" Holder Name"
                                className={styles.textName}
                                required
                            />
                        </form>

                        {/* กล่องสำหรับการกรอกข้อมูล Expiration และ CVV */}
                        <form className={styles.cvvBox}>
                            <div style={{ display: 'flex', gap: '10px' }}>
                                <input
                                    name="expiration"
                                    value={sender.expiration}
                                    onChange={handleSenderChange}
                                    placeholder=" Expiration (MM/YY)"
                                    className={styles.textName}
                                    required
                                />
                                {/* Wrapper สำหรับ input CVV และไอคอน */}
                                <div className={styles.inputWrapper}>
                                    <input
                                        name="cvv"
                                        value={sender.cvv}
                                        onChange={handleSenderChange}
                                        placeholder=" CVV"
                                        className={styles.textName}
                                        required
                                    />
                                    {/* ไอคอน SVG */}
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={styles.iconcvv}>
                                        <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 0 1 .67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 1 1-.671-1.34l.041-.022ZM12 9a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" clipRule="evenodd" />
                                    </svg>
                                </div>
                            </div>
                        </form>

                    </div>


                    {/* Products Information */}
                    <h2 className={styles.product}>Products</h2>
                    {cartItems.map((product, index) => (
                        <div key={index}>
                            <div className={styles.productBox}>
                                <span className={styles.imgProduct}>
                                    <img src={product.productImg} alt={product.productName} />
                                </span>
                                <div>
                                    <h2><span className={styles.infoLabels}>Name: </span>{product.productName}</h2>
                                    <h3><span className={styles.infoQuantity}>Quantity: </span>{product.productQuantity}</h3>
                                </div>
                                <h3 className={styles.productPrice}>
                                    THB {parseFloat(product.productPrice).toFixed(2)}
                                </h3>
                            </div>
                            {index !== cartItems.length - 1 && (
                                <hr style={{ width: '95%', border: '1px solid rgba(86, 178, 128, 0.5)' }} />
                            )}
                        </div>
                    ))}


                    <hr className={styles.separator} />

                    <div className={styles.priceDetail}>
                        <div className={styles.priceRow}>
                            <span className={styles.label}>Subtotal</span>
                            <span className={styles.value}>THB {total.toFixed(2)}</span>
                        </div>

                        <div className={styles.priceRow}>
                            <span className={styles.label}>Shipping</span>
                            <span className={styles.value}>THB {shippingCost.toFixed(2)}</span>
                        </div>

                        <h2 className={styles.totalRow}>
                            <span className={styles.labelTotal}>Total</span>
                            <span className={styles.valueTotal}>THB {(total +  shippingCost).toFixed(2)}</span>
                        </h2>
                    </div>

                    <div className={styles.backAndPayButtons}>
                        <a href="/shipping" className={styles.backButton}>
                            <h3 className={styles.back}>Back to detail</h3>
                        </a>
                        <a href="/confirm">
                            <button className={styles.payButton}>Pay Now</button>
                        </a>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default PaymentPage;
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Navbar from '@/components/Navbar'; 

import styles from '../styles/shipping.module.css';


// ฟังก์ชันการนำทางในหน้าจัดส่ง
const PageNav = () => (
    <nav className={styles.navBar}>
        <div className={styles.bar}>
            <a href="/cart" className={styles.linkCart}>Cart</a>
            <svg className={styles.svgIcon} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 8 14">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 13 5.7-5.326a.909.909 0 0 0 0-1.348L1 1" />
            </svg>
            <a href="/shipping" className={styles.linkShipping}>Shipping</a>
            <svg className={styles.svgIcon} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 8 14">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 13 5.7-5.326a.909.909 0 0 0 0-1.348L1 1" />
            </svg>
            <a href="/payment" className={styles.linkPayment}>Payment</a>
        </div>
    </nav>
);

// คอมโพเนนต์สำหรับการเลือกวิธีการจัดส่ง
const ShippingMethod = ({ handleShippingChange, selectedMethod }) => (
    <div>
        <label className={`${styles.shippingOption} ${selectedMethod === 'Standard' ? styles.selected : ''}`}>
            <input
                type="radio"
                name="shippingMethod"
                value="Standard"
                className={styles.radio}
                onChange={handleShippingChange}
                checked={selectedMethod === 'Standard'}
            />
            Standard Shipping <span className={styles.boldRight}>Free</span>
        </label>
        <label className={`${styles.shippingOption} ${selectedMethod === 'Express' ? styles.selected : ''}`}>
            <input
                type="radio"
                name="shippingMethod"
                value="Express"
                className={styles.radio}
                onChange={handleShippingChange}
                checked={selectedMethod === 'Express'}
            />
            Express Shipping <span className={styles.boldRight}>THB 40.00</span>
        </label>
    </div>
);

const ShippingPage = () => {
    const router = useRouter();
    const { query } = router;

    const [sender, setSender] = useState({
        name: '',
        surname: '',
        address: '',
        city: '',
        postalCode: '',
        province: '',
        country: '',
        note: '',
        contact: '',
        selectedMethod: 'Standard',
    });

    // ตั้งค่าเริ่มต้นของ shippingCost และ subtotal
    const [shippingCost, setShippingCost] = useState(parseFloat(query.shippingCost) || 0);
    const [subtotal, setSubtotal] = useState(parseFloat(query.total) || 0);
    const [total, setTotal] = useState(subtotal + shippingCost);

    const [cartItems, setCartItems] = useState([]);
    const [quantities, setQuantities] = useState([]);


    // ดึงข้อมูลจาก query และแปลงข้อมูล JSON เมื่อ ready
    useEffect(() => {
        if (router.isReady) {
            // ตรวจสอบข้อมูลสินค้า
            const productsFromQuery = query.products ? JSON.parse(query.products) : [];

            // หากไม่พบสินค้าใน query ให้แสดงข้อความแจ้ง
            if (!productsFromQuery || productsFromQuery.length === 0) {
                console.error('No products found in query.');
            }

            // ตั้งค่า cartItems และ quantities
            setCartItems(productsFromQuery);
            setQuantities(productsFromQuery.map(item => item.productQuantity || 1));



            // ตั้งค่าผู้ส่งข้อมูลจาก query
            setSender({
                name: query.name || '',
                surname: query.surname || '',
                address: query.address || '',
                city: query.city || '',
                postalCode: query.postalCode || '',
                province: query.province || '',
                country: query.country || '',
                note: query.note || '',
                contact: query.contact || '',
                selectedMethod: query.selectedMethod || 'Standard',
            });

             // ตั้งค่าค่าใช้จ่ายการจัดส่ง
             setShippingCost(parseFloat(query.shippingCost) || 0);

        }
    }, [router.isReady, query]);

    useEffect(() => {
        setTotal(subtotal + shippingCost);
    }, [shippingCost, subtotal]);

    const handleShippingChange = (event) => {
        const shippingOption = event.target.value;
        let newShippingCost = shippingOption === 'Express' ? 40 : 0;

        setShippingCost(newShippingCost);
        setSender((prevSender) => ({
            ...prevSender,
            selectedMethod: shippingOption,
        }));
    };

    const handleSenderChange = (event) => {
        const { name, value } = event.target;
        setSender((prevSender) => ({
            ...prevSender,
            [name]: value,
        }));
    };


    

    const handleGoToPayment = () => {
                // สร้าง cartData ที่จะส่งไปยัง PaymentPage
                const cartData = cartItems.map((item, index) => {
                    const productImg = item.image || '';
                    const productName = item.name || '';
                    const productQuantity = quantities[index];
                    
                    // แปลง productPrice เป็นตัวเลข
                    let productPrice = parseFloat(item.price);
                    // ตรวจสอบว่า productPrice เป็น NaN หรือไม่
                    if (isNaN(productPrice)) {
                        productPrice = 0.00;
                    }
            
                    return {
                        productImg,
                        productName,
                        productQuantity,
                        productPrice: productPrice.toFixed(2),
                    };

                    const handleShippingClick = () => {
                        const shippingUrl = `/payment?shipping=${encodeURIComponent(product.shipping)}`;
                        router.push(shippingUrl);
                    };
                    
                });
        

        const queryParams = new URLSearchParams({
            name: sender.name,
            surname: sender.surname,
            address: sender.address,
            city: sender.city,
            postalCode: sender.postalCode,
            province: sender.province,
            country: sender.country,
            note: sender.note,
            contact: sender.contact,
            selectedMethod: sender.selectedMethod,
            shippingCost: shippingCost.toFixed(2),
        });

        queryParams.append('products', JSON.stringify(cartData));
        queryParams.append('total', subtotal.toFixed(2));

        // นำทางไปที่ /shipping ด้วยข้อมูล query
        router.push({
            pathname: '/payment',
            query: queryParams.toString(),
        });
    };
    

    return (
        <>
            <Head>
                <title>Shipping</title>
            </Head>
        
        
            <div className={styles.container}>



            
                {/* ส่วนแรก (ซ้าย) */}
                <div className={styles.left}>
                   

                    <div className={styles.flexContainer}>



                    <div className="header-container">
                        <img src="/logo.jpg" alt="Logo" width="150" height="75" className="logo" />
                        <hr className={styles.headline} />
                        <PageNav />
                    </div>



                        <h2 className={styles.contact}>Contact</h2>
                        <form className={styles.contactBox}>
                            <input
                                name="contact"
                                value={sender.contact}
                                onChange={handleSenderChange}
                                placeholder=" example@mail.com"
                                className={styles.textName}
                                required
                            />
                        </form>

                        <h2 className={styles.shippingAddress}>Shipping Address</h2>
                        <form className={styles.nameSurnameBox}>
                            <div>
                                <input
                                    name="name"
                                    value={sender.name}
                                    onChange={handleSenderChange}
                                    placeholder=" Name"
                                    className={styles.textName}
                                    required
                                />
                                <input
                                    name="surname"
                                    value={sender.surname}
                                    onChange={handleSenderChange}
                                    placeholder=" Surname"
                                    className={styles.textName}
                                    required
                                />
                            </div>
                        </form>

                        <form className={styles.addressBox}>
                            <input
                                name="address"
                                value={sender.address}
                                onChange={handleSenderChange}
                                placeholder=" Address"
                                className={styles.textName}
                                required
                            />
                        </form>

                        <form className={styles.noteBox}>
                            <input
                                name="note"
                                value={sender.note}
                                onChange={handleSenderChange}
                                placeholder=" Note (optional)"
                                className={styles.textName}
                            />
                        </form>

                        <form className={styles.locationBox}>
                            <div>
                                <input
                                    name="city"
                                    value={sender.city}
                                    onChange={handleSenderChange}
                                    placeholder=" City"
                                    className={styles.textName}
                                    required
                                />
                                <input
                                    name="postalCode"
                                    value={sender.postalCode}
                                    onChange={handleSenderChange}
                                    placeholder=" Postal Code"
                                    className={styles.textName}
                                    required
                                />
                                <input
                                    name="province"
                                    value={sender.province}
                                    onChange={handleSenderChange}
                                    placeholder=" Province"
                                    className={styles.textName}
                                    required
                                />
                            </div>
                        </form>

                        <form className={styles.countryBox}>
                            <input
                                name="country"
                                value={sender.country}
                                onChange={handleSenderChange}
                                placeholder=" Country/Region"
                                className={styles.textName}
                                required
                            />
                        </form>

                        <div className={styles.backAndPayButtons}>
                            <a href="/cart" className={styles.backButton}>
                                <h3 className={styles.back}>Back to cart</h3>
                            </a>
                            <button className={styles.payButton} onClick={handleGoToPayment}>
                                Go to payment
                            </button>
                        </div>
                    </div>
                </div>
               

                {/* ส่วนหลัง (ขวา) */}
                <div className={styles.right}>

                    <div className={styles.flexContainer}>

                       {cartItems.map((product, index) => (
                            <div key={index} className={styles.productBox}>
                                <span className={styles.imgProduct}>
                                    <img src={product.productImg} alt={product.productName} />
                                </span>
                                <div>
                                    <h2>
                                        <span className={styles.infoLabels}></span> {product.productName}
                                    </h2>
                                    <h2 className={styles.productPrice}>THB {parseFloat(product.productPrice).toFixed(2)}</h2>
                                    <h3>
                                        <span className={styles.infoQuantity}>Quantity : </span> {product.productQuantity}
                                    </h3>
                                </div>
                            </div>
                        ))}

                        <hr className={styles.separator} />

                        <div className={styles.couponContainer}>
                            <form className={styles.couponBox}>
                                <input
                                    type="text"
                                    placeholder="Coupon Code"
                                    className={styles.textCoupon}
                                    required
                                />
                                <button type="submit" className={styles.couponButton}>Add Code</button>
                            </form>
                        </div>

                        <hr className={styles.separator} />
                        

                        <h2 className={styles.shippingMethod}>Shipping Method</h2>

                      <ShippingMethod
                            handleShippingChange={handleShippingChange}
                            selectedMethod={sender.selectedMethod}
                        /> 


                        <hr className={styles.separator} />


                        <div className={styles.priceDetail}>
                            <p className={styles.priceRow}>
                                <span className={styles.label}>Subtotal</span>
                                <span className={styles.value}>THB {(total - shippingCost).toFixed(2)}</span>
                            </p>

                            <p className={styles.priceRow}>
                                <span className={styles.label}>Shipping</span>
                                <span className={styles.value}>THB {shippingCost.toFixed(2)}</span>
                            </p>

                           <hr className={styles.separator} />

                            <h2 className={styles.totalRow}>
                                <span className={styles.labelTotal}>Total</span>
                                <span className={styles.valueTotal}>THB {total.toFixed(2)}</span>
                            </h2>
                        </div> 
                        
                        </div> 
                    </div> 

            </div>

      

           
        </>
    );
};

export default ShippingPage;
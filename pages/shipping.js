import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Navbar from '@/components/Navbar';
import Footer from "@/components/Footer";
import Head from 'next/head';
import styles from "../styles/shipping.module.css";

// Reused for displaying the navigation bar
const PageNav = () => {
    return (
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
};

const ShippingMethod = ({ handleShippingChange, selectedMethod }) => {
    return (
        <div>
            <label className={`${styles.shippingOption} ${selectedMethod === 'Standard' ? styles.selected : ''}`}>
                <input
                    type="radio"
                    name="shippingMethod"
                    id="standard"
                    value="Standard"
                    className={styles.radio}
                    onChange={handleShippingChange}
                    checked={selectedMethod === 'Standard'}
                />
                Standard Shipping - THB 60.00
            </label>
            <label className={`${styles.shippingOption} ${selectedMethod === 'Express' ? styles.selected : ''}`}>
                <input
                    type="radio"
                    name="shippingMethod"
                    id="express"
                    value="Express"
                    className={styles.radio}
                    onChange={handleShippingChange}
                    checked={selectedMethod === 'Express'}
                />
                Express Shipping - THB 100.00
            </label>
        </div>
    );
};

const ShippingPage = () => {
    const router = useRouter();
    const { query } = router;
    
    // Initializing state for the sender data and shipping method
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

    const [shippingCost, setShippingCost] = useState(60); // Default cost for Standard shipping
    const [subtotal, setSubtotal] = useState(parseFloat(query.subtotal || 0)); // Receiving subtotal from query
    const [total, setTotal] = useState(subtotal + shippingCost);
    
    // Update the total cost whenever shipping cost or subtotal changes
    useEffect(() => {
        setTotal(subtotal + shippingCost);
    }, [shippingCost, subtotal]);

    // Handle changes in the shipping method
    const handleShippingChange = (event) => {
        const shippingOption = event.target.value;
        let newShippingCost = 0;

        if (shippingOption === 'Standard') {
            newShippingCost = 60;
        } else if (shippingOption === 'Express') {
            newShippingCost = 100;
        }

        setShippingCost(newShippingCost);
        setSender((prevSender) => ({
            ...prevSender,
            selectedMethod: shippingOption,
        }));
    };

    // Handle navigation to the payment page
    const handleGoToPayment = () => {
        // Create query parameters for the payment page
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
            shippingCost: shippingCost.toFixed(2)
            
        });

        // Navigate to the payment page with query parameters
        router.push(`/payment?${queryParams.toString()}`);
    };

    // Handle input changes for sender information
    const handleSenderChange = (event) => {
        const { name, value } = event.target;
        setSender((prevSender) => ({
            ...prevSender,
            [name]: value,
        }));
    };

    const cartData = cartItems.map((item, index) => ({
        productImg: item.image,
        productName: item.name,
        productQuantity: quantities[index],
        productPrice: item.price.toFixed(2),
    }));

    // รวมค่า total สำหรับการนำไปแสดงใน payment.js
    const total = subtotal;

    // สร้าง query parameters ที่ประกอบไปด้วยข้อมูลทั้งหมด
    const query = {
        products: JSON.stringify(cartData),
        total: total.toFixed(2),
    };

    // ส่งข้อมูลไปยังหน้า shipping
    router.push({
        pathname: '/shipping',
        query: query,
    });


    // Rendering the Shipping page
    return (
        <>
            <Head>
                <title>Shipping</title>
            </Head>
            <Navbar />
            <PageNav />
            <div className={`${styles.container} mx-auto mt-10 px-4 md:px-0`}>
                <div className={styles.flexContainer}>
                    <h2 className={styles.contact}>Contact</h2>
                    <form className={styles.contactBox}>
                        <input
                            name="contact"
                            value={sender.contact}
                            onChange={handleSenderChange}
                            placeholder="example@mail.com"
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
                                placeholder="Name"
                                className={styles.textName}
                                required
                            />
                            <input
                                name="surname"
                                value={sender.surname}
                                onChange={handleSenderChange}
                                placeholder="Surname"
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
                            placeholder="Address"
                            className={styles.textName}
                            required
                        />
                    </form>

                    <form className={styles.noteBox}>
                        <input
                            name="note"
                            value={sender.note}
                            onChange={handleSenderChange}
                            placeholder="Note (optional)"
                            className={styles.textName}
                        />
                    </form>

                    <form className={styles.locationBox}>
                        <div>
                            <input
                                name="city"
                                value={sender.city}
                                onChange={handleSenderChange}
                                placeholder="City"
                                className={styles.textName}
                                required
                            />
                            <input
                                name="postalCode"
                                value={sender.postalCode}
                                onChange={handleSenderChange}
                                placeholder="Postal Code"
                                className={styles.textName}
                                required
                            />
                            <input
                                name="province"
                                value={sender.province}
                                onChange={handleSenderChange}
                                placeholder="Province"
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
                            placeholder="Country/Region"
                            className={styles.textName}
                            required
                        />
                    </form>

                    <h2 className={styles.shippingMethod}>Shipping Method</h2>
                    <ShippingMethod handleShippingChange={handleShippingChange} selectedMethod={sender.selectedMethod} />

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
            <Footer />
        </>
    );
};

export default ShippingPage;

import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Navbar from '@/components/Navbar';
import Footer from "@/components/Footer";
import Head from 'next/head';
import styles from "../styles/shipping.module.css";

const PageNav = () => {
    return (
        <nav className={styles.navBar}>
            <div className={styles.bar}>
                <a href="/cart" className={styles.linkCart}>
                    <p>Cart</p>
                </a>
                <svg
                    className={styles.svgIcon}
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 8 14"
                >
                    <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m1 13 5.7-5.326a.909.909 0 0 0 0-1.348L1 1"
                    />
                </svg>
                <a href="/shipping" className={styles.linkShipping}>
                    <p>Shipping</p>
                </a>
                <svg
                    className={styles.svgIcon}
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 8 14"
                >
                    <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m1 13 5.7-5.326a.909.909 0 0 0 0-1.348L1 1"
                    />
                </svg>
                <a href="/payment" className={styles.linkPayment}>
                    <p>Payment</p>
                </a>
            </div>
        </nav>
    );
};

const ShippingMethod = ({ handleShippingChange }) => {
    const [selectedMethod, setSelectedMethod] = useState('');

    const handleMethodChange = (event) => {
        setSelectedMethod(event.target.value);
        handleShippingChange(event);
    };

    return (
        <div>
            <label className={`${styles.shippingOption} ${selectedMethod === 'Standard' ? styles.selected : ''}`}>
                <input
                    type="radio"
                    name="shippingMethod"
                    id="standard"
                    value="Standard"
                    className={styles.radio}
                    onChange={handleMethodChange}
                    checked={selectedMethod === 'Standard'}
                />
                Standard Shipping
                <span>THB 60.00</span>
            </label>

            <label className={`${styles.shippingOption} ${selectedMethod === 'Express' ? styles.selected : ''}`}>
                <input
                    type="radio"
                    name="shippingMethod"
                    id="express"
                    value="Express"
                    className={styles.radio}
                    onChange={handleMethodChange}
                    checked={selectedMethod === 'Express'}
                />
                Express Shipping
                <span>THB 100.00</span>
            </label>
        </div>
    );
};

const ShippingPage = () => {
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

    const [shippingCost, setShippingCost] = useState(60); // ค่าเริ่มต้นสำหรับ Standard Shipping
    const [subtotal, setSubtotal] = useState(0);
    const [total, setTotal] = useState(subtotal + shippingCost);

    const router = useRouter();

    useEffect(() => {
        // อัปเดตราคารวมใหม่เมื่อค่า shipping cost หรือ subtotal เปลี่ยนแปลง
        setTotal(subtotal + shippingCost);
    }, [shippingCost, subtotal]);

    const handleShippingChange = (event) => {
        const shippingOption = event.target.value;

        let shippingCost = 0;

        if (shippingOption === 'Standard') {
            shippingCost = 60;
        } else if (shippingOption === 'Express') {
            shippingCost = 100;
        }

        setShippingCost(shippingCost);
    };

    const handleGoToPayment = () => {
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
            subtotal: subtotal.toFixed(2),
            shippingCost: shippingCost.toFixed(2),
            total: total.toFixed(2)
        });

        const queryString = queryParams.toString();
        router.push(`/payment?${queryString}`);
    };

    const handleSenderChange = (event) => {
        const { name, value } = event.target;
        setSender((prevSender) => ({
            ...prevSender,
            [name]: value,
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // เพิ่มฟังก์ชันการส่งฟอร์มที่นี่
    };

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
                    <form className={styles.contactBox} onSubmit={handleSubmit}>
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
                    <form className={styles.nameSurnameBox} onSubmit={handleSubmit}>
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

                    <h2 className={styles.shippingMethod}>Shipping Method</h2>
                    <ShippingMethod handleShippingChange={handleShippingChange} />

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

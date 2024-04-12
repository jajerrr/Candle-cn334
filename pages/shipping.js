import { useState } from 'react';
import { useRouter } from 'next/router';
import Navbar from '@/components/Navbar';
import Footer from "@/components/Footer";
import Head from 'next/head';
import styles from "../styles/shipping.module.css";


const PageNav = () => {
    return (
        <nav className={`${styles.navBar}`}>
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

const ShippingMethod = () => {
    const [selectedMethod, setSelectedMethod] = useState('');

    const handleMethodChange = (event) => {
        setSelectedMethod(event.target.value);
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

    const router = useRouter();

    // ฟังก์ชันเพื่อจัดการการเปลี่ยนแปลงของฟอร์มการส่ง
    const handleSenderChange = (e) => {
        const { name, value } = e.target;
        setSender((prevSender) => ({
            ...prevSender,
            [name]: value,
        }));
    };

    // ฟังก์ชันจัดการการส่งฟอร์ม
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // ร้องขอ HTTP ไปยัง API endpoint ที่คุณต้องการ
            const response = await fetch('/api/shipping', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(sender),
            });

            // ตรวจสอบการตอบกลับจาก API
            if (response.ok) {
                const data = await response.json();
                console.log('Data from API:', data);

                // นำผู้ใช้ไปยังหน้าที่ต้องการ (เช่น payment)
                router.push('/payment');
            } else {
                console.error('Failed to submit form:', response.statusText);
            }
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    return (
        <>
            <Head>
                <title>Shipping</title>
            </Head>

            <Navbar/>

            <PageNav/>

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
                        <div>
                            <input
                                name="country"
                                value={sender.country}
                                onChange={handleSenderChange}
                                placeholder=" Country/Region"
                                className={styles.textName}
                                required
                            />
                        </div>
                    </form>

                    <h2 className={styles.shippingMethod}>Shipping Method</h2>
                    <ShippingMethod/>

                    

                    <div className="flex-container py-5">
                        <div className={styles.backAndPayButtons}>
                            <a href="/cart">
                                <h3 className={styles.back}>Back to cart</h3>
                            </a>
                            <a href="/payment">
                                <button className={styles.payButton}>Go to payment</button>
                            </a>
                        </div>
                        
                    </div>
                </div>
            </div>
        <Footer></Footer>
        </>
    );
};

export default ShippingPage;

// pages/detail/[id].js

import Head from "next/head";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import styles from '@/styles/[id].module.css';


const Detail = () => {
    const router = useRouter();
    const { id } = router.query;

    // ข้อมูลสินค้า
    const productData = [
        {
            id: 1,
            name: 'Berry Bliss',
            image: '/index/BerryBliss.jpg',
            price: 59.00,
            description: 'กลิ่นหอมที่เย้ายวนของผลเบอร์รี่ ผักใบเขียวและไวโอเล็ต',
        },
        {
            id: 2,
            name: 'Vanilla Serenity',
            image: '/index/VanillaSerenity.jpg',
            price: 59.00,
            description: 'กลิ่นหอมหวานของวานิลลาและนมอุ่นพร้อมกลิ่นมะพร้าว',
        },
        {
            id: 3,
            name: 'Ember Glow',
            image: '/index/EmberGlow.jpg',
            price: 59.00,
            description: 'กลิ่นหอมเอิร์ธโทนและควันพร้อมกลิ่นหอมหวาน',
        },
        {
            id: 4,
            name: 'Meadow Breeze',
            image: '/index/MeadowBreeze.jpg',
            price: 59.00,
            description: 'กลิ่นหอมสดชื่นของหญ้าที่เพิ่งตัดใหม่และสมุนไพรรสเผ็ด',
        },
        {
            id: 5,
            name: 'Earthy Elegance',
            image: '/index/EarthyElegance.jpg',
            price: 59.00,
            description: 'กลิ่นหอมป่าไม้และลำธารที่ไหลผ่าน',
        },
        {
            id: 6,
            name: 'Zesty Citrus Deligh',
            image: '/index/ZestyCitrusDeligh.jpg',
            price: 59.00,
            description: 'กลิ่นหอมสดชื่นของมะนาวและตะไคร้',
        },
        {
            id: 7,
            name: 'Nordic Forest',
            image: '/index/NordicForest.jpg',
            price: 59.00,
            description: 'กลิ่นที่ปลอบโยนของป่าไม้และอำพัน มีกลิ่นซิตรัสและไซเปรส',
        },
        {
            id: 8,
            name: 'Enchanting Jasmine',
            image: '/index/EnchantingJasmine .jpg',
            price: 59.00,
            description: 'กลิ่นหอมของดอกมะลิ ลูกแพร์ ขิง และดอกลิลลี่แห่งหุบเขา',
        },



        {
            id: 9,
            name: 'Berry Bliss',
            image: '/index/sBerryBliss.jpg',
            price: 129.00,
            description: 'กลิ่นหอมที่เย้ายวนของผลเบอร์รี่ ผักใบเขียวและไวโอเล็ต',
        },
        {
            id: 10,
            name: 'Vanilla Serenity',
            image: '/index/sVanillaSerenity.jpg',
            price: 129.00,
            description: 'กลิ่นหอมหวานของวานิลลาและนมอุ่นพร้อมกลิ่นมะพร้าว',
        },
        {
            id: 11,
            name: 'Ember Glow',
            image: '/index/sEmberGlow.jpg',
            price: 129.00,
            description: 'กลิ่นหอมเอิร์ธโทนและควันพร้อมกลิ่นหอมหวาน',
        },
        {
            id: 12,
            name: 'Meadow Breeze',
            image: '/index/sMeadowBreeze.jpg',
            price: 129.00,
            description: 'กลิ่นหอมสดชื่นของหญ้าที่เพิ่งตัดใหม่และสมุนไพรรสเผ็ด',
        },
        {
            id: 13,
            name: 'Earthy Elegance',
            image: '/index/sEarthyElegance.jpg',
            price: 129.00,
            description: 'กลิ่นหอมป่าไม้และลำธารที่ไหลผ่าน',
        },
        {
            id: 14,
            name: 'Zesty Citrus Deligh',
            image: '/index/sZestyCitrusDelight.jpg',
            price: 129.00,
            description: 'กลิ่นหอมสดชื่นของมะนาวและตะไคร้',
        },
        {
            id: 15,
            name: 'Nordic Forest',
            image: '/index/sNordicForest.jpg',
            price: 129.00,
            description: 'กลิ่นที่ปลอบโยนของป่าไม้และอำพัน มีกลิ่นซิตรัสและไซเปรส',
        },
        {
            id: 16,
            name: 'Enchanting Jasmine',
            image: '/index/sEnchantingJasmine.jpg',
            price: 129.00,
            description: 'กลิ่นหอมของดอกมะลิ ลูกแพร์ ขิง และดอกลิลลี่แห่งหุบเขา',
        },

    ];

    // ใช้ state เพื่อเก็บข้อมูลสินค้าที่ถูกเลือก
    const [selectedProduct, setSelectedProduct] = useState(null);

    useEffect(() => {
        if (id) { // ตรวจสอบว่า id ไม่เป็น undefined
            const foundProduct = productData.find(product => product.id === parseInt(id));
            if (foundProduct) {
                setSelectedProduct(foundProduct);
            } else {
                console.error(`Product with id ${id} not found`);
            }
        }
    }, [id]); // เรียกใช้ฟังก์ชันเมื่อ id เปลี่ยนแปลง

// ฟังก์ชันสำหรับจัดการเหตุการณ์การคลิก Add to Cart
const handleAddToCart = (selectedProduct) => {
    // เพิ่มคุณสมบัติ addedFromButton เพื่อระบุว่าสินค้าถูกเพิ่มจากการกดปุ่ม "Add to Cart"
    selectedProduct.addedFromButton = true;
    // ดึงข้อมูลสินค้าที่มีอยู่ใน Local Storage (หากมี)
    const existingCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    // เพิ่มข้อมูลสินค้าที่เลือกเข้าไปในตัวแปร existingCartItems
    const updatedCartItems = [...existingCartItems, selectedProduct]; // แก้จาก item เป็น selectedProduct
    // บันทึกข้อมูลสินค้าที่อัพเดทลงใน Local Storage
    localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));

    // ส่งข้อมูลสินค้าไปยังหน้า cart.js ผ่าน query parameters
    router.push({
        pathname: '/cart',
        query: {
            items: JSON.stringify(updatedCartItems), // ส่งสินค้าเป็น JSON string
        },
    });
};

    

    return (
        <div>
            <Head>
                <title>Product Detail</title>
            </Head>
            <Navbar />
            
            {selectedProduct && (
            <div className={styles.detailContainer}>
                <img className={styles.image}src={selectedProduct.image} alt={selectedProduct.name} />
                <div>
                    <h1>{selectedProduct.name}</h1>
                    <p className={styles.price}>THB {selectedProduct.price.toFixed(2)}</p>
                    <p className={styles.description}>{selectedProduct.description}</p>

                    <div className={styles.detailBox}>
                        <p>
                            <span className={styles.label}>Wax:</span> Top grade Soy wax that delivers a smoke less, consistent burn<br />
                            <span className={styles.label}>Fragrance:</span> Premium quality ingredients with natural essential oils<br />
                            <span className={styles.label}>Burning Time:</span> 70-75 hours <span className={styles.label}>Dimension:</span> 10cm x 5cm <span className={styles.label}>Weight:</span> 400g
                        </p>
                    </div>

                    <button className={styles.cartButton} onClick={() => handleAddToCart(selectedProduct)}>Add Cart</button>



                </div>
            </div>

            )}
             <Footer />
        </div>
    );
};

export default Detail;

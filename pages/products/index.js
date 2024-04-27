import Head from "next/head";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useRouter } from 'next/router';
import React from 'react';
import styles from '@/styles/index.module.css';
import Link from "next/link";
import { useEffect } from 'react';


const ProductList = ({ products }) => {
    const router = useRouter();

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


    useEffect(() => {
        // บันทึกข้อมูลสินค้าใน localStorage เมื่อหน้า index โหลดขึ้นมา
        localStorage.setItem('products', JSON.stringify(products));
    }, [products]);


    return (
        <div>
            <Head>
                <title>Products</title>
            </Head>
            <Navbar />


            <div className={styles.containertitle}>
                <div className={styles.containertext}>
                    <h1 className={styles.title}>Products</h1>
                    <p className={styles.subtitle}>Order it for you or for your beloved ones</p>
                    <p className={styles.subhead}>"Unveil the Enchantment of Soy Wax: With its Clean Burn and Enduring Aroma, Our Collection Promises<br></br> 
                        Every Candle to be an Exquisite Journey of Scent, Lasting from the First Light to the Last Glimmer."</p>
                </div>
            </div>


                <h2 className={styles.headCol}>Blow your mind</h2>
                <hr className={styles.line} />
                <p className={styles.subCol}>Scented candles will help you relax and let your mind wander with the scent. The beautiful scents<br></br>
                    complement the cosy candlelight to help you set the mood. From fresh fruit to spring flowers,<br></br> 
                    there are a lot of fragrances for you to explore.</p>
           

            <div className={styles.productFlexContainer}>

            {productData.slice(0, 8).map((item, index) => (
                    <Link href={`/detail/${item.id}`} key={index}>
                    <div key={index} className={styles.productItem}>
                        <img src={item.image} alt={item.name} style={{ width: '300px', height: '300px' }} />
                        <div className={styles.textProduct}>
                            <h2 className={styles.productName}>{item.name}</h2>
                            <p className={styles.productPrice}>THB {item.price.toFixed(2)}</p>
                        </div>
                    </div>
                </Link>
                ))}
                 
            </div>


            <h2 className={styles.headCol}>A little, but can feel it.</h2>
            <hr className={styles.line} />
            <p className={styles.subCol}>Just a little bit of the scent of a scented candle can be soothing. The beautiful scent complements<br></br> 
                                        the warm candlelight to help set your mood. From fresh fruits to spring flowers There are many<br></br>
                                        fragrances for you to find.</p>

    
            <div className={styles.productFlexContainer}>

                {productData.slice(8).map((item, index) => (
                    <Link href={`/detail/${item.id}`} key={index}>
                    <div key={index} className={styles.productItem}>
                        <img src={item.image} alt={item.name} style={{ width: '300px', height: '300px' }} />
                        <div className={styles.textProduct}>
                            <h2 className={styles.productName}>{item.name}</h2>
                            <p className={styles.productPrice}>THB {item.price.toFixed(2)}</p>
                        </div>
                    </div>
                </Link>
                ))}
                 
            </div>




            <Footer />
        </div>
       
    );
};

export default ProductList;
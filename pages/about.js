import Head from "next/head";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import styles from '../styles/about.module.css';

export default function about(){
    return(
        <>
            <Head>
                <title>About Us</title>
            </Head>
            <Navbar />

            <div className={styles.container}>            
                <div className={styles.left}>
                    <img src="/about/login.jpg" alt="image" width="400" height="350"  className="image" />
                </div>

                <div className={styles.right}>
                    <h1 className={styles.head}>About</h1>
                    <h3 className={styles.sub}>"Discover the magic of soy wax, known for its clean burn and long-lasting fragrance,<br></br>  
                                                ensuring that every candle from our collection is a delightful experience from start<br></br>  
                                                to finish."</h3>

                    <a href="/product">
                        <button className={styles.button}>Shop Now</button>
                    </a>
                </div>
            </div>
                
                
                {/* เพิ่ม flexcontainer ด้านล่าง */}
                <div className={styles.flexcontainer}>
                <h1 className={styles.values}>My values</h1>
                    <div className={styles.containerBox}>
                        <div className={styles.box}>
                            <h1 className={styles.num}>1</h1>
                            <p className={styles.title}>Integrity and Transparency</p>
                            <p className={styles.content}> We carefully select high-quality<br></br> 
                                ingredients and utilize cutting-edge<br></br> 
                                technology to provide you with<br></br> 
                                premium-quality and transparently<br></br> 
                                sourced candles.</p>
                        </div>
                        <div className={styles.box}>
                            <h1 className={styles.num}>2</h1>
                                <p className={styles.title}>Quality Craftsmanship</p>
                                <p className={styles.content}>Each candle is hand-poured with<br></br> 
                                    meticulous attention to detail, ensuring<br></br> 
                                    that you receive a product of the highest<br></br> 
                                    quality and craftsmanship.</p>
                        </div>
                        
                        <div className={styles.box}>
                            <h1 className={styles.num}>3</h1>
                                <p className={styles.title}>Environmental Responsibility</p>
                                <p className={styles.content}>We are committed to sustainability<br></br> 
                                    and minimize our environmental impact<br></br> 
                                    by using eco-friendly packaging and<br></br> 
                                    sustainable sourcing practices.</p>
                        </div>

                    </div>
                </div>

            <Footer/>
        </>
    )
}

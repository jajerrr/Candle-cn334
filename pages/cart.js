import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Head from "next/head";
import styles from "../styles/cart.module.css"; // Import CSS Module

export default function Cart() {
 return (
 <>
 <Head>
 <title>Cart</title>
 </Head>
 <Navbar />
 
 <div className="container mx-auto mt-10">
 <div className="flex shadow-md my-10">
 <div className="w-3/4 bg-white px-10 py-10">
 <div className="flex justify-between border-b pb-8">
 <h2 className={styles["text-center"]}>Your cart items</h2>
 <p className={styles["underline"]}>Back to shopping</p>
 </div>

 <div className="md:container md:mx-auto w-full">
  <table className={`${styles.table} table-flex border border-slate-300`}>
    <thead>
      <tr>
        <th className="w-1/2">Product</th>
        <th className="w-1/6">Price</th>
        <th className="w-1/6">Quantity</th>
        <th className="w-1/6">Total</th>
      </tr>
    </thead>

    <tbody>
      <tr className="border-b border-slate-300"> <td>The Sliding Mr. Bones (Next Stop, Pottersville)</td>
        <td>THB 450.00</td>
        <td>1961</td>
        <td>THB 450.00</td>
      </tr>
      {/* Add more product data here */}
    </tbody>
  </table>
</div>
 
 
 </div>
 </div>
 </div>
 
 
 </>
 );
 }
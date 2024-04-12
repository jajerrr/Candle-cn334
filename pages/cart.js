import { useState, useEffect } from 'react';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Head from "next/head";
import styles from "../styles/cart.module.css"; 

const ProductList = () => {
  const initialProductItems = [
    {
      name: 'Jasmine (Pink)',
      image: '/cart/jasmine.jpg',
      price: 59,
    },
    {
      name: 'Berries (Red)',
      image: '/cart/berrie.jpg',
      price: 59,
    },
    {
      name: 'Fresh grass (Light green)',
      image: '/cart/grass.jpg',
      price: 59,
    },
    {
      name: 'Vanilla (Light beige)',
      image: '/cart/vanilla.jpg',
      price: 59,
    },
    {
      name: 'Scandinavian Woods (White)',
      image: '/cart/scandinavian.jpg',
      price: 59,
    },
    {
      name: 'Bonfire (Grey)',
      image: '/cart/bonfire.jpg',
      price: 59,
    },
    {
      name: 'Lemon (Yellow)',
      image: '/cart/lemon.jpg',
      price: 59,
    },
    {
      name: 'Vetiver & geranium (Black-turquoise)',
      image: '/cart/vetiver.jpg',
      price: 59,
    },
  ];

  const [subtotal, setSubtotal] = useState(0);
  const [productItems, setProductItems] = useState(initialProductItems);
  const [quantities, setQuantities] = useState(initialProductItems.map(() => 1));

  const updateQuantity = (index, newQuantity) => {
    if (newQuantity <= 0) {
      return;
    }
    const updatedQuantities = [...quantities];
    updatedQuantities[index] = newQuantity;
    setQuantities(updatedQuantities);
  };

  const calculateSubtotal = () => {
    return productItems.reduce((total, item, index) => {
      return total + item.price * quantities[index];
    }, 0);
  };

  const removeItem = (index) => {
    const newProductItems = [...productItems];
    newProductItems.splice(index, 1);
    setProductItems(newProductItems);

    const newQuantities = [...quantities];
    newQuantities.splice(index, 1);
    setQuantities(newQuantities);
  };

  useEffect(() => {
    setSubtotal(calculateSubtotal());
  }, [quantities]);

  return (
    <>
      <Head>
        <title>Cart</title>
      </Head>
      <Navbar/>
      
      <div className={`${styles.container} mx-auto mt-10 px-4 md:px-0`}>
        <div className={styles.flexContainer}>
          <div className={styles.productListContainer}>
            <div className={styles.header}>
              <h1 className={styles.title}>Your cart items</h1>
              <a href="/products">
                <p className={styles.back}>Back to shopping</p>
              </a>
            </div>

            <div className={styles.productTable}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th className={styles.headProduct}>Product</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Total</th>
                  </tr>
                </thead>

                <tbody>
                  {productItems.map((product, index) => (
                    <tr key={index}>
                      <td className={styles.product}>
                        <div className={styles.productInfo}>
                          <img src={product.image} className={styles.productImage} />
                          <div className={styles.productDetails}>
                            <h2 className={styles.productName}>{product.name}</h2>
                            <p className={styles.removeProduct} onClick={() => removeItem(index)}>Remove</p>
                          </div>
                        </div>
                      </td>

                      <td className={styles.centerAlign}>THB {product.price.toFixed(2)}</td>

                      <td>
                        <div className={styles.quantity}>
                          <button className={styles.quantityButtonPlus} onClick={() => updateQuantity(index, quantities[index] - 1)}>-</button>
                          <span className={styles.quantityValue}>{quantities[index]}</span>
                          <button className={styles.quantityButtonMinus} onClick={() => updateQuantity(index, quantities[index] + 1)}>+</button>
                        </div>
                      </td>

                      <td className={styles.centerAlign}>THB {(product.price * quantities[index]).toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>


          <div className="flex-container py-5">
            <div style={{ display: "flex", placeItems: "end", marginLeft: "70%" }}>
              <span className={styles.totalPrice}>Total: ${subtotal.toFixed(2)}</span>
              <a href="/shipping">
                <button className={styles.checkoutButton}>Check Out</button>
              </a>
            </div>
          </div>



        </div>
      </div>
    <Footer></Footer>
    </>
  );
};

export default ProductList;

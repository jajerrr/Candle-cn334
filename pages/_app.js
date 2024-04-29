// _app.js
import React from 'react';
import '../styles/globals.css';
import Navbar from "../components/Navbar";

import { CartProvider } from '../components/CartContext'; // ปรับเปลี่ยน path ตามโครงสร้างของโปรเจคของคุณ

function MyApp({ Component, pageProps }) {
  return (
    <CartProvider>
     
      <Component {...pageProps} />
    </CartProvider>
  );
}

export default MyApp;

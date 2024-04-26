import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';



const ProductList = () => {
    const router = useRouter();
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('/api/products');
                if (!response.ok) {
                    throw new Error('Failed to fetch products');
                }
                const data = await response.json();
                setProducts(data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);

    const handleAddToCart = (item) => {
        const cartItems = [item];
        router.push({
            pathname: '/cart',
            query: {
                items: JSON.stringify(cartItems),
            },
        });
    };



    // ข้อมูลสินค้า
    const productData = [
        {
            name: 'Berry Bliss',
            image: '/index/BerryBliss.jpg',
            price: 59.00,
        },
        {
            name: 'Earthy Elegance',
            image: '/index/EarthyElegance.jpg',
            price: 59.00,
        },
        {
            name: 'Ember Glow',
            image: '/index/EmberGlow.jpg',
            price: 59.00,
        },
        {
            name: 'Enchanting Jasmine',
            image: '/index/EnchantingJasmine .jpg',
            price: 59.00,
        },
        {
            name: 'Meadow Breeze',
            image: '/index/MeadowBreeze.jpg',
            price: 59.00,
        },
        {
            name: 'Nordic Forest',
            image: '/index/NordicForest.jpg',
            price: 59.00,
        },
        {
            name: 'Vanilla Serenity',
            image: '/index/VanillaSerenity.jpg',
            price: 59.00,
        },
        {
            name: 'Zesty Citrus Deligh',
            image: '/index/ZestyCitrusDeligh.jpg',
            price: 59.00,
        },
        
    ];


    

    return (
        <div>
            <h1>Candle</h1>
            {productData.map((item, index) => (
                <div key={index}>
                    <h2>{products.candle_name}</h2>
                    <img src={products.image_url} alt={products.candle_name} style={{ width: '200px', height: '200px' }} />
                    
                    <p>Price: {products.candle_price}</p>
                    <button onClick={() => handleAddToCart(products)}>Add to Cart</button>
                
                </div>
            ))}
        </div>
    );
};

export default ProductList;

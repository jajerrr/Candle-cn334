import Image from "next/image";
import Link from "next/link";


export default function Navbar() {
    return (
        <nav>
            <div className="logo">
                <Link href="/">
                    <img src="/logo.jpg" alt="Logo" width="175" height="100"/>
                </Link>
            </div>
            
            <div className="middle">
                <Link href="/products">Discovery</Link>
                <Link href="/about">About</Link>
                <Link href="/contact">Contact us</Link>
            </div>

            <div className="cart">
                <Link href="/cart">
                    <img src="/cart.png" alt="cart" width="30" height="30"  />
                </Link>
            </div>

            
        </nav>
    );
}

import Link from "next/link";
export default function Navbar() {
    return (
    <nav>
        <div>
            <h1>Candle</h1>
        </div>
        <Link href="/">Home</Link>
        <Link href="/about">About Us</Link>
        <Link href="/products">Products</Link>
    </nav>
    );
}
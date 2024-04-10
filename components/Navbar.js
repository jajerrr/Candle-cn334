import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
    return (
        <nav>
            <div className="logo">
                <Link href="/">
                    <Image src="/home/logo.png" width={100} height={30} alt="logo" />
                </Link>
                
            </div>
            <Link href="/">Home</Link>
            <Link href="/about">About Us</Link>
            <Link href="/products">Discovery</Link>
            <Link href="/contact">Contact us</Link>
            
        </nav>
    );
}

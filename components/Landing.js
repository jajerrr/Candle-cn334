import Image from "next/image";
import Link from "next/link";

export default function Landing() {
    return (
        <land_1>
        <div style={{
            zIndex:-1,
            width:"100%",
            height:"100%",
            
        }}>
            <Image
            src="/home/bghomeHD.jpg"
            alt="background"
            layout="fill"
            objectFit="cover"
        />
        </div>
        
        <div className="container">
            <div className="title">
            <h1>The Nature Candle</h1>
            <p>All can make with natural soy wax</p>

            <Link href="/products" passHref>
                <p className="button">Discover Our Collection</p>
            </Link>
            
            </div>
            </div>
            
        </land_1>
    );
}

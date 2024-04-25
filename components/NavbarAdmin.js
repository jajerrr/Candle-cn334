import Image from "next/image";
import Link from "next/link";


export default function NavbarAdmin() {
    return (
        <nav>
            <div className="logo">
                <Link href="/">
                    <img src="/logo.jpg" alt="Logo" width="175" height="100"/>
                </Link>
            </div>
            
            <div className="middleadmin">
                <Link href="/admin1">Dashboard</Link>
                <Link href="/admin2">Store Management</Link>
            </div>

            <div className="outicon">
                <Link href="/login">
                    <img src="/navbaradmin/signout.png" alt="out" width="40" height="40"  />
                </Link>
            </div>

            
        </nav>
    );
}

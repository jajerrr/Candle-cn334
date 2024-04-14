import Navbar from "@/components/Navbar";
import { useRouter } from 'next/router';



export default function Candle() {
    const router = useRouter(); 

    return (
        <>
            <Navbar />
            <h1>Candle</h1>
            

        </>
    );
}

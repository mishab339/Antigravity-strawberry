import Link from 'next/link';
import { ShoppingBag, ShoppingCart } from 'lucide-react';

export default function Navbar() {
    return (
        <nav className="fixed top-0 inset-x-0 z-50 px-6 py-4 flex items-center justify-between">
            {/* Background with blur, but transparent enough to show through */}
            <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/80 to-transparent pointer-events-none" />

            <div className="relative z-10 flex items-center justify-between w-full max-w-7xl mx-auto">
                <Link href="/" className="text-white font-black text-xl tracking-widest hover:text-red-400 transition-colors">
                    STRAWBERRY.
                </Link>

                <div className="flex items-center gap-6">
                    <Link href="/order" className="text-white hover:text-red-400 transition-colors p-2 hover:bg-white/5 rounded-full" aria-label="Shop">
                        <ShoppingBag size={24} strokeWidth={1.5} />
                    </Link>
                    <button className="text-white hover:text-red-400 transition-colors p-2 hover:bg-white/5 rounded-full" aria-label="Cart">
                        <ShoppingCart size={24} strokeWidth={1.5} />
                    </button>
                </div>
            </div>
        </nav>
    );
}

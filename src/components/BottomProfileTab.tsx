'use client';

import Link from 'next/link';
import { User, Home } from 'lucide-react';
import { usePathname } from 'next/navigation';

export default function BottomProfileTab() {
    const pathname = usePathname();

    return (
        <div className="fixed bottom-6 inset-x-0 z-50 flex justify-center pointer-events-none">
            <div className="bg-black/60 backdrop-blur-xl border border-white/10 p-2 rounded-full flex items-center gap-2 pointer-events-auto shadow-2xl">
                <Link
                    href="/"
                    className={`p-3 rounded-full transition-colors flex items-center justify-center ${pathname === '/' ? 'bg-white/20 text-white' : 'text-gray-400 hover:text-white hover:bg-white/10'}`}
                    aria-label="Home"
                >
                    <Home size={22} strokeWidth={1.5} />
                </Link>
                <Link
                    href="/profile"
                    className={`p-3 rounded-full transition-colors flex items-center justify-center ${pathname === '/profile' || pathname === '/login' || pathname === '/signup' ? 'bg-red-500/80 text-white' : 'text-gray-400 hover:text-white hover:bg-white/10'}`}
                    aria-label="Profile"
                >
                    <User size={22} strokeWidth={1.5} />
                </Link>
            </div>
        </div>
    );
}

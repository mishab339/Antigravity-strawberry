import Link from 'next/link';

export default function CTA() {
    return (
        <section className="h-screen w-full flex flex-col items-center justify-center relative px-4">
            <div className="text-center z-20 backdrop-blur-md bg-black/40 p-12 rounded-3xl border border-white/10 drop-shadow-2xl">
                <h2 className="text-5xl md:text-7xl font-bold text-white mb-6">
                    Taste the <span className="text-red-500">Luxury</span>
                </h2>
                <p className="text-xl text-gray-200 mb-10 font-light max-w-md mx-auto">
                    Elevate your daily refreshment with our premium cold-pressed strawberry juice.
                </p>
                <Link href="/order" className="inline-block px-10 py-4 bg-white text-black hover:bg-black hover:text-white border border-white rounded-full font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:shadow-[0_0_40px_rgba(255,255,255,0.5)]">
                    Pre-Order Now
                </Link>
            </div>
        </section>
    );
}

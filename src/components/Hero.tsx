

export default function Hero() {
    return (
        <section className="h-screen w-full flex flex-col items-center justify-center relative">
            <div className="text-center z-20 px-4 mt-16">
                <h1 className="text-5xl md:text-8xl font-bold tracking-tighter text-white mb-6 animate-fade-in-up drop-shadow-lg">
                    Pure <span className="text-red-500">Strawberry</span>
                </h1>
                <p className="text-lg md:text-2xl text-gray-200 max-w-2xl mx-auto font-light mb-8 drop-shadow-md">
                    The finest, hand-picked strawberries cold-pressed into a luxurious, refreshing juice.
                </p>
                <button className="px-8 py-3 bg-red-600 hover:bg-red-700 text-white rounded-full font-medium transition-colors duration-300">
                    Discover More
                </button>
            </div>
        </section>
    );
}

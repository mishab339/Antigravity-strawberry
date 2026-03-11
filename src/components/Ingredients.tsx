export default function Ingredients() {
    return (
        <section className="min-h-screen w-full flex items-center justify-end px-8 md:px-24">
            <div className="max-w-xl z-20 text-right drop-shadow-xl">
                <h2 className="text-4xl md:text-6xl font-bold text-white mb-8">
                    Nothing But <span className="text-red-500">Nature</span>
                </h2>
                <ul className="text-gray-200 text-2xl font-light space-y-6">
                    <li className="flex items-center justify-end gap-4">
                        <span>100% Organic Strawberries</span>
                        <div className="w-12 h-px bg-red-500" />
                    </li>
                    <li className="flex items-center justify-end gap-4">
                        <span>Zero Added Sugar</span>
                        <div className="w-12 h-px bg-red-500" />
                    </li>
                    <li className="flex items-center justify-end gap-4">
                        <span>No Preservatives</span>
                        <div className="w-12 h-px bg-red-500" />
                    </li>
                    <li className="flex items-center justify-end gap-4">
                        <span>Cold-Pressed</span>
                        <div className="w-12 h-px bg-red-500" />
                    </li>
                </ul>
            </div>
        </section>
    );
}

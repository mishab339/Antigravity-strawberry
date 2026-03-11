'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ShieldCheck, CreditCard, Leaf } from 'lucide-react';

export default function OrderPage() {
    const [quantity, setQuantity] = useState(1);
    const pricePerUnit = 45;

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1, delayChildren: 0.2 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
    };

    return (
        <div className="min-h-screen bg-black text-white pt-32 pb-24 px-4 sm:px-6 relative overflow-hidden">
            {/* Background ambient lighting */}
            <div className="absolute top-0 inset-x-0 h-[500px] bg-red-900/20 rounded-[100%] blur-[120px] -z-10 pointer-events-none opacity-50 translate-y-[-50%]" />
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-rose-900/10 rounded-full blur-[100px] -z-10 pointer-events-none" />

            <div className="max-w-6xl mx-auto z-10 relative">
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={containerVariants}
                    className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24"
                >

                    {/* Left Side: Product Showcase */}
                    <motion.div variants={itemVariants} className="space-y-12">
                        <div>
                            <h1 className="text-5xl md:text-6xl font-bold tracking-tighter mb-4">
                                The <span className="text-red-500">Signature</span> Experience
                            </h1>
                            <p className="text-xl font-light text-gray-400">
                                Reserve your batch of our limited-edition cold-pressed strawberry nectar.
                            </p>
                        </div>

                        <motion.div
                            className="relative aspect-[4/5] w-full max-w-md mx-auto lg:mx-0 rounded-3xl overflow-hidden group"
                            whileHover={{ rotateY: 5, rotateX: -5 }}
                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                            style={{ perspective: 1000 }}
                        >
                            <div className="absolute inset-0 bg-gradient-to-tr from-red-900/40 via-black/40 to-black/80 z-10 pointer-events-none border border-white/10 rounded-3xl" />
                            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm z-0" />

                            {/* Abstract fluid placeholder for product / Could be replaced with real bottle image */}
                            <div className="absolute inset-x-0 bottom-0 h-3/4 bg-gradient-to-t from-red-600/30 to-transparent flex items-center justify-center p-8 z-0">
                                <motion.div
                                    animate={{ y: [0, -15, 0] }}
                                    transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                                    className="w-32 h-64 rounded-[40px] bg-gradient-to-b from-red-400/20 to-red-900/60 border border-white/20 shadow-[0_0_50px_rgba(220,38,38,0.4)] backdrop-blur-md"
                                />
                            </div>

                            <div className="absolute top-6 left-6 z-20">
                                <span className="px-3 py-1 bg-white text-black text-xs font-bold uppercase tracking-widest rounded-full">
                                    Batch 001
                                </span>
                            </div>
                        </motion.div>

                        <div className="grid grid-cols-2 gap-6 pt-4">
                            <div className="flex flex-col gap-2">
                                <Leaf className="text-red-500" size={24} />
                                <h4 className="font-medium text-lg">100% Organic</h4>
                                <p className="text-sm text-gray-400 font-light">Locally sourced, pesticide-free strawberries.</p>
                            </div>
                            <div className="flex flex-col gap-2">
                                <ShieldCheck className="text-red-500" size={24} />
                                <h4 className="font-medium text-lg">Cold Pressed</h4>
                                <p className="text-sm text-gray-400 font-light">Zero heat processing preserves vital nutrients.</p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Side: Order Details & Form */}
                    <motion.div variants={itemVariants} className="flex flex-col justify-center">
                        <div className="bg-white/5 border border-white/10 p-8 md:p-10 rounded-3xl backdrop-blur-xl shadow-2xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/10 blur-[50px] rounded-full pointer-events-none" />

                            <h2 className="text-2xl font-bold mb-8">Checkout Summary</h2>

                            {/* Quantity Selector */}
                            <div className="flex items-center justify-between mb-8 pb-8 border-b border-white/10">
                                <div>
                                    <h3 className="text-lg font-medium">Signature Bottle (750ml)</h3>
                                    <p className="text-gray-400">Subscription available at checkout</p>
                                </div>
                                <div className="flex items-center gap-4 bg-black/40 border border-white/20 rounded-full p-1">
                                    <button
                                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                        className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors text-white"
                                    >
                                        -
                                    </button>
                                    <span className="w-4 text-center font-medium">{quantity}</span>
                                    <button
                                        onClick={() => setQuantity(Math.min(10, quantity + 1))}
                                        className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors text-white"
                                    >
                                        +
                                    </button>
                                </div>
                            </div>

                            {/* Price Breakdown */}
                            <div className="space-y-4 mb-10">
                                <div className="flex justify-between text-gray-300">
                                    <span>Subtotal</span>
                                    <span>${(pricePerUnit * quantity).toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-gray-300">
                                    <span>Overnight Shipping</span>
                                    <span className="text-green-400">Complimentary</span>
                                </div>
                                <div className="flex justify-between text-2xl font-bold text-white pt-4 border-t border-white/10">
                                    <span>Total</span>
                                    <span>${(pricePerUnit * quantity).toFixed(2)}</span>
                                </div>
                            </div>

                            {/* Mock Payment Form */}
                            <div className="space-y-4 mb-8">
                                <div className="relative">
                                    <input
                                        type="email"
                                        placeholder="Email address for receipt"
                                        className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-4 text-white placeholder:text-gray-500 focus:outline-none focus:border-red-500 transition-colors"
                                    />
                                </div>
                                <div className="relative flex items-center group">
                                    <CreditCard className="absolute left-4 text-gray-500 group-focus-within:text-red-500 transition-colors" size={20} />
                                    <input
                                        type="text"
                                        placeholder="Card number"
                                        className="w-full bg-black/50 border border-white/10 rounded-xl pl-12 pr-4 py-4 text-white placeholder:text-gray-500 focus:outline-none focus:border-red-500 transition-colors"
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <input
                                        type="text"
                                        placeholder="MM/YY"
                                        className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-4 text-white placeholder:text-gray-500 focus:outline-none focus:border-red-500 transition-colors"
                                    />
                                    <input
                                        type="text"
                                        placeholder="CVC"
                                        className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-4 text-white placeholder:text-gray-500 focus:outline-none focus:border-red-500 transition-colors"
                                    />
                                </div>
                            </div>

                            {/* Submit Button */}
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="w-full bg-red-600 text-white font-bold text-lg py-5 rounded-xl shadow-[0_0_20px_rgba(220,38,38,0.4)] hover:shadow-[0_0_30px_rgba(220,38,38,0.6)] hover:bg-red-500 transition-all flex items-center justify-center gap-2"
                            >
                                Complete Purchase <ArrowRight size={20} />
                            </motion.button>

                            <div className="mt-6 text-center text-xs text-gray-500 font-light flex items-center justify-center gap-2">
                                <ShieldCheck size={14} />
                                <span>Secure, encrypted checkout powered by Stripe.</span>
                            </div>
                        </div>
                    </motion.div>

                </motion.div>
            </div>
        </div>
    );
}

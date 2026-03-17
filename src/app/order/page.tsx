'use client';

import { useState, useEffect } from 'react';
import { motion, Variants, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { ArrowRight, ShieldCheck, CreditCard, Leaf, X, CheckCircle2, Loader2, MapPin, Phone, Mail, User, Info } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { createOrder } from '@/app/order/actions';
import Script from 'next/script';

declare global {
    interface Window {
        Razorpay: any;
    }
}

export default function OrderPage() {
    const [quantity, setQuantity] = useState(1);
    const [isProcessing, setIsProcessing] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    // Form State
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        zipCode: '',
        state: ''
    });

    const pricePerUnit = 1; // ₹1 as requested
    const totalPrice = pricePerUnit * quantity;
    const router = useRouter();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleProceedToPay = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsProcessing(true);
        setErrorMsg('');

        // Basic validation
        const requiredFields = Object.keys(formData) as Array<keyof typeof formData>;
        for (const field of requiredFields) {
            if (!formData[field]) {
                setErrorMsg(`Please fill in your ${field.replace(/([A-Z])/g, ' $1').toLowerCase()}.`);
                setIsProcessing(false);
                return;
            }
        }

        try {
            const res = await createOrder({
                ...formData,
                quantity,
                totalPrice
            });

            if (res?.error) {
                setErrorMsg(res.error);
                setIsProcessing(false);
            } else if (res?.success && res.orderId) {
                const options = {
                    key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
                    amount: res.amount,
                    currency: res.currency,
                    name: "Strawberry Showcase",
                    description: `Premium Strawberry Juice x ${quantity}`,
                    image: "/next.svg", // Replace with a luxury logo if available
                    order_id: res.orderId,
                    handler: function (response: any) {
                        // On success, redirect to thank-you with orderId/linkId
                        router.push(`/thank-you?razorpay_payment_link_id=${res.orderId}`);
                    },
                    prefill: {
                        name: formData.fullName,
                        email: formData.email,
                        contact: formData.phone,
                    },
                    notes: {
                        address: formData.address,
                    },
                    theme: {
                        color: "#E11D48", // Rose 600
                    },
                    modal: {
                        ondismiss: function () {
                            setIsProcessing(false);
                        }
                    }
                };

                const rzp = new window.Razorpay(options);
                rzp.open();
            }
        } catch (e) {
            setErrorMsg('An unexpected error occurred. Please try again.');
            setIsProcessing(false);
        }
    };

    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1, delayChildren: 0.2 }
        }
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
    };

    return (
        <div className="min-h-screen text-white pt-24 pb-20 px-4 sm:px-6 relative overflow-hidden font-sans">
            <Script
                id="razorpay-checkout-js"
                src="https://checkout.razorpay.com/v1/checkout.js"
                strategy="lazyOnload"
            />
            {/* Deepest Background Color Layer */}
            <div className="absolute inset-0 bg-[#050505] -z-20" />


            {/* Atmospheric Ambient Glows */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none -z-10">
                <div className="absolute top-[-5%] right-[-5%] w-[60%] h-[60%] bg-rose-600/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-5%] left-[-5%] w-[60%] h-[60%] bg-pink-900/10 rounded-full blur-[120px]" />
            </div>

            <div className="max-w-7xl mx-auto z-10 relative">
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={containerVariants}
                    className="grid grid-cols-1 lg:grid-cols-12 gap-12"
                >
                    {/* Header Section */}
                    <motion.div variants={itemVariants} className="lg:col-span-12 mb-8">
                        <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-2 italic uppercase">
                            Secure <span className="text-red-500">Checkout</span>
                        </h1>
                        <p className="text-zinc-500 font-medium tracking-widest uppercase text-xs">Premium Distribution Network</p>
                    </motion.div>

                    {/* LEFT SIDE: Shipping Form */}
                    <motion.div variants={itemVariants} className="lg:col-span-7 space-y-8">
                        <div className="bg-zinc-900/40 border border-white/5 p-8 rounded-[2rem] backdrop-blur-3xl shadow-2xl relative group">
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-red-500/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                            <div className="flex items-center gap-3 mb-8">
                                <div className="p-2 bg-red-500/10 rounded-lg">
                                    <MapPin className="text-red-500" size={20} />
                                </div>
                                <h2 className="text-2xl font-bold tracking-tight">Shipping Information</h2>
                            </div>

                            <form className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-zinc-500 uppercase ml-1">Full Name</label>
                                        <div className="relative flex items-center">
                                            <User className="absolute left-4 text-zinc-600" size={18} />
                                            <input
                                                name="fullName"
                                                value={formData.fullName}
                                                onChange={handleInputChange}
                                                placeholder="Enter full name"
                                                className="w-full bg-black/40 border border-white/10 rounded-2xl pl-12 pr-4 py-4 text-white placeholder:text-zinc-700 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500 transition-all"
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-zinc-500 uppercase ml-1">Email Address</label>
                                        <div className="relative flex items-center">
                                            <Mail className="absolute left-4 text-zinc-600" size={18} />
                                            <input
                                                name="email"
                                                type="email"
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                placeholder="name@luxury.com"
                                                className="w-full bg-black/40 border border-white/10 rounded-2xl pl-12 pr-4 py-4 text-white placeholder:text-zinc-700 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500 transition-all"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-zinc-500 uppercase ml-1">Phone Number</label>
                                    <div className="relative flex items-center">
                                        <Phone className="absolute left-4 text-zinc-600" size={18} />
                                        <input
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleInputChange}
                                            placeholder="+91 000 000 0000"
                                            className="w-full bg-black/40 border border-white/10 rounded-2xl pl-12 pr-4 py-4 text-white placeholder:text-zinc-700 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500 transition-all"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-zinc-500 uppercase ml-1">Street Address</label>
                                    <input
                                        name="address"
                                        value={formData.address}
                                        onChange={handleInputChange}
                                        placeholder="Suite, Building, Area"
                                        className="w-full bg-black/40 border border-white/10 rounded-2xl px-5 py-4 text-white placeholder:text-zinc-700 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500 transition-all"
                                    />
                                </div>

                                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                                    <div className="space-y-2 col-span-2 md:col-span-1">
                                        <label className="text-xs font-bold text-zinc-500 uppercase ml-1">City</label>
                                        <input
                                            name="city"
                                            value={formData.city}
                                            onChange={handleInputChange}
                                            placeholder="Mumbai"
                                            className="w-full bg-black/40 border border-white/10 rounded-2xl px-5 py-4 text-white placeholder:text-zinc-700 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500 transition-all"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-zinc-500 uppercase ml-1">State</label>
                                        <input
                                            name="state"
                                            value={formData.state}
                                            onChange={handleInputChange}
                                            placeholder="Maharashtra"
                                            className="w-full bg-black/40 border border-white/10 rounded-2xl px-5 py-4 text-white placeholder:text-zinc-700 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500 transition-all"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-zinc-500 uppercase ml-1">Zip Code</label>
                                        <input
                                            name="zipCode"
                                            value={formData.zipCode}
                                            onChange={handleInputChange}
                                            placeholder="400001"
                                            className="w-full bg-black/40 border border-white/10 rounded-2xl px-5 py-4 text-white placeholder:text-zinc-700 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500 transition-all"
                                        />
                                    </div>
                                </div>
                            </form>
                        </div>

                        <div className="flex items-center gap-4 p-6 bg-red-950/10 border border-red-900/20 rounded-2xl">
                            <Info className="text-red-500 shrink-0" size={20} />
                            <p className="text-xs text-zinc-400 font-medium">
                                Our bottles are shipped in temperature-controlled sustainable packaging to ensure maximum freshness upon arrival. Expected delivery within 24-48 hours.
                            </p>
                        </div>
                    </motion.div>

                    {/* RIGHT SIDE: Order Summary */}
                    <motion.div variants={itemVariants} className="lg:col-span-5">
                        <div className="sticky top-28 space-y-6">
                            <div className="bg-white/5 border border-white/10 p-8 rounded-[2rem] backdrop-blur-2xl shadow-xl relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-40 h-40 bg-red-500/10 blur-[60px] rounded-full pointer-events-none" />

                                <h3 className="text-xl font-bold mb-8">Order Summary</h3>

                                {/* Product Visualization */}
                                <div className="flex gap-6 mb-8 group">
                                    <div className="relative aspect-[3/4] w-24 bg-black rounded-2xl overflow-hidden border border-white/10 group-hover:border-red-500/30 transition-colors">
                                        <Image
                                            src="/bottle_opening/00120.jpg"
                                            alt="Premium Bottle"
                                            fill
                                            className="object-contain p-2 drop-shadow-lg"
                                        />
                                    </div>
                                    <div className="flex flex-col justify-between py-1">
                                        <div>
                                            <h4 className="font-bold text-lg leading-tight uppercase italic">Premium Strawberry Juice</h4>
                                            <p className="text-zinc-500 text-sm font-medium">Reserve Collection • 750ml</p>
                                        </div>
                                        <div className="text-2xl font-black text-red-500 tracking-tighter">
                                            ₹299 <span className="text-zinc-600 text-[10px] uppercase tracking-widest italic ml-1 font-bold line-through">₹899</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Quantity Control */}
                                <div className="flex items-center justify-between mb-8 pb-8 border-b border-white/5">
                                    <span className="text-sm font-bold text-zinc-400 uppercase tracking-widest">Quantity</span>
                                    <div className="flex items-center gap-5 bg-black/60 border border-white/10 rounded-2xl p-2 px-4 shadow-inner">
                                        <button
                                            onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                            className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors font-bold text-lg"
                                        >
                                            −
                                        </button>
                                        <span className="w-4 text-center font-black text-lg">{quantity}</span>
                                        <button
                                            onClick={() => setQuantity(Math.min(10, quantity + 1))}
                                            className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors font-bold text-lg"
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>

                                {/* Price Breakdown */}
                                <div className="space-y-4 mb-10">
                                    <div className="flex justify-between text-zinc-400 font-medium">
                                        <span>Unit Price</span>
                                        <span>₹299.00</span>
                                    </div>
                                    <div className="flex justify-between text-zinc-400 font-medium">
                                        <span>Exclusive Discount</span>
                                        <span className="text-green-500">−₹298.00 <Info size={12} className="inline ml-1" /></span>
                                    </div>
                                    <div className="flex justify-between text-zinc-400 font-medium">
                                        <span>White-Glove Shipping</span>
                                        <span className="text-zinc-500 italic">Complimentary</span>
                                    </div>
                                    <div className="flex justify-between text-3xl font-black text-white pt-6 border-t border-white/10 tracking-tighter italic uppercase">
                                        <span>Total Amount</span>
                                        <span className="text-red-500">₹{totalPrice.toFixed(2)}</span>
                                    </div>
                                </div>

                                {errorMsg && (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="mb-6 p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-500 text-sm font-medium text-center"
                                    >
                                        {errorMsg}
                                    </motion.div>
                                )}

                                {/* Premium Button */}
                                <motion.button
                                    onClick={handleProceedToPay}
                                    disabled={isProcessing}
                                    whileHover={{ scale: isProcessing ? 1 : 1.02 }}
                                    whileTap={{ scale: isProcessing ? 1 : 0.98 }}
                                    className="group relative w-full"
                                >
                                    <div className="absolute inset-0 bg-red-500 blur-xl opacity-20 group-hover:opacity-40 transition-opacity" />
                                    <div className="relative w-full bg-gradient-to-r from-red-600 via-rose-600 to-red-700 text-white font-black text-xl py-5 rounded-2xl shadow-xl flex items-center justify-center gap-3 overflow-hidden">
                                        {isProcessing ? (
                                            <Loader2 className="animate-spin" size={24} />
                                        ) : (
                                            <>
                                                PROCEED TO PAY <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform" />
                                            </>
                                        )}
                                        {/* Animated shine effect */}
                                        <div className="absolute top-0 -left-[100%] w-1/2 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 animate-[shine_2s_infinite]" />
                                    </div>
                                </motion.button>

                                <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between text-[10px] text-zinc-600 font-bold uppercase tracking-widest">
                                    <div className="flex items-center gap-2">
                                        <ShieldCheck size={14} className="text-zinc-600" />
                                        AES-256 SECURED
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <CreditCard size={14} className="text-zinc-600" />
                                        RAZORPAY GATEWAY
                                    </div>
                                </div>
                            </div>

                            <motion.div
                                className="flex items-center gap-4 px-6 py-4 bg-zinc-900/20 border border-white/5 rounded-2xl grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all cursor-default"
                                whileHover={{ y: -2 }}
                            >
                                <Leaf className="text-red-500" size={18} />
                                <span className="text-xs font-bold text-zinc-500 tracking-wider">CARBON NEUTRAL SUPPLY CHAIN</span>
                            </motion.div>
                        </div>
                    </motion.div>
                </motion.div>
            </div>

            <style jsx global>{`
                @keyframes shine {
                    100% { left: 200%; }
                }
            `}</style>
        </div>
    );
}

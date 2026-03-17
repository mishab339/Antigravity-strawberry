'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { CheckCircle2, ArrowRight, Package, MapPin, CreditCard, ShoppingBag, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { createClient } from '@/utils/supabase/client';

function ThankYouContent() {
    const searchParams = useSearchParams();
    const [order, setOrder] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const supabase = createClient();

    const linkId = searchParams.get('razorpay_payment_link_id');

    useEffect(() => {
        async function fetchOrder() {
            if (!linkId) {
                setLoading(false);
                return;
            }

            const { data, error } = await supabase
                .from('orders')
                .select('*')
                .eq('razorpay_link_id', linkId)
                .single();

            if (!error && data) {
                setOrder(data);
            }
            setLoading(false);
        }

        fetchOrder();
    }, [linkId, supabase]);

    if (loading) {
        return (
            <div className="min-h-screen bg-[#050505] text-white flex items-center justify-center">
                <Loader2 className="animate-spin text-rose-500" size={48} />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#050505] text-white flex flex-col items-center justify-center p-6 relative overflow-hidden font-sans">
            {/* Pink/Rose premium ambient background */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-rose-600/10 rounded-full blur-[160px] -z-10" />
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-pink-900/10 rounded-full blur-[120px] -z-10" />

            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="max-w-2xl w-full text-center space-y-10"
            >
                {/* Large animated green checkmark */}
                <div className="relative inline-block">
                    <motion.div
                        initial={{ scale: 0, rotate: -45 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{
                            type: "spring",
                            stiffness: 200,
                            damping: 15,
                            delay: 0.2
                        }}
                        className="w-32 h-32 bg-green-500/10 rounded-full flex items-center justify-center mx-auto border-2 border-green-500/30 shadow-[0_0_50px_rgba(34,197,94,0.2)]"
                    >
                        <CheckCircle2 className="text-green-500" size={64} />
                    </motion.div>
                    <motion.div
                        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                        transition={{ repeat: Infinity, duration: 3 }}
                        className="absolute inset-0 bg-green-500/20 rounded-full blur-2xl -z-10"
                    />
                </div>

                <div className="space-y-4">
                    <h1 className="text-5xl md:text-7xl font-black tracking-tighter italic uppercase text-white">
                        Order <span className="text-rose-500">Confirmed!</span>
                    </h1>
                    <p className="text-zinc-400 text-lg font-medium leading-relaxed max-w-md mx-auto">
                        Thank you for your purchase. Your order has been received and will be processed shortly.
                    </p>
                </div>

                {/* Order Details Card */}
                {order && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="bg-zinc-900/40 border border-white/5 p-8 rounded-[2.5rem] backdrop-blur-3xl shadow-2xl text-left relative overflow-hidden group"
                    >
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-rose-500/40 to-transparent" />

                        <div className="flex items-center gap-3 mb-8 border-b border-white/5 pb-6">
                            <ShoppingBag className="text-rose-500" size={20} />
                            <h3 className="text-xl font-bold tracking-tight text-white uppercase italic">Order Summary</h3>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-6">
                                <div className="space-y-1">
                                    <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Order ID</p>
                                    <p className="text-sm font-mono text-white font-bold tracking-tighter">#{order.id.slice(0, 13).toUpperCase()}</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Product</p>
                                    <p className="text-base font-bold text-white uppercase italic">Premium Strawberry Juice ({order.quantity}x)</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Amount Paid</p>
                                    <div className="flex items-center gap-2">
                                        <CreditCard className="text-rose-500" size={14} />
                                        <p className="text-xl font-black text-rose-500 tracking-tighter italic">₹{order.total_price.toFixed(2)}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-6 border-t md:border-t-0 md:border-l border-white/5 pt-6 md:pt-0 md:pl-8">
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2">
                                        <MapPin className="text-rose-500" size={14} />
                                        <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Delivery Address</p>
                                    </div>
                                    <div className="text-sm text-zinc-300 leading-relaxed font-medium">
                                        <p className="text-white font-bold">{order.full_name}</p>
                                        <p>{order.address}</p>
                                        <p>{order.city}, {order.state} {order.zip_code}</p>
                                        <p className="mt-2 text-zinc-500 italic">{order.email}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}

                {!order && !loading && (
                    <p className="text-zinc-500 italic text-sm">Initializing order tracking...</p>
                )}

                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6">
                    <Link href="/" className="w-full sm:w-auto">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="w-full sm:w-64 bg-white text-black font-black py-5 rounded-2xl flex items-center justify-center gap-2 hover:bg-rose-50 transition-all shadow-[0_10px_30px_rgba(255,255,255,0.1)] group"
                        >
                            CONTINUE SHOPPING <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                        </motion.button>
                    </Link>
                </div>

                <div className="pt-12">
                    <p className="text-[10px] text-zinc-700 font-bold uppercase tracking-[0.4em]">
                        Pure Essence • Cold Pressed Luxury • Since 2026
                    </p>
                </div>
            </motion.div>
        </div>
    );
}

export default function ThankYouPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-[#050505] text-white flex items-center justify-center">
                <Loader2 className="animate-spin text-rose-500" size={48} />
            </div>
        }>
            <ThankYouContent />
        </Suspense>
    );
}

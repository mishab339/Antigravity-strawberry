import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import Image from 'next/image'

export default async function ProfilePage() {
    const supabase = await createClient()

    const { data: { user }, error } = await supabase.auth.getUser()

    if (error || !user) {
        redirect('/login')
    }

    // Fetch orders
    const { data: orders } = await supabase
        .from('orders')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

    async function signOut() {
        'use server'
        const supabase = await createClient()
        await supabase.auth.signOut()
        redirect('/')
    }

    return (
        <div className="min-h-screen pt-32 pb-24 px-4 sm:px-6 bg-black text-white relative">
            <div className="absolute inset-0 z-0 bg-gradient-to-t from-red-900/10 to-transparent pointer-events-none" />

            <div className="max-w-6xl mx-auto z-10 relative grid grid-cols-1 md:grid-cols-3 gap-12">
                {/* Profile Settings Left Sidebar */}
                <div className="md:col-span-1">
                    <div className="p-8 rounded-3xl border border-white/10 bg-black/40 backdrop-blur-md shadow-2xl sticky top-32">
                        <h2 className="text-3xl font-bold mb-2">Profile</h2>
                        <p className="text-gray-400 mb-8 font-light">Manage your account settings.</p>

                        <div className="bg-white/5 border border-white/10 rounded-xl p-5 mb-8">
                            <p className="text-sm text-gray-400 mb-1">Email</p>
                            <p className="text-lg font-medium">{user.email}</p>
                        </div>

                        <form>
                            <button
                                formAction={signOut}
                                className="w-full bg-transparent border border-red-500/50 text-red-500 py-3 rounded-xl font-bold hover:bg-red-500/10 transition-colors"
                            >
                                Sign Out
                            </button>
                        </form>
                    </div>
                </div>

                {/* Order History Main Column */}
                <div className="md:col-span-2">
                    <h2 className="text-3xl font-bold mb-8">Order History</h2>

                    {orders && orders.length > 0 ? (
                        <div className="space-y-6">
                            {orders.map((order: any) => (
                                <div key={order.id} className="bg-white/5 border border-white/10 rounded-3xl p-6 sm:p-8 hover:bg-white/10 transition-colors">
                                    <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
                                        <div>
                                            <p className="text-sm text-gray-400 mb-1">Order Placed</p>
                                            <p className="font-medium">{new Date(order.created_at).toLocaleDateString()}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-400 mb-1">Total Amount</p>
                                            <p className="font-bold text-red-400">${order.total_price.toFixed(2)}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-400 mb-1">Status</p>
                                            <span className="px-3 py-1 bg-green-500/10 text-green-400 border border-green-500/20 rounded-full text-xs font-bold uppercase tracking-wider">
                                                {order.status}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-6 pt-6 border-t border-white/10">
                                        <div className="w-20 h-24 relative rounded-lg overflow-hidden bg-black/50 border border-white/5">
                                            <Image src="/bottle_opening/00120.jpg" alt="Signature Bottle" fill className="object-cover" />
                                        </div>
                                        <div>
                                            <h4 className="text-xl font-bold mb-1">Signature Bottle</h4>
                                            <p className="text-gray-400 text-sm">Qty: {order.quantity}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="bg-white/5 border border-white/10 rounded-3xl p-12 text-center">
                            <h3 className="text-xl font-bold mb-2">No orders yet</h3>
                            <p className="text-gray-400 mb-6">You haven't placed any orders with us.</p>
                            <a href="/order" className="inline-block px-6 py-3 bg-red-600 text-white font-bold rounded-xl hover:bg-red-500 transition-colors">
                                Browse Collection
                            </a>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

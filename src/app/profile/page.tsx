import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

export default async function ProfilePage() {
    const supabase = await createClient()

    const { data: { user }, error } = await supabase.auth.getUser()

    if (error || !user) {
        redirect('/login')
    }

    async function signOut() {
        'use server'
        const supabase = await createClient()
        await supabase.auth.signOut()
        redirect('/')
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-black text-white px-4 relative">
            <div className="absolute inset-0 z-0 bg-gradient-to-t from-red-900/10 to-black pointer-events-none" />

            <div className="max-w-md w-full z-10 p-8 rounded-3xl border border-white/10 bg-black/40 backdrop-blur-md shadow-2xl">
                <h2 className="text-4xl font-bold mb-2">Profile</h2>
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
    )
}

import { login } from '@/app/login/actions'
import Link from 'next/link'

type Props = {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function LoginPage(props: Props) {
    const searchParams = await props.searchParams
    const errorMessage = searchParams?.errorMessage as string | undefined

    return (
        <div className="min-h-screen flex items-center justify-center bg-black text-white px-4 relative">
            <div className="absolute inset-0 z-0 bg-gradient-to-b from-red-900/20 to-black pointer-events-none" />

            <div className="max-w-md w-full z-10 p-8 rounded-3xl border border-white/10 bg-black/40 backdrop-blur-md shadow-2xl">
                <h2 className="text-4xl font-bold mb-2">Welcome Back</h2>
                <p className="text-gray-400 mb-8 font-light">Sign in to your account to continue.</p>

                {errorMessage && (
                    <div className="bg-red-500/10 border border-red-500/50 text-red-500 px-4 py-3 rounded-xl mb-6 text-sm">
                        {errorMessage}
                    </div>
                )}

                <form className="flex flex-col gap-5">
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2" htmlFor="email">Email</label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            required
                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl outline-none focus:border-red-500 transition-colors"
                            placeholder="you@example.com"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2" htmlFor="password">Password</label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            required
                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl outline-none focus:border-red-500 transition-colors"
                            placeholder="••••••••"
                        />
                    </div>
                    <div className="flex flex-col gap-4 mt-6">
                        <button
                            formAction={login}
                            className="w-full bg-red-600 text-white border border-red-500 py-3 rounded-xl font-bold hover:bg-red-700 transition-colors shadow-[0_0_15px_rgba(220,38,38,0.5)]"
                        >
                            Log in
                        </button>
                        <p className="text-center text-sm text-gray-400 mt-2">
                            Don't have an account?{' '}
                            <Link href="/signup" className="text-white hover:text-red-400 font-medium transition-colors">
                                Sign up
                            </Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    )
}

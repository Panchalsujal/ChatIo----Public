import React, { useState } from 'react'
import { Link, useNavigate, Navigate } from 'react-router'
import { useAuth } from '../hook/useAuth'
import { useSelector } from 'react-redux'

const Login = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const user = useSelector(state => state.auth.user)
    const loading = useSelector(state => state.auth.loading)

    const { handleLogin } = useAuth()
    const navigate = useNavigate()

    const submitForm = async (event) => {
        event.preventDefault()

        const payload = {
            email,
            password
        }

        await handleLogin(payload)
        navigate("/")
    }

    if (!loading && user) {
        return <Navigate to="/" replace />
    }

    return (
        <section className="min-h-screen flex items-center justify-center bg-zinc-950 px-4">
            
            <div className="w-full max-w-md rounded-2xl border border-[#31b8c6]/40 bg-zinc-900/70 p-6 sm:p-8 shadow-2xl shadow-black/50 backdrop-blur">

                <h1 className="text-2xl sm:text-3xl font-bold text-[#31b8c6] text-center sm:text-left">
                    Welcome Back
                </h1>

                <p className="mt-2 text-sm text-zinc-300 text-center sm:text-left">
                    Sign in with your email and password.
                </p>

                <form
                    onSubmit={submitForm}
                    className="mt-6 space-y-4"
                >

                    {/* Email */}
                    <div>
                        <label className="mb-1 block text-sm text-zinc-200">
                            Email
                        </label>

                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="you@example.com"
                            required
                            className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3 text-base text-zinc-100 outline-none focus:border-[#31b8c6]"
                        />
                    </div>


                    {/* Password */}
                    <div>
                        <label className="mb-1 block text-sm text-zinc-200">
                            Password
                        </label>

                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                            required
                            className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3 text-base text-zinc-100 outline-none focus:border-[#31b8c6]"
                        />
                    </div>


                    {/* Button */}
                    <button
                        type="submit"
                        className="w-full rounded-lg bg-[#31b8c6] py-3 text-base font-semibold text-zinc-950 hover:bg-[#45c7d4] transition active:scale-95"
                    >
                        Login
                    </button>

                </form>


                {/* Register link */}
                <p className="mt-6 text-center text-sm text-zinc-300">
                    Don&apos;t have an account?{" "}
                    <Link
                        to="/register"
                        className="font-semibold text-[#31b8c6] hover:text-[#45c7d4]"
                    >
                        Register
                    </Link>
                </p>

            </div>

        </section>
    )
}

export default Login
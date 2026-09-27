import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'

const Login = () => {

    const navigate = useNavigate()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()

        setError('')

        if (!email || !password) {
            setError('Please enter your email and password.')
            toast.error('Please enter your email and password.')
            return
        }

        try {
            setLoading(true)

            const result = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/auth/admin-login`, {
                email,
                password
            })

            const token = result.data.token
            localStorage.setItem('admin_token', token)

            toast.success('Login successful')
            navigate('/')

        } catch (err) {
            const message = err.response?.data?.message || 'Something went wrong. Please try again.'
            setError(message)
            toast.error(message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">

            <div className="w-full max-w-md">

                <div className="text-center mb-8">

                    <div className="w-14 h-14 mx-auto rounded-2xl bg-green-shade flex items-center justify-center mb-4">
                        <span className="text-white text-xl font-bold">
                            J
                        </span>
                    </div>

                    <h1 className="text-2xl font-bold text-gray-900">
                        JOINVIX
                    </h1>

                    <p className="text-sm text-gray-400 mt-1">
                        Admin Panel
                    </p>

                </div>

                <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-7">

                    <div className="mb-6">

                        <h2 className="text-xl font-semibold text-gray-900">
                            Welcome back
                        </h2>

                        <p className="text-sm text-gray-500 mt-1">
                            Sign in to access the admin panel.
                        </p>

                    </div>

                    {error && (
                        <div className="mb-5 px-4 py-3 rounded-lg bg-red-50 border border-red-100 text-sm text-red-600">
                            {error}
                        </div>
                    )}

                    <form
                        onSubmit={handleSubmit}
                        className="space-y-5"
                    >

                        <div>

                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Email Address
                            </label>

                            <input
                                type="email"
                                value={email}
                                onChange={(e) =>
                                    setEmail(e.target.value)
                                }
                                placeholder="Enter your email"
                                autoComplete="email"
                                className="w-full px-4 py-3 rounded-lg border border-gray-200 outline-none text-sm text-gray-900 placeholder:text-gray-400 focus:border-green-shade focus:ring-2 focus:ring-green-shade/10 transition"
                            />

                        </div>

                        <div>

                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Password
                            </label>

                            <input
                                type="password"
                                value={password}
                                onChange={(e) =>
                                    setPassword(e.target.value)
                                }
                                placeholder="Enter your password"
                                autoComplete="current-password"
                                className="w-full px-4 py-3 rounded-lg border border-gray-200 outline-none text-sm text-gray-900 placeholder:text-gray-400 focus:border-green-shade focus:ring-2 focus:ring-green-shade/10 transition"
                            />

                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-3 rounded-lg bg-green-shade text-white text-sm font-semibold hover:bg-green-700 disabled:opacity-60 disabled:cursor-not-allowed transition"
                        >

                            {loading ? 'Signing In...' : 'Sign In'}

                        </button>

                    </form>

                </div>

                <p className="text-center text-xs text-gray-400 mt-6">
                    © {new Date().getFullYear()} JOINVIX. All rights reserved.
                </p>

            </div>

        </div>
    )
}

export default Login
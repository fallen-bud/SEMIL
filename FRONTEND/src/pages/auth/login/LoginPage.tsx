import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '../../../context/AuthContext'
import { useState } from 'react'
import { UserPlus } from 'lucide-react';
import { p } from 'framer-motion/client';

interface LoginFormData {
    Username: string;
    Password: string;
}

const LoginPage: React.FC = () => {
    const navigate = useNavigate();
    const {login, loading,error} = useAuthContext();
    const [formData, setFormData] = useState<LoginFormData>({
        Username: "",
        Password: "",
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name,value} = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }))
    }
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const result = await login(formData);
        if(result.success) {
            navigate("/");
        }
    }
  return (
    <div className='bg-fixed flex min-h-screen items-center justify-center bg-black px-4'>
      <div className='w-full max-w-md rounded-2xl border border-white/10 bg-white/5 p-8 text-white backdrop-blur'>
        {/* Header */}
        <div className='mb-6 text-center'>
            <div className='mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-600/20 text-indigo-400 '>
                <UserPlus/>
            </div>
            <h1 className='text-2xl font-bold'>Login Account</h1>
            <p className='mt-1 text-sm text-gray-400'>Join the plateform to help reunite families</p>
        </div>
         {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="Username"
            placeholder="Username"
            value={formData.Username}
            onChange={handleChange}
            required
            className="w-full rounded-xl bg-black/40 px-4 py-3 text-sm text-white outline-none ring-1 ring-white/10 focus:ring-indigo-500"
          />
          <input
            type="password"
            name="Password"
            placeholder="Password"
            value={formData.Password}
            onChange={handleChange}
            required
            className="w-full rounded-xl bg-black/40 px-4 py-3 text-sm text-white outline-none ring-1 ring-white/10 focus:ring-indigo-500"
          />

          {/* Error Message */}
          {error && (
            <p className='text-sm text-red-400'>{error}</p>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className='w-full rounded-xl cursor-pointer bg-indigo-600 py-3 font-semibold text-white hover:bg-indigo-700 disabled:opacity-60'
            >
            {loading ? "Logging in...": "Login"}
          </button>
        </form>
        {/* Footer */}
        <p className='mt-6 text-center text-sm text-gray-400'>have not account?{" "} 
            <span
            onClick={() => navigate('/register')}
            className='cursor-pointer text-indigo-400 hover:underline'
            >
                Register

            </span>
        </p>
      </div>

    </div>
  )
}

export default LoginPage

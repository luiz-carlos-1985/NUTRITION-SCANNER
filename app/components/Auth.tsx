'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Lock, User, ArrowRight, ArrowLeft, Apple } from 'lucide-react'

interface AuthProps {
  onBack?: () => void
}

export default function Auth({ onBack }: AuthProps) {
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    if (typeof window !== 'undefined') {
      const users = JSON.parse(localStorage.getItem('registeredUsers') || '{}')
      
      if (isLogin) {
        // Login validation
        if (users[email] && users[email].password === password) {
          localStorage.setItem('user', JSON.stringify(users[email]))
          window.location.reload()
        } else {
          alert('Invalid email or password')
          setIsLoading(false)
        }
      } else {
        // Sign up
        if (users[email]) {
          alert('Email already registered')
          setIsLoading(false)
        } else {
          const newUser = {
            email,
            name: name || email.split('@')[0],
            password,
            plan: 'free'
          }
          users[email] = newUser
          localStorage.setItem('registeredUsers', JSON.stringify(users))
          localStorage.setItem('user', JSON.stringify(newUser))
          window.location.reload()
        }
      }
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-green-900 to-emerald-900 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        {/* Back Button */}
        {onBack && (
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={onBack}
            className="flex items-center text-gray-400 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Scanner
          </motion.button>
        )}
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-green rounded-3xl p-6 lg:p-8 w-full"
        >
        {/* Logo */}
        <div className="flex items-center justify-center mb-6">
          <Apple className="w-8 h-8 text-green-400 mr-3" />
          <h1 className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
            Nutrition Scanner
          </h1>
        </div>
        
        <div className="text-center mb-6">
          <h2 className="text-xl lg:text-2xl font-bold text-white mb-2">
            {isLogin ? 'Welcome Back!' : 'Join Us Today!'}
          </h2>
          <p className="text-gray-400 text-sm lg:text-base">
            {isLogin ? 'Sign in to continue scanning' : 'Start your healthy journey'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 lg:space-y-6">
          {!isLogin && (
            <div className="relative">
              <User className="absolute left-3 top-2 lg:top-3 w-4 h-4 lg:w-5 lg:h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full pl-10 lg:pl-12 pr-4 py-2 lg:py-3 bg-black/20 border border-green-500/20 rounded-xl text-white placeholder-gray-400 focus:border-green-400 focus:outline-none text-sm lg:text-base"
                required
              />
            </div>
          )}

          <div className="relative">
            <Mail className="absolute left-3 top-2 lg:top-3 w-4 h-4 lg:w-5 lg:h-5 text-gray-400" />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-10 lg:pl-12 pr-4 py-2 lg:py-3 bg-black/20 border border-green-500/20 rounded-xl text-white placeholder-gray-400 focus:border-green-400 focus:outline-none text-sm lg:text-base"
              required
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-2 lg:top-3 w-4 h-4 lg:w-5 lg:h-5 text-gray-400" />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-10 lg:pl-12 pr-4 py-2 lg:py-3 bg-black/20 border border-green-500/20 rounded-xl text-white placeholder-gray-400 focus:border-green-400 focus:outline-none text-sm lg:text-base"
              required
            />
          </div>

          <motion.button
            whileHover={{ scale: isLoading ? 1 : 1.05 }}
            whileTap={{ scale: isLoading ? 1 : 0.95 }}
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-2 lg:py-3 rounded-xl flex items-center justify-center text-sm lg:text-base transition-all"
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 lg:w-5 lg:h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                {isLogin ? 'Signing In...' : 'Creating Account...'}
              </>
            ) : (
              <>
                {isLogin ? 'Sign In' : 'Create Account'}
                <ArrowRight className="w-4 h-4 lg:w-5 lg:h-5 ml-2" />
              </>
            )}
          </motion.button>
        </form>

        <div className="text-center mt-6">
          <p className="text-gray-400 text-sm lg:text-base">
            {isLogin ? "Don't have an account?" : "Already have an account?"}
          </p>
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-green-400 hover:text-green-300 font-semibold mt-1 transition-colors"
          >
            {isLogin ? 'Create Account' : 'Sign In Instead'}
          </button>
        </div>
        
        {/* Features Preview */}
        <div className="mt-8 pt-6 border-t border-green-500/20">
          <p className="text-center text-gray-400 text-xs lg:text-sm mb-4">What you'll get:</p>
          <div className="grid grid-cols-2 gap-4 text-xs lg:text-sm">
            <div className="text-center">
              <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-green-400">📊</span>
              </div>
              <p className="text-gray-300">Nutrition Analysis</p>
            </div>
            <div className="text-center">
              <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-green-400">🥗</span>
              </div>
              <p className="text-gray-300">Health Recommendations</p>
            </div>
          </div>
        </div>
        
        </motion.div>
      </div>
    </div>
  )
}
'use client'

import { motion } from 'framer-motion'
import { Check, Crown, Zap } from 'lucide-react'

const plans = [
  {
    name: 'Free',
    price: 0,
    features: ['5 scans per day', 'Basic nutrition info', 'Limited alternatives'],
    color: 'gray'
  },
  {
    name: 'Pro',
    price: 9.99,
    features: ['Unlimited scans', 'Detailed analysis', 'AI recommendations', 'Export reports'],
    color: 'green',
    popular: true
  },
  {
    name: 'Premium',
    price: 19.99,
    features: ['Everything in Pro', 'Personal nutritionist chat', 'Custom meal plans', 'Priority support'],
    color: 'purple'
  }
]

export default function Pricing() {
  const handleUpgrade = (plan: string) => {
    if (typeof window !== 'undefined') {
      const user = JSON.parse(localStorage.getItem('user') || '{}')
      user.plan = plan.toLowerCase()
      localStorage.setItem('user', JSON.stringify(user))
      window.location.reload()
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-green-900 to-emerald-900 p-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
            Choose Your Plan
          </h1>
          <p className="text-xl text-gray-300">Unlock the full power of nutrition analysis</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`glass-green rounded-3xl p-6 lg:p-8 relative ${plan.popular ? 'ring-2 ring-green-400' : ''}`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-1 rounded-full text-sm font-semibold flex items-center">
                    <Crown className="w-4 h-4 mr-1" />
                    Most Popular
                  </div>
                </div>
              )}

              <div className="text-center mb-6 lg:mb-8">
                <h3 className="text-xl lg:text-2xl font-bold text-white mb-2">{plan.name}</h3>
                <div className="text-3xl lg:text-4xl font-bold text-green-400 mb-2">
                  ${plan.price}
                  <span className="text-base lg:text-lg text-gray-400">/month</span>
                </div>
              </div>

              <ul className="space-y-3 lg:space-y-4 mb-6 lg:mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center text-gray-300 text-sm lg:text-base">
                    <Check className="w-4 h-4 lg:w-5 lg:h-5 text-green-400 mr-3" />
                    {feature}
                  </li>
                ))}
              </ul>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleUpgrade(plan.name)}
                className={`w-full py-2 lg:py-3 rounded-xl font-semibold transition-all text-sm lg:text-base ${
                  plan.name === 'Free'
                    ? 'bg-gray-600 text-white'
                    : 'bg-gradient-to-r from-green-500 to-emerald-500 text-white'
                }`}
              >
                {plan.name === 'Free' ? 'Current Plan' : 'Upgrade Now'}
              </motion.button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
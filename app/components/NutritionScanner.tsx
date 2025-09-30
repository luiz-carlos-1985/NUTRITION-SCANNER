'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Camera, Scan, Zap, Heart, Shield, TrendingUp, AlertTriangle, CheckCircle, X, BarChart3, Apple, User, Crown, LogOut } from 'lucide-react'
import Auth from './Auth'
import Pricing from './Pricing'
import BarcodeScanner from './BarcodeScanner'

interface NutritionData {
  name: string
  brand: string
  calories: number
  protein: number
  carbs: number
  fat: number
  fiber: number
  sugar: number
  sodium: number
  healthScore: number
  ingredients: string[]
  allergens: string[]
  additives: string[]
  alternatives: string[]
}

export default function NutritionScanner() {
  const [isScanning, setIsScanning] = useState(false)
  const [scannedProduct, setScannedProduct] = useState<NutritionData | null>(null)
  const [showCamera, setShowCamera] = useState(false)
  const [scanProgress, setScanProgress] = useState(0)
  const [user, setUser] = useState<any>(null)
  const [currentView, setCurrentView] = useState('scanner')
  const [dailyScans, setDailyScans] = useState(0)
  const [showBarcodeScanner, setShowBarcodeScanner] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const userData = localStorage.getItem('user')
      if (userData) {
        setUser(JSON.parse(userData))
      }
      const scans = localStorage.getItem('dailyScans')
      if (scans) {
        setDailyScans(parseInt(scans))
      }
    }
  }, [])

  const mockProducts: NutritionData[] = [
    {
      name: 'Chocolate Cookies',
      brand: 'Sweet Brand',
      calories: 450,
      protein: 6,
      carbs: 65,
      fat: 18,
      fiber: 3,
      sugar: 25,
      sodium: 320,
      healthScore: 35,
      ingredients: ['Wheat flour', 'Sugar', 'Palm oil', 'Cocoa powder', 'Salt', 'Baking soda'],
      allergens: ['Gluten', 'May contain nuts'],
      additives: ['E322 (Lecithin)', 'E500 (Sodium carbonate)'],
      alternatives: ['Oat cookies', 'Dark chocolate (70%)', 'Homemade granola bars']
    },
    {
      name: 'Greek Yogurt',
      brand: 'Healthy Choice',
      calories: 130,
      protein: 15,
      carbs: 8,
      fat: 4,
      fiber: 0,
      sugar: 6,
      sodium: 65,
      healthScore: 85,
      ingredients: ['Milk', 'Live cultures', 'Natural flavoring'],
      allergens: ['Milk'],
      additives: [],
      alternatives: ['Plant-based yogurt', 'Kefir', 'Cottage cheese']
    }
  ]

  const startScan = () => {
    if (!user) {
      setCurrentView('auth')
      return
    }
    
    if (user.plan === 'free' && dailyScans >= 5) {
      setCurrentView('pricing')
      return
    }

    setShowBarcodeScanner(true)
  }

  const handleBarcodeScanned = (barcode: string) => {
    setShowBarcodeScanner(false)
    setIsScanning(true)
    setScanProgress(0)
    
    // Database of known products by barcode
    const productDatabase: { [key: string]: NutritionData } = {
      '1234567890123': {
        name: 'Chocolate Cookies',
        brand: 'Sweet Brand',
        calories: 450,
        protein: 6,
        carbs: 65,
        fat: 18,
        fiber: 3,
        sugar: 25,
        sodium: 320,
        healthScore: 35,
        ingredients: ['Wheat flour', 'Sugar', 'Palm oil', 'Cocoa powder', 'Salt', 'Baking soda'],
        allergens: ['Gluten', 'May contain nuts'],
        additives: ['E322 (Lecithin)', 'E500 (Sodium carbonate)'],
        alternatives: ['Oat cookies', 'Dark chocolate (70%)', 'Homemade granola bars']
      },
      '9876543210987': {
        name: 'Greek Yogurt',
        brand: 'Healthy Choice',
        calories: 130,
        protein: 15,
        carbs: 8,
        fat: 4,
        fiber: 0,
        sugar: 6,
        sodium: 65,
        healthScore: 85,
        ingredients: ['Milk', 'Live cultures', 'Natural flavoring'],
        allergens: ['Milk'],
        additives: [],
        alternatives: ['Plant-based yogurt', 'Kefir', 'Cottage cheese']
      },
      '5555555555555': {
        name: 'Organic Granola',
        brand: 'Nature Valley',
        calories: 380,
        protein: 8,
        carbs: 55,
        fat: 14,
        fiber: 6,
        sugar: 12,
        sodium: 180,
        healthScore: 72,
        ingredients: ['Oats', 'Honey', 'Almonds', 'Coconut oil', 'Sea salt'],
        allergens: ['Nuts', 'May contain gluten'],
        additives: [],
        alternatives: ['Homemade granola', 'Muesli', 'Overnight oats']
      }
    }
    
    // Simulate processing the barcode
    const interval = setInterval(() => {
      setScanProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsScanning(false)
          
          // Check if product exists in database
          const product = productDatabase[barcode]
          if (product) {
            setScannedProduct(product)
            
            if (user.plan === 'free' && typeof window !== 'undefined') {
              const newCount = dailyScans + 1
              setDailyScans(newCount)
              localStorage.setItem('dailyScans', newCount.toString())
            }
          } else {
            // Product not found
            setScannedProduct({
              name: 'Product Not Found',
              brand: 'Unknown',
              calories: 0,
              protein: 0,
              carbs: 0,
              fat: 0,
              fiber: 0,
              sugar: 0,
              sodium: 0,
              healthScore: 0,
              ingredients: [],
              allergens: [],
              additives: [],
              alternatives: []
            })
          }
          return 100
        }
        return prev + 10
      })
    }, 100)
  }

  const logout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('user')
      localStorage.removeItem('dailyScans')
      setUser(null)
      setDailyScans(0)
      setCurrentView('scanner')
    }
  }

  const getPlanColor = (plan: string) => {
    switch(plan) {
      case 'pro': return 'text-green-400'
      case 'premium': return 'text-purple-400'
      default: return 'text-gray-400'
    }
  }

  if (currentView === 'auth') {
    return <Auth onBack={() => setCurrentView('scanner')} />
  }

  if (currentView === 'pricing') {
    return <Pricing />
  }

  const getHealthColor = (score: number) => {
    if (score >= 80) return 'text-green-400'
    if (score >= 60) return 'text-yellow-400'
    if (score >= 40) return 'text-orange-400'
    return 'text-red-400'
  }

  const getHealthLabel = (score: number) => {
    if (score >= 80) return 'Excellent'
    if (score >= 60) return 'Good'
    if (score >= 40) return 'Fair'
    return 'Poor'
  }

  return (
    <div className="min-h-screen text-white p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col lg:flex-row justify-between items-center mb-8 lg:mb-12 space-y-4 lg:space-y-0"
        >
          <div className="flex items-center text-center lg:text-left">
            <motion.div
              animate={{ 
                scale: [1, 1.1, 1],
                rotate: [0, 10, -10, 0]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Apple className="w-8 h-8 lg:w-10 lg:h-10 text-green-400 mr-3" />
            </motion.div>
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                Nutrition Scanner
              </h1>
              <p className="text-sm lg:text-base text-gray-300">Scan any food product for instant nutrition insights</p>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4">
            {user ? (
              <>
                <div className="text-center sm:text-right">
                  <p className="text-white font-semibold text-sm lg:text-base">{user.email}</p>
                  <p className={`text-xs lg:text-sm ${getPlanColor(user.plan)} flex items-center justify-center sm:justify-end`}>
                    {user.plan === 'premium' && <Crown className="w-3 h-3 lg:w-4 lg:h-4 mr-1" />}
                    {user.plan.toUpperCase()}
                    {user.plan === 'free' && ` (${dailyScans}/5 scans)`}
                  </p>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setCurrentView('pricing')}
                    className="bg-green-500/20 hover:bg-green-500/30 text-green-400 px-3 lg:px-4 py-2 rounded-lg transition-colors text-sm lg:text-base"
                  >
                    Upgrade
                  </button>
                  <button
                    onClick={logout}
                    className="bg-red-500/20 hover:bg-red-500/30 text-red-400 p-2 rounded-lg transition-colors"
                  >
                    <LogOut className="w-4 h-4 lg:w-5 lg:h-5" />
                  </button>
                </div>
              </>
            ) : (
              <button
                onClick={() => setCurrentView('auth')}
                className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 lg:px-6 py-2 rounded-lg font-semibold flex items-center text-sm lg:text-base"
              >
                <User className="w-4 h-4 lg:w-5 lg:h-5 mr-2" />
                Login
              </button>
            )}
          </div>
        </motion.div>

        {/* Quick Stats */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
        >
          <div className="glass-green rounded-2xl p-4 text-center">
            <Scan className="w-8 h-8 text-green-400 mx-auto mb-2" />
            <h3 className="text-2xl font-bold">2.5M+</h3>
            <p className="text-gray-400 text-sm">Products Scanned</p>
          </div>
          <div className="glass-green rounded-2xl p-4 text-center">
            <Heart className="w-8 h-8 text-red-400 mx-auto mb-2" />
            <h3 className="text-2xl font-bold">95%</h3>
            <p className="text-gray-400 text-sm">Accuracy Rate</p>
          </div>
          <div className="glass-green rounded-2xl p-4 text-center">
            <Shield className="w-8 h-8 text-blue-400 mx-auto mb-2" />
            <h3 className="text-2xl font-bold">1.2M</h3>
            <p className="text-gray-400 text-sm">Users Protected</p>
          </div>
          <div className="glass-green rounded-2xl p-4 text-center">
            <TrendingUp className="w-8 h-8 text-purple-400 mx-auto mb-2" />
            <h3 className="text-2xl font-bold">78%</h3>
            <p className="text-gray-400 text-sm">Health Improvement</p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {/* Scanner */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="glass-green rounded-3xl p-8"
          >
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <Camera className="w-6 h-6 mr-3 text-green-400" />
              Product Scanner
            </h2>
            
            {!isScanning ? (
              <div className="text-center">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="scanner-frame w-64 h-64 sm:w-80 sm:h-80 mx-auto mb-6 flex items-center justify-center bg-black/20"
                >
                  <div className="text-center">
                    <Camera className="w-16 h-16 text-green-400 mx-auto mb-4" />
                    <p className="text-gray-400">Point camera at product barcode</p>
                  </div>
                </motion.div>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={startScan}
                  className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 flex items-center mx-auto"
                >
                  <Scan className="w-6 h-6 mr-2" />
                  {!user ? 'Login to Scan' : user.plan === 'free' && dailyScans >= 5 ? 'Upgrade to Continue' : 'Start Scanning'}
                </motion.button>
              </div>
            ) : (
              <div className="text-center">
                <div className="scanner-frame w-64 h-64 sm:w-80 sm:h-80 mx-auto mb-6 relative bg-black/40">
                  <div className="absolute inset-4 border-2 border-green-400 rounded-lg">
                    <motion.div
                      className="scan-line absolute inset-x-0 h-1 bg-green-400"
                      animate={{ y: [0, 280] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    />
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        className="w-16 h-16 border-4 border-green-400 border-t-transparent rounded-full mx-auto mb-4"
                      />
                      <p className="text-green-400 font-semibold">Processing... {scanProgress}%</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-green-500/20 rounded-full h-2 mb-4">
                  <motion.div 
                    className="nutrition-bar h-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${scanProgress}%` }}
                  />
                </div>
              </div>
            )}
          </motion.div>

          {/* Results */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="glass-green rounded-3xl p-8"
          >
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <BarChart3 className="w-6 h-6 mr-3 text-emerald-400" />
              Nutrition Analysis
            </h2>
            
            <AnimatePresence>
              {!scannedProduct ? (
                <motion.div
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center py-12"
                >
                  <Scan className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-400 text-lg">Scan a product to see detailed nutrition information</p>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6"
                >
                  {/* Product Info */}
                  <div className="bg-black/20 rounded-xl p-4">
                    <h3 className="text-xl font-bold">{scannedProduct.name}</h3>
                    <p className="text-gray-400">{scannedProduct.brand}</p>
                    {scannedProduct.name === 'Product Not Found' && (
                      <div className="mt-3 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                        <p className="text-red-400 text-sm font-semibold">⚠️ Product not in our database</p>
                        <p className="text-gray-400 text-xs mt-1">Try scanning another product or check if the barcode is clear</p>
                      </div>
                    )}
                  </div>
                  
                  {/* Health Score */}
                  {scannedProduct.name !== 'Product Not Found' ? (
                    <div className="text-center bg-black/20 rounded-xl p-6">
                      <h4 className="text-lg font-semibold mb-2">Health Score</h4>
                      <div className={`health-score ${getHealthColor(scannedProduct.healthScore)}`}>
                        {scannedProduct.healthScore}/100
                      </div>
                      <p className={`font-semibold ${getHealthColor(scannedProduct.healthScore)}`}>
                        {getHealthLabel(scannedProduct.healthScore)}
                      </p>
                    </div>
                  ) : (
                    <div className="text-center bg-gray-500/10 rounded-xl p-6">
                      <h4 className="text-lg font-semibold mb-2 text-gray-400">No Data Available</h4>
                      <p className="text-gray-500 text-sm">Product information not found in our database</p>
                    </div>
                  )}
                  
                  {/* Nutrition Facts */}
                  {scannedProduct.name !== 'Product Not Found' ? (
                    <div className="bg-black/20 rounded-xl p-4">
                      <h4 className="font-semibold mb-3">Nutrition per 100g</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span>Calories</span>
                          <span className="font-semibold">{scannedProduct.calories} kcal</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Protein</span>
                          <span className="font-semibold">{scannedProduct.protein}g</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Carbs</span>
                          <span className="font-semibold">{scannedProduct.carbs}g</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Fat</span>
                          <span className="font-semibold">{scannedProduct.fat}g</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Fiber</span>
                          <span className="font-semibold">{scannedProduct.fiber}g</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Sugar</span>
                          <span className="font-semibold text-orange-400">{scannedProduct.sugar}g</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Sodium</span>
                          <span className="font-semibold text-red-400">{scannedProduct.sodium}mg</span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-gray-500/10 rounded-xl p-4 text-center">
                      <h4 className="font-semibold mb-3 text-gray-400">Nutrition Information</h4>
                      <p className="text-gray-500 text-sm">No nutrition data available for this product</p>
                      <div className="mt-4 p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                        <p className="text-blue-400 text-xs">💡 Tip: Try scanning products from major brands for better results</p>
                      </div>
                    </div>
                  )}
                  
                  {/* Premium Features */}
                  {user?.plan !== 'free' && (
                    <div className="bg-purple-500/10 border border-purple-500/20 rounded-xl p-4">
                      <h4 className="font-semibold mb-3 flex items-center text-purple-400">
                        <Crown className="w-5 h-5 mr-2" />
                        AI Analysis
                      </h4>
                      <p className="text-sm text-purple-300">This product contains high sugar levels. Consider reducing portion size or choosing alternatives with natural sweeteners.</p>
                    </div>
                  )}
                  
                  {/* Warnings */}
                  {(scannedProduct.allergens.length > 0 || scannedProduct.additives.length > 0) && (
                    <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4">
                      <h4 className="font-semibold mb-3 flex items-center text-red-400">
                        <AlertTriangle className="w-5 h-5 mr-2" />
                        Warnings
                      </h4>
                      {scannedProduct.allergens.length > 0 && (
                        <div className="mb-2">
                          <span className="text-sm font-semibold">Allergens: </span>
                          <span className="text-sm text-red-300">{scannedProduct.allergens.join(', ')}</span>
                        </div>
                      )}
                      {scannedProduct.additives.length > 0 && (
                        <div>
                          <span className="text-sm font-semibold">Additives: </span>
                          <span className="text-sm text-orange-300">{scannedProduct.additives.join(', ')}</span>
                        </div>
                      )}
                    </div>
                  )}
                  
                  {/* Alternatives */}
                  {scannedProduct.name !== 'Product Not Found' && scannedProduct.alternatives.length > 0 && (
                    <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-4">
                      <h4 className="font-semibold mb-3 flex items-center text-green-400">
                        <CheckCircle className="w-5 h-5 mr-2" />
                        Healthier Alternatives
                      </h4>
                      <div className="space-y-2">
                        {(user?.plan === 'free' ? scannedProduct.alternatives.slice(0, 2) : scannedProduct.alternatives).map((alt, index) => (
                          <div key={index} className="flex items-center text-sm">
                            <div className="w-2 h-2 bg-green-400 rounded-full mr-3" />
                            {alt}
                          </div>
                        ))}
                        {user?.plan === 'free' && scannedProduct.alternatives.length > 2 && (
                          <div className="text-center mt-3">
                            <button
                              onClick={() => setCurrentView('pricing')}
                              className="text-green-400 hover:text-green-300 text-sm font-semibold"
                            >
                              Upgrade to see {scannedProduct.alternatives.length - 2} more alternatives
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                  
                  <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setScannedProduct(null)}
                      className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-semibold py-3 px-4 lg:px-6 rounded-xl transition-all duration-300 text-sm lg:text-base"
                    >
                      Scan Another Product
                    </motion.button>
                    {user?.plan !== 'free' && (
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-purple-500/20 hover:bg-purple-500/30 text-purple-400 font-semibold py-3 px-4 lg:px-6 rounded-xl transition-all duration-300 text-sm lg:text-base"
                      >
                        Export Report
                      </motion.button>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Features */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <div className="glass-green rounded-2xl p-6 text-center">
            <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Zap className="w-8 h-8 text-green-400" />
            </div>
            <h3 className="text-xl font-bold mb-2">Instant Analysis</h3>
            <p className="text-gray-400">Get comprehensive nutrition data in seconds</p>
          </div>
          
          <div className="glass-green rounded-2xl p-6 text-center">
            <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-blue-400" />
            </div>
            <h3 className="text-xl font-bold mb-2">Allergen Detection</h3>
            <p className="text-gray-400">Identify potential allergens and harmful additives</p>
          </div>
          
          <div className="glass-green rounded-2xl p-6 text-center">
            <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="w-8 h-8 text-purple-400" />
            </div>
            <h3 className="text-xl font-bold mb-2">Smart Recommendations</h3>
            <p className="text-gray-400">Discover healthier alternatives tailored to you</p>
          </div>
        </motion.div>
        
        {!user && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="mt-12 text-center"
          >
            <div className="glass-green rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-4 text-white">Ready to get started?</h3>
              <p className="text-gray-300 mb-6">Join thousands of users making healthier food choices</p>
              <button
                onClick={() => setCurrentView('auth')}
                className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-8 py-3 rounded-xl font-semibold"
              >
                Sign Up Free
              </button>
            </div>
          </motion.div>
        )}
      </div>
      
      {/* Barcode Scanner Modal */}
      {showBarcodeScanner && (
        <BarcodeScanner
          onScan={handleBarcodeScanned}
          onClose={() => setShowBarcodeScanner(false)}
        />
      )}
    </div>
  )
}
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Camera, Scan, Zap, Heart, Shield, TrendingUp, AlertTriangle, CheckCircle, X, BarChart3, Apple } from 'lucide-react'

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
    setShowCamera(true)
    setIsScanning(true)
    setScanProgress(0)
    
    // Simulate scanning progress
    const interval = setInterval(() => {
      setScanProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsScanning(false)
          setShowCamera(false)
          // Randomly select a mock product
          const randomProduct = mockProducts[Math.floor(Math.random() * mockProducts.length)]
          setScannedProduct(randomProduct)
          return 100
        }
        return prev + 10
      })
    }, 200)
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
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center mb-4">
            <motion.div
              animate={{ 
                scale: [1, 1.1, 1],
                rotate: [0, 10, -10, 0]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Apple className="w-10 h-10 text-green-400 mr-3" />
            </motion.div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
              Nutrition Scanner
            </h1>
          </div>
          <p className="text-xl text-gray-300">Scan any food product for instant nutrition insights</p>
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
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
            
            {!showCamera ? (
              <div className="text-center">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="scanner-frame w-80 h-80 mx-auto mb-6 flex items-center justify-center bg-black/20"
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
                  Start Scanning
                </motion.button>
              </div>
            ) : (
              <div className="text-center">
                <div className="scanner-frame w-80 h-80 mx-auto mb-6 relative bg-black/40">
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
                      <p className="text-green-400 font-semibold">Scanning... {scanProgress}%</p>
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
                
                <button
                  onClick={() => {
                    setShowCamera(false)
                    setIsScanning(false)
                    setScanProgress(0)
                  }}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Cancel Scan
                </button>
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
                  </div>
                  
                  {/* Health Score */}
                  <div className="text-center bg-black/20 rounded-xl p-6">
                    <h4 className="text-lg font-semibold mb-2">Health Score</h4>
                    <div className={`health-score ${getHealthColor(scannedProduct.healthScore)}`}>
                      {scannedProduct.healthScore}/100
                    </div>
                    <p className={`font-semibold ${getHealthColor(scannedProduct.healthScore)}`}>
                      {getHealthLabel(scannedProduct.healthScore)}
                    </p>
                  </div>
                  
                  {/* Nutrition Facts */}
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
                  <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-4">
                    <h4 className="font-semibold mb-3 flex items-center text-green-400">
                      <CheckCircle className="w-5 h-5 mr-2" />
                      Healthier Alternatives
                    </h4>
                    <div className="space-y-2">
                      {scannedProduct.alternatives.map((alt, index) => (
                        <div key={index} className="flex items-center text-sm">
                          <div className="w-2 h-2 bg-green-400 rounded-full mr-3" />
                          {alt}
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setScannedProduct(null)}
                    className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300"
                  >
                    Scan Another Product
                  </motion.button>
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
      </div>
    </div>
  )
}
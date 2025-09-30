'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { X, Camera } from 'lucide-react'

interface BarcodeScannerProps {
  onScan: (barcode: string) => void
  onClose: () => void
}

export default function BarcodeScanner({ onScan, onClose }: BarcodeScannerProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    startCamera()
    return () => stopCamera()
  }, [])

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' }
      })
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        videoRef.current.play()
        setIsLoading(false)
        startScanning()
      }
    } catch (err) {
      setError('Camera access denied or not available')
      setIsLoading(false)
    }
  }

  const stopCamera = () => {
    if (videoRef.current?.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks()
      tracks.forEach(track => track.stop())
    }
  }

  const startScanning = () => {
    // For demo purposes, simulate "no barcode detected" after 5 seconds
    setTimeout(() => {
      // Simulate no barcode found - return unknown code
      onScan('0000000000000')
    }, 5000)
  }

  if (error) {
    return (
      <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-green rounded-3xl p-8 max-w-md w-full text-center"
        >
          <Camera className="w-16 h-16 text-red-400 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">Camera Error</h3>
          <p className="text-gray-300 mb-6">{error}</p>
          <button
            onClick={onClose}
            className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-3 rounded-xl font-semibold"
          >
            Try Again
          </button>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 bg-black z-50">
      <div className="relative w-full h-full">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 z-10 bg-black/50 text-white p-3 rounded-full hover:bg-black/70 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Camera View */}
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          playsInline
          muted
        />

        {/* Scanning Overlay */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative">
            {/* Scanning Frame */}
            <div className="w-80 h-60 border-4 border-green-400 rounded-2xl relative">
              <div className="absolute -top-2 -left-2 w-8 h-8 border-l-4 border-t-4 border-green-400 rounded-tl-lg" />
              <div className="absolute -top-2 -right-2 w-8 h-8 border-r-4 border-t-4 border-green-400 rounded-tr-lg" />
              <div className="absolute -bottom-2 -left-2 w-8 h-8 border-l-4 border-b-4 border-green-400 rounded-bl-lg" />
              <div className="absolute -bottom-2 -right-2 w-8 h-8 border-r-4 border-b-4 border-green-400 rounded-br-lg" />
              
              {/* Scanning Line */}
              <motion.div
                className="absolute inset-x-0 h-1 bg-green-400 shadow-lg"
                animate={{ y: [0, 240] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>

            {/* Instructions */}
            <div className="absolute -bottom-20 left-1/2 transform -translate-x-1/2 text-center">
              <p className="text-white font-semibold mb-2">Position barcode in the frame</p>
              <p className="text-gray-300 text-sm">Hold steady for automatic scanning</p>
            </div>
          </div>
        </div>

        {/* Loading Overlay */}
        {isLoading && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-green-400 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
              <p className="text-white font-semibold">Starting camera...</p>
            </div>
          </div>
        )}

        {/* Hidden Canvas for Processing */}
        <canvas ref={canvasRef} className="hidden" />
      </div>
    </div>
  )
}
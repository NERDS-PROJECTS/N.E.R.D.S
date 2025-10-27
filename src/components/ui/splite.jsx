'use client'

import { Suspense, lazy, useState, useEffect } from 'react'
const Spline = lazy(() => import('@splinetool/react-spline'))

/**
 * SplineScene component for rendering 3D scenes with responsive scaling
 * @param {string} scene - URL of the Spline scene
 * @param {string} className - CSS classes for styling
 * @param {number} mobileScale - Scale factor for mobile devices (default: 0.8)
 * @param {number} desktopScale - Scale factor for desktop devices (default: 1.5)
 */
// eslint-disable-next-line react/prop-types
export function SplineScene({ scene, className, mobileScale = 0.8, desktopScale = 1.5 }) {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  return (
    <Suspense 
      fallback={
        <div className="w-full h-full flex items-center justify-center">
          <span className="loader"></span>
        </div>
      }
    >
      <Spline
        scene={scene}
        className={`${className}`}
        style={{
          transform: `scale(${isMobile ? mobileScale : desktopScale})`,
          transformOrigin: 'center center'
        }}
      />
    </Suspense>
  )
}

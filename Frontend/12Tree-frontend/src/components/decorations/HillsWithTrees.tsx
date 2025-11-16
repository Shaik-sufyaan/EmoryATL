import CartoonTree from './CartoonTree'
import { useContext } from 'react'
import { SidebarContext } from '@context/SidebarContext'

export default function HillsWithTrees() {
  // Try to get sidebar state if available (won't be on login/signup)
  const sidebarContext = useContext(SidebarContext)
  const sidebarOpen = sidebarContext?.sidebarOpen ?? true

  return (
    <div
      className={`absolute bottom-0 left-0 right-0 pointer-events-none transition-all duration-300`}
      style={{
        zIndex: 1,
        marginLeft: sidebarOpen ? '0' : '0'
      }}
    >
      {/* Decorative rolling hills on top */}
      <div
        className="hill"
        style={{
          transform: 'translateY(-10px) scale(1.1)',
          opacity: 1.0,
          background: 'linear-gradient(180deg, #95D658 0%, #7BC950 100%)'
        }}
      />

      {/* Flowers scattered on hills */}
      {[...Array(15)].map((_, i) => (
        <div
          key={`flower-${i}`}
          className="absolute text-xl animate-sway-gentle"
          style={{
            bottom: `${5 + (i % 5) * 6}vh`,
            left: `${5 + i * 6}%`,
            animationDelay: `${i * 0.2}s`,
            animationDuration: `${2 + (i % 3)}s`,
          }}
        >
          {i % 4 === 0 ? '🌸' : i % 4 === 1 ? '🌼' : i % 4 === 2 ? '🌺' : '🌻'}
        </div>
      ))}

      {/* Grass tufts */}
      {[...Array(20)].map((_, i) => (
        <div
          key={`grass-${i}`}
          className="absolute text-sm animate-sway-gentle"
          style={{
            bottom: `${2 + (i % 3) * 3}vh`,
            left: `${i * 5}%`,
            animationDelay: `${i * 0.15}s`,
            animationDuration: `${1.5 + (i % 2)}s`,
          }}
        >
          🌿
        </div>
      ))}

      {/* Forest of trees - ALL within green area (35vh from bottom) */}
      {/* Back row - small trees at 18-20vh from bottom (tops at ~30vh) */}
      <CartoonTree variant={2} className="absolute w-12 h-14 opacity-100 animate-tree-sway" style={{ bottom: '18vh', left: '8%', animationDelay: '0s' }} />
      <CartoonTree variant={1} className="absolute w-12 h-14 opacity-100 animate-tree-sway" style={{ bottom: '19vh', left: '15%', animationDelay: '0.2s' }} />
      <CartoonTree variant={3} className="absolute w-12 h-14 opacity-100 animate-tree-sway" style={{ bottom: '18vh', left: '22%', animationDelay: '0.4s' }} />
      <CartoonTree variant={2} className="absolute w-12 h-14 opacity-100 animate-tree-sway" style={{ bottom: '18.5vh', left: '32%', animationDelay: '0.6s' }} />
      <CartoonTree variant={1} className="absolute w-12 h-14 opacity-100 animate-tree-sway" style={{ bottom: '18vh', left: '42%', animationDelay: '0.8s' }} />
      <CartoonTree variant={3} className="absolute w-12 h-14 opacity-100 animate-tree-sway" style={{ bottom: '19vh', left: '52%', animationDelay: '1s' }} />
      <CartoonTree variant={2} className="absolute w-12 h-14 opacity-100 animate-tree-sway" style={{ bottom: '18vh', left: '62%', animationDelay: '1.2s' }} />
      <CartoonTree variant={1} className="absolute w-11 h-13 opacity-100 animate-tree-sway" style={{ bottom: '18.5vh', left: '72%', animationDelay: '1.4s' }} />
      <CartoonTree variant={3} className="absolute w-12 h-14 opacity-100 animate-tree-sway" style={{ bottom: '18vh', left: '82%', animationDelay: '1.6s' }} />
      <CartoonTree variant={2} className="absolute w-11 h-13 opacity-100 animate-tree-sway" style={{ bottom: '19vh', left: '92%', animationDelay: '1.8s' }} />

      {/* Middle row - medium trees at 10-11vh from bottom (tops at ~26vh) */}
      <CartoonTree variant={1} className="absolute w-12 h-14 opacity-100 animate-tree-sway" style={{ bottom: '10vh', left: '5%', animationDelay: '0.1s' }} />
      <CartoonTree variant={3} className="absolute w-12 h-14 opacity-100 animate-tree-sway" style={{ bottom: '10vh', left: '18%', animationDelay: '0.3s' }} />
      <CartoonTree variant={2} className="absolute w-12 h-14 opacity-100 animate-tree-sway" style={{ bottom: '11vh', left: '28%', animationDelay: '0.5s' }} />
      <CartoonTree variant={1} className="absolute w-12 h-14 opacity-100 animate-tree-sway" style={{ bottom: '10vh', left: '40%', animationDelay: '0.7s' }} />
      <CartoonTree variant={3} className="absolute w-12 h-14 opacity-100 animate-tree-sway" style={{ bottom: '11vh', left: '52%', animationDelay: '0.9s' }} />
      <CartoonTree variant={2} className="absolute w-12 h-14 opacity-100 animate-tree-sway" style={{ bottom: '10vh', left: '62%', animationDelay: '1.1s' }} />
      <CartoonTree variant={1} className="absolute w-12 h-14 opacity-100 animate-tree-sway" style={{ bottom: '11vh', left: '75%', animationDelay: '1.3s' }} />
      <CartoonTree variant={3} className="absolute w-12 h-14 opacity-100 animate-tree-sway" style={{ bottom: '10vh', left: '88%', animationDelay: '1.5s' }} />

      {/* Front row - larger trees at 2-3vh from bottom (tops at ~22vh) */}
      <CartoonTree variant={2} className="absolute w-12 h-14 opacity-100 animate-tree-sway" style={{ bottom: '2vh', left: '3%', animationDelay: '0s' }} />
      <CartoonTree variant={3} className="absolute w-12 h-14 opacity-100 animate-tree-sway" style={{ bottom: '2vh', left: '15%', animationDelay: '0.2s' }} />
      <CartoonTree variant={1} className="absolute w-12 h-14 opacity-100 animate-tree-sway" style={{ bottom: '3vh', left: '28%', animationDelay: '0.4s' }} />
      <CartoonTree variant={2} className="absolute w-12 h-14 opacity-100 animate-tree-sway" style={{ bottom: '2vh', left: '41%', animationDelay: '0.6s' }} />
      <CartoonTree variant={3} className="absolute w-12 h-14 opacity-100 animate-tree-sway" style={{ bottom: '3vh', left: '54%', animationDelay: '0.8s' }} />
      <CartoonTree variant={1} className="absolute w-12 h-14 opacity-100 animate-tree-sway" style={{ bottom: '2vh', left: '67%', animationDelay: '1s' }} />
      <CartoonTree variant={2} className="absolute w-12 h-14 opacity-100 animate-tree-sway" style={{ bottom: '3vh', left: '80%', animationDelay: '1.2s' }} />
      <CartoonTree variant={3} className="absolute w-12 h-14 opacity-100 animate-tree-sway" style={{ bottom: '2vh', left: '93%', animationDelay: '1.4s' }} />
    </div>
  )
}

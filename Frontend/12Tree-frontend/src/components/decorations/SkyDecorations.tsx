import Clouds from './Clouds'
import Sun from './Sun'

export default function SkyDecorations() {
  return (
    <>
      {/* Realistic SVG Clouds drifting across sky */}
      <Clouds />

      {/* Sun with glow and animated rays */}
      <Sun />

      {/* Music notes floating - positioned throughout the screen */}
      <div className="absolute text-pink-400 text-3xl opacity-40 float" style={{ top: '35%', left: '40%', animationDelay: '0.5s' }}>🎵</div>
      <div className="absolute text-pink-300 text-3xl opacity-40 float" style={{ top: '55%', right: '20%', animationDelay: '1.5s' }}>🎶</div>
      <div className="absolute text-pink-400 text-2xl opacity-40 float" style={{ top: '45%', right: '35%', animationDelay: '2.5s' }}>♪</div>
      <div className="absolute text-purple-400 text-4xl opacity-35 float" style={{ top: '20%', left: '65%', animationDelay: '0.8s' }}>🎵</div>
      <div className="absolute text-lime-400 text-2xl opacity-45 float" style={{ top: '65%', left: '55%', animationDelay: '2s' }}>🎶</div>
      <div className="absolute text-orange-300 text-3xl opacity-40 float" style={{ top: '25%', right: '15%', animationDelay: '1.2s' }}>♪</div>
      <div className="absolute text-pink-300 text-2xl opacity-35 float" style={{ top: '70%', right: '45%', animationDelay: '3s' }}>🎵</div>
      <div className="absolute text-purple-300 text-3xl opacity-40 float" style={{ top: '15%', left: '75%', animationDelay: '0.3s' }}>🎶</div>
      <div className="absolute text-lime-300 text-2xl opacity-45 float" style={{ top: '50%', left: '30%', animationDelay: '1.8s' }}>♪</div>
      <div className="absolute text-orange-400 text-4xl opacity-35 float" style={{ top: '40%', right: '50%', animationDelay: '2.3s' }}>🎵</div>
      <div className="absolute text-pink-400 text-2xl opacity-40 float" style={{ top: '60%', left: '70%', animationDelay: '1s' }}>🎶</div>
      <div className="absolute text-purple-400 text-3xl opacity-35 float" style={{ top: '30%', right: '60%', animationDelay: '2.8s' }}>♪</div>
    </>
  )
}

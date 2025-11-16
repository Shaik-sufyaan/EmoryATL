export default function Sun() {
  return (
    <div className="absolute top-8 right-12 pointer-events-none">
      {/* Sun Glow */}
      <div className="absolute inset-0 rounded-full blur-3xl bg-yellow/30 w-32 h-32 animate-pulse-slow" />

      {/* Sun Core */}
      <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-yellow via-orange to-yellow shadow-xl">
        <div className="absolute inset-2 rounded-full bg-gradient-to-br from-yellow/80 to-orange/60" />

        {/* Sun Rays */}
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute top-1/2 left-1/2 w-1 h-6 bg-yellow rounded-full animate-sun-ray"
            style={{
              transform: `translate(-50%, -50%) rotate(${i * 45}deg) translateY(-18px)`,
              animationDelay: `${i * 0.1}s`
            }}
          />
        ))}
      </div>
    </div>
  )
}

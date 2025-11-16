const Cloud = ({
  size = 1,
  style = {}
}: {
  size?: number
  style?: React.CSSProperties
}) => {
  return (
    <svg
      viewBox="0 0 200 80"
      style={{
        width: `${120 * size}px`,
        height: `${48 * size}px`,
        filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))',
        ...style
      }}
    >
      {/* Main cloud body with multiple overlapping circles for fluffy effect */}
      <ellipse cx="50" cy="50" rx="30" ry="25" fill="white" opacity="0.95" />
      <ellipse cx="75" cy="48" rx="28" ry="23" fill="white" opacity="0.95" />
      <ellipse cx="100" cy="50" rx="32" ry="26" fill="white" opacity="0.95" />
      <ellipse cx="125" cy="52" rx="30" ry="24" fill="white" opacity="0.95" />
      <ellipse cx="148" cy="55" rx="28" ry="22" fill="white" opacity="0.95" />

      {/* Top puffs for extra fluffiness */}
      <ellipse cx="60" cy="38" rx="22" ry="18" fill="white" opacity="0.92" />
      <ellipse cx="90" cy="35" rx="25" ry="20" fill="white" opacity="0.92" />
      <ellipse cx="115" cy="38" rx="23" ry="19" fill="white" opacity="0.92" />
      <ellipse cx="138" cy="42" rx="20" ry="16" fill="white" opacity="0.92" />

      {/* Bottom base for smooth connection */}
      <ellipse cx="100" cy="58" rx="80" ry="15" fill="white" opacity="0.95" />
    </svg>
  )
}

export default function Clouds() {
  return (
    <>
      {/* Large slow-moving clouds */}
      <div className="absolute top-[8%] left-0 animate-drift opacity-90" style={{ animationDuration: '180s', animationDelay: '0s' }}>
        <Cloud size={1.3} />
      </div>
      <div className="absolute top-[15%] left-0 animate-drift opacity-85" style={{ animationDuration: '220s', animationDelay: '-60s' }}>
        <Cloud size={1.1} />
      </div>
      <div className="absolute top-[25%] left-0 animate-drift opacity-90" style={{ animationDuration: '200s', animationDelay: '-120s' }}>
        <Cloud size={1.4} />
      </div>

      {/* Medium clouds */}
      <div className="absolute top-[10%] left-0 animate-drift opacity-80" style={{ animationDuration: '160s', animationDelay: '-30s' }}>
        <Cloud size={0.9} />
      </div>
      <div className="absolute top-[20%] left-0 animate-drift opacity-85" style={{ animationDuration: '190s', animationDelay: '-90s' }}>
        <Cloud size={1.0} />
      </div>

      {/* Small fast clouds */}
      <div className="absolute top-[12%] left-0 animate-drift opacity-75" style={{ animationDuration: '140s', animationDelay: '-45s' }}>
        <Cloud size={0.7} />
      </div>
      <div className="absolute top-[22%] left-0 animate-drift opacity-80" style={{ animationDuration: '150s', animationDelay: '-110s' }}>
        <Cloud size={0.8} />
      </div>
    </>
  )
}

type Props = {
  activeMode: 'music' | 'cards'
  onModeChange: (mode: 'music' | 'cards') => void
}

export default function ModeTabSwitcher({ activeMode, onModeChange }: Props) {
  return (
    <div className="flex justify-center">
      <div className="inline-flex bg-white rounded-full p-1.5 shadow-md border-2 border-gray-100 relative">
        {/* Sliding Indicator Background */}
        <div
          className={`absolute top-1.5 h-[calc(100%-12px)] bg-pink rounded-full shadow-sm transition-all duration-300 ease-out`}
          style={{
            width: 'calc(50% - 6px)',
            left: activeMode === 'music' ? '6px' : 'calc(50% + 0px)',
          }}
        />

        <button
          onClick={() => onModeChange('music')}
          className={`px-6 py-2.5 rounded-full font-bold text-sm transition-all tap focus-ring relative z-10 ${
            activeMode === 'music'
              ? 'text-white'
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          🎵 Music mode
        </button>
        <button
          onClick={() => onModeChange('cards')}
          className={`px-6 py-2.5 rounded-full font-bold text-sm transition-all tap focus-ring relative z-10 ${
            activeMode === 'cards'
              ? 'text-white'
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          🎴 Card mode
        </button>
      </div>
    </div>
  )
}

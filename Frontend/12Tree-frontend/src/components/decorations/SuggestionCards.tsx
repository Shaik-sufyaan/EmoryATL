export default function SuggestionCards() {
  const suggestions = [
    { emoji: '🦖', text: 'Dinosaurs' },
    { emoji: '🚀', text: 'Space' },
    { emoji: '🏴‍☠️', text: 'Pirates' },
    { emoji: '🌈', text: 'Rainbow' },
  ]

  return (
    <>
      {suggestions.map((suggestion, i) => (
        <div
          key={i}
          className="absolute bg-white/80 backdrop-blur-sm rounded-2xl px-4 py-2 shadow-lg pointer-events-none animate-float-notes"
          style={{
            top: `${15 + i * 20}%`,
            right: `${5 + (i % 2) * 3}%`,
            animationDelay: `${i * 0.7}s`,
            animationDuration: `${4 + (i % 2)}s`,
          }}
        >
          <div className="flex items-center gap-2">
            <span className="text-2xl">{suggestion.emoji}</span>
            <span className="font-bold text-gray-700 text-sm">{suggestion.text}</span>
          </div>
        </div>
      ))}
    </>
  )
}

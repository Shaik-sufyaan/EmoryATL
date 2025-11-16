export default function FloatingNotes() {
  const notes = ['🎵', '🎶', '🎤', '🎸', '🎹', '🥁']

  return (
    <>
      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          className="absolute text-4xl pointer-events-none animate-float-notes"
          style={{
            top: `${10 + i * 12}%`,
            left: `${5 + i * 11}%`,
            animationDelay: `${i * 0.5}s`,
            animationDuration: `${3 + (i % 3)}s`,
          }}
        >
          {notes[i % notes.length]}
        </div>
      ))}
    </>
  )
}

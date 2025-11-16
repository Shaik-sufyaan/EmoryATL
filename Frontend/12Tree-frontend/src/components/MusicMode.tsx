import React, { useState, useEffect } from 'react'
import { useApp } from '@context/AppContext'
import FullScreenPlayer from '@components/FullScreenPlayer'
import Toast from '@components/Toast'
import { generateSong, saveSongToLibrary, SongResult } from '@api/index'
import HillsWithTrees from '@components/decorations/HillsWithTrees'

const PLACEHOLDER_SUGGESTIONS = [
  "Try: A song about dinosaurs...",
  "Try: A pirate adventure song...",
  "Try: A space exploration tune...",
  "Try: Learning the ABCs with animals...",
  "Try: Counting to 10 with stars...",
  "Try: A rainbow colors song...",
  "Try: A jungle safari adventure...",
  "Try: Ocean animals and fish...",
]

const FUN_FACTS = [
  "🎵 Music helps kids remember information better!",
  "🧠 Songs activate multiple areas of the brain at once!",
  "🌟 Learning through music makes studying fun!",
  "🎨 Music and art help develop creativity!",
  "📚 Singing helps improve language skills!",
  "🎶 Rhythm helps children learn patterns!",
]

export default function MusicMode() {
  const { user } = useApp()
  const [topic, setTopic] = useState('')
  const [loading, setLoading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [error, setError] = useState<string | null>(null)
  const [result, setResult] = useState<SongResult | null>(null)
  const [showFullScreen, setShowFullScreen] = useState(false)
  const [showAddToLibrary, setShowAddToLibrary] = useState(false)
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState('')
  const [placeholderIndex, setPlaceholderIndex] = useState(0)
  const [factIndex, setFactIndex] = useState(0)

  // Rotate placeholder suggestions
  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex((prev) => (prev + 1) % PLACEHOLDER_SUGGESTIONS.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  // Rotate fun facts during loading
  useEffect(() => {
    if (!loading) return
    const interval = setInterval(() => {
      setFactIndex((prev) => (prev + 1) % FUN_FACTS.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [loading])

  const onPlay = async () => {
    if (!topic.trim()) return
    setLoading(true)
    setProgress(0)
    setError(null)
    setResult(null)
    setShowAddToLibrary(false)

    try {
      const r = await generateSong(topic, (prog) => {
        setProgress(prog)
      })
      setResult(r)
      setLoading(false)
      setShowFullScreen(true) // Automatically open full-screen player
      setShowAddToLibrary(true) // Show add to library option
    } catch (err) {
      setLoading(false)
      setError(err instanceof Error ? err.message : 'Failed to generate song')
      console.error('Error generating song:', err)
    }
  }

  const handleAddToLibrary = async () => {
    if (!result) return

    if (!user) {
      setToastMessage('Please login to save songs to your library')
      setShowToast(true)
      return
    }

    try {
      await saveSongToLibrary(result, user.username)
      setToastMessage(`"${result.title}" added to Your Songs!`)
      setShowToast(true)
      setShowAddToLibrary(false)
    } catch (err) {
      console.error('Error saving to library:', err)
      const errorMsg = err instanceof Error ? err.message : 'Failed to save song to library'
      setToastMessage(errorMsg)
      setShowToast(true)
    }
  }

  // Full-screen player view
  if (showFullScreen && result) {
    return (
      <div className="relative">
        <FullScreenPlayer
          songTitle={result.title}
          artist="12Tree Music"
          lyrics={result.lyrics}
          audioUrl={result.audioUrl}
          timings={result.timings}
          mode="music"
          onClose={() => {
            setShowFullScreen(false)
            setResult(null) // Reset result when closing
            setTopic('') // Clear topic input
            setShowAddToLibrary(false)
          }}
        />
        
        {/* Add to Library Button - Floating */}
        {showAddToLibrary && (
          <button
            onClick={handleAddToLibrary}
            className="fixed bottom-8 right-8 bg-white text-gray-800 font-bold 
                       py-4 px-6 rounded-2xl shadow-2xl hover:shadow-xl 
                       tap focus-ring transition-all flex items-center gap-2 z-50
                       border-2 border-lime">
            <span className="text-2xl">➕</span>
            <span>Add to Library</span>
          </button>
        )}
        
        {/* Toast Notification */}
        {showToast && (
          <Toast
            message={toastMessage}
            icon="🎵"
            onClose={() => setShowToast(false)}
          />
        )}
      </div>
    )
  }

  return (
    <div className="relative min-h-[600px]">
      <HillsWithTrees />

      <div className="relative z-10 max-w-2xl mx-auto text-center">
        <div className="grid gap-6">
          {/* Enhanced Input with Icon and Rotating Placeholder */}
          <div className="relative">
            <span className="absolute left-6 top-1/2 -translate-y-1/2 text-2xl pointer-events-none">
              🎵
            </span>
            <input
              id="topic"
              className="focus-ring rounded-3xl px-16 py-5 border-none outline-none shadow-lg text-lg bg-white text-center placeholder:text-gray-400 w-full transition-all duration-300 focus:shadow-xl focus:shadow-pink/20"
              placeholder={PLACEHOLDER_SUGGESTIONS[placeholderIndex]}
              value={topic}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTopic(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  onPlay()
                }
              }}
              disabled={loading}
            />
          </div>

          {/* Enhanced Play Button */}
          <button
            className="tap focus-ring bg-gradient-to-r from-pink to-purple text-white font-bold text-xl rounded-3xl py-5 px-12 shadow-lg hover:shadow-xl hover:scale-105 transition-all mx-auto disabled:opacity-50 disabled:cursor-not-allowed animate-pulse-slow"
            onClick={onPlay}
            disabled={loading || !topic.trim()}
          >
            ♫ Play ♫
          </button>

          {/* Enhanced Loading State with Fun Facts and Growing Trees */}
          {loading && (
            <div className="bg-white rounded-3xl shadow-lg p-8 max-w-md mx-auto">
              <div className="text-center mb-4">
                <div className="text-4xl mb-2">🌱</div>
                <div className="text-lg font-bold text-gray-700 mb-2">
                  Growing your song tree…
                </div>
              </div>

              {/* Growing Trees Animation */}
              <div className="flex justify-center gap-2 mb-4">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="text-3xl animate-grow"
                    style={{ animationDelay: `${i * 0.2}s` }}
                  >
                    🌳
                  </div>
                ))}
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-gray-200 rounded-full h-8 overflow-hidden mb-4">
                <div
                  className="bg-gradient-to-r from-pink to-purple h-full transition-all duration-500 flex items-center justify-center text-white font-bold text-sm"
                  style={{ width: `${progress}%` }}
                >
                  {progress}%
                </div>
              </div>

              {/* Rotating Fun Facts */}
              <div className="bg-gradient-to-r from-lime/20 to-purple/20 rounded-2xl p-4 mb-2">
                <p className="text-sm font-medium text-gray-700">
                  {FUN_FACTS[factIndex]}
                </p>
              </div>

              <p className="text-xs text-gray-500 mt-2">
                This may take 30-60 seconds...
              </p>
            </div>
          )}

          {/* Error State */}
          {error && !loading && (
            <div className="bg-red-50 border-2 border-red-300 rounded-3xl shadow-lg p-6 max-w-md mx-auto">
              <div className="text-4xl mb-2">❌</div>
              <div className="text-lg font-bold text-red-800 mb-2">
                Oops! Something went wrong
              </div>
              <div className="text-sm text-red-600">
                {error}
              </div>
              <button
                className="mt-4 bg-red-500 text-white font-bold py-2 px-6 rounded-2xl hover:bg-red-600 transition-colors"
                onClick={() => setError(null)}
              >
                Try Again
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

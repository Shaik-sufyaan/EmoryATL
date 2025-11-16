"""
Lyrics generation service using Gemini API for gentle preschool nursery rhymes
"""
import google.generativeai as genai
from typing import List, Dict
import logging
from app.config import settings

logger = logging.getLogger(__name__)


class LyricsGenerator:
    """Generate gentle, educational nursery rhyme lyrics for preschool kids using Gemini"""

    def __init__(self):
        """Initialize Gemini API"""
        genai.configure(api_key=settings.GEMINI_API_KEY)
        # Use the latest stable Gemini 2.5 Flash model (fast and free!)
        self.model = genai.GenerativeModel('models/gemini-2.5-flash')

    def generate_nursery_rhyme(
        self,
        word: str,
        rhymes: List[str]
    ) -> Dict[str, any]:
        """
        Generate simple, cute educational song lyrics for preschool kids

        Args:
            word: Main theme word
            rhymes: List of rhyming words to incorporate

        Returns:
            Dictionary with lyrics, structure, word_count, estimated_duration
        """
        try:
            logger.info(f"Generating kids song for word '{word}' with rhymes: {rhymes}")

            prompt = f"""
You are a gentle, caring preschool teacher creating SOFT, EDUCATIONAL songs for 3-5 year olds.

TOPIC: {word}

🚫 ABSOLUTE RULE #1: NO PIRATE THEMES WHATSOEVER!
THIS IS NOT A PIRATE SONG. THIS IS A GENTLE NURSERY RHYME.

CRITICAL RULES - READ CAREFULLY:
1. ✅ GENTLE & SMOOTH - Use soft, flowing words that sound sweet when sung
2. ✅ EDUCATIONAL - Teach kids what "{word}" is in a loving, nurturing way
3. ✅ SIMPLE STORY - Tell one clear idea that makes sense to little children
4. ✅ NATURAL LANGUAGE - Write like you're talking to a young child, not performing
5. ✅ CALM TONE - Soothing and peaceful, like a lullaby or gentle nursery rhyme

🚫 ABSOLUTELY FORBIDDEN - NEVER EVER USE THESE:
❌ arr, ahoy, yo-ho, yo ho, avast, matey, shiver, timbers, aye, blimey
❌ ship, sail, sea, ocean, boat, vessel, treasure, captain, crew, sailor
❌ pirate, buccaneer, anchor, mast, deck, port, voyage, island
❌ ANY maritime/nautical/sailing themes
❌ ANY pirate-related words, sounds, or exclamations
❌ ANY harsh or loud exclamations
❌ NO parenthetical sounds like (arr!) or (yo-ho!)

✅ INSTEAD USE THESE PRESCHOOL-FRIENDLY THEMES:
- Nature: flowers, trees, birds, sun, moon, stars
- Animals: cats, dogs, bunnies, butterflies
- Everyday: home, play, friends, family, toys
- Feelings: happy, love, gentle, soft, sweet

SONG STRUCTURE:
✅ Write exactly 4-6 gentle lines
✅ Each line teaches something sweet about "{word}"
✅ Use words a 3-year-old knows: happy, soft, pretty, nice, love, play, fun, see, big, small
✅ Make it peaceful and comforting like "Twinkle Twinkle Little Star"
✅ You may gently incorporate these rhyming words if appropriate: {', '.join(rhymes[:3])}

TONE EXAMPLES:
✅ GOOD (gentle): "The butterfly is soft and light, it dances in the air so bright"
✅ GOOD (simple): "I see a cat so soft and sweet, with tiny paws and dancing feet"
❌ BAD (harsh): "The butterfly goes whoosh and zoom, it's wild everywhere"
❌ BAD (pirate): ANY reference to sailing, ships, or ocean adventures

WRITE A GENTLE NURSERY RHYME ABOUT "{word}" (NOT A SEA SHANTY, NOT PIRATE-THEMED):
            """

            # Generate lyrics with Gemini
            response = self.model.generate_content(prompt)
            lyrics = response.text.strip()

            logger.info(f"Generated lyrics (raw):\n{lyrics}")

            # CRITICAL: Remove any pirate words that slipped through
            lyrics = self._remove_pirate_words(lyrics)

            logger.info(f"Generated lyrics (cleaned):\n{lyrics}")

            # Parse and validate
            word_count = len(lyrics.split())
            estimated_duration = self._estimate_duration(lyrics)

            return {
                "lyrics": lyrics,
                "word_count": word_count,
                "estimated_duration": estimated_duration,
                "word": word,
                "rhymes_used": rhymes
            }

        except Exception as e:
            logger.error(f"Error generating lyrics: {e}")
            raise

    def _remove_pirate_words(self, lyrics: str) -> str:
        """
        Remove ALL pirate-related words, exclamations, and maritime themes from lyrics

        This is a critical safety net - the Gemini prompt should prevent these,
        but we aggressively remove them here just in case they slip through.

        Args:
            lyrics: The raw lyrics

        Returns:
            Cleaned lyrics without any pirate-related content
        """
        import re

        # COMPREHENSIVE pirate word removal - remove ALL variations
        pirate_patterns = [
            # Pirate exclamations (with and without punctuation)
            r'\barr+!?\b', r'\bahoy!?\b', r'\byo-ho+!?\b', r'\byo\s+ho!?\b',
            r'\bavast!?\b', r'\bmatey!?\b', r'\baye!?\b', r'\bblimey!?\b',

            # In parentheses - common in songs
            r'\(arr+!?\)', r'\(ahoy!?\)', r'\(yo-ho+!?\)', r'\(yo\s+ho!?\)',
            r'\(avast!?\)', r'\(matey!?\)', r'\(aye!?\)', r'\(blimey!?\)',

            # Pirate phrases
            r'\bshiver\s+me\s+timbers!?\b', r'\bwalk\s+the\s+plank!?\b',
            r'\bpirate\s+treasure\b', r'\bpirate\s+ship\b',
            r'\bX\s+marks\s+the\s+spot\b',

            # Maritime/nautical terms that suggest pirate themes
            r'\bsea\s+shanty\b', r'\bhoist\s+the\s+sails?\b',
            r'\banchors?\s+aweigh\b', r'\ball\s+hands\s+on\s+deck\b',

            # Standalone exclamations anywhere (more aggressive)
            r'arr+!?(?=\s|$|,|\.)', r'ahoy!?(?=\s|$|,|\.)',
            r'yo-ho+!?(?=\s|$|,|\.)', r'avast!?(?=\s|$|,|\.)',
        ]

        cleaned = lyrics
        for pattern in pirate_patterns:
            cleaned = re.sub(pattern, '', cleaned, flags=re.IGNORECASE)

        # Remove extra whitespace and empty lines that result from removals
        cleaned = re.sub(r'\n\s*\n+', '\n', cleaned)  # Multiple blank lines to one
        cleaned = re.sub(r' +', ' ', cleaned)  # Multiple spaces to one
        cleaned = re.sub(r' \n', '\n', cleaned)  # Space before newline
        cleaned = re.sub(r'\n ', '\n', cleaned)  # Space after newline
        cleaned = re.sub(r'\s+([.,!?])', r'\1', cleaned)  # Remove space before punctuation
        cleaned = cleaned.strip()

        return cleaned

    def _estimate_duration(self, lyrics: str) -> float:
        """
        Estimate song duration based on word count

        Args:
            lyrics: The lyrics text

        Returns:
            Estimated duration in seconds (target: 30 seconds)
        """
        word_count = len(lyrics.split())
        # Kids songs: ~60-80 words per minute
        # For shanties, slightly slower: ~50-60 words per minute
        words_per_second = 1.0  # 60 words per minute
        duration = word_count / words_per_second

        # Add buffer for musical pauses
        duration *= 1.2

        logger.info(f"Estimated duration: {duration:.1f}s for {word_count} words")

        return duration

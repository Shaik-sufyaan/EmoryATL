"""
Flashcard generation service using Gemini API for preschool kids
"""
import google.generativeai as genai
from typing import List, Dict
import logging
import json
from app.config import settings

logger = logging.getLogger(__name__)


class FlashcardGenerator:
    """Generate age-appropriate flashcards for preschool kids using Gemini"""

    def __init__(self):
        """Initialize Gemini API"""
        genai.configure(api_key=settings.GEMINI_API_KEY)
        # Use the latest stable Gemini 2.5 Flash model (fast and free!)
        self.model = genai.GenerativeModel('models/gemini-2.5-flash')

    def generate_flashcards(self, topic: str) -> List[Dict[str, str]]:
        """
        Generate 6 simple flashcards for preschool kids (ages 3-5)

        Args:
            topic: The topic to create flashcards about

        Returns:
            List of dictionaries with 'front' (question) and 'back' (answer) keys
        """
        try:
            logger.info(f"Generating flashcards for topic: '{topic}'")

            prompt = f"""
You are a gentle, caring preschool teacher creating educational flashcards for 3-5 year old children.

TOPIC: {topic}

CRITICAL RULES:
1. ✅ VERY SIMPLE - Use only words a 3-5 year old can understand
2. ✅ SHORT & CLEAR - Each question should be ONE simple sentence (5-10 words max)
3. ✅ SHORT ANSWERS - Each answer should be 1-5 words maximum
4. ✅ CONCRETE - Ask about things kids can see, touch, or experience
5. ✅ POSITIVE - Keep everything encouraging and fun
6. ✅ AGE-APPROPRIATE - Focus on basic concepts, colors, shapes, numbers, feelings

QUESTION TYPES TO USE:
- "What color is...?"
- "How many...?"
- "What does... do?"
- "Where do we find...?"
- "What sound does... make?"
- "What shape is...?"
- "How does... feel?"

EXAMPLE FLASHCARDS FOR "APPLE":
Front: "What color are most apples?"
Back: "Red or green"

Front: "Where do apples grow?"
Back: "On trees"

Front: "How does an apple feel?"
Back: "Round and smooth"

NOW CREATE EXACTLY 6 FLASHCARDS ABOUT "{topic}":

You MUST respond with ONLY a valid JSON array in this exact format (no other text):
[
  {{"front": "question here?", "back": "answer here"}},
  {{"front": "question here?", "back": "answer here"}},
  {{"front": "question here?", "back": "answer here"}},
  {{"front": "question here?", "back": "answer here"}},
  {{"front": "question here?", "back": "answer here"}},
  {{"front": "question here?", "back": "answer here"}}
]

Remember:
- Keep it VERY simple for preschoolers
- Questions should be clear and direct
- Answers should be SHORT (1-5 words)
- Make it fun and educational!
"""

            # Generate flashcards with Gemini
            response = self.model.generate_content(prompt)
            response_text = response.text.strip()

            logger.info(f"Generated flashcards (raw):\n{response_text}")

            # Extract JSON from response (Gemini sometimes adds markdown formatting)
            flashcards_json = self._extract_json(response_text)

            # Parse the JSON
            flashcards = json.loads(flashcards_json)

            # Validate that we have exactly 6 flashcards
            if not isinstance(flashcards, list):
                raise ValueError("Response is not a list")

            if len(flashcards) != 6:
                logger.warning(f"Expected 6 flashcards, got {len(flashcards)}. Adjusting...")
                if len(flashcards) > 6:
                    flashcards = flashcards[:6]
                else:
                    # If we got fewer, add simple generic ones
                    while len(flashcards) < 6:
                        flashcards.append({
                            "front": f"What can you learn about {topic}?",
                            "back": "Something new!"
                        })

            # Validate each flashcard has the required fields
            validated_cards = []
            for i, card in enumerate(flashcards):
                if not isinstance(card, dict):
                    logger.warning(f"Card {i} is not a dictionary, skipping")
                    continue

                front = card.get('front', '').strip()
                back = card.get('back', '').strip()

                if not front or not back:
                    logger.warning(f"Card {i} missing front or back, skipping")
                    continue

                validated_cards.append({
                    "id": str(i + 1),
                    "front": front,
                    "back": back,
                    "known": False
                })

            # Ensure we still have 6 cards after validation
            while len(validated_cards) < 6:
                validated_cards.append({
                    "id": str(len(validated_cards) + 1),
                    "front": f"What is special about {topic}?",
                    "back": "It's interesting!",
                    "known": False
                })

            logger.info(f"Successfully generated {len(validated_cards)} flashcards for '{topic}'")

            return validated_cards[:6]  # Ensure exactly 6 cards

        except Exception as e:
            logger.error(f"Error generating flashcards: {e}", exc_info=True)
            # Return fallback flashcards on error
            return self._get_fallback_flashcards(topic)

    def _extract_json(self, text: str) -> str:
        """
        Extract JSON from Gemini response which might include markdown formatting

        Args:
            text: Raw response text from Gemini

        Returns:
            Clean JSON string
        """
        import re

        # Remove markdown code blocks if present
        json_match = re.search(r'```(?:json)?\s*(\[[\s\S]*\])\s*```', text)
        if json_match:
            return json_match.group(1)

        # Look for JSON array pattern
        json_match = re.search(r'\[[\s\S]*\]', text)
        if json_match:
            return json_match.group(0)

        # If nothing found, return original text
        return text

    def _get_fallback_flashcards(self, topic: str) -> List[Dict[str, str]]:
        """
        Generate simple fallback flashcards if Gemini fails

        Args:
            topic: The topic for flashcards

        Returns:
            List of basic flashcards
        """
        logger.info(f"Using fallback flashcards for '{topic}'")

        return [
            {
                "id": "1",
                "front": f"What is {topic}?",
                "back": "Something to learn about!",
                "known": False
            },
            {
                "id": "2",
                "front": f"Where can we see {topic}?",
                "back": "Look around!",
                "known": False
            },
            {
                "id": "3",
                "front": f"Is {topic} fun?",
                "back": "Yes!",
                "known": False
            },
            {
                "id": "4",
                "front": f"Can you learn about {topic}?",
                "back": "Yes, you can!",
                "known": False
            },
            {
                "id": "5",
                "front": f"What color might {topic} be?",
                "back": "Many colors!",
                "known": False
            },
            {
                "id": "6",
                "front": f"Do you like {topic}?",
                "back": "Let's find out!",
                "known": False
            }
        ]

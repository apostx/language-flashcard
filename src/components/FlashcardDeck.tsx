import React, { useState, useEffect } from 'react';
import Flashcard from './Flashcard';
import { Flashcard as FlashcardType } from '../types/Flashcard';
import '../styles/FlashcardDeck.css';

interface FlashcardDeckProps {
  flashcards: FlashcardType[];
}

const FlashcardDeck: React.FC<FlashcardDeckProps> = ({ flashcards }) => {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [shuffleMode, setShuffleMode] = useState(false);
  const [shuffledIndices, setShuffledIndices] = useState<number[]>([]);
  const [reversed, setReversed] = useState(false);
  
  // Extract language information from the first card if available
  const sourceLanguage = flashcards.length > 0 && flashcards[0].sourceLanguage 
    ? flashcards[0].sourceLanguage 
    : 'Source';
  const targetLanguage = flashcards.length > 0 && flashcards[0].targetLanguage 
    ? flashcards[0].targetLanguage 
    : 'Target';

  // Reset card index when flashcards change
  useEffect(() => {
    setCurrentCardIndex(0);
    if (shuffleMode) {
      generateShuffledIndices();
    }
  }, [flashcards]);

  // Get the actual index based on whether we're in shuffle mode
  const getActualIndex = () => {
    if (shuffleMode && shuffledIndices.length > 0) {
      return shuffledIndices[currentCardIndex];
    }
    return currentCardIndex;
  };

  const handleNext = () => {
    setCurrentCardIndex((prevIndex) => {
      const maxIndex = shuffleMode ? shuffledIndices.length - 1 : flashcards.length - 1;
      return prevIndex >= maxIndex ? 0 : prevIndex + 1;
    });
  };

  const handlePrevious = () => {
    setCurrentCardIndex((prevIndex) => {
      const maxIndex = shuffleMode ? shuffledIndices.length - 1 : flashcards.length - 1;
      return prevIndex <= 0 ? maxIndex : prevIndex - 1;
    });
  };

  const generateShuffledIndices = () => {
    // Generate shuffled indices
    const indices = Array.from({ length: flashcards.length }, (_, i) => i);
    for (let i = indices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [indices[i], indices[j]] = [indices[j], indices[i]];
    }
    setShuffledIndices(indices);
  };
  
  const toggleShuffleMode = () => {
    if (!shuffleMode) {
      generateShuffledIndices();
      setCurrentCardIndex(0);
    } else {
      // Reset to normal mode
      setCurrentCardIndex(0);
    }
    setShuffleMode(!shuffleMode);
  };

  const toggleLanguageDirection = () => {
    setReversed(!reversed);
  };

  if (!flashcards || flashcards.length === 0) {
    return <div className="no-cards">No flashcards available.</div>;
  }

  const actualIndex = getActualIndex();
  const currentCard = flashcards[actualIndex];
  
  if (!currentCard) {
    return <div className="error-card">Error: Card data is invalid.</div>;
  }
  
  return (
    <div className="flashcard-deck">
      <div className="deck-controls">
        <div className="control-buttons">
          <button 
            onClick={toggleShuffleMode} 
            className={`control-button ${shuffleMode ? 'active' : ''}`}
            title={shuffleMode ? "Switch to ordered mode" : "Switch to shuffle mode"}
            aria-label={shuffleMode ? "Switch to ordered mode" : "Switch to shuffle mode"}
          >
            {shuffleMode ? '🔢 Ordered' : '🔀 Shuffle'}
          </button>
          
          <button 
            onClick={toggleLanguageDirection} 
            className={`control-button ${reversed ? 'active' : ''}`}
            title={reversed ? `Show ${targetLanguage} → ${sourceLanguage}` : `Show ${sourceLanguage} → ${targetLanguage}`}
            aria-label={reversed ? `Switch to ${sourceLanguage} first` : `Switch to ${targetLanguage} first`}
          >
            {reversed ? `🔄 ${targetLanguage} → ${sourceLanguage}` : `🔄 ${sourceLanguage} → ${targetLanguage}`}
          </button>
        </div>
        
        <div className="deck-info">
          Card {currentCardIndex + 1} of {shuffleMode ? shuffledIndices.length : flashcards.length}
        </div>
      </div>
      
      <Flashcard 
        card={currentCard} 
        onNext={handleNext}
        onPrevious={handlePrevious}
        reversed={reversed}
      />
    </div>
  );
};

export default FlashcardDeck;

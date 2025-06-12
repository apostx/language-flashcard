import React, { useState } from 'react';
import { Flashcard as FlashcardType } from '../types/Flashcard';
import { useAudio } from '../hooks/useAudio';
import '../styles/Flashcard.css';

interface FlashcardProps {
  card: FlashcardType;
  onNext: () => void;
  onPrevious: () => void;
  reversed?: boolean;
}

const Flashcard: React.FC<FlashcardProps> = ({ card, onNext, onPrevious, reversed = false }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const { playAudio, isPlaying, error } = useAudio();

  if (!card || !card.sourceWord || !card.targetTranslation) {
    return (
      <div className="flashcard error">
        <div className="flashcard-inner">
          <div className="flashcard-front">
            <h2>Invalid Card Data</h2>
          </div>
        </div>
      </div>
    );
  }

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const playSourceAudio = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (card.sourceSoundUrl) {
      playAudio(card.sourceSoundUrl);
    }
  };

  const playTargetAudio = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (card.targetSoundUrl) {
      playAudio(card.targetSoundUrl);
    }
  };

  const frontContent = reversed ? (
    <>
      <h2>{card.targetTranslation}</h2>
      {card.targetSoundUrl && (
        <button 
          className="audio-button"
          onClick={playTargetAudio} 
          disabled={isPlaying}
          aria-label={`Play ${card.targetLanguage || 'target language'} pronunciation`}
        >
          🔊
        </button>
      )}
    </>
  ) : (
    <>
      <h2>{card.sourceWord}</h2>
      {card.sourceSoundUrl && (
        <button 
          className="audio-button"
          onClick={playSourceAudio} 
          disabled={isPlaying}
          aria-label={`Play ${card.sourceLanguage || 'source language'} pronunciation`}
        >
          🔊
        </button>
      )}
    </>
  );

  const backContent = reversed ? (
    <>
      <h2>{card.sourceWord}</h2>
      {card.sourceSoundUrl && (
        <button 
          className="audio-button"
          onClick={playSourceAudio} 
          disabled={isPlaying}
          aria-label={`Play ${card.sourceLanguage || 'source language'} pronunciation`}
        >
          🔊
        </button>
      )}
    </>
  ) : (
    <>
      <h2>{card.targetTranslation}</h2>
      {card.targetSoundUrl && (
        <button 
          className="audio-button"
          onClick={playTargetAudio} 
          disabled={isPlaying}
          aria-label={`Play ${card.targetLanguage || 'target language'} pronunciation`}
        >
          🔊
        </button>
      )}
    </>
  );

  return (
    <div className={`flashcard ${isFlipped ? 'flipped' : ''}`} onClick={handleFlip}>
      <div className="flashcard-inner">
        <div className="flashcard-front">
          {frontContent}
        </div>
        <div className="flashcard-back">
          {backContent}
        </div>
      </div>
      
      {error && <div className="error-message">{error}</div>}
      
      <div className="flashcard-navigation">
        <button onClick={(e) => { e.stopPropagation(); onPrevious(); }} className="nav-button">
          ◀ Previous
        </button>
        <button onClick={(e) => { e.stopPropagation(); onNext(); }} className="nav-button">
          Next ▶
        </button>
      </div>
    </div>
  );
};

export default Flashcard;

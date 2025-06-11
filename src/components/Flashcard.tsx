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

  if (!card || !card.germanWord || !card.hungarianTranslation) {
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

  const playGermanAudio = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (card.germanSoundUrl) {
      playAudio(card.germanSoundUrl);
    }
  };

  const playHungarianAudio = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (card.hungarianSoundUrl) {
      playAudio(card.hungarianSoundUrl);
    }
  };

  const frontContent = reversed ? (
    <>
      <h2>{card.hungarianTranslation}</h2>
      {card.hungarianSoundUrl && (
        <button 
          className="audio-button"
          onClick={playHungarianAudio} 
          disabled={isPlaying}
          aria-label="Play Hungarian pronunciation"
        >
          🔊
        </button>
      )}
    </>
  ) : (
    <>
      <h2>{card.germanWord}</h2>
      {card.germanSoundUrl && (
        <button 
          className="audio-button"
          onClick={playGermanAudio} 
          disabled={isPlaying}
          aria-label="Play German pronunciation"
        >
          🔊
        </button>
      )}
    </>
  );

  const backContent = reversed ? (
    <>
      <h2>{card.germanWord}</h2>
      {card.germanSoundUrl && (
        <button 
          className="audio-button"
          onClick={playGermanAudio} 
          disabled={isPlaying}
          aria-label="Play German pronunciation"
        >
          🔊
        </button>
      )}
    </>
  ) : (
    <>
      <h2>{card.hungarianTranslation}</h2>
      {card.hungarianSoundUrl && (
        <button 
          className="audio-button"
          onClick={playHungarianAudio} 
          disabled={isPlaying}
          aria-label="Play Hungarian pronunciation"
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

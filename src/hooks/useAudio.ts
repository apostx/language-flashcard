import { useState, useCallback, useRef } from 'react';

export function useAudio() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  const playAudio = useCallback((url?: string) => {
    // Don't try to play if URL is empty
    if (!url || url.trim() === '') {
      setError('No audio URL provided');
      return;
    }
    
    // Stop any currently playing audio
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.removeEventListener('ended', () => {});
      audioRef.current.removeEventListener('error', () => {});
      audioRef.current = null;
    }
    
    try {
      setError(null);
      setIsPlaying(true);
      
      // Create and play the audio
      audioRef.current = new Audio(url);
      
      audioRef.current.addEventListener('ended', () => {
        setIsPlaying(false);
        audioRef.current = null;
      });
      
      audioRef.current.addEventListener('error', (e) => {
        setIsPlaying(false);
        setError(`Failed to play audio: ${e.toString()}`);
        audioRef.current = null;
      });
      
      audioRef.current.play().catch((err) => {
        setIsPlaying(false);
        setError(`Failed to play audio: ${err.message}`);
        audioRef.current = null;
      });
    } catch (err) {
      setIsPlaying(false);
      setError(`Failed to initialize audio: ${err instanceof Error ? err.message : String(err)}`);
      audioRef.current = null;
    }
  }, []);
  
  return { playAudio, isPlaying, error };
}

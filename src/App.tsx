import React, { useState, useEffect } from 'react';
import FlashcardDeck from './components/FlashcardDeck';
import { fetchFlashcardData } from './services/spreadsheetService';
import { Flashcard } from './types/Flashcard';
import { getBooleanQueryParam } from './utils/urlUtils';
import './styles/App.css';

const App: React.FC = () => {
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [debugInfo, setDebugInfo] = useState<string>('');
  
  // Check if debug mode is enabled via URL query parameter - default is false
  const isDebugMode = getBooleanQueryParam('debug', false);

  useEffect(() => {
    const loadFlashcards = async () => {
      try {
        setLoading(true);
        setDebugInfo('Fetching flashcard data...');
        const data = await fetchFlashcardData();
        setDebugInfo(prev => `${prev}\nData received: ${JSON.stringify(data).substring(0, 100)}...`);
        
        if (data && Array.isArray(data) && data.length > 0) {
          setFlashcards(data);
          setDebugInfo(prev => `${prev}\nLoaded ${data.length} flashcards successfully.`);
        } else {
          setDebugInfo(prev => `${prev}\nNo flashcards found in the response. Data structure: ${typeof data}`);
          setError('No flashcards found in the response.');
        }
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : String(err);
        setDebugInfo(prev => `${prev}\nError: ${errorMessage}`);
        setError(`Failed to load flashcard data: ${errorMessage}`);
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadFlashcards();
  }, []);

  const renderLoadingState = () => (
    <div className="loading">
      <div className="loading-spinner"></div>
      <p>Loading flashcards...</p>
    </div>
  );

  const renderErrorState = () => (
    <div className="error">
      <h2>Error</h2>
      <p>{error}</p>
      <button 
        className="retry-button" 
        onClick={() => window.location.reload()}
      >
        Retry
      </button>
      {isDebugMode && (
        <div className="debug-info">
          <h3>Debug Information:</h3>
          <pre>{debugInfo}</pre>
        </div>
      )}
    </div>
  );

  const renderFlashcards = () => (
    <>
      <FlashcardDeck flashcards={flashcards} />
      
      {isDebugMode && (
        <div className="debug-info">
          <h3>Debug Information:</h3>
          <pre>{debugInfo}</pre>
          <p>Flashcards loaded: {flashcards.length}</p>
          {flashcards.length > 0 && (
            <div>
              <h4>First flashcard:</h4>
              <pre>{JSON.stringify(flashcards[0], null, 2)}</pre>
            </div>
          )}
        </div>
      )}
    </>
  );

  // Get languages from the first flashcard if available
  const sourceLanguage = flashcards.length > 0 ? flashcards[0].sourceLanguage || 'Source' : 'Source';
  const targetLanguage = flashcards.length > 0 ? flashcards[0].targetLanguage || 'Target' : 'Target';
  
  const headerTitle = `${sourceLanguage}-${targetLanguage} Flashcards`;

  return (
    <div className="app">
      <header className="app-header">
        <h1>{headerTitle}</h1>
        <p className="app-subtitle">Learn vocabulary with interactive flashcards</p>
      </header>
      
      <main className="app-main">
        {loading ? renderLoadingState() : error ? renderErrorState() : renderFlashcards()}
      </main>
      
      <footer className="app-footer">
        <p>Language Flashcard Application</p>
        <p className="footer-note">Tap or click a card to flip it</p>
      </footer>
    </div>
  );
};

export default App;

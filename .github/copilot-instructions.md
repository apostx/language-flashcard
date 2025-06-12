<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

## Language Flashcard Application

This is a TypeScript + React application for vocabulary flashcards that supports any language pair.

### Project Structure

- `src/components/`: React components
- `src/hooks/`: Custom React hooks
- `src/services/`: API and data services
- `src/styles/`: CSS files
- `src/types/`: TypeScript type definitions

### Data Source

The application fetches data from a Google Spreadsheet with the following structure:
1. Header Row: Contains language names (e.g., "English", "Spanish")
2. Data Rows:
   - Column 1: Source language word
   - Column 2: URL to source language pronunciation audio (optional)
   - Column 3: Target language translation
   - Column 4: URL to target language pronunciation audio (optional)

### Key Features

- Interactive flashcards with flip animation
- Audio playback for both languages
- Shuffle mode for randomized learning
- Responsive design for desktop and mobile

<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

## FlashCard Application

This is a TypeScript + React application for German-Hungarian vocabulary flashcards.

### Project Structure

- `src/components/`: React components
- `src/hooks/`: Custom React hooks
- `src/services/`: API and data services
- `src/styles/`: CSS files
- `src/types/`: TypeScript type definitions

### Data Source

The application fetches data from a Google Spreadsheet with the following structure:
1. Column 1: German word
2. Column 2: URL to German pronunciation audio
3. Column 3: Hungarian translation
4. Column 4: URL to Hungarian pronunciation audio

### Key Features

- Interactive flashcards with flip animation
- Audio playback for both languages
- Shuffle mode for randomized learning
- Responsive design for desktop and mobile

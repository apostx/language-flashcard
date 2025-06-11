# FlashCard - German-Hungarian Vocabulary Learning App

A responsive web application for learning German vocabulary with Hungarian translations, featuring audio playback for both languages.

## Features

- Interactive flashcards with German words and Hungarian translations
- Flip animation to reveal translations
- Audio playback for both languages (when URLs are provided)
- Responsive design for desktop and mobile browsers
- Shuffle mode for randomized learning
- Language direction toggle (German→Hungarian or Hungarian→German)
- Data sourced from a public Google Spreadsheet
- Fallback data for offline use

## Technical Stack

- React 
- TypeScript
- Webpack for bundling
- CSS for styling
- Axios for data fetching

## Development

### Prerequisites

- Node.js (v16.x or higher)
- npm (v8.x or higher)

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/flashcard.git
cd flashcard

# Install dependencies
npm install
```

### Running the Development Server

```bash
npm start
```

This will start the development server at http://localhost:3000.

### Building for Production

```bash
npm run build
```

The compiled files will be placed in the `dist` directory.

## Usage Instructions

### Basic Navigation
- Click or tap a card to flip it and see the translation
- Use the "Next" and "Previous" buttons to navigate between cards
- Audio buttons (🔊) play pronunciation when available

### Advanced Features
- Click the "🔀 Shuffle" button to randomize the order of cards
- Click the "🇩🇪 → 🇭🇺" button to switch between showing German words first or Hungarian words first

## Data Structure

The application fetches data from a Google Spreadsheet with the following structure:

1. Column 1: German word (required)
2. Column 2: URL to German pronunciation audio (optional)
3. Column 3: Hungarian translation (required)
4. Column 4: URL to Hungarian pronunciation audio (optional)

### Custom Data Source

To use your own Google Spreadsheet:

1. Create a spreadsheet with the structure above
2. Make the spreadsheet publicly accessible (File → Share → Anyone with the link → Viewer)
3. Update the `SPREADSHEET_ID` constant in `src/services/spreadsheetService.ts` with your spreadsheet ID

## Deployment

This project is configured for automatic deployment to GitHub Pages when changes are pushed to the main branch.

To deploy manually:

```bash
npm run deploy
```

## Browser Compatibility

- Chrome/Edge (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Mobile browsers (iOS Safari, Android Chrome)

## AI-Generated Project

This project was created with the assistance of Claude, an AI assistant by Anthropic. The development process was guided by:

- **AI Model**: Claude 3.7
- **Generation Date**: June 2025
- **Development Approach**: Iterative dialogue between human and AI to specify requirements, generate code, and refine implementation

The AI was used to:
- Generate the initial project structure
- Write component code with TypeScript
- Implement CSS styling for the UI
- Develop the data fetching service
- Create documentation and testing

Human oversight and direction were provided throughout the development process to ensure the application meets quality standards and follows best practices.

For a detailed history of the development process and the evolution of features, see the [HISTORY.md](./HISTORY.md) file.

## License

MIT

## Acknowledgements

- Google Sheets API for providing the data source
- React team for the amazing framework
- The open-source community for inspiration and tools
- Claude 3.7 for AI-assisted development

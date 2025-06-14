# Language Flashcard - Vocabulary Learning App

A fully responsive web application for learning vocabulary between any language pairs, featuring audio playback for both languages and optimized for both desktop and mobile devices.

## Features

- Interactive flashcards supporting any language pair
- Flip animation to reveal translations
- Audio playback for both languages (when URLs are provided)
- Fully responsive design for all devices (desktop, tablet, and mobile)
- Optimized touch interactions for mobile users
- Support for long text and different writing systems
- Proper word wrapping and text overflow handling
- Shuffle mode for randomized learning
- Language direction toggle (source→target or target→source)
- Data sourced from a public Google Spreadsheet

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
git clone https://github.com/apostx/language-flashcard.git
cd language-flashcard

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
- Click the "🔄 Source → Target" button to switch language direction

## Data Structure

The application fetches data from a Google Spreadsheet with the following structure:

1. **Header Row**: First row should contain language names (e.g., "English", "Spanish")
2. **Content Rows**:
   - Column 1: Source language word (required)
   - Column 2: URL to source language pronunciation audio (optional)
   - Column 3: Target language translation (required)
   - Column 4: URL to target language pronunciation audio (optional)

### Custom Data Source

To use your own Google Spreadsheet:

1. Create a spreadsheet with the structure above
2. Make the spreadsheet publicly accessible (File → Share → Anyone with the link → Viewer)
3. You can specify your spreadsheet using URL query parameters:
   - `?spreadsheetId=YOUR_SPREADSHEET_ID` - Replace with your spreadsheet ID
   - `?sheetId=0` - Specify which sheet to use (default is 0, the first sheet)
   - Example: `https://apostx.github.io/language-flashcard/?spreadsheetId=1abc123&sheetId=2`

### URL Parameters

The application supports the following URL parameters:

- `spreadsheetId` - Specify a custom Google Spreadsheet ID
- `sheetId` - Specify which sheet to use (default is 0)
- `debug` - Enable debug mode to see detailed information (`?debug=true` or simply `?debug`). Debug information is always hidden by default, regardless of environment.

Alternatively, you can update the `DEFAULT_SPREADSHEET_ID` constant in `src/services/spreadsheetService.ts` with your spreadsheet ID.

### Debug Mode

You can enable debug information display by adding `?debug=true` to the URL.
Example: `https://apostx.github.io/language-flashcard/?debug=true`

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

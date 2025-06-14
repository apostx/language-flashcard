# Changelog

All notable changes to the Language Flashcard project will be documented in this file.

## Project Information

This project was developed with the assistance of Claude 3.7 (developed by Anthropic) in June 2025. For more details about the AI-assisted development process, see [HISTORY.md](./HISTORY.md).

## [2.3.0] - 2025-06-14

### Added
- Enhanced mobile compatibility with responsive design improvements
- Added proper audio button alignment on mobile devices
- Improved touch interaction support

### Changed
- Redesigned the flashcard content layout with flexbox for better alignment
- Improved focus handling for better keyboard navigation without visual artifacts
- Optimized UI spacing and sizing for small mobile screens

### Fixed
- Misaligned sound buttons on mobile displays
- Unwanted focus outlines on interactive elements
- Various responsive design issues on small screens

## [2.2.0] - 2025-06-13

### Removed
- Eliminated fallback data mechanism
- Removed references to fallback data from documentation

### Changed
- Application now requires a valid spreadsheet connection
- Error handling simplified to focus on connection issues

## [2.1.0] - 2025-06-13

### Added
- URL query parameter support for configuration:
  - `?debug=true` to toggle debug information display
  - `?spreadsheetId=ID` to specify a custom Google Spreadsheet
  - `?sheetId=N` to specify which sheet to use in the spreadsheet
- Updated documentation to explain URL parameter usage

### Changed
- Made debug information hidden by default in ALL environments (not just production)
- Debug information now only shows when explicitly enabled with `?debug=true`
- Refactored spreadsheet service to use URL parameters with fallback values

## [2.0.0] - 2025-06-12

### Added
- Support for any language pair, not just German-Hungarian
- Dynamic language detection from spreadsheet headers
- New language-agnostic field names in the codebase
- Enhanced documentation reflecting the application's generic nature

### Changed
- Renamed project to "language-flashcard"
- Updated UI to dynamically show the current language pair
- Modified language toggle button to use generic labels
- Improved spreadsheet parsing to extract language information
- Updated all documentation to reflect new generic features

### Fixed
- Various references to specific languages in the codebase
- Fallback data structure to match new field names

## [1.1.0] - 2025-06-11

### Added
- Language direction toggle feature
- Loading spinner animation
- Improved error handling with retry button
- Better mobile responsiveness
- Enhanced CSV parser for quoted values
- Comprehensive debug information for development
- Documentation about AI-assisted development

### Changed
- Made sound URLs optional in the type definition
- Improved control button styling
- Enhanced overall UI with better spacing and transitions
- Updated fallback data with more vocabulary words
- Added AI attribution to documentation

### Fixed
- CSV parsing issues with commas in fields
- Memory leaks in audio playback
- Data loading error handling
- Responsive design issues on small screens

## [1.0.0] - 2025-06-01

### Added
- Initial release
- Basic flashcard functionality with flip animation
- Navigation between cards
- Shuffle mode for randomized learning
- Google Spreadsheet data fetching
- Audio playback for both languages
- Responsive design for desktop and mobile
- GitHub Pages deployment workflow

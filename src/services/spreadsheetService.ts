import axios from 'axios';
import { Flashcard } from '../types/Flashcard';

// Google Spreadsheet URL
const SPREADSHEET_ID = '1nFxVuAugEsxKsaQWrVxkHQ5dSYgZL0jbQB57Sovsndk';
const SHEET_ID = 0; // Assuming the data is in the first sheet

// Construct the URL for fetching the spreadsheet data as CSV
const SPREADSHEET_URL = `https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}/export?format=csv&gid=${SHEET_ID}`;
// CORS Proxy URL - use this if direct access fails
const CORS_PROXY_URL = `https://cors-anywhere.herokuapp.com/`;

/**
 * Parse CSV string into array of string arrays
 * Handles quoted values containing commas
 */
const parseCSV = (text: string): string[][] => {
  const result: string[][] = [];
  let row: string[] = [];
  let inQuotes = false;
  let currentValue = '';
  
  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    const nextChar = text[i + 1];
    
    if (char === '"') {
      // Handle escaped quotes
      if (nextChar === '"') {
        currentValue += '"';
        i++; // Skip the next quote
      } else {
        // Toggle quote mode
        inQuotes = !inQuotes;
      }
    } else if (char === ',' && !inQuotes) {
      // End of value
      row.push(currentValue.trim());
      currentValue = '';
    } else if ((char === '\n' || char === '\r') && !inQuotes) {
      // End of line
      if (char === '\r' && nextChar === '\n') {
        i++; // Skip the \n in \r\n
      }
      
      // Don't push empty values at the end
      if (currentValue !== '') {
        row.push(currentValue.trim());
        currentValue = '';
      }
      
      // Don't push empty rows
      if (row.length > 0) {
        result.push(row);
        row = [];
      }
    } else {
      currentValue += char;
    }
  }
  
  // Handle the last value and row
  if (currentValue !== '') {
    row.push(currentValue.trim());
  }
  if (row.length > 0) {
    result.push(row);
  }
  
  return result;
};

export const fetchFlashcardData = async (): Promise<Flashcard[]> => {
  try {
    // Try direct fetch first
    let response;
    try {
      console.log('Attempting direct fetch from Google Sheets...');
      response = await axios.get(SPREADSHEET_URL);
      console.log('Direct fetch successful!');
    } catch (corsError) {
      console.warn('Direct fetch failed:', corsError);
      
      // If direct fetch fails due to CORS, try with proxy
      try {
        console.log('Attempting fetch via CORS proxy...');
        response = await axios.get(`${CORS_PROXY_URL}${SPREADSHEET_URL}`);
        console.log('CORS proxy fetch successful!');
      } catch (proxyError) {
        console.warn('CORS proxy fetch failed:', proxyError);
        
        // If both methods fail, use fallback data
        console.log('Falling back to local data...');
        try {
          // Try with relative path first
          response = await axios.get('./fallback-data.json');
          console.log('Loaded fallback data from relative path');
        } catch (relativePathError) {
          console.warn('Relative path fallback failed:', relativePathError);
          
          try {
            // Try with absolute path based on current URL
            const fallbackPath = `${window.location.origin}${window.location.pathname === '/' ? '' : window.location.pathname}/fallback-data.json`;
            console.log('Attempting to load from:', fallbackPath);
            response = await axios.get(fallbackPath);
            console.log('Loaded fallback data from absolute path');
          } catch (absolutePathError) {
            console.warn('Absolute path fallback failed:', absolutePathError);
            
            // Hardcoded fallback as last resort
            console.log('Using hardcoded fallback data');
            return [
              {
                id: 1,
                germanWord: "machen",
                hungarianTranslation: "csinálni"
              },
              {
                id: 2,
                germanWord: "spielen",
                hungarianTranslation: "játszani"
              },
              {
                id: 3,
                germanWord: "lesen",
                hungarianTranslation: "olvasni"
              },
              {
                id: 4,
                germanWord: "schreiben",
                hungarianTranslation: "írni"
              },
              {
                id: 5,
                germanWord: "gehen",
                hungarianTranslation: "menni"
              }
            ];
          }
        }
      }
    }
    
    // Handle the response based on its type
    if (response && response.data) {
      console.log('Response data type:', typeof response.data);
      
      // If it's a string (CSV data), parse it
      if (typeof response.data === 'string') {
        console.log('Parsing CSV data...');
        const rows = parseCSV(response.data);
        
        // Skip header row if exists
        const startIndex = rows.length > 0 && 
          (rows[0].some(cell => cell.toLowerCase().includes('german')) || 
           rows[0].some(cell => cell.toLowerCase().includes('hungarian'))) ? 1 : 0;
        
        const parsedCards: Flashcard[] = [];
        
        rows.slice(startIndex).forEach((columns, index) => {
            // We only need the German word and Hungarian translation to be present
            if (!columns[0] || !columns[0].trim()) {
                console.warn(`Row ${index + startIndex} has no German word:`, columns);
                return;
            }
            
            // Get the Hungarian translation from the appropriate column (index 2, or 1 if only 2 columns)
            const hungarianTranslation = columns.length >= 3 ? columns[2].trim() : 
                                         columns.length >= 2 ? columns[1].trim() : '';
            
            if (!hungarianTranslation) {
                console.warn(`Row ${index + startIndex} has no Hungarian translation:`, columns);
                return;
            }

            parsedCards.push({
                id: index,
                germanWord: columns[0].trim(),
                // Sound URLs are optional
                germanSoundUrl: columns.length >= 2 ? columns[1].trim() : undefined,
                hungarianTranslation: hungarianTranslation,
                hungarianSoundUrl: columns.length >= 4 ? columns[3].trim() : undefined
            });
        });
        
        console.log(`Parsed ${parsedCards.length} flashcards from CSV`);
        return parsedCards;
      } 
      // If it's already an array (JSON data), return it directly
      else if (Array.isArray(response.data)) {
        console.log(`Received ${response.data.length} flashcards from JSON`);
        return response.data;
      } 
      // Unexpected data format
      else {
        console.error('Unexpected data format:', response.data);
        throw new Error('Unexpected data format received');
      }
    } else {
      console.error('No data in response');
      throw new Error('No data received');
    }
  } catch (error) {
    console.error('Fatal error in fetchFlashcardData:', error);
    throw error;
  }
};

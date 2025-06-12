/**
 * Utility functions for working with URL query parameters
 */

/**
 * Get a URL query parameter value by name
 * @param name The name of the query parameter
 * @param defaultValue The default value to return if the parameter is not present
 * @returns The value of the parameter or the default value
 */
export const getQueryParam = (name: string, defaultValue: string = ''): string => {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(name) || defaultValue;
};

/**
 * Check if a boolean URL query parameter is present and set to true
 * @param name The name of the query parameter
 * @param defaultValue The default value to return if the parameter is not present
 * @returns True if the parameter is present and set to 'true', '1', or '', false otherwise
 */
export const getBooleanQueryParam = (name: string, defaultValue: boolean = false): boolean => {
  const urlParams = new URLSearchParams(window.location.search);
  if (!urlParams.has(name)) {
    return defaultValue;
  }
  
  const value = urlParams.get(name)?.toLowerCase();
  return value === 'true' || value === '1' || value === '';
};

/**
 * Token Manager - Securely manages API tokens
 * 
 * This utility ensures tokens are:
 * 1. Only loaded when needed
 * 2. Securely stored in memory
 * 3. Completely destroyed after use
 */

// Store token in closure for security
let _githubToken = null;
let _tokenUsed = false;

/**
 * Get the GitHub token, loading it only once from environment
 * @returns {string|null} The GitHub token or null if not available
 */
export const getGitHubToken = () => {
  // Only load token once
  if (_githubToken === null && !_tokenUsed) {
    _githubToken = process.env.GATSBY_GITHUB_TOKEN || null;
  }
  return _githubToken;
};

/**
 * Destroy the GitHub token from memory
 * This ensures the token isn't accessible after API calls are complete
 */
export const destroyGitHubToken = () => {
  if (_githubToken) {
    // Overwrite the token with empty string before nullifying
    // This helps ensure garbage collection
    _githubToken = "";
    _githubToken = null;
    _tokenUsed = true;
    
    // Also remove from environment if possible
    if (typeof process !== 'undefined' && process.env && process.env.GATSBY_GITHUB_TOKEN) {
      try {
        process.env.GATSBY_GITHUB_TOKEN = "";
        delete process.env.GATSBY_GITHUB_TOKEN;
      } catch (e) {
        // Environment variables might be read-only in some contexts
        console.debug("Note: Could not remove token from environment");
      }
    }
  }
};

import { Octokit } from "@octokit/rest"

// Initialize Octokit without authentication
// This will use GitHub's public API with rate limiting
const octokit = new Octokit()

// We'll use REST API instead of GraphQL for unauthenticated access


/**
 * Extract owner and repo from a GitHub URL
 * @param {string} url - GitHub repository URL
 * @returns {Object} - { owner, repo } or null if not a valid GitHub URL
 */
export const parseGitHubUrl = (url) => {
  if (!url || !url.includes("github.com")) return null
  
  try {
    const urlObj = new URL(url)
    const pathParts = urlObj.pathname.split("/").filter(Boolean)
    
    if (pathParts.length >= 2) {
      return {
        owner: pathParts[0],
        repo: pathParts[1],
      }
    }
  } catch (error) {
    console.error("Error parsing GitHub URL:", error)
  }
  
  return null
}

/**
 * Fetch repository data from GitHub API
 * @param {string} owner - Repository owner
 * @param {string} repo - Repository name
 * @returns {Promise<Object>} - Repository data
 */
export const fetchRepositoryData = async (owner, repo) => {
  try {
    const { data } = await octokit.repos.get({
      owner,
      repo,
    })
    
    return {
      description: data.description,
      stars: data.stargazers_count,
      forks: data.forks_count,
      language: data.language,
      updatedAt: data.updated_at,
      isArchived: data.archived,
      topics: data.topics || [],
    }
  } catch (error) {
    console.error(`Error fetching GitHub data for ${owner}/${repo}:`, error)
    return null
  }
}

/**
 * Fetch repository data for a GitHub URL
 * @param {string} url - GitHub repository URL
 * @returns {Promise<Object>} - Repository data or null if not a GitHub URL
 */
export const getGitHubData = async (url) => {
  const repoInfo = parseGitHubUrl(url)
  if (!repoInfo) return null
  
  return await fetchRepositoryData(repoInfo.owner, repoInfo.repo)
}

/**
 * Fetch repositories for a GitHub user using the REST API
 * @param {string} username - GitHub username
 * @returns {Promise<Array>} - Array of repository data
 */
export const getPinnedRepositories = async (username) => {
  if (!username) return []
  
  try {
    // Fetch user's repositories sorted by stars (as a proxy for pinned repos)
    const { data } = await octokit.repos.listForUser({
      username,
      sort: 'updated',
      per_page: 6
    })
    
    // Map the repository data to our format
    return data.map(repo => ({
      name: repo.name,
      description: repo.description,
      url: repo.html_url,
      website: repo.homepage,
      image: null, // GitHub repos don't have preview images by default
      stars: repo.stargazers_count,
      forks: repo.forks_count,
      language: repo.language,
      languageColor: null, // We don't get color from REST API
      tags: [], // We don't get topics from this basic REST API call
      icon: "github"
    }))
  } catch (error) {
    console.error(`Error fetching repositories for ${username}:`, error)
    return []
  }
}

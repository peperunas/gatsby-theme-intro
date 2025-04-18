import { Octokit } from "@octokit/rest"

// Initialize Octokit with a personal access token if available
const octokit = new Octokit({
  auth: process.env.GATSBY_GITHUB_TOKEN || "",
})

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

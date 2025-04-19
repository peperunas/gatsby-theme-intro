import { Octokit } from "@octokit/rest"
import { request } from "@octokit/request"

// Check for GitHub token in environment variables
// Use GATSBY_ prefix for browser-accessible variables
const githubToken = process.env.GATSBY_GITHUB_TOKEN

// Log token status for debugging (redacted for security)
console.log("GitHub token status:", githubToken ? "Token found ✓" : "No token found ✗")
console.log("Token value (first few chars):", githubToken ? `${githubToken.substring(0, 4)}...` : "None")

// Initialize Octokit with authentication if token is available
const octokit = new Octokit(githubToken ? {
  auth: githubToken
} : {})

// Configure request with auth token if available
const authenticatedRequest = githubToken 
  ? request.defaults({
      headers: {
        authorization: `token ${githubToken}`,
      },
    })
  : request


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
 * Fetch pinned repositories for a GitHub user using the GraphQL API
 * @param {string} username - GitHub username
 * @returns {Promise<Array>} - Array of repository data
 */
export const getPinnedRepositories = async (username) => {
  if (!username) return []
  
  try {
    // Use GitHub's GraphQL API to fetch pinned repositories
    const query = `
      query {
        user(login: "${username}") {
          pinnedItems(first: 6, types: REPOSITORY) {
            nodes {
              ... on Repository {
                name
                description
                url
                homepageUrl
                stargazerCount
                forkCount
                primaryLanguage {
                  name
                  color
                }
                repositoryTopics(first: 10) {
                  nodes {
                    topic {
                      name
                    }
                  }
                }
              }
            }
          }
        }
      }
    `
    
    // Make the GraphQL request with authentication if available
    const response = await authenticatedRequest('POST /graphql', {
      headers: {
        'content-type': 'application/json',
      },
      data: { query }
    })
    
    // Extract pinned repositories from the response
    const pinnedRepos = response.data?.data?.user?.pinnedItems?.nodes || []
    
    // Map the repository data to our format
    return pinnedRepos.map(repo => ({
      name: repo.name,
      description: repo.description,
      url: repo.url,
      website: repo.homepageUrl,
      image: null, // GitHub repos don't have preview images by default
      stars: repo.stargazerCount,
      forks: repo.forkCount,
      language: repo.primaryLanguage?.name,
      languageColor: repo.primaryLanguage?.color,
      tags: repo.repositoryTopics?.nodes?.map(node => node.topic.name) || [],
      icon: "github"
    }))
  } catch (error) {
    console.error(`Error fetching pinned repositories for ${username}:`, error)
    
    // Fallback to REST API if GraphQL fails
    try {
      console.log("Falling back to REST API for repositories")
      const { data } = await octokit.repos.listForUser({
        username,
        sort: 'stars',
        direction: 'desc',
        per_page: 6
      })
      
      return data.map(repo => ({
        name: repo.name,
        description: repo.description,
        url: repo.html_url,
        website: repo.homepage,
        image: null,
        stars: repo.stargazers_count,
        forks: repo.forks_count,
        language: repo.language,
        languageColor: null,
        tags: [],
        icon: "github"
      }))
    } catch (fallbackError) {
      console.error(`Fallback also failed for ${username}:`, fallbackError)
      return []
    }
  }
}

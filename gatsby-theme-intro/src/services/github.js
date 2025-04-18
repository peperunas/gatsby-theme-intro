import { Octokit } from "@octokit/rest"
import { graphql } from "@octokit/graphql"

// Initialize Octokit with a personal access token if available
const octokit = new Octokit({
  auth: process.env.GATSBY_GITHUB_TOKEN || "",
})

// Initialize GraphQL client with the same token
const graphqlWithAuth = graphql.defaults({
  headers: {
    authorization: `token ${process.env.GATSBY_GITHUB_TOKEN || ""}`,
  },
})

// GraphQL query to fetch pinned repositories
const PINNED_REPOS_QUERY = `
  query getPinnedRepos($username: String!) {
    user(login: $username) {
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
            updatedAt
            isArchived
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
 * Fetch pinned repositories for a GitHub user
 * @param {string} username - GitHub username
 * @returns {Promise<Array>} - Array of pinned repository data
 */
export const getPinnedRepositories = async (username) => {
  if (!username) return []
  
  try {
    const response = await graphqlWithAuth(PINNED_REPOS_QUERY, { username })
    
    if (!response.user || !response.user.pinnedItems) {
      return []
    }
    
    return response.user.pinnedItems.nodes.map(repo => ({
      name: repo.name,
      description: repo.description,
      url: repo.url,
      website: repo.homepageUrl,
      image: null, // GitHub repos don't have preview images by default
      status: repo.isArchived ? "archived" : "live",
      stars: repo.stargazerCount,
      forks: repo.forkCount,
      language: repo.primaryLanguage ? repo.primaryLanguage.name : null,
      languageColor: repo.primaryLanguage ? repo.primaryLanguage.color : null,
      tags: repo.repositoryTopics.nodes.map(node => node.topic.name),
      icon: "github"
    }))
  } catch (error) {
    console.error(`Error fetching pinned repositories for ${username}:`, error)
    return []
  }
}

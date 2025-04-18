import { GatsbyImage } from "gatsby-plugin-image"
import React, { useState, useEffect } from "react"
import { ProjectType } from "../../types"
import ProjectIcon from "./project-icon"
import ProjectStatus from "./project-status"
import ProjectTags from "./project-tags"
import GitHubRepoInfo from "./github-repo-info"
import { getGitHubData } from "../../services/github"

const Project = props => {
  const { name, image, url, description, status, tags, icon } = props
  const [githubData, setGithubData] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const fetchGitHubData = async () => {
      // Only fetch data for GitHub URLs
      if (url && url.includes("github.com") && icon === "github") {
        setIsLoading(true)
        try {
          const data = await getGitHubData(url)
          setGithubData(data)
        } catch (error) {
          console.error("Error fetching GitHub data:", error)
        } finally {
          setIsLoading(false)
        }
      }
    }

    fetchGitHubData()
  }, [url, icon])

  // Use GitHub description if available and no custom description is provided
  const displayDescription = (githubData && !description) 
    ? githubData.description 
    : description

  // Combine custom tags with GitHub topics (if available)
  const displayTags = tags || []
  if (githubData && githubData.topics && Array.isArray(githubData.topics) && githubData.topics.length > 0) {
    // Add GitHub topics that aren't already in tags
    githubData.topics.forEach(topic => {
      if (!displayTags.includes(topic)) {
        displayTags.push(topic)
      }
    })
  }

  return (
    <div className="border-t-4 border-line relative flex flex-wrap bg-back-light p-4 lg:p-8 bg-no-repeat text-sm mb-6">
      {image && (
        <div className="w-full pb-4 lg:w-2/5 lg:pr-8 lg:pb-0">
          <GatsbyImage image={image.childImageSharp.gatsbyImageData} alt={name} />
        </div>
      )}
      <div className="lg:flex-1">
        <h4 className="font-bold">{name}</h4>
        {url && (
          <a
            className="text-front underline break-all hover:opacity-75 transition-opacity duration-150"
            href={url}
            rel="noreferrer noopener"
            target="_blank"
          >
            {url}
          </a>
        )}
        
        {isLoading ? (
          <p className="w-full py-4">Loading project information...</p>
        ) : (
          <>
            <p className="w-full py-4 whitespace-pre-line">{displayDescription}</p>
            
            {/* GitHub repository information */}
            {githubData && <GitHubRepoInfo repoData={githubData} />}
            
            <ul className="pr-2 mt-2">
              {status && <ProjectStatus status={status} />}
              {displayTags.length > 0 && <ProjectTags tags={displayTags} />}
            </ul>
          </>
        )}

        {icon && <ProjectIcon icon={icon} />}
      </div>
    </div>
  )
}

Project.propTypes = ProjectType

export default Project

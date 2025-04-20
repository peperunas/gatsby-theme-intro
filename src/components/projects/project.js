import { GatsbyImage } from "gatsby-plugin-image"
import React, { useState, useEffect } from "react"
import { ProjectType } from "../../types"
import ProjectTags from "./project-tags"
import ProjectBackgroundIcon from "./project-background-icon"
import GitHubRepoInfo from "./github-repo-info"
import { getGitHubData } from "../../services/github"
import { destroyGitHubToken } from "../../utils/tokenManager"

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
    <div 
      className="border-t-4 border-line relative flex flex-wrap p-4 lg:p-8 bg-no-repeat text-sm mb-8 overflow-hidden project-card cursor-pointer hover:shadow-b-lg transition-all duration-500"
      onClick={() => url && window.open(url, '_blank', 'noopener,noreferrer')}
      style={{ 
        transition: 'box-shadow 0.3s ease-in-out, transform 0.2s ease-in-out',
      }}
      onMouseOver={(e) => {
        e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
        e.currentTarget.style.transform = 'translateY(-2px)';
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.boxShadow = 'none';
        e.currentTarget.style.transform = 'translateY(0)';
      }}
    >
      {image && (
        <div className="w-full pb-4 lg:w-2/5 lg:pr-8 lg:pb-0 overflow-hidden rounded-md">
          <GatsbyImage image={image.childImageSharp.gatsbyImageData} alt={name} className="project-image" />
        </div>
      )}
      <div className="lg:flex-1">
        {/* Title without background */}
        <div className="px-3 py-2 pt-1 w-full text-center mb-4 project-title">
          <h3 className="font-bold text-front text-lg uppercase tracking-wider">
            {url ? (
              <a
                className="text-front hover:text-lead transition-colors duration-200 underline"
                href={url}
                rel="noreferrer noopener"
                target="_blank"
              >
                {name}
              </a>
            ) : (
              name
            )}
          </h3>
        </div>
        
        {isLoading ? (
          <p className="w-full py-4">Loading project information...</p>
        ) : (
          <>
            {/* Description without background */}
            <div className="w-full my-4 p-3">
              <p className="whitespace-pre-line text-front text-base leading-relaxed font-mono">{displayDescription}</p>
            </div>
            
            {/* GitHub repository information */}
            {githubData && <GitHubRepoInfo repoData={githubData} />}
            
            {/* Tags without background */}
            {displayTags.length > 0 && (
              <div className="mt-4 p-2">
                <ul className="pr-2">
                  <ProjectTags tags={displayTags} />
                </ul>
              </div>
            )}
          </>
        )}

        {/* Position the icon with higher z-index to appear above the repo info bar */}
        {icon && <ProjectBackgroundIcon icon={icon} />}
      </div>
    </div>
  )
}

Project.propTypes = ProjectType

export default Project

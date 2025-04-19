import React, { useState, useEffect } from "react"
import Project from "./project"
import { arrayOf, shape, ProjectType, string } from "../../types"
import { getPinnedRepositories } from "../../services/github"
import "./project-hover.css"

const Projects = ({ projects, githubUsername }) => {
  const [pinnedRepos, setPinnedRepos] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const fetchPinnedRepos = async () => {
      if (!githubUsername) return
      
      setIsLoading(true)
      try {
        const repos = await getPinnedRepositories(githubUsername)
        setPinnedRepos(repos)
      } catch (error) {
        console.error("Error fetching pinned repositories:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchPinnedRepos()
  }, [githubUsername])

  // Combine manual projects with pinned GitHub repos
  const allProjects = [...projects, ...pinnedRepos]

  return (
    <>
      <h5 id="projects" className="font-header font-bold text-front text-2xl uppercase mt-8 mb-5 sticky top-0 bg-back z-50 py-2 border-b-2 border-line">
        Projects
      </h5>
      {isLoading && (
        <div className="text-sm text-front mb-4">Loading GitHub projects...</div>
      )}
      {allProjects.map((project, i) => (
        <Project key={`${project.name}_${i}`} {...project} />
      ))}
    </>
  )
}

Projects.propTypes = {
  projects: arrayOf(shape(ProjectType)),
  githubUsername: string
}

export default Projects

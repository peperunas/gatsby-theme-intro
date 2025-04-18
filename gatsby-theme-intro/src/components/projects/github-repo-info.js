import React from "react"
import { FaStar, FaCodeBranch, FaCircle } from "react-icons/fa"

const GitHubRepoInfo = ({ repoData }) => {
  if (!repoData) return null

  return (
    <div className="mt-4 flex flex-wrap items-center text-xs text-front">
      {repoData.language && (
        <div className="mr-4 flex items-center">
          <FaCircle className="mr-1 h-2 w-2" style={{ color: getLanguageColor(repoData.language) }} />
          <span>{repoData.language}</span>
        </div>
      )}
      
      {repoData.stars > 0 && (
        <div className="mr-4 flex items-center">
          <FaStar className="mr-1 h-3 w-3" />
          <span>{repoData.stars.toLocaleString()}</span>
        </div>
      )}
      
      {repoData.forks > 0 && (
        <div className="mr-4 flex items-center">
          <FaCodeBranch className="mr-1 h-3 w-3" />
          <span>{repoData.forks.toLocaleString()}</span>
        </div>
      )}
      
      {repoData.updatedAt && (
        <div className="text-xs text-front-light">
          Updated: {new Date(repoData.updatedAt).toLocaleDateString()}
        </div>
      )}
      
      {repoData.isArchived && (
        <div className="ml-auto rounded bg-yellow-200 px-2 py-1 text-xs text-yellow-800">
          Archived
        </div>
      )}
    </div>
  )
}

// Simple language color mapping
const getLanguageColor = (language) => {
  const colors = {
    JavaScript: "#f1e05a",
    TypeScript: "#2b7489",
    HTML: "#e34c26",
    CSS: "#563d7c",
    Python: "#3572A5",
    Java: "#b07219",
    Go: "#00ADD8",
    Ruby: "#701516",
    PHP: "#4F5D95",
    C: "#555555",
    "C++": "#f34b7d",
    "C#": "#178600",
    Swift: "#ffac45",
    Kotlin: "#F18E33",
    Rust: "#dea584",
    Dart: "#00B4AB",
  }
  
  return colors[language] || "#858585"
}

export default GitHubRepoInfo

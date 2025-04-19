import React from "react"
import { FaStar, FaCodeBranch, FaCircle } from "react-icons/fa"

const GitHubRepoInfo = ({ repoData }) => {
  if (!repoData) return null

  return (
    <div className="mt-4 flex flex-wrap items-center text-xs text-front">
      <div className="w-full py-3 px-4 rounded-md bg-back-light border border-line flex flex-wrap items-center" style={{ position: 'relative', zIndex: 10 }}>
        {repoData.language && (
          <div className="mr-5 flex items-center">
            <FaCircle className="mr-2 h-3 w-3" style={{ color: getLanguageColor(repoData.language) }} />
            <span className="text-front text-sm">{repoData.language}</span>
          </div>
        )}

        <div className="mr-5 flex items-center">
          <FaStar className="mr-2 h-4 w-4 text-front" />
          <span className="text-front text-sm">{repoData.stars.toLocaleString()}</span>
        </div>

        <div className="mr-5 flex items-center">
          <FaCodeBranch className="mr-2 h-4 w-4 text-front" />
          <span className="text-front text-sm">{repoData.forks.toLocaleString()}</span>
        </div>

        <div className="text-sm text-front">
          Updated: {new Date(repoData.updatedAt).toLocaleDateString()}
        </div>

        {repoData.isArchived && (
          <div className="ml-auto rounded bg-yellow-200 px-2 py-1 text-xs text-yellow-800">
            Archived
          </div>
        )}
      </div>
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
    Shell: "#89e051",
    PowerShell: "#012456",
    Elixir: "#6e4a7e",
    Haskell: "#5e5086",
    Clojure: "#db5855",
    Scala: "#c22d40"
  }

  return colors[language] || "#858585"
}

export default GitHubRepoInfo

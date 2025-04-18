import React from "react"
import { FaGithub, FaCompass } from "react-icons/fa"

const ProjectBackgroundIcon = ({ icon }) => (
  <div className="absolute right-0 top-0 bottom-0 w-1/4 flex items-center justify-center opacity-10 text-front">
    {icon === "github" ? (
      <FaGithub className="w-3/4 h-3/4" />
    ) : (
      <FaCompass className="w-3/4 h-3/4" />
    )}
  </div>
)

export default ProjectBackgroundIcon

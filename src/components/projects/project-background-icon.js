import React from "react"
import { FaGithub, FaCompass } from "react-icons/fa"

const ProjectBackgroundIcon = ({ icon }) => (
  <div className="absolute right-0 top-0 bottom-0 w-2/5 flex items-center justify-center opacity-10 text-front" style={{ zIndex: 50 }}>
    {icon === "github" ? (
      <FaGithub className="w-full h-full" style={{ fontSize: '10rem' }} />
    ) : (
      <FaCompass className="w-full h-full" style={{ fontSize: '10rem' }} />
    )}
  </div>
)

export default ProjectBackgroundIcon

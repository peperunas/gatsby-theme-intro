import React from "react"
import { ProjectType } from "../../types"

const ProjectTags = ({ tags }) => (
  <>
    {tags.map(tag => (
      <li
        className="inline-block px-3 py-1 mr-2 mt-1 font-medium text-sm rounded-lg border border-line bg-lead bg-opacity-10 hover:bg-opacity-20 transition-all duration-300 font-mono"
        key={tag}
      >
        {tag}
      </li>
    ))}
  </>
)

ProjectTags.propTypes = {
  tags: ProjectType.tags,
}

export default ProjectTags

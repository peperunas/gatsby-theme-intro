import React from "react"
import Skill from "./skill"
import { ProfileType } from "../../types"

const Skills = ({ skills }) => (
  <>
    <h5 className="font-header font-semibold text-front text-sm uppercase mb-3 text-center lg:text-left">
      Top skills
    </h5>
    <ul className="grid grid-cols-2 sm:grid-cols-3 gap-2 md:gap-4">
      {skills.map((skill, i) => (
        <Skill skill={skill} key={skill} i={i + 1} />
      ))}
    </ul>
  </>
)

Skills.propTypes = {
  skills: ProfileType.skills,
}

export default Skills

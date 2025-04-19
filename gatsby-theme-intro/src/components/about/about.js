import React from "react"
import { ProfileType } from "../../types"

const About = ({ about }) => (
  <>
    <h5 id="about" className="font-header font-bold text-front text-2xl uppercase mb-5 sticky top-0 bg-back z-50 py-2 border-b-2 border-line">
      About
    </h5>
    <div className="font-text text-base pb-12 leading-relaxed whitespace-pre-line font-mono">
      {about}
    </div>
  </>
)

About.propTypes = {
  about: ProfileType.about,
}

export default About

import React from "react"
import SocialIcon from "./social-icon"
import { arrayOf, shape } from "../../types"
import PropTypes from "prop-types"

const SocialLinks = ({ social }) => {
  return (
    <div className="flex flex-col items-center lg:items-start">
      <div className="flex justify-center lg:justify-start">
        <div className="pl-3">
          {social.map(({ name, url }, i) => {
            const colorsClass =
              i % 2 === 0 ? "bg-front text-back-light" : "bg-back-light text-front"
            return (
              <a
                aria-label={name}
                className={`inline-flex w-12 h-12 justify-center items-center rounded-full -ml-3 ${colorsClass} hover:shadow-lg transition-shadow duration-150`}
                href={name.toLowerCase() === 'cv' && !url.startsWith('http') ? (url.startsWith('/') ? url : `/${url}`) : url}
                key={name}
                rel="noopener noreferrer"
                target="_blank"
                style={name.toLowerCase() === 'cv' ? { transform: 'translateY(-4px)' } : {}}
              >
                <SocialIcon name={name} className="w-6 h-6" />
              </a>
            )
          })}
        </div>
      </div>
    </div>
  )
}

// Define custom prop types to allow 'cv' as a valid name
SocialLinks.propTypes = {
  social: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired
    })
  )
}

export default SocialLinks

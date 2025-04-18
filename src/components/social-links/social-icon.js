import React from "react"
import {
  FaBehance,
  FaDribbble,
  FaFacebook,
  FaGithub,
  FaGoodreadsG,
  FaMediumM,
  FaInstagram,
  FaLinkedinIn,
  FaProductHunt,
  FaTwitter,
  FaYoutube,
  FaXing,
} from "react-icons/fa"
import { SocialType } from "../../types"
// Import PropTypes directly for custom validation
import PropTypes from "prop-types"

const SocialIcon = ({ name, ...params }) => {
  const icons = {
    behance: FaBehance,
    dribbble: FaDribbble,
    facebook: FaFacebook,
    github: FaGithub,
    goodreads: FaGoodreadsG,
    medium: FaMediumM,
    instagram: FaInstagram,
    linkedin: FaLinkedinIn,
    producthunt: FaProductHunt,
    twitter: FaTwitter,
    youtube: FaYoutube,
    xing: FaXing,
  }

  const Icon = icons[name]

  // For CV, return a text element instead of an icon
  if (name.toLowerCase() === 'cv') {
    return (
      <span 
        className="font-black" 
        style={{
          fontWeight: 900, 
          fontSize: "1.25rem",
          lineHeight: 1,
        }}
        {...params}
      >
        CV
      </span>
    )
  }

  return Icon ? <Icon {...params} /> : null
}

// Override the prop types to allow 'cv' as a valid name
SocialIcon.propTypes = {
  name: PropTypes.string,
  className: PropTypes.string
}

export default SocialIcon

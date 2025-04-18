import React from "react"
import Location from "./location"
import About from "../about/about"
import ProfileImage from "./profile-image"
import { arrayOf, shape, ProfileType, SocialType } from "../../types"
import SocialLinks from "../social-links/social-links"
import "./cursor-blink.css"
import { FaEnvelope } from "react-icons/fa"

const Sidebar = ({ profile, social }) => (
  <aside className="w-full lg:w-1/3 lg:px-6 xl:px-12 bg-back-light bg-opacity-50">
    <div className="flex flex-col items-center lg:items-start lg:sticky lg:top-0 lg:h-screen pt-8 pb-8 mb-0">
      <div className="text-center lg:text-left w-full px-4 lg:px-0">
        <h2 className="font-header font-light text-front text-2xl lg:text-3xl leading-none mb-4">
          {profile.profession}
        </h2>
        <h1 className="font-header font-black text-front text-5xl lg:text-6xl leading-none break-words mb-6">
          {profile.name}<span className="cursor-blink text-lead" aria-hidden="true">_</span>
        </h1>
        {profile.image && (
          <div className="flex justify-center lg:justify-start">
            <ProfileImage image={profile.image} name={profile.name} />
          </div>
        )}
        <br />
        {profile.location && (
          <div className="flex justify-center lg:justify-start">
            <Location
              location={profile.location}
              relocation={profile.relocation}
            />
          </div>
        )}
        
        <div className="pt-16 mt-8">
          <h5 className="font-header font-bold text-front text-2xl uppercase mb-5 text-center lg:text-left">
            Connect
          </h5>
          {profile.email && (
            <div className="flex items-center mb-4 justify-center lg:justify-start">
              <a 
                href={`mailto:${profile.email}`} 
                className="inline-flex w-12 h-12 justify-center items-center rounded-full bg-front text-back-light mr-3"
                aria-label="Email"
              >
                <FaEnvelope className="w-5 h-5" />
              </a>
              <span className="text-front">{profile.email}</span>
            </div>
          )}
          <SocialLinks social={social} />
        </div>
      </div>
    </div>
  </aside>
)

Sidebar.propTypes = {
  profile: shape(ProfileType),
  social: arrayOf(shape(SocialType)),
}

export default Sidebar

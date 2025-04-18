import { graphql } from "gatsby"
import React from "react"
import CustomFonts from "../components/custom-fonts/custom-fonts"
import Footer from "../components/footer/footer"
import MainContent from "../components/main-content/main-content"
import SEO from "../components/seo/seo"
import Sidebar from "../components/sidebar/sidebar"
import StructuredData from "../components/structured-data/structured-data"
import "../styles/style.css"

const IndexPage = ({ data }) => {
  const { history, profile, projects, publications, site, social } = data

  return (
    <div className="antialiased bg-back leading-normal font-text text-front min-h-screen">
      <SEO />
      <StructuredData profile={profile} social={social.nodes} />
      <CustomFonts />

      <div className="md:max-w-screen-sm lg:max-w-screen-xl mx-auto px-4 flex flex-wrap pt-0 my-0 mb-0 pb-0">
        <Sidebar profile={profile} social={social.nodes} />

        <MainContent
          history={history.nodes}
          profile={profile}
          projects={projects.nodes}
          publications={publications ? publications.nodes : []}
          formspreeEndpoint={site.siteMetadata.formspreeEndpoint}
          githubUsername={profile.github_username}
        />
      </div>

      <Footer
        name={profile.name}
        showThemeLogo={site.siteMetadata.showThemeLogo}
      />
    </div>
  )
}

export default IndexPage

export const query = graphql`
  query {
    site {
      siteMetadata {
        showThemeLogo
        formspreeEndpoint
      }
    }
    profile: profileYaml {
      ...ProfileFragment
      github_username
    }
    social: allSocialYaml(filter: { url: { ne: null } }) {
      nodes {
        ...SocialFragment
      }
    }
    history: allWorkHistoryYaml {
      nodes {
        ...WorkHistoryFragment
        logoImage {
          childImageSharp {
            gatsbyImageData(width: 40, height: 40, layout: FIXED, quality: 90)
          }
          publicURL
          extension
        }
      }
    }
    projects: allProjectsYaml {
      nodes {
        ...ProjectFragment
      }
    }
    publications: allPublicationsYaml {
      nodes {
        id
        title
        authors
        journal
        year
        abstract
        pdfUrl
        citation
        url
      }
    }
  }
`

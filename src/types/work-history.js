import { graphql } from "gatsby"
import { string, object } from "prop-types"

export const WorkHistoryType = {
  company: string.isRequired,
  period: string,
  position: string,
  url: string,
  logo: string,
  logoImage: object
}

export const query = graphql`
  fragment WorkHistoryFragment on WorkHistoryYaml {
    company
    period
    position
    url
    logo
  }
`

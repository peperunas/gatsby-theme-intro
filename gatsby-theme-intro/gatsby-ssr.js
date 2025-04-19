/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-ssr/
 */

// This ensures environment variables are available during SSR
console.log("SSR: GitHub token:", process.env.GATSBY_GITHUB_TOKEN ? "Found" : "Not found")

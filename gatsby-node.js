// This ensures environment variables are available during build
require('dotenv').config({
  path: `${process.cwd()}/.env`,
})
console.log("Loading env from:", `${process.cwd()}/.env`)
console.log("GitHub token in node process:", process.env.GATSBY_GITHUB_TOKEN ? "Found" : "Not found")

exports.onPreBootstrap = require("./src/gatsby/node/onPreBootstrap")
exports.sourceNodes = require("./src/gatsby/node/sourceNodes")
exports.createPages = require("./src/gatsby/node/createPages")

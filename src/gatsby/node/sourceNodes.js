module.exports = ({ actions }) => {
  actions.createTypes(`
    type WorkHistoryYaml implements Node {
      id: ID!
      company: String!
      period: String
      position: String
      url: String
      logo: String
      logoImage: File @fileByRelativePath
    }

    type ProjectsYaml implements Node {
      id: ID!
      description: String
      icon: String
      image: File @fileByRelativePath
      name: String!
      status: String
      tags: [String]
      url: String
    }

    type PublicationsYaml implements Node {
      id: ID!
      title: String!
      authors: String!
      journal: String!
      year: String!
      abstract: String
      pdfUrl: String
      citation: String
      url: String
    }
  `)
}

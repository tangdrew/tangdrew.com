const path = require("path")

module.exports = {
  siteMetadata: {
    title: "~",
    description: "Andrew's personal website.",
    author: "@tangdrew"
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`
      }
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png` // This path is relative to the root of the site.
      }
    },
    // PostCSS processing
    "gatsby-plugin-postcss",
    // Bidirectional linking of notes
    {
      resolve: "@aengusm/gatsby-theme-brain",
      options: {
        notesDirectory: "content/notes/",
        noteTemplate: path.join(__dirname, "src/templates/note.tsx"),
        rootPath: "notes",
        rootNote: "index"
      }
    },
    // TypeScript definitions for GraphQL queries
    "gatsby-plugin-graphql-codegen",
    "gatsby-plugin-transition-link"
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ]
}

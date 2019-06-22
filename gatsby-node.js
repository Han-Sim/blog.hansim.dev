//Make a post path by slugifying the title of each post

const { slugify } = require("./src/util/helperFunctions")
const path = require("path")

exports.onCreateNode = ({ node, actions }) => {
  const { createNodeField } = actions

  //check if this node is a post(markdown file)
  if (node.internal.type === "MarkdownRemark") {
    const slugFromTitle = slugify(node.frontmatter.title)
    createNodeField({
      node,
      name: "slug",
      value: slugFromTitle,
    })
  }
}

//create a post page with a single-post.js component as a template
// this will be 'component' and we pass 'context' to this template.
exports.createPages = ({ actions, graphql }) => {
    const { createPage } = actions
    const singlePostTemplate = path.resolve("src/templates/single-post.js")
  
    return graphql(`
      {
        allMarkdownRemark {
          edges {
            node {
              frontmatter {
                author 
                tags
              }
              fields {
                slug
              }
            }
          }
        }
      }
    `).then(res => {
      if (res.errors) return Promise.reject(res.errors)
  
      const posts = res.data.allMarkdownRemark.edges
  
      posts.forEach(({ node }) => {
        createPage({
          path: node.fields.slug,
          component: singlePostTemplate,
          context: {
              //Passing slug for the template to use to get posts.
              slug: node.fields.slug
          }
        })
      })
    })
  }
  
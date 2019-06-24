//Make a post path by slugifying the title of each post

const { slugify } = require("./src/util/helperFunctions")
const path = require("path")
const _ = require("lodash")

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

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions
  const templates = {
    singlePost: path.resolve("src/templates/single-post.js"),
    tagPosts: path.resolve("src/templates/tag-posts.js"),
    postList: path.resolve("src/templates/post-list.js")
  }

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

    /***** Post *****/

    //Create a post page with a single-post.js component as a template
    posts.forEach(({ node }) => {
      createPage({
        path: node.fields.slug,
        component: templates.singlePost,
        context: {
          //Passing slug for the template to use to get posts.
          slug: node.fields.slug,
        },
      })
    })

    /***** Tags *****/

    //gather tags from each nodes
    let tags = []
    _.each(posts, edge => {
      if (_.get(edge, "node.frontmatter.tags")) {
        tags = tags.concat(edge.node.frontmatter.tags)
      }
    })

    //count tags
    // {JavaScript:5, Javs: 12 ...}
    let tagPostCount = {}
    tags.forEach(tag => {
      tagPostCount[tag] = (tagPostCount[tag] || 0) + 1
      //This is to prevent 'NaN'
      //  if tagPostCount[tag] === undefined, it will be 0 + 1
    })

    tags = _.uniq(tags)

    //Create a page with the given tag
    tags.forEach(tag => {
      createPage({
        path: `/tag/${slugify(tag)}`,
        component: templates.tagPosts,
        context: {
          tag,
        },
      })
    })

    /***** Pagination *****/

    const postsPerPage = 2
    const numOfPages = Math.ceil(posts.length / postsPerPage)
    /* 
      we have 2 posts per page
      If there are 7 posts, we need Math.ceil(7/2) = 4 pages
    */

    //create a shallow-copied array to createPage
    //  length = numOfPages
    //  
    Array.from({length: numOfPages}).forEach((_, index) => {
      const isFirstPage = index === 0
      const currentPage = index + 1 //page number starts from 1

      if(isFirstPage) return
      createPage({
        path: `/page/${currentPage}`,
        component: templates.postList,
        context: {
          limit: postsPerPage,
          skip: index * postsPerPage,
          currentPage,
          numOfPages
        }
      })

    })
  })
}

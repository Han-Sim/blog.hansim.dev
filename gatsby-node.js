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
    categoryPosts: path.resolve("src/templates/category-posts.js"),
    allPosts: path.resolve("src/templates/all-posts.js"),
    pageList: path.resolve("src/templates/page-list.js"),
  }

  return graphql(`
    {
      allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
        totalCount
        edges {
          node {
            frontmatter {
              title
              author
              tags
              category
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

    const edges = res.data.allMarkdownRemark.edges
    let titlesOfAll = []
    _.each(edges, edge => {
      if (_.get(edge, "node.frontmatter.title")) {
        titlesOfAll = titlesOfAll.concat(edge.node.frontmatter.title)
      }
    })
    let categoriesOfAll = []
    _.each(edges, edge => {
      if (_.get(edge, "node.frontmatter.category")) {
        categoriesOfAll = categoriesOfAll.concat(edge.node.frontmatter.category)
      }
    })

    /***** Post *****/

    //Create a post page with a single-post.js component as a template
    edges.forEach(({ node }) => {
      createPage({
        path: node.fields.slug,
        component: templates.singlePost,
        context: {
          slug: node.fields.slug, //Passing slug for the template to use to get posts.
          titlesOfAll, //titles array
          categoriesOfAll, //categories
        },
      })
    })

    /***** Tags *****/

    //gather tags from each nodes
    let tags = []
    _.each(edges, edge => {
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

    /***** All Posts *****/
    createPage({
      path: `/all-posts`,
      component: templates.allPosts,
    })

    /***** Category *****/

    //gather category from each nodes
    let categories = []
    _.each(edges, edge => {
      if (_.get(edge, "node.frontmatter.category")) {
        categories = categories.concat(edge.node.frontmatter.category)
      }
    })

    //count categories
    // {JavaScript:5, Javs: 12 ...}
    let categoryCount = {}
    categories.forEach(category => {
      categoryCount[category] = (categoryCount[category] || 0) + 1
    })

    categories = _.uniq(categories)

    //Create a page with the given category
    categories.forEach(category => {
      createPage({
        path: `/category/${slugify(category)}`,
        component: templates.categoryPosts,
        context: {
          category,
        },
      })
    })
  })
}

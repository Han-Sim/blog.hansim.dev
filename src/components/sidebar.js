import React from "react"
import { Badge } from "reactstrap"
import { graphql, useStaticQuery } from "gatsby"
import { slugify } from "../util/helperFunctions"
import _ from "lodash"

import { stack as Menu } from "react-burger-menu"

const Sidebar = () => {
  const data = useStaticQuery(graphql`
    query {
      allMarkdownRemark(
        sort: { fields: [frontmatter___date], order: DESC }
        limit: 10
      ) {
        edges {
          node {
            frontmatter {
              title
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
  `)

  const edges = data.allMarkdownRemark.edges

  //gather tags/category from each nodes
  let tags = []
  _.each(edges, edge => {
    if (_.get(edge, "node.frontmatter.tags")) {
      tags = tags.concat(edge.node.frontmatter.tags)
    }
  })
  let categories = []
  _.each(edges, edge => {
    if (_.get(edge, "node.frontmatter.category")) {
      categories = categories.concat(edge.node.frontmatter.category)
    }
  })

  //count tags/categories
  // {JavaScript:5, Javs: 12 ...}
  let tagPostCount = {}
  tags.forEach(tag => {
    tagPostCount[tag] = (tagPostCount[tag] || 0) + 1
    //This is to prevent 'NaN'
    //  if tagPostCount[tag] === undefined, it will be 0 + 1
  })
  let categoryCount = {}
  categories.forEach(category => {
    categoryCount[category] = (categoryCount[category] || 0) + 1
  })

  tags = _.uniq(tags) //remove duplicate tags
  categories = _.uniq(categories) //remove duplicate categories

  return (
    <Menu right>
      <h3><strong><a href="/markdown-blog-with-gatsbygraphql">See more about this blog</a></strong></h3>
      <div className="menu-between" />
      <h3 className="menu-title m-4">Categories</h3>
      <a href={`/all-posts`} className="menu-item">
        All Posts
      </a>
      {categories.map(category => (
        <a
          id={category}
          className="menu-item"
          href={`/category/${slugify(category)}`}
        >
          {category}{" "}
          <Badge color="light" className="ml-1">
            {categoryCount[category]}
          </Badge>
        </a>
      ))}
      <div className="menu-between" />
      <h3 className="menu-title m-4">Recent Posts</h3>
      {edges.map(({ node }) => (
        <a
          id={node.id}
          className="menu-item"
          href={`/${slugify(node.frontmatter.title)}`}
        >
          {node.frontmatter.title}
        </a>
      ))}
      <div className="menu-between" />
      <h3 className="menu-title m-4">Tags</h3>
      {tags.map(tag => (
        <a id={tag} className="menu-item" href={`/tag/${slugify(tag)}`}>
          {tag}{" "}
          <Badge color="light" className="ml-1">
            {tagPostCount[tag]}
          </Badge>
        </a>
      ))}
    </Menu>
  )
}

export default Sidebar

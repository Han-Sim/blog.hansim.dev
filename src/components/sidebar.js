import React from "react"
import { Badge } from "reactstrap"
import { graphql, useStaticQuery } from "gatsby"
import { slugify } from "../util/helperFunctions"
import _ from "lodash"
import { stack as Menu } from "react-burger-menu"

import { totalCount } from "../pages/index"

const Sidebar = () => {
  const data = useStaticQuery(graphql`
    query {
      allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
        totalCount
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

  //take titles from each node.frontmatter
  let titles = []
  _.each(edges, edge => {
    if (_.get(edge, "node.frontmatter.title")) {
      titles = titles.concat(edge.node.frontmatter.title)
    }
  })

  const numOfRecentPosts = 6
  titles = titles.slice(0, numOfRecentPosts)

  return (
    <Menu width={"100%"} right>
      <a href="/markdown-blog-with-gatsbygraphql">
        <h3>
          <strong className="up-link">About this blog</strong>
        </h3>
      </a>
      <a href="https://hansim.dev" target="_blank">
        <h3>
          <strong className="up-link">About me</strong>
        </h3>
      </a>
      <div className="menu-between" />
      <h3 className="menu-title m-4">Categories</h3>
      <a href={`/all-posts`} className="menu-item">
        All Posts{" "}
        <Badge color="light" className="ml-1">
          {data.allMarkdownRemark.totalCount}
        </Badge>
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
      {titles.map(title => (
        <a id={title} className="menu-item" href={`/${slugify(title)}`}>
          {title}
        </a>
      ))}
      <div className="menu-between" />
      <h3 className="menu-title m-4">Tags</h3>
      {tags.map(tag => (
        <a
          id={tag}
          className="menu-item tag-item mr-4"
          href={`/tag/${slugify(tag)}`}
        >
          {tag}
          <Badge color="light" className="ml-1">
            {tagPostCount[tag]}
          </Badge>
        </a>
      ))}
    </Menu>
  )
}

export default Sidebar

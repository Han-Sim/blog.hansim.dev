import React from "react"
import { Badge } from "reactstrap"
import { Link, graphql, useStaticQuery } from "gatsby"
import { slugify } from "../util/helperFunctions"
import _ from "lodash"

import { stack as Menu } from "react-burger-menu"
import logo from "../images/logo.jpg"

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

  tags = _.uniq(tags) //remove duplicate tags

  return (
    <Menu right>
      <h3 className="menu-title m-4">Tags</h3>
      {tags.map(tag => (
        <a id={tag} className="menu-item" href={`/tag/${slugify(tag)}`}>
          {tag}{" "}
          <Badge color="light" className="ml-1">
            {tagPostCount[tag]}
          </Badge>
        </a>
      ))}
      <div className="menu-between"></div>
      <h3 className="menu-title m-4">Recent Posts</h3>
      {data.allMarkdownRemark.edges.map(({ node }) => (
        <a id={node.id} className="menu-item" href={``}>
          {node.frontmatter.title}
        </a>
      ))}
    </Menu>
  )
}

const SidebarQuery = graphql`
  query {
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      limit: 6
    ) {
      edges {
        node {
          id
          frontmatter {
            title
            tags
          }
          fields {
            slug
          }
        }
      }
    }
  }
`

export default Sidebar

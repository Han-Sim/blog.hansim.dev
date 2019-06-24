import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import Post from "../components/post"

const TagPosts = ({ data, pageContext }) => {
  // { data } <----- props.data [destructured]

  const { tag } = pageContext
  const { totalCount } = data.allMarkdownRemark

  console.log(tag)
  console.log(totalCount)

  const pageTitle = `${totalCount} post${
    totalCount === 1 ? "" : "s"
  } tagged with "${tag}"`

  return (
    <Layout pageTitle={pageTitle}>
      <div>
        {data.allMarkdownRemark.edges.map(({ node }) => (
          <Post
            key={node.id}
            title={node.frontmatter.title}
            author={node.frontmatter.author}
            slug={node.fields.slug}
            date={node.frontmatter.date}
            body={node.excerpt}
            fluid={node.frontmatter.image.childImageSharp.fluid}
            tags={node.frontmatter.tags}
          />
        ))}
      </div>
    </Layout>
  )
}

export const TagQuery = graphql`
  query($tag: String!) {
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      totalCount
      edges {
        node {
          id
          frontmatter {
            title
            date(formatString: "MMM Do YYYY")
            author
            tags
            image {
              childImageSharp {
                fluid(maxWidth: 600) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
          fields {
            slug
          }
          excerpt
        }
      }
    }
  }
`

export default TagPosts

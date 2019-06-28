import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import PostList from "../components/post-list"
import SEO from "../components/seo"

const TagPosts = ({ data, pageContext }) => {
  // { data } <----- props.data [destructured]

  const { tag } = pageContext
  const { totalCount } = data.allMarkdownRemark

  const pageTitle = `${totalCount} post${
    totalCount === 1 ? "" : "s"
  } tagged with "${tag}"`

  const seoTitle = `Posts about ${tag}`
  return (
    <Layout>
      <SEO title={seoTitle} />
      <div className="post-header-area">
        <div className="post-header">
          <div className="post-title">
            <h1>{pageTitle}</h1>
          </div>
        </div>
      </div>
      <div className="container py-5 post-list">
        {data.allMarkdownRemark.edges.map(({ node }) => (
          <PostList
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

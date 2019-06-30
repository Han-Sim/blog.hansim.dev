import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import PostList from "../components/post-list"
import SEO from "../components/seo"

const CategoryPost = ({ data, pageContext }) => {
  // { data } <----- props.data [destructured]

  const { category } = pageContext
  const { totalCount } = data.allMarkdownRemark

  const pageTitle = `${totalCount} post${totalCount === 1 ? "" : "s"} found in `

  const seoTitle = `Posts in ${category}`
  return (
    <Layout>
      <SEO title={seoTitle} />
      <div className="post-header-area">
        <div className="post-header">
          <div className="post-title">
            <h1>
              {pageTitle}
              <br />
              <strong>{category}</strong>
            </h1>
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
            tags={node.frontmatter.tags}
          />
        ))}
      </div>
    </Layout>
  )
}

export const CategoryQuery = graphql`
  query($category: String!) {
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { category: { in: [$category] } } }
    ) {
      totalCount
      edges {
        node {
          id
          frontmatter {
            title
            date(formatString: "MMM Do YYYY")
            author
            category
            tags
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

export default CategoryPost

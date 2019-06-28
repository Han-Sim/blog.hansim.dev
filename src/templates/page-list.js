import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import Post from "../components/post"
import SEO from "../components/seo"

//declare a functional component
const pageList = props => {
  const posts = props.data.allMarkdownRemark.edges
  const { currentPage, numOfPages } = props.pageContext

  return (
    <Layout>
      {posts.map(({ node }) => (
        <>
          <SEO title={node.frontmatter.title} />
          <Post
            title={node.frontmatter.title}
            date={node.frontmatter.date}
            author={node.frontmatter.author}
            tags={node.frontmatter.tags}
            id={node.id}
            slug={node.fields.slug}
            currentPage={currentPage}
            numOfPages={numOfPages}
            isSinglePage={false}
          >
            <div
              className="markdown-body container py-5"
              dangerouslySetInnerHTML={{ __html: node.html }}
            />
          </Post>
        </>
      ))}
    </Layout>
  )
}

export const postListQuery = graphql`
  query($skip: Int!, $limit: Int!) {
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
          id
          html
          frontmatter {
            title
            date(formatString: "MMM Do YYYY")
            author
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

export default pageList

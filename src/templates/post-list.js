import React, { Component } from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import Post from "../components/post"
import Page from "../components/page"

//declare a functional component
const PostList = (props) => {
  const posts = props.data.allMarkdownRemark.edges
  const { currentPage, numOfPages } = props.pageContext 

  return (
    <Layout pageTitle={`Page ${currentPage}`}>
      {posts.map(({ node }) => (
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
      <Page currentPage={currentPage} numOfPages={numOfPages} />
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

export default PostList

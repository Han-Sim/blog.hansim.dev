import React from "react"
import { Link } from "gatsby"
import { graphql, useStaticQuery } from "gatsby"
import { Row, Col } from "reactstrap"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Post from "../components/post"
import Sidebar from "../components/sidebar"
import Page from "../components/page"

const IndexPage = () => {
  const data = useStaticQuery(graphql`
    query {
      allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
        totalCount
        edges {
          node {
            id
            html
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
  `)

  const latestPost = data.allMarkdownRemark.edges[0].node

  const postPerPage = 1
  let numOfPages = data.allMarkdownRemark.edges.length

  return (
    <Layout>
      <SEO title="Home" />
      <Post
        title={latestPost.frontmatter.title}
        date={latestPost.frontmatter.date}
        author={latestPost.frontmatter.author}
        tags={latestPost.frontmatter.tags}
      >
        <div
          class="markdown-body container py-5"
          dangerouslySetInnerHTML={{ __html: latestPost.html }}
        />
      </Post>
      <Page currentPage={1} numOfPages={numOfPages} />
    </Layout>
  )
}

export default IndexPage

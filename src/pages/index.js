import React from "react"
import { Link } from "gatsby"
import { graphql, StaticQuery } from "gatsby"
import { Row, Col } from "reactstrap"

import Layout from "../components/layout"
import SEO from "../components/seo"
import PostList from "../components/post-list"
import Sidebar from "../components/sidebar"
import Page from "../components/page"

const IndexPage = () => {
  const postPerPage = 2
  let numOfPages

  return (
    <Layout pageTitle="Temporary Blog Header :/">
      <SEO title="Home" />
      <StaticQuery
        query={IndexQuery}
        render={data => {
          numOfPages = Math.ceil(
            data.allMarkdownRemark.totalCount / postPerPage
          )
          return (
            <div>
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
              <Page currentPage={1} numOfPages={numOfPages} />
              {/* index page should be the first page */}
            </div>
          )
        }}
      />
    </Layout>
  )
}

const IndexQuery = graphql`
  query {
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      limit: 2
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

export default IndexPage

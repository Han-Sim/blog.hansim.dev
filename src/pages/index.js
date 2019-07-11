import React from "react"
import { graphql, useStaticQuery } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Post from "../components/post"

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
              category
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
  let numOfPages = data.allMarkdownRemark.edges.length

  return (
    <Layout>
      <SEO title={latestPost.frontmatter.title} />
      <Post
        category={latestPost.frontmatter.category}
        title={latestPost.frontmatter.title}
        date={latestPost.frontmatter.date}
        author={latestPost.frontmatter.author}
        tags={latestPost.frontmatter.tags}
        id={latestPost.id}
        slug={latestPost.fields.slug}
        currentPage={1}
        numOfPages={numOfPages}
        isSinglePage={false}
      >
        <div
          className="markdown-body"
          dangerouslySetInnerHTML={{ __html: latestPost.html }}
        />
      </Post>
    </Layout>
  )
}

export default IndexPage

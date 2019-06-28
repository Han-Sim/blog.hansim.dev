import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Post from "../components/post"

import Img from "gatsby-image"
import { slugify } from "../util/helperFunctions"

/* import icons */
import tagIcon from "../images/tags.png"

const SinglePost = ({ data, pageContext }) => {
  const post = data.markdownRemark.frontmatter

  //Converted HTML source
  console.log(post.tags)

  return (
    <Layout>
      <SEO title={post.title} />
      <Post
        title={post.title}
        date={post.date}
        author={post.author}
        tags={post.tags}
        id={data.markdownRemark.id}
        slug={pageContext.slug}
      >
        <div
          class="markdown-body container py-5"
          dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }}
        />
      </Post>
    </Layout>
  )
}

export const postQuery = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      html
      frontmatter {
        title
        author
        tags
        date(formatString: "MMM Do YYYY")
        image {
          childImageSharp {
            fluid(maxWidth: 700) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
      excerpt
    }
  }
`
//String! --> Exclamation Mark means it MUST receive this
//  gatsby-node will pass 'slug' when it calls single-post.js

export default SinglePost

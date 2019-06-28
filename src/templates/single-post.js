import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Page from "../components/page"
import Post from "../components/post"

import { graphql, Link } from "gatsby"
import {
  Row,
  Col,
  Card,
  CardBody,
  CardSubtitle,
  Button,
  Badge,
} from "reactstrap"
import Img from "gatsby-image"
import { slugify } from "../util/helperFunctions"
import { DiscussionEmbed } from "disqus-react"

/* import icons */
import tagIcon from "../images/tags.png"

const SinglePost = ({ data, pageContext }) => {
  const post = data.markdownRemark.frontmatter
  const baseUrl = "https://dev-blog.hansim.io/"

  //DisQus plugin
  const disqusShortname = "https-dev-blog-hansim-io"
  const disqusConfig = {
    url: baseUrl + pageContext.slug,
    identifier: data.markdownRemark.id,
    title: post.title,
  }

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
      >
        <div
          class="markdown-body container py-5"
          dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }}
        />
      </Post>
      <div class="container">
        <DiscussionEmbed shortname={disqusShortname} config={disqusConfig} />
      </div>
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

import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Page from "../components/page"

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
      <div className="post-header-area">
        <div className="post-header">
          <div className="post-title">
            <h1>{post.title}</h1>
          </div>
          <div className="post-info text-center">
            {post.date}, {post.author}
          </div>
        </div>
      </div>
      <div
        class="markdown-body container py-5"
        dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }}
      />
      <div className="container post-tags py-5">
        <img src={tagIcon} alt="TAGS : " />
        {post.tags.map(tag => (
          <Button
            size="sm"
            color="primary"
            href={`/tag/${slugify(tag)}`}
            className="m-1 tags"
          >
            {tag}
          </Button>
        ))}
      </div>
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

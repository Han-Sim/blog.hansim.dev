import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { graphql, Link } from "gatsby"
import { Row, Col, Badge, Card, CardBody, CardSubtitle } from "reactstrap"
import Img from "gatsby-image"
import { slugify } from "../util/helperFunctions"
import { DiscussionEmbed } from "disqus-react"

/* import icons */
import facebook from "../images/facebook.png"
import twitter from "../images/twitter.png"
import linkedin from "../images/linkedin.png"

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
  console.log(data.markdownRemark.html)

  return (
    <Layout pageTitle={post.title}>
      <SEO title={post.title} />
      <Card>
        <Img className="card-image" fluid={post.image.childImageSharp.fluid} />
        <CardBody>
          <CardSubtitle>
            <span className="text-info">{post.date}</span> |{" "}
            <span className="text-info">{post.author}</span>
          </CardSubtitle>
          <div
            class="markdown-body"
            dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }}
          />
          <ul className="post-tags">
            {post.tags.map(tag => (
              <li key={tag}>
                <Link to={`/tag/${slugify(tag)}`}>
                  <Badge color="primary">{tag}</Badge>
                </Link>
              </li>
            ))}
          </ul>
        </CardBody>
      </Card>
      <h3 className="text-center">Share this post</h3>
      <div className="text-center social-share-links">
        <ul>
          <li>
            <a
              href={
                "https://www.facebook.com/sharer/sharer.php?u=" +
                baseUrl +
                pageContext.slug
              }
              className="facebook"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={facebook} width="32px" alt="facebook" />
            </a>
          </li>
          <li>
            <a
              href={
                "https://www.twitter.com/share?url=" +
                baseUrl +
                pageContext.slug +
                "&text=" +
                post.title
              }
              className="twitter"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={twitter} width="32px" alt="twitter" />
            </a>
          </li>
          <li>
            <a
              href={
                "https://www.linkedin.com/shareAritlce?url=" +
                baseUrl +
                pageContext.slug
              }
              className="twitter"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={linkedin} width="32px" alt="linkedin" />
            </a>
          </li>
        </ul>
      </div>
      <DiscussionEmbed shortname={disqusShortname} config={disqusConfig} />
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

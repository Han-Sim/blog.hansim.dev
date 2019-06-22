import React from "react"
import Layout from "../components/layout"
import Sidebar from "../components/sidebar"
import { graphql, Link } from "gatsby"
import SEO from "../components/seo"
import { Row, Col, Badge } from "reactstrap"
import Img from "gatsby-image"
import { node } from "prop-types"
import { slugify } from "../util/helperFunctions"

const SinglePost = (data) => {
  const post = data.markdownRemark.frontmatter
  return (
    <Layout>
      <h1>{post.title}</h1>
      <Row>
        <Col md="8">
          <Card>
            <Img
              className="card-image"
              fluid={post.image.childImageSharp.fluid}
            />
            <CardBody>
              <CardSubtitle>
                <span className="text-info">{date}</span> |{" "}
                <span className="text-info">{author}</span>
              </CardSubtitle>
              <div
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
        </Col>
        <Col md="4">
          <Sidebar></Sidebar>
        </Col>
      </Row>
    </Layout>
  )
}

export const postQuery = grphql`
query blogPostBySlug($slug: String!){
    markdownRemark(fields: {
        slug: {eq: $slug!}
    }) {
        id
        html
        frontmatter {
            title
            author
            date(formatString: "MMM Do YYYY")
        }
        image {
          childImageSharp {
            fluid(maxWidth: 700) {
              ...GatsbyImageSharpFluid
            }
          }
        }
    }
}`
//String! --> Exclamation Mark means it MUST receive this

export default SinglePost

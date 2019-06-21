import React from "react"
import { Card, CardTitle, CardBody, Form, FormGroup, Input } from "reactstrap"
import { Link, graphql, StaticQuery } from "gatsby"
import Img from "gatsby-image"

const Sidebar = () => (
  <div>
    <Card>
      <CardBody>
        <CardTitle className="text-center text-uppercase mb-3">
          Newsletter
        </CardTitle>
        <Form className="text-center">
          <FormGroup>
            <Input
              type="email"
              name="email"
              placeholder="Your email address..."
            />
          </FormGroup>
          <button className="btn btn-outline-success text-uppercase">
            Subscribe
          </button>
        </Form>
      </CardBody>
    </Card>
    <Card>
      <CardBody>
        <CardTitle className="text-center text-uppercase mb-3">
          Recent Posts
        </CardTitle>
        <StaticQuery
          query={SidebarQuery}
          render={data => (
            <div>
              <ul className="list-unstyled">
                {data.allMarkdownRemark.edges.map(({ node }) => (
                  <Link to={node.frontmatter.path}>
                    <li>{node.frontmatter.title} </li>
                  </Link>
                ))}
              </ul>
            </div>
          )}
        ></StaticQuery>
      </CardBody>
    </Card>
  </div>
)

const SidebarQuery = graphql`
  query {
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      limit: 6
    ) {
      edges {
        node {
          id
          frontmatter {
            title
            path
          }
        }
      }
    }
  }
`

export default Sidebar

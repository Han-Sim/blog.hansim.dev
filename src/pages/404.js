import React from "react"
import { Link } from "gatsby"
import { Col, Card } from "reactstrap"

import Layout from "../components/layout"
import SEO from "../components/seo"

const NotFoundPage = () => (
  <Layout pageTitle="Oops, something went wrong!">
    <SEO title="404: Not found" />
  </Layout>
)

export default NotFoundPage

/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { Link, useStaticQuery, graphql } from "gatsby"
import { Row, Col } from "reactstrap"

import Footer from "./footer"
import Sidebar from "./sidebar"

import logo from "../images/logo.jpg"
import "../styles/index.scss"

const Layout = ({ children }) => {
  //props.pageTitle but destructured
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <>
      <div id="main-logo">
        <Link to={"/"}>
          <img src={logo} alt="dev-blog" id="main-logo" />
        </Link>
      </div>
      <div id="content">
        <Sidebar />
        {children}
      </div>
      <Footer />
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout

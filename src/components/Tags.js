import React from "react"
import {
  Badge,
  Card,
  CardTitle,
  CardBody,
  Button,
  Form,
  FormGroup,
  Input,
} from "reactstrap"
import { Link, useStaticQuery, graphql } from "gatsby"
import _ from "lodash"

import { slugify } from "../util/helperFunctions"

const Tags = () => {
  const data = useStaticQuery(graphql`
    query {
      allMarkdownRemark {
        edges {
          node {
            frontmatter {
              tags
            }
          }
        }
      }
    }
  `)
  const edges = data.allMarkdownRemark.edges

  console.log(edges)

  //gather tags from each nodes
  let tags = []
  _.each(edges, edge => {
    if (_.get(edge, "node.frontmatter.tags")) {
      console.log(edge.node.frontmatter.tags)
      tags = tags.concat(edge.node.frontmatter.tags)
    }
  })

  //count tags
  // {JavaScript:5, Javs: 12 ...}
  let tagPostCount = {}
  tags.forEach(tag => {
    tagPostCount[tag] = (tagPostCount[tag] || 0) + 1
    //This is to prevent 'NaN'
    //  if tagPostCount[tag] === undefined, it will be 0 + 1
  })

  tags = _.uniq(tags) //remove duplicate tags

  console.log(tags)
  console.log(tagPostCount)

  return (
    <Card>
      <CardBody>
        <CardTitle className="text-center text-uppercase mb-3">Tags</CardTitle>
        {tags.map(tag => (
          <Button size="sm" color="primary" href={`/tag/${slugify(tag)}`} className="m-1 tags">
            {tag} <Badge color="light">{tagPostCount[tag]}</Badge>
          </Button> 
        ))}
      </CardBody>
    </Card>
  )
}

export default Tags

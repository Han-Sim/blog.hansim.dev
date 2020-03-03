import React from "react";
import { graphql } from "gatsby";

import Layout from "../components/Layout";
import SEO from "../components/seo";
import Post from "../components/post";
import { getFilename } from "../util/helperFunctions";

const SinglePost = ({ data, pageContext }) => {
  const post = data.markdownRemark.frontmatter;
  console.log(data.markdownRemark.fileAbsolutePath);

  return (
    <Layout>
      <SEO title={post.title} />
      <Post
        category={post.category}
        title={post.title}
        date={post.date}
        author={post.author}
        tags={post.tags}
        id={data.markdownRemark.id}
        key={data.markdownRemark.id}
        slug={pageContext.slug}
        titlesOfAll={pageContext.titlesOfAll}
        categoriesOfAll={pageContext.categoriesOfAll}
        isSinglePage={true}
        filename={getFilename(data.markdownRemark.fileAbsolutePath)}
      >
        <div
          className="markdown-body"
          dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }}
        />
      </Post>
    </Layout>
  );
};

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
        category
      }
      excerpt
      fileAbsolutePath
    }
  }
`;
//String! --> Exclamation Mark means it MUST receive this
//  gatsby-node will pass 'slug' when it calls single-post.js

export default SinglePost;

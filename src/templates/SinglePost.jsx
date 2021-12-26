import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import Layout from "src/components/Layout";
import SEO from "src/components/seo";
import Post from "src/components/post";
import { getFilename } from "src/util/helpers";

const SinglePost = ({ data, pageContext }) => {
  const post = data.markdownRemark.frontmatter;

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
        date(formatString: "MMM D, YYYY")
        category
      }
      excerpt
      fileAbsolutePath
    }
  }
`;
// NOTE:
// String! --> Exclamation Mark means it MUST receive this
//  gatsby-node will pass 'slug' when it calls single-post.jsx

SinglePost.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      fileAbsolutePath: PropTypes.string,
      frontmatter: PropTypes.shape({
        author: PropTypes.string,
        category: PropTypes.string,
        date: PropTypes.string,
        tags: PropTypes.arrayOf(PropTypes.string),
        title: PropTypes.string,
      }),
      id: PropTypes.string,
      html: PropTypes.string,
    }),
  }),
  pageContext: PropTypes.shape({
    slug: PropTypes.string,
    titlesOfAll: PropTypes.arrayOf(PropTypes.string),
  }),
};

export default SinglePost;

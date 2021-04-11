import React, { useContext, useEffect } from "react";
import { graphql } from "gatsby";
import { Context } from "src/context";
import Layout from "src/components/Layout";
import SEO from "src/components/seo";
import Post from "src/components/post";
import { getFilename } from "src/util/helpers";

const SinglePost = ({ data, pageContext }) => {
  const post = data.markdownRemark.frontmatter;
  const { setActiveMenu } = useContext(Context);

  useEffect(() => {
    setActiveMenu(post.category);
  }, [setActiveMenu, post.category]);

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
        date(formatString: "MMM Do, YYYY")
        category
      }
      excerpt
      fileAbsolutePath
    }
  }
`;
//String! --> Exclamation Mark means it MUST receive this
//  gatsby-node will pass 'slug' when it calls single-post.jsx

export default SinglePost;

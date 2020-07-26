const path = require("path");
const _ = require("lodash");
const { countOccurrences, slugify } = require("./src/util/helperFunctions");
const {
  CATEGORY_WEB_DEVELOPMENT,
  CATEGORY_BASICS,
} = require("./src/util/constants");

exports.onCreateNode = ({ node, actions }) => {
  const { createNodeField } = actions;

  // check if this node is a post(markdown file)
  if (node.internal.type === "MarkdownRemark") {
    const slugFromTitle = slugify(node.frontmatter.title);
    createNodeField({
      node,
      name: "slug",
      value: slugFromTitle,
    });
  }
};

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions;
  const templates = {
    singlePost: path.resolve("src/templates/SinglePost.jsx"),
    tagPosts: path.resolve("src/templates/TagPosts.jsx"),
    allPosts: path.resolve("src/templates/AllPosts.jsx"),
  };

  return graphql(`
    {
      allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
        totalCount
        edges {
          node {
            frontmatter {
              title
              author
              tags
              category
            }
            fields {
              slug
            }
          }
        }
      }
    }
  `).then(res => {
    if (res.errors) return Promise.reject(res.errors);

    const { edges } = res.data.allMarkdownRemark;

    // #region Single Post

    const titlesOfAll = edges.map(edge => {
      if (_.get(edge, "node.frontmatter.title")) {
        return edge.node.frontmatter.title;
      }
    });

    edges.forEach(({ node }) => {
      createPage({
        path: node.fields.slug,
        component: templates.singlePost,
        context: {
          slug: node.fields.slug, // Passing a slug for the template to use to get posts.
          titlesOfAll, // titles array
        },
      });
    });

    // #endregion

    // #region Tag Posts.

    let tags = [];
    edges.forEach(edge => {
      if (_.get(edge, "node.frontmatter.tags")) {
        // Note that each edge has an array of tags.
        tags = [...tags, ...edge.node.frontmatter.tags];
      }
    });

    const tagPostCount = countOccurrences(tags);

    _.uniq(tags).forEach(tag => {
      createPage({
        path: `/tag/${slugify(tag)}`,
        component: templates.tagPosts,
        context: {
          tag,
          totalCount: tagPostCount[tag],
        },
      });
    });

    // #endregion

    // #region All Posts

    createPage({
      path: `/all-posts`,
      component: templates.allPosts,
    });

    // #endregion
  });
};

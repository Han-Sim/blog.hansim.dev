const path = require("path");
const _ = require("lodash");
const {
  convertArrayToObjectOfCountOccurrences,
  slugify,
} = require("./src/util/helpers");
const {
  PATH_CATEGORY_WEB_DEVELOPMENT,
  PATH_CATEGORY_BASICS,
  PATH_ALL_POSTS,
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

    const tagPostCount = convertArrayToObjectOfCountOccurrences(tags);

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

    // #region category posts and all posts

    createPage({
      path: PATH_CATEGORY_WEB_DEVELOPMENT,
      component: templates.allPosts,
    });

    createPage({
      path: PATH_CATEGORY_BASICS,
      component: templates.allPosts,
    });

    createPage({
      path: PATH_ALL_POSTS,
      component: templates.allPosts,
    });

    // #endregion
  });
};

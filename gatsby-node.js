const path = require("path");
const isNil = require("lodash/isNil");
const get = require("lodash/get");
const uniq = require("lodash/uniq");
const {
  convertArrayToObjectOfCountOccurrences,
  slugify,
} = require("./src/util/helpers");
const {
  CATEGORY_ALL_POSTS,
  CATEGORY_BASICS,
  CATEGORY_WEB_DEVELOPMENT,
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

// This application has five URL entries.
// 1. Single post - bring the post contents using slug.
// 2. Tag posts - bring the list of posts associated with the given tag.
// 3, 4, 5. All posts - bring the entire list of posts - the list of posts by categories as well.
exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions;
  const templates = {
    categoryPosts: path.resolve("src/templates/CategoryPosts.jsx"),
    singlePost: path.resolve("src/templates/SinglePost.jsx"),
    tagPosts: path.resolve("src/templates/TagPosts.jsx"),
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

    // Quick sanity check for the post md files
    edges.forEach(edge => {
      const { fields, frontmatter } = edge.node;

      if (isNil(frontmatter)) {
        throw new Error("Some post has no frontmatter");
      }

      if (isNil(frontmatter.title) || isNil(frontmatter.author)) {
        throw new Error("Some post has no title or author");
      }

      if (
        ![
          CATEGORY_BASICS.toUpperCase(),
          CATEGORY_WEB_DEVELOPMENT.toUpperCase(),
        ].includes(frontmatter.category.toUpperCase())
      ) {
        throw new Error("Some post has a wrong undefined category");
      }

      if (isNil(fields.slug)) {
        throw new Error("Some post failed to generate a slug");
      }
    });

    // #region Single Post

    edges.forEach(({ node }) => {
      createPage({
        path: node.fields.slug,
        component: templates.singlePost,
        context: {
          slug: node.fields.slug, // Passing a slug for the template for <SinglePost /> graphql to find the post.
          titlesOfAll: edges.map(edge => edge.node.frontmatter.title), // titles array
        },
      });
    });

    // #endregion

    // #region Tag Posts.

    let tags = [];
    edges.forEach(edge => {
      if (get(edge, "node.frontmatter.tags")) {
        // Note that each edge can have an array of tags.
        tags = [...tags, ...edge.node.frontmatter.tags];
      }
    });

    const tagPostCount = convertArrayToObjectOfCountOccurrences(tags);

    uniq(tags).forEach(tag => {
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
      path: PATH_ALL_POSTS,
      component: templates.categoryPosts,
      context: {
        category: CATEGORY_ALL_POSTS,
      },
    });

    createPage({
      path: PATH_CATEGORY_BASICS,
      component: templates.categoryPosts,
      context: {
        category: CATEGORY_BASICS,
      },
    });

    createPage({
      path: PATH_CATEGORY_WEB_DEVELOPMENT,
      component: templates.categoryPosts,
      context: {
        category: CATEGORY_WEB_DEVELOPMENT,
      },
    });

    // #endregion
  });
};

//Make a post path by slugifying the title of each post

const path = require("path");
const _ = require("lodash");
const { slugify } = require("./src/util/helperFunctions");
const {
  REVERSE_MENU_HIERARCHY,
  NUM_OF_MENUS,
  MENU_WEB_DEVELOPMENT,
  MENU_BASICS,
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
    singlePost: path.resolve("src/templates/single-post.jsx"),
    tagPosts: path.resolve("src/templates/tag-posts.jsx"),
    menuPosts: path.resolve("src/templates/menu-posts.jsx"),
    categoryPosts: path.resolve("src/templates/category-posts.jsx"),
    allPosts: path.resolve("src/templates/all-posts.jsx"),
    pageList: path.resolve("src/templates/page-list.jsx"),
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
              menu
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

    const edges = res.data.allMarkdownRemark.edges;
    let titlesOfAll = [];
    _.each(edges, edge => {
      if (_.get(edge, "node.frontmatter.title")) {
        titlesOfAll = titlesOfAll.concat(edge.node.frontmatter.title);
      }
    });
    let categoriesOfAll = [];
    _.each(edges, edge => {
      if (_.get(edge, "node.frontmatter.category")) {
        categoriesOfAll = categoriesOfAll.concat(
          edge.node.frontmatter.category
        );
      }
    });

    /***** Post *****/

    // Create a post page with a single-post.jsx component as a template
    edges.forEach(({ node }) => {
      createPage({
        path: node.fields.slug,
        component: templates.singlePost,
        context: {
          slug: node.fields.slug, // Passing slug for the template to use to get posts.
          titlesOfAll, // titles array
          categoriesOfAll, // categories
        },
      });
    });

    /***** Tags *****/

    // gather tags from each nodes
    let tags = [];
    _.each(edges, edge => {
      if (_.get(edge, "node.frontmatter.tags")) {
        tags = tags.concat(edge.node.frontmatter.tags);
      }
    });

    // count tags
    // i.e. {JavaScript: 5, Java: 12 ...}
    let tagPostCount = {};
    tags.forEach(tag => {
      tagPostCount[tag] = (tagPostCount[tag] || 0) + 1;
      // This is to prevent 'NaN'
      // if tagPostCount[tag] === undefined, it will be 0 + 1
    });

    tags = _.uniq(tags);

    // Create a page with the given tag
    tags.forEach(tag => {
      createPage({
        path: `/tag/${slugify(tag)}`,
        component: templates.tagPosts,
        context: {
          tag,
        },
      });
    });

    /***** All Posts *****/

    createPage({
      path: `/all-posts`,
      component: templates.allPosts,
    });

    /***** Menu and Category Posts *****/

    // gather category from each node
    const categories = [];
    _.each(edges, edge => {
      if (_.get(edge, "node.frontmatter.category")) {
        categories.push(edge.node.frontmatter.category);
      }
    });

    // count the number of posts for each category
    const categoryPostsCount = {};
    categories.forEach(category => {
      categoryPostsCount[category] = (categoryPostsCount[category] || 0) + 1;
    });

    // Create a page with a given category.
    _.uniq(categories).forEach(category => {
      createPage({
        path: `/category/${slugify(category)}`,
        component: templates.categoryPosts,
        context: {
          category,
          totalCount: categoryPostsCount[category],
        },
      });
    });

    // gather menu from each node
    const menus = [];
    _.each(edges, edge => {
      if (_.get(edge, "node.frontmatter.menu")) {
        menus.push(edge.node.frontmatter.menu);
      }
    });

    if (_.uniq(menus).length !== NUM_OF_MENUS) {
      console.error(
        "There is uncontrolled menus. Please fix the post or update the application",
        _.uniq(menus)
      );
    }

    const menuPostsCount = {
      [MENU_WEB_DEVELOPMENT]: 0,
      [MENU_BASICS]: 0,
    };
    menus.forEach(menu => {
      menuPostsCount[menu]++;
    });

    // Create a page with a given menu.
    menus.forEach(menu => {
      createPage({
        path: `/menu/${slugify(menu)}`,
        component: templates.menuPosts,
        context: {
          menu,
          totalCount: menuPostsCount[menu],
        },
      });
    });
  });
};

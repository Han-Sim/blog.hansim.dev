/**
 * This file contains helper functions.
 * It is used for gatsby-node.js thus should use the node.js syntax only.
 */
const { MENU_HIERARCHY } = require("./constants");

/**
 * This function counts the occurrences of each element and return its result as object.
 * i.e. { JavaScript: 5, Java: 12, ...}
 */
const countEach = arr => {
  let result = {};
  arr.forEach(elem => {
    result[elem] = (result[elem] || 0) + 1;
  });

  return result;
};

/**
 * Returns an index.
 */
const findIndex = function(arr, elem) {
  for (let i = 0; i < arr.length; i++) {
    if (elem === arr[i]) return i;
  }

  return -1;
};

/**
 * This is to get a file name.
 */
const getFilename = function(absolutePath) {
  let charArr = absolutePath.split("");
  charArr = charArr.reverse();
  let result = [];
  for (let char of charArr) {
    if (char === "/") break;
    result.unshift(char);
  }
  return result.join("");
};

/**
 * This is to get a matching upper-level menu for a given category.
 */
const getMenu = category => {
  for (let [key, value] of Object.entries(MENU_HIERARCHY)) {
    if (value.contains(slugify(category))) {
      return key;
    }

    return;
  }
};

/**
 * slugify text to create user friendly url for tags
 * TODO bug fix: toLowerCase doesn't work properly for sidebar menu.
 */
const slugify = function(text) {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/[^\w-]+/g, "") // Remove all non-word chars
    .replace(/--+/g, "-") // Replace multiple - with single -
    .replace(/^-+/, "") // Trim - from start of text
    .replace(/-+$/, ""); // Trim - from end of text
};

// Node.js syntax export (not ES6)
// this module is to be used in gatsby-node.js, because gatsby-node.js is run by Node as well.
module.exports = {
  countEach,
  findIndex,
  getFilename,
  getMenu,
  slugify,
};

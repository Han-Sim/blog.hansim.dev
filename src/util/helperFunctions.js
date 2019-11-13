//slugify text to create user friendly url for tags
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

const findIndex = function(array, key) {
  for (let i = 0; i < array.length; i++) {
    if (key === array[i]) return i;
  }

  return -1;
};

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

module.exports = { slugify, findIndex, getFilename };
//Node.js syntax export (not ES6)
// this module is to be used in gatsby-node.js, because gatsby-node.js is run by Node as well.

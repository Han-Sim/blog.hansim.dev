//slugify text to create user friendly url for tags
const slugify = function(text) {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/[^\w-]+/g, "") // Remove all non-word chars
    .replace(/--+/g, "-") // Replace multiple - with single -
    .replace(/^-+/, "") // Trim - from start of text
    .replace(/-+$/, "") // Trim - from end of text
}

const findIndex = function(array, key) {
  for (let i = 0; i < array.length; i++) {
    if (key === array[i]) return i
  }

  return -1
}

module.exports = { slugify, findIndex }
//Node.js syntax export (not ES6)
// this module is to be used in gatsby-node.js, because gatsby-node.js is run by Node as well.

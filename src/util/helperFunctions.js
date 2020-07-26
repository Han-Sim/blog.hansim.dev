/**
 * This file contains helper functions.
 * It is used for gatsby-node.js thus should use the node.js syntax only.
 */

/**
 * This function counts the occurrences of each element and return its result as object.
 * i.e. { JavaScript: 5, Java: 12, ...}
 */
const countOccurrences = arr => {
  let result = {};
  arr.forEach(elem => {
    result[elem] = (result[elem] || 0) + 1;
    // This is to prevent 'NaN'
    // if tagPostCount[tag] === undefined, it will be 0 + 1
  });

  return result;
};

/**
 * Sorts object property by values in descending order.
 * i.e. { JavaScript: 10, Java: 7, ...}
 */
const sortObjectByValueDescOrder = obj => {
  const sortable = [];
  for (let property in obj) {
    sortable.push([property, obj[property]]);
  }
  sortable.sort((a, b) => {
    return b[1] - a[1];
  });

  const objSorted = {};
  sortable.forEach(item => {
    objSorted[item[0]] = item[1];
  });
  return objSorted;
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
// this module is to be used in gatsby-node.js that is run by Node as well.
module.exports = {
  countOccurrences,
  findIndex,
  getFilename,
  slugify,
  sortObjectByValueDescOrder,
};

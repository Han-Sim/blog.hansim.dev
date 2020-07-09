/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

// You can delete this file if you're not using it

const React = require("react");
const { ContextProvider } = require("./src/context");
require("./src/styles/prism.css");

exports.wrapRootElement = ({ element }) => {
  return <ContextProvider>{element}</ContextProvider>;
};

/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/ssr-apis/
 */

// You can delete this file if you're not using it

const React = require("react");
const { ContextProvider } = require("./src/context");
require("./src/styles/index.scss");
require("./src/styles/prism.css");

exports.wrapRootElement = ({ element }) => {
  return <ContextProvider>{element}</ContextProvider>;
};

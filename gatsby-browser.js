/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */
const React = require("react");
const PropTypes = require("prop-types");
const { ContextProvider } = require("./src/context");
require("prismjs/themes/prism.css");
require("./src/styles/index.scss");

const App = ({ element }) => {
  // Provide Context.
  return <ContextProvider>{element}</ContextProvider>;
};

App.propTypes = {
  element: PropTypes.node,
};

exports.wrapRootElement = App;

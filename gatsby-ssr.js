/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/ssr-apis/
 */
const React = require("react");
const PropTypes = require("prop-types");
const { ContextProvider } = require("./src/context");
require("./src/styles/index.scss");
require("./src/styles/prism.css");

const App = ({ element }) => {
  return <ContextProvider>{element}</ContextProvider>;
};

App.propTypes = {
  element: PropTypes.node,
};

exports.wrapRootElement = App;

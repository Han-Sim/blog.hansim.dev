import React from "react";

import Layout from "src/components/Layout";
import SEO from "src/components/seo";

const NotFoundPage = () => (
  <Layout>
    <SEO title="404 Error" />
    <div>Something went wrong :/</div>
  </Layout>
);

export default NotFoundPage;

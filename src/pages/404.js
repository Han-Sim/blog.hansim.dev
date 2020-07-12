import React from "react";
import { Link } from "gatsby";

import Layout from "src/components/Layout";
import SEO from "src/components/seo";

const NotFoundPage = () => (
  <Layout>
    <SEO title="404 Error" />
    <div className="post-header-area">
      <div className="post-header">
        <div className="post-title">
          <h1>Something went wrong:/</h1>
        </div>
        <div className="post-list text-center">
          <Link to={"/"}>
            <h1>Go to the first page</h1>
          </Link>
        </div>
      </div>
    </div>
  </Layout>
);

export default NotFoundPage;

import React from "react";
import AllPosts from "src/templates/AllPosts";
import { PATH_ALL_POSTS } from "src/util/constants";

const IndexPage = () => <AllPosts path={PATH_ALL_POSTS} />;

export default IndexPage;


import React from "react";

import { Badge } from "reactstrap";

const MenuList = props => {
  console.log(props);

  return (
    <></>
  );
}

export default MenuList;






  // <a href="/markdown-blog-with-gatsbygraphql">
  //   <h3>
  //     <strong className="up-link">About this blog</strong>
  //   </h3>
  // </a>
  // {/* <a href="https://hansim.dev" target="_blank" rel="noopener noreferrer">
  //   <h3>
  //     <strong className="up-link">About me</strong>
  //   </h3>
  // </a> */}
  // <div className="menu-between" />
  // <span className="menu-title m-4">Categories</span>
  // <a href={`/all-posts`} className="menu-item">
  //   All Posts{" "}
  //   <Badge color="light" className="ml-1">
  //     {data.allMarkdownRemark.totalCount}
  //   </Badge>
  // </a>
  // {categories.map(category => (
  //   <a
  //     key={category}
  //     className="menu-item"
  //     href={`/category/${slugify(category)}`}
  //   >
  //     {category}{" "}
  //     <Badge color="light" className="ml-1">
  //       {categoryCount[category]}
  //     </Badge>
  //   </a>
  // ))}
  // <div className="menu-between" />
  // <span className="menu-title m-4">Recent Posts</span>
  // {titles.map(title => (
  //   <a key={title} className="menu-item" href={`/${slugify(title)}`}>
  //     {title}
  //   </a>
  // ))}
  // <div className="menu-between" />
  // <span className="menu-title m-4">Tags</span>
  // {tags.map(tag => (
  //   <a
  //     key={tag}
  //     className="menu-item tag-item mr-4"
  //     href={`/tag/${slugify(tag)}`}
  //   >
  //     {tag}
  //     <Badge color="light" className="ml-1">
  //       {tagPostCount[tag]}
  //     </Badge>
  //   </a>
  // ))}
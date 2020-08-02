import React, { useLayoutEffect, useState } from "react";

/**
 * Custom hook to re-render the component when window height changes.
 */
const useWindowHeight = () => {
  const [size, setSize] = useState(0);

  useLayoutEffect(() => {
    const updateSize = () => {
      setSize(window.innerHeight);
    };
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return size;
};

export { useWindowHeight };

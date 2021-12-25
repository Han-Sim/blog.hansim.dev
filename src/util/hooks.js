import { useEffect, useState } from "react";
import { debounce } from "src/util/helpers";

/**
 * Custom hook to re-render the component when window height changes.
 */
const useWindowHeightWithDebounce = delay => {
  const [size, setSize] = useState(0);

  useEffect(() => {
    const updateSize = debounce(() => {
      setSize(window.innerHeight);
    }, delay);
    window.addEventListener("resize", updateSize);
    updateSize();

    return () => window.removeEventListener("resize", updateSize);
  }, [delay]);

  return size;
};

export { useWindowHeightWithDebounce };

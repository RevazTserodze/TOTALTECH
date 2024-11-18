import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const scrollTimeout = setTimeout(() => {
      window.scrollTo(0, 0);
    }, 100); 

    return () => clearTimeout(scrollTimeout); 
  }, [pathname]);

  return null;
};

export default ScrollToTop;

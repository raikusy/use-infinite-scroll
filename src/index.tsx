import * as React from 'react';

const useInfiniteScroll = ({ loadData, loading }) => {
  // const observer = React.useRef(null);
  // console.log(node);
  const [node, setNode] = React.useState(null);
  const intersectionObserver = React.useRef<IntersectionObserver | null>(null);
  React.useEffect(() => {
    if (intersectionObserver.current) {
      intersectionObserver.current.disconnect();
    }

    intersectionObserver.current = new IntersectionObserver(([entry]) => {
      if (!loading) {
        console.log(entry.isIntersecting);
        loadData(entry.isIntersecting);
      }
    });

    if (node) intersectionObserver.current.observe(node);
    return () => {
      intersectionObserver.current && intersectionObserver.current.disconnect();
    };
  }, [node, loadData]);
  return [setNode];
};

export default useInfiniteScroll;

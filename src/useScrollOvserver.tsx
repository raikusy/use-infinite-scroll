// WIP: This is work in progress and not ready to be used yet.
// TODO: Improve this feature.
import * as React from 'react';

interface PropTypes {
  loadData: Function;
  loading: Boolean;
  page: number;
}

const useInfiniteScroll = ({ loadData, loading, page }: PropTypes) => {
  // const observer = React.useRef(null);
  // console.log(node);
  const [node, setNode] = React.useState<null | HTMLElement>(null);
  const intersectionObserver = React.useRef<IntersectionObserver | null>(null);
  React.useEffect(() => {
    if (intersectionObserver.current) {
      intersectionObserver.current.disconnect();
    }

    intersectionObserver.current = new IntersectionObserver(([entry]) => {
      if (!loading) {
        console.log(entry.isIntersecting);
        if (entry.isIntersecting) {
          loadData(page + 1);
        }
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

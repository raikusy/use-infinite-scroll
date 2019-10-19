import * as React from 'react'; //eslint-disable-line
import debounce from 'debounce-promise';

interface PropTypes {
  isLoading: Boolean;
  hasMore: Boolean;
  loadData: Function;
  error: Boolean;
  page: number;
}

export default function useScrollLoad({
  isLoading,
  hasMore,
  loadData,
  error,
  page,
}: PropTypes) {
  React.useEffect(() => {
    window.onscroll = debounce(() => {
      if (error || isLoading || !hasMore) return;

      const scrollHeight = document.body.scrollHeight;
      const totalHeight = window.scrollY + window.innerHeight;

      if (scrollHeight <= totalHeight + 200) {
        loadData(page);
      }
    }, 300);
  }, [isLoading, hasMore, error, loadData, page]);
  return null;
}

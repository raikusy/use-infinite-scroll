import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { useScrollEvent } from '../src/index';
import './index.css';

const App = () => {
  const [arr, setArr] = React.useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  const rootRef = React.useRef(null);
  // const [node, setNode] = React.useState(rootRef.current);
  const [isLoading, setIsLoading] = React.useState(false);
  const [hasMore, setHasMore] = React.useState(true);
  const [page, setPage] = React.useState(1);
  const [error, setError] = React.useState(false);
  const loadData = React.useCallback(page => {
    setIsLoading(true);
    setTimeout(() => {
      const newArr = arr.concat(...arr.map(item => item + page * 10));
      setArr(newArr);
      console.log('last item reached');
      setIsLoading(false);
      setPage(page + 1);
    }, 1000);
  }, []);
  useScrollEvent({ isLoading, hasMore, loadData, error, page });

  return (
    <div style={{ overflowAnchor: 'none' }}>
      {arr.map(n => (
        <li className="list-item" key={n}>
          {n}
        </li>
      ))}
      {isLoading && <h3>Loading...</h3>}
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));

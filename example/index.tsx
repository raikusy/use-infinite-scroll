import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import useInfiniteScroll from '../src/index';

const App = () => {
  const [arr, setArr] = React.useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  const rootRef = React.useRef(null);
  // const [node, setNode] = React.useState(rootRef.current);
  const [loading, setLoading] = React.useState(false);
  const loadData = React.useCallback(isLast => {
    if (isLast) {
      setLoading(true);
      setTimeout(() => {
        setArr([
          ...arr,
          ...Array.from({ length: 10 }, () => Math.ceil(Math.random() * 999)),
        ]);
        console.log('last item reached');
        setLoading(false);
      }, 1000);
    }
  }, []);
  const [setNode] = useInfiniteScroll({ loadData, loading });

  React.useEffect(() => {
    if (rootRef.current) {
      setNode(rootRef.current);
    }
    return () => {
      setNode(null);
    };
  }, [rootRef.current, setNode]);

  return (
    <div>
      {arr.map((n, i) => (
        <li
          ref={arr[arr.length - 1] === n ? rootRef : null}
          style={{
            width: '100%',
            height: '200px',
            textAlign: 'center',
            fontSize: '36px',
            display: 'flex',
            alignItems: 'center',
            background: '#e9e9e9',
            justifyContent: 'center',
          }}
          key={n * i}
        >
          {n * i}
        </li>
      ))}
      {loading && <h3>Loading...</h3>}
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));

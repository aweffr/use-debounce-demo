import React, {useCallback, useEffect, useMemo, useRef, useState} from "react";
import _ from "lodash";

const data = Array(250).fill(0).map((_, idx) => idx);


const useDebounce = (func, delay, {leading, trailing}) => {
  const funcRef = useRef(func);

  useEffect(() => {
    funcRef.current = func;
  }, [func]);

  // noinspection UnnecessaryLocalVariableJS
  const debouncedFunc = useMemo(() => {
    return _.debounce((...args) => {
      if (funcRef.current) {
        funcRef.current(...args);
      }
    }, delay, {leading, trailing})

  }, [delay, leading, trailing]);


  return debouncedFunc;
}

const useThrottle = (func, wait, {leading, trailing}) => {
  const funcRef = useRef(func);

  useEffect(() => {
    funcRef.current = func;
  }, [func]);


  // noinspection UnnecessaryLocalVariableJS
  const throttleFunc = useMemo(() => {
    return _.throttle((...args) => {
      if (funcRef.current) {
        funcRef.current(...args);
      }
    }, wait, {leading, trailing})
  }, [wait, leading, trailing]);

  return throttleFunc;
}


function App() {


  const [onScrollCallCnt, setOnScrollCallCnt] = useState(0);

  useEffect(() => {
    console.log("hello world!")
  }, [])

  const onScroll = useCallback((e) => {
    console.log("onScroll called!", e);
    setOnScrollCallCnt(prev => prev + 1)
  }, [])

  const onScrollDebounced = useDebounce(onScroll, 1000, {leading: false, trailing: true});

  const onScrollThrottled = useThrottle(onScroll, 1000, {leading: true, trailing: true});

  return (
    <div className="App" onScroll={onScrollThrottled} style={{height: '95vh', overflowY: 'scroll'}}>
      {
        data.map(item => (
          <div>
            <div key={item}>id: {item}</div>
            <div>
              scrollCnt: <b>{onScrollCallCnt}</b>
            </div>
          </div>
        ))
      }

    </div>
  );
}

export default App;

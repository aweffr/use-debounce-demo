import React, {useEffect} from "react";


const data = Array(250).fill(0).map((_, idx) => idx);

function App() {

  useEffect(()=>{
    console.log("hello world!")
  }, [])

  const onScroll = (e) => {
    console.log("onScroll called!", e);
  }


  return (
    <div className="App" onScroll={onScroll} style={{height: '95vh', overflowY: 'scroll'}}>
      {
        data.map(item => (
          <div key={item}>id: {item}</div>
        ))
      }
    </div>
  );
}

export default App;

import React, { useEffect, useRef, useState } from 'react';
import { VariableSizeList as List } from 'react-window';

export default function App() {
  const [foo, setFoo] = useState<any>();
  const [bar, setBar] = useState<any>();
  const [doh, setDoh] = useState<any>();
  const imgCnt = useRef<any>(null);
  useEffect(() => {
    fetch(`https://pixabay.com/api/?key=${process.env.REACT_APP_APIKEY as string}&q=flower`, {
      method: 'GET'
    })
      .then(res => res.json())
      .then(data => setFoo(data.hits))
      .catch(err => console.log(err))
  }, []);
  useEffect(() => {
    if (foo) {
      setBar(
        foo.map((searchRes: any, idx: number) => {
          return (
            <img
              key={`img_${idx}`}
              src={searchRes.webformatURL}
              alt={`img_${idx}`}
              style={{
                marginBottom: '10px',
                width: '250px'
              }}
            />
          )
        })
      );
      setDoh(foo.map((searchRes: any, idx: number) => Math.round(searchRes.imageHeight * (250/searchRes.imageWidth))));
    }
  }, [foo]);

  const getDoh = (index: number): number => doh[index] + 10;
  const Row = ({ index, style}: any): React.ReactElement<any, any> => {
    return (
      <div
        style={{
          ...style,
          margin: '10px 0',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        {bar ? bar[index] : 'Loading'}
      </div>
    )
  }
  return (
    <div
      style={{
        width: '100%',
        height: '100%'
      }}
    >
      <article
        style={{
          border: '1px solid black',
          width: '100%',
          height: '800px',
          background: 'gray'
        }}
      >
        <section
          ref={imgCnt}
          style={{
            margin: '0 auto',
            border: '1px solid black',
            height: '100%',
            width: '33%',
            background: 'white',
            overflowY: 'scroll'
          }}
        >
          {
            doh
            ?
              <List
                width={'100%'}
                height={800}
                itemCount={20}
                itemSize={getDoh}
              >
                {/* { bar } */}
                { Row }
              </List>
            :
              'loading'
          }
        </section>
      </article>
      <footer
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <p
          style={{
            marginRight: '5px'
          }}
        >Powered By. </p>
        <img src="https://pixabay.com/static/img/logo.png" alt="Pixabay Logo" width="100px"/>
      </footer>
    </div>
  );
}
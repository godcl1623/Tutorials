import React, { useRef, useState, useEffect } from 'react';

function setClientSizes(originalState: any, setState: ((any: any) => void), newState: any) {
  setState({
    ...originalState,
    height: newState.height,
    left: newState.left,
    width: newState.width
  })
}

function Content({ color, number, width }: any) {
  return (
    <div
      style={{
        width: width,
        height: '100%',
        backgroundColor: color
      }}
    >
      Content #{ number }
    </div>
  );
}

const debouncer = (func: any, wait = 50, immediate = true) => {
  let timeout: any;
  return (...argms: any[]) => {
    const context = this
    const args = argms;
    const later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
};

export default function Carousel() {
  const [carouselClientSizes, setCarouselClientSizes] = useState<any>();
  const [carouselItemIdx, setItemIdx] = useState<number>(0);
  const [flag, setFlag] = useState<boolean>(false);
  const carouselCnt = useRef<HTMLDivElement | null>(null);
  const colors = ['green', 'yellow', 'blue', 'purple', 'gray'];
  const numbers = [1, 2, 3, 4, 5];
  const carWidth = carouselClientSizes ? carouselClientSizes.width : 0;

  useEffect(() => {
    if (carouselCnt.current) {
      const newState = {
        height: carouselCnt.current.clientHeight,
        left: carouselCnt.current.offsetLeft,
        width: carouselCnt.current.clientWidth
      };
      setClientSizes(carouselClientSizes, setCarouselClientSizes, newState);
    }
  }, [carouselCnt.current])

  useEffect(() => {
    if (carouselItemIdx > numbers.length - 1) {
      // setItemIdx(0);
      setItemIdx(numbers.length);
      setTimeout(() => {
        setItemIdx(0)
        setFlag(true)
      }, 300);
    } else if (carouselItemIdx < 0) {
      // setItemIdx(numbers.length - 1);
      setItemIdx(-1);
      setTimeout(() => {
        setItemIdx(numbers.length - 1)
        setFlag(true)
      }, 300);
    }
  }, [carouselItemIdx])

  useEffect(() => {
    if (flag) {
      setTimeout(() => setFlag(false), 50);
    }
  }, [flag])

  useEffect(() => {
    console.log(`translateX(-${carWidth * (carouselItemIdx)}px)`)
  })

  const carouselContents = (colors: string[], numbers: number[], width: number | string) => {
    const preArr = (
      numbers.map((num: number, idx: number) => <Content color={colors[idx]} number={num} width={width} />)
    );
    return [preArr[preArr.length - 1], ...preArr, preArr[0]];
  };

  return (
    <>
      <button
        id="btn_left"
        style={{
          width: '30px',
          height: '30px',
          border: '1px solid black',
          borderRadius: '50%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'absolute',
          top: carouselClientSizes ? (carouselClientSizes.height / 2) : '50%',
          left: carouselClientSizes ? (carouselClientSizes.left) - 40 : '0',
          transform: 'translateY(-50%)',
          cursor: 'pointer'
        }}
        // onClick={e => {
        //   if (carouselItemIdx >= 0) {
        //     setItemIdx(prevVal => prevVal -= 1)
        //   } else {
        //     setItemIdx(numbers.length - 1)
        //   }
        // }}
        disabled={flag}
        onClick={e => setItemIdx(prevVal => prevVal -= 1)}
      >
        ◀
      </button>
      <div
        id="carousel_container"
        ref={carouselCnt}
        style={{
          margin: '0 auto',
          border: '1px solid black',
          width: '50%',
          height: '100%',
          overflowX: 'hidden',
          overflowY: 'hidden',
          position: 'relative'
        }}
      >
        <div
          id="carousel_conveyor"
          style={{
            width: carWidth * (numbers.length + 2),
            height: '100%',
            display: carouselClientSizes ? 'flex' : 'none',
            position: 'absolute',
            // left: -carWidth * (carouselItemIdx + 1),
            left: -carWidth,
            transform: `translateX(${-carWidth * (carouselItemIdx)}px)`,
            transition: flag ? 'none' : '0.3s'
          }}
        >
          {/* <h1>Carousel</h1> */}
          {/* <Content
            color={'tomato'}
            number={1}
            width={carouselClientSizes ? carouselClientSizes.width : '100%'}
          /> */}
          {
            carouselContents(colors, numbers, carWidth)
          }
        </div>
      </div>
      <button
        id="btn_right"
        style={{
          width: '30px',
          height: '30px',
          border: '1px solid black',
          borderRadius: '50%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'absolute',
          top: carouselClientSizes ? (carouselClientSizes.height / 2) : '50%',
          left: carouselClientSizes ? (carouselClientSizes.left + carouselClientSizes.width) + 10 : '0',
          transform: 'translateY(-50%)',
          cursor: 'pointer'
        }}
        // onClick={e => {
        //   if (carouselItemIdx < numbers.length) {
        //     setItemIdx(prevVal => prevVal += 1)
        //   } else {
        //     setItemIdx(0)
        //   }
        // }}
        onClick={e => setItemIdx(prevVal => prevVal += 1)}
        disabled={flag}
      >
        ▶
      </button>
    </>
  );
}
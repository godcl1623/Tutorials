import React, { useRef, useState, useEffect } from 'react';

type Props = {
  data: any[]
}

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

export default function Carousel({ data }: Props) {
  const [carouselClientSizes, setCarouselClientSizes] = useState<any>();
  const [carouselItemIdx, setItemIdx] = useState<number>(0);
  const [flag, setFlag] = useState<boolean>(false);
  const carouselCnt = useRef<HTMLDivElement | null>(null);
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
    if (carouselItemIdx > data.length - 1) {
      setItemIdx(data.length);
      setTimeout(() => {
        setItemIdx(0)
        setFlag(true)
      }, 200);
    } else if (carouselItemIdx < 0) {
      setItemIdx(-1);
      setTimeout(() => {
        setItemIdx(data.length - 1)
        setFlag(true)
      }, 200);
    }
  }, [carouselItemIdx])

  useEffect(() => {
    if (flag) {
      setTimeout(() => setFlag(false), 100);
    }
  }, [flag])

  const carouselContents = (data: any[], width: number | string) => {
    const preArr = (
      data.map((ele: any, idx: number) => <Content color={ele} number={idx + 1} width={width} />)
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
          cursor: 'pointer',
          background: 'white',
          color: 'black'
        }}
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
            width: carWidth * (data.length + 2),
            height: '100%',
            display: carouselClientSizes ? 'flex' : 'none',
            position: 'absolute',
            left: -carWidth,
            transform: `translateX(${-carWidth * (carouselItemIdx)}px)`,
            transition: flag ? 'none' : '0.3s'
          }}
        >
          {
            carouselContents(data, carWidth)
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
          cursor: 'pointer',
          background: 'white',
          color: 'black'
        }}
        onClick={e => setItemIdx(prevVal => prevVal += 1)}
        disabled={flag}
      >
        ▶
      </button>
    </>
  );
}
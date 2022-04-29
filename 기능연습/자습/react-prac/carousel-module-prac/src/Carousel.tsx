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

export default function Carousel() {
  const [carouselClientSizes, setCarouselClientSizes] = useState<any>();

  const carouselCnt = useRef<HTMLDivElement | null>(null);

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

  const colors = ['green', 'yellow', 'blue', 'purple', 'gray'];
  const numbers = [1, 2, 3, 4, 5];
  const carWidth = carouselClientSizes ? carouselClientSizes.width : '100%';

  const carouselContents = (colors: string[], numbers: number[], width: number | string) => {
    const preArr = (
      numbers.map((num: number, idx: number) => <Content color={colors[idx]} number={num} width={width} />)
    );
    return [preArr[preArr.length - 1], ...preArr, preArr[0]];
  };

  return (
    <>
      <div
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
      >
        ◀
      </div>
      <div
        id="carousel_container"
        ref={carouselCnt}
        style={{
          margin: '0 auto',
          border: '1px solid black',
          width: '50%',
          height: '100%',
          overflowX: 'auto',
          overflowY: 'hidden'
        }}
      >
        <div
          id="carousel_conveyor"
          style={{
            width: carWidth * (numbers.length + 2),
            height: '100%',
            display: 'flex'
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
      <div
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
      >
        ▶
      </div>
    </>
  );
}
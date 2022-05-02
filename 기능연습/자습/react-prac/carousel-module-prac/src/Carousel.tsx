import React, { useRef, useState, useEffect } from 'react';
import Buttons from './modes/Buttons';

type Props = {
  data: any[],
  mode: string
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
      className="carousel_content"
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

export default function Carousel({ data, mode }: Props) {
  const [carouselClientSizes, setCarouselClientSizes] = useState<any>();
  const [carouselItemIdx, setItemIdx] = useState<number>(0);
  const [flag, setFlag] = useState<boolean>(false);
  const carouselCnt = useRef<HTMLDivElement | null>(null);
  const carouselTimer = useRef<any>();
  const progressTimer = useRef<any>();
  const progressVal = useRef<number>(0);
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

  useEffect(() => {
    if (mode === 'timer') {
      carouselTimer.current = setInterval(() => setItemIdx(prevVal => prevVal += 1), 3000);
      progressTimer.current = setInterval(() => progressVal.current += 1, 300);
    }
    return () => {
      clearInterval(carouselTimer.current);
      clearInterval(progressTimer.current);
      carouselTimer.current = undefined;
      progressTimer.current = undefined;
      progressVal.current = 0;
    };
  }, [mode])

  const carouselContents = (data: any[], width: number | string) => {
    const processedData = [data[data.length - 1], ...data, data[0]];
    return processedData.map((ele: any, idx: number) => {
      return (
        <React.Fragment key={idx}>
          <Content color={ele} number={idx} width={width} />
        </React.Fragment>
      );
    });
  };

  return (
    <>
      {
        mode === 'button'
        ?
          <Buttons
            direction='left'
            utils={{ flag, setState: setItemIdx, carouselClientSizes }}
          />
        : ''
      }
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
        <div
          style={{
            width: `${progressVal.current}%`,
            height: '5px',
            position: 'absolute',
            background: 'black',
            transition: 'all 0.3s'
          }}
        />
      </div>
      {
        mode === 'button'
        ?
          <Buttons
            direction='right'
            utils={{ flag, setState: setItemIdx, carouselClientSizes }}
          />
        : ''
      }
    </>
  );
}
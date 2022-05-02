export default function Buttons({ direction, utils }: any) {
  const { flag, setState, carouselClientSizes } = utils;
  return (
    <button
      id={`btn_${direction}`}
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
        left: direction === 'left'
          ? carouselClientSizes ? (carouselClientSizes.left) - 40 : '0'
          : carouselClientSizes ? (carouselClientSizes.left + carouselClientSizes.width) + 10 : '0',
        transform: 'translateY(-50%)',
        cursor: 'pointer',
        background: 'white',
        color: 'black'
      }}
      disabled={flag}
      onClick={e => setState((prevVal: any) => direction === 'left' ? prevVal -= 1 : prevVal += 1)}
    >
      { direction === 'left' ? '◀' : '▶' }
    </button>
  );
}
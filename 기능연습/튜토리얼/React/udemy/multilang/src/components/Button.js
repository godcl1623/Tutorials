import React, { useContext } from 'react';
import LanguageContext from './contexts/LanguageContext';
import ColorContext from './contexts/ColorContext';

const Button = () => {
  const context = useContext(LanguageContext);

  const btnText = (value) => {
    // switch(context) {
    switch(value) {
      case 'korean':
        return '제출';
      case 'english':
        return 'Submit';
      case 'japanese':
        return '提出';
      default:
        return 'Loading';
    }
  };

  const renderBtn = color => {
    return (
      <button className={`ui button ${color}`}>
        <LanguageContext.Consumer>
          {value => btnText(value)}
        </LanguageContext.Consumer>
      </button>
    );
  }

  return(
    <ColorContext.Consumer>
      {color => renderBtn(color)}
    </ColorContext.Consumer>
  );
};

export default Button;
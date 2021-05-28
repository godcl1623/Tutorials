import React from 'react';
import LanguageContext from './contexts/LanguageContext';
import ColorContext from './contexts/ColorContext';

const Button = () => {
  const btnText = (language) => {
    // switch(context) {
    switch(language) {
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
          {({ language }) => btnText(language)}
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
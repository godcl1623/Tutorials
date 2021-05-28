import React, { useContext } from 'react';
import LanguageContext from './contexts/LanguageContext';

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

  return(
    <button className="ui button primary">
      <LanguageContext.Consumer>
        {value => btnText(value)}
      </LanguageContext.Consumer>
    </button>
  );
};

export default Button;
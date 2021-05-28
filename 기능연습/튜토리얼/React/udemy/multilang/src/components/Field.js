import React, { useContext } from 'react';
import LanguageContext from './contexts/LanguageContext';

const Field = () => {
  const context = useContext(LanguageContext);

  const labelText = () => {
    switch(context) {
      case 'korean':
        return '문장';
      case 'english':
        return 'Sentence';
      case 'japanese':
        return '文章';
      default:
        return 'Loading';
    }
  };

  return(
    <div className="ui field">
      <label>{labelText()}:</label>
      <input />
    </div>
  );
};

export default Field;
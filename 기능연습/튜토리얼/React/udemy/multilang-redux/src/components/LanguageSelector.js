import React, { useContext } from 'react';
import LanguageContext from './contexts/LanguageContext';

const LanguageSelector = () => {
  const context = useContext(LanguageContext);

  return(
    <div>
      언어를 선택하세요:
      <i
        className="flag kr"
        onClick={() => context.setLanguage('korean')}
      />
      <i
        className="flag us"
        onClick={() => context.setLanguage('english')}
      />
      <i
        className="flag jp"
        onClick={() => context.setLanguage('japanese')}
      />
    </div>
  );
};

export default LanguageSelector;
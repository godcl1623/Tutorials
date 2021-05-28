import React from 'react';

const LanguageSelector = ({ setLanguage }) => {
  return(
    <div>
      언어를 선택하세요:
      <i
        className="flag kr"
        onClick={() => setLanguage('korean')}
      />
      <i
        className="flag us"
        onClick={() => setLanguage('english')}
      />
      <i
        className="flag jp"
        onClick={() => setLanguage('japanese')}
      />
    </div>
  );
};

export default LanguageSelector;
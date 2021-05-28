import React, { useState } from 'react';
import UserCreate from './UserCreate';
import LanguageContext from './contexts/LanguageContext';
import ColorContext from './contexts/ColorContext';

const App = () => {
  const [ language, setLanguage ] = useState('korean');

  return (
    <div className="ui container">
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
      {/* {language} */}
      <LanguageContext.Provider value={language}>
      <ColorContext.Provider value="red">
        <UserCreate />
      </ColorContext.Provider>
      </LanguageContext.Provider>
    </div>
  );
};

export default App;
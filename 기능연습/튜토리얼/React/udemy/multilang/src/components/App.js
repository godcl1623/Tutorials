import React, { useState } from 'react';
import UserCreate from './UserCreate';
import LanguageContext from './contexts/LanguageContext';

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
        <UserCreate />
      </LanguageContext.Provider>
    </div>
  );
};

export default App;
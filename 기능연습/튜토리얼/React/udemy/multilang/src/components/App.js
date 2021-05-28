import React, { useState } from 'react';
import UserCreate from './UserCreate';

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
      {language}
      <UserCreate />
    </div>
  );
};

export default App;
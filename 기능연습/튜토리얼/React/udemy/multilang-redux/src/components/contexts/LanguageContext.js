import React, { useState } from 'react';

const Context = React.createContext('korean');

export const LanguageStore = ({ children }) => {
  const [language, setLanguage] = useState('korean');

  return(
    <Context.Provider value={ {language, setLanguage} }>
      { children }
    </Context.Provider>
  );
};

export default Context;
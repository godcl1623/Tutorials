import React, { useState, useEffect } from 'react';
import Main from './components/components-main/Main';
import Management from './components/components-mana/Management';
import './App.css';

const App = () => {
  const [isManagementActive, setIsManagementActive] = useState(false);

  useEffect(() => {
    if (isManagementActive) {
      document.body.style.backgroundColor = 'var(--man-background)';
    } else {
      document.body.style.backgroundColor = 'var(--background)';
    }
  }, [isManagementActive]);

  const toggleManage = () => {
    if (!isManagementActive) {
      setIsManagementActive(true);
    } else {
      setIsManagementActive(false);
    }
  };

  const changeComponent = () => {
    if (this.state.isManagementActive) {
      return <Management />;
    } else {
      return <Main />;
    }
  };

  return (
    <div className="App_Root">
      {changeComponent()}
      <button id="management" onClick={toggleManage}>
        관리
      </button>
    </div>
  );
};

export default App;

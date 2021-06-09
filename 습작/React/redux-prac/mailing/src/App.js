import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
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
    if (isManagementActive) {
      return <Route path="/" component={Management} />;
    } else {
      return <Route path="/" component={Main} />;
    }
  };

  return (
    <div className="App_Root">
      <BrowserRouter>
        {changeComponent()}
        <Link to="/" id="management" onClick={toggleManage}>
          관리
        </Link>
      </BrowserRouter>
    </div>
  );
};

export default App;

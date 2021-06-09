import React, { useEffect } from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { isManagementActive } from './actions';
import Main from './components/components-main/Main';
import Management from './components/components-mana/Management';
import './App.css';

const App = ({ appState, activateMana }) => {
  useEffect(() => {
    if (appState) {
      document.body.style.backgroundColor = 'var(--man-background)';
    } else {
      document.body.style.backgroundColor = 'var(--background)';
    }
  }, [appState]);

  const toggleManage = () => {
    if (!appState) {
      activateMana(true);
    } else {
      activateMana(false);
    }
  };

  const changeComponent = () => {
    if (appState) return <Route path="/" component={Management} />;
    return <Route path="/" component={Main} />;
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

const mapStateToProps = state => {
  return { appState: state.appState };
};

export default connect(mapStateToProps, {
  activateMana: isManagementActive
})(App);

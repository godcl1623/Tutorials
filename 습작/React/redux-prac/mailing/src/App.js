import React, { useEffect } from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from './actions';
import Main from './components/components-main/Main';
import Management from './components/components-mana/Management';
import './App.css';

const App = ({ appState, activateMana, makeMain, makeMana, mainState, manaState }) => {
  useEffect(() => {
    // fetch('http://localhost:3001/member/get')
    //   .then(blob => blob.json())
    //   .then(data => console.log(data));
    if (appState) {
      document.body.style.backgroundColor = 'var(--man-background)';
    } else {
      document.body.style.backgroundColor = 'var(--background)';
    }
  }, [appState]);

  const stateChanger = () => {
    if (mainState !== 'MainStart') makeMain('MainStart');
    if (manaState !== 'ManageMain') makeMana('ManageMain');
  };

  const toggleManage = () => {
    if (!appState) {
      activateMana(true);
      stateChanger();
    } else {
      activateMana(false);
      stateChanger();
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
  return {
    appState: state.appState,
    mainState: state.mainState,
    manaState: state.manaState
  };
};

export default connect(mapStateToProps, {
  activateMana: actions.isManagementActive,
  makeMain: actions.mainCurrentPage,
  makeMana: actions.manaCurrentPage
})(App);

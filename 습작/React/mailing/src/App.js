import React, { Component } from 'react';
import Main from './components/components-main/Main';
import Management from './components/components-mana/Management';
import './App.css';

class App extends Component {
  state={
    isManagementActive: false
  }

  componentDidUpdate() {
    if (this.state.isManagementActive) {
      document.body.style.backgroundColor = 'var(--man-background)';
    } else {
      document.body.style.backgroundColor = 'var(--background)';
    }
  }

  toggleManage = () => {
    if (!this.state.isManagementActive) {
      this.setState({
        isManagementActive: true
      })
    } else {
      this.setState({
        isManagementActive: false
      })
    }
  }

  changeComponent = () => {
    if (this.state.isManagementActive) {
      return <Management />
    } else {
      return <Main />
    }
  }

  render() {
    return(
      <div className="App_Root">
        {this.changeComponent()}
        <button
          id="management"
          onClick={this.toggleManage}
        >
          관리
        </button>
      </div>
    );
  }
}

export default App;
